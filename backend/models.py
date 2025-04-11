from sqlalchemy import Column, Integer, String, Table, ForeignKey, create_engine, Enum
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import enum

Base = declarative_base()

class UserRole(str, enum.Enum):
    PACIENTE = "paciente"
    PROVEDOR = "provedor"
    ADMIN = "admin"

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    senha_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    nome = Column(String, nullable=False)
    sobrenome = Column(String, nullable=False)
    telefone = Column(String)
    data_nascimento = Column(String)  # Formato: YYYY-MM-DD
    endereco = Column(String)
    cidade = Column(String)
    estado = Column(String)
    cep = Column(String)

    # Relacionamento com Provider (se for um provedor)
    provider = relationship("Provider", back_populates="user")

# Tabela de associação para subespecialidades
provider_subespecialidade = Table(
    'provider_subespecialidade',
    Base.metadata,
    Column('provider_id', Integer, ForeignKey('providers.id')),
    Column('subespecialidade_id', Integer, ForeignKey('subespecialidades.id'))
)

# Tabela de associação para idiomas
provider_idioma = Table(
    'provider_idioma',
    Base.metadata,
    Column('provider_id', Integer, ForeignKey('providers.id')),
    Column('idioma_id', Integer, ForeignKey('idiomas.id'))
)

class Provider(Base):
    __tablename__ = 'providers'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    bio = Column(String)
    educacao = Column(String)
    instituicao_educacao = Column(String)
    ano_formacao = Column(Integer)
    crm = Column(String, unique=True)  # Registro profissional
    
    # Relacionamentos
    user = relationship("User", back_populates="provider")
    subespecialidades = relationship("Subespecialidade", secondary=provider_subespecialidade, back_populates="providers")
    idiomas = relationship("Idioma", secondary=provider_idioma, back_populates="providers")

class Subespecialidade(Base):
    __tablename__ = 'subespecialidades'

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, nullable=False)
    providers = relationship("Provider", secondary=provider_subespecialidade, back_populates="subespecialidades")

class Idioma(Base):
    __tablename__ = 'idiomas'

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, nullable=False)
    providers = relationship("Provider", secondary=provider_idioma, back_populates="idiomas")

# Configuração do banco de dados
DATABASE_URL = "sqlite+aiosqlite:///./sequoia_care.db"

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all) 