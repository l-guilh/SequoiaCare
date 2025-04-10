from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uvicorn
from sqlalchemy.ext.asyncio import AsyncSession
from models import (
    User, Provider, Subespecialidade, Idioma, 
    async_session, init_db, UserRole
)
from sqlalchemy import select
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="SequoiaCare API",
    description="API para gerenciamento de provedores de saúde e pacientes",
    version="1.0.0"
)

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração de segurança
SECRET_KEY = os.getenv("SECRET_KEY", "sua_chave_secreta_aqui")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Modelos Pydantic
class UserBase(BaseModel):
    email: EmailStr
    nome: str
    sobrenome: str
    telefone: Optional[str] = None
    data_nascimento: Optional[str] = None
    endereco: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
    cep: Optional[str] = None

class UserCreate(UserBase):
    senha: str
    role: UserRole

class UserResponse(UserBase):
    id: int
    role: UserRole

    class Config:
        from_attributes = True

class ProviderCreate(BaseModel):
    bio: Optional[str] = None
    educacao: str
    instituicao_educacao: str
    ano_formacao: int
    crm: str
    subespecialidades: List[str]
    idiomas: List[str]

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[UserRole] = None

# Funções de autenticação
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependência para obter sessão do banco de dados
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session

async def get_current_user(token: str = Depends(oauth2_scheme), session: AsyncSession = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: UserRole = payload.get("role")
        if email is None or role is None:
            raise credentials_exception
        token_data = TokenData(email=email, role=role)
    except JWTError:
        raise credentials_exception
    
    result = await session.execute(
        select(User).where(User.email == token_data.email)
    )
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(User).where(User.email == form_data.username)
    )
    user = result.scalar_one_or_none()
    if not user or not verify_password(form_data.password, user.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users", response_model=UserResponse)
async def criar_usuario(user: UserCreate, session: AsyncSession = Depends(get_session)):
    # Verificar se o email já existe
    result = await session.execute(
        select(User).where(User.email == user.email)
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="Email já registrado"
        )
    
    # Criar usuário
    db_user = User(
        email=user.email,
        senha_hash=get_password_hash(user.senha),
        role=user.role,
        nome=user.nome,
        sobrenome=user.sobrenome,
        telefone=user.telefone,
        data_nascimento=user.data_nascimento,
        endereco=user.endereco,
        cidade=user.cidade,
        estado=user.estado,
        cep=user.cep
    )
    
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    
    return db_user

@app.post("/providers", response_model=UserResponse)
async def criar_provedor(
    user: UserCreate,
    provider_data: ProviderCreate,
    session: AsyncSession = Depends(get_session)
):
    # Verificar se o email já existe
    result = await session.execute(
        select(User).where(User.email == user.email)
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="Email já registrado"
        )
    
    # Verificar se o CRM já existe
    result = await session.execute(
        select(Provider).where(Provider.crm == provider_data.crm)
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="CRM já registrado"
        )
    
    # Criar usuário
    db_user = User(
        email=user.email,
        senha_hash=get_password_hash(user.senha),
        role=UserRole.PROVEDOR,
        nome=user.nome,
        sobrenome=user.sobrenome,
        telefone=user.telefone,
        data_nascimento=user.data_nascimento,
        endereco=user.endereco,
        cidade=user.cidade,
        estado=user.estado,
        cep=user.cep
    )
    
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    
    # Criar provedor
    subespecialidades = []
    for sub_nome in provider_data.subespecialidades:
        result = await session.execute(
            select(Subespecialidade).where(Subespecialidade.nome == sub_nome)
        )
        sub = result.scalar_one_or_none()
        if not sub:
            sub = Subespecialidade(nome=sub_nome)
            session.add(sub)
        subespecialidades.append(sub)
    
    idiomas = []
    for idioma_nome in provider_data.idiomas:
        result = await session.execute(
            select(Idioma).where(Idioma.nome == idioma_nome)
        )
        idioma = result.scalar_one_or_none()
        if not idioma:
            idioma = Idioma(nome=idioma_nome)
            session.add(idioma)
        idiomas.append(idioma)
    
    db_provider = Provider(
        user_id=db_user.id,
        bio=provider_data.bio,
        educacao=provider_data.educacao,
        instituicao_educacao=provider_data.instituicao_educacao,
        ano_formacao=provider_data.ano_formacao,
        crm=provider_data.crm,
        subespecialidades=subespecialidades,
        idiomas=idiomas
    )
    
    session.add(db_provider)
    await session.commit()
    
    return db_user

@app.get("/users/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.get("/providers", response_model=List[UserResponse])
async def listar_providers(session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(User).where(User.role == UserRole.PROVEDOR)
    )
    providers = result.scalars().all()
    return providers

@app.get("/subespecialidades", response_model=List[str])
async def listar_subespecialidades(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Subespecialidade))
    subespecialidades = result.scalars().all()
    return [sub.nome for sub in subespecialidades]

@app.get("/idiomas", response_model=List[str])
async def listar_idiomas(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Idioma))
    idiomas = result.scalars().all()
    return [idioma.nome for idioma in idiomas]

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 