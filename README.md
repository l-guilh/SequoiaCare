# SequoiaCare

Uma plataforma moderna para gestão de cuidados médicos, conectando pacientes e profissionais de saúde.

## Tecnologias Utilizadas

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Radix UI

### Backend
- FastAPI
- SQLAlchemy
- SQLite

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos
- Node.js (v18 ou superior)
- Python (v3.8 ou superior)
- npm ou pnpm

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/SequoiaCare.git
cd SequoiaCare
```

2. Instale as dependências do frontend
```bash
npm install
# ou
pnpm install
```

3. Instale as dependências do backend
```bash
pip install -r requirements.txt
```

4. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações
```

5. Inicie o servidor de desenvolvimento
```bash
# Terminal 1 - Frontend
npm run dev
# ou
pnpm dev

# Terminal 2 - Backend
python main.py
```

## Estrutura do Projeto

```
SequoiaCare/
├── app/                    # Componentes e páginas Next.js
├── components/            # Componentes React reutilizáveis
├── lib/                   # Utilitários e configurações
├── public/               # Arquivos estáticos
├── styles/              # Estilos globais
├── main.py              # Servidor FastAPI
├── models.py            # Modelos do banco de dados
└── requirements.txt     # Dependências Python
```

## Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes. 