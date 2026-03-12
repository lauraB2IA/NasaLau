# NASA APOD Birthday Viewer 🚀

Este projeto permite que você descubra qual foi a **Astronomia Picture of the Day (APOD)** da NASA no dia do seu aniversário.

O sistema consiste em um backend em **Python (FastAPI)** e um frontend moderno com efeito **Glassmorphism**.

---

## 🛠️ Pré-requisitos

1. **Python 3.10+** instalado.
2. Uma chave da API da NASA (opcional para testes iniciais, mas recomendada). 
   - Obtenha em: [api.nasa.gov](https://api.nasa.gov/)

---

## 🔧 Passo 1: Configuração do Backend

Abra o seu terminal (PowerShell) e siga os comandos:

### 1.1 Liberar a execução de scripts (apenas uma vez)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 1.2 Acessar a pasta e ativar o Ambiente Virtual
```powershell
cd backend
# Ativar o ambiente virtual
.\.venv\Scripts\Activate.ps1
```

### 1.3 Instalar as dependências
```powershell
pip install -r requirements.txt
```

### 1.4 Configurar sua Chave da API
Edite o arquivo `backend/.env` e adicione sua chave:
```env
NASA_API_KEY=SUA_CHAVE_AQUI
```

---

## 🚀 Passo 2: Iniciar o Servidor

Com o ambiente virtual ativado (você verá `(.venv)` no terminal), execute:

```powershell
python main.py
```
O servidor estará rodando em: `http://localhost:8000`

---

## 💻 Passo 3: Abrir o Frontend

O frontend não precisa de instalação. Basta abrir o arquivo no seu navegador:

1. Navegue até a pasta `frontend/`.
2. Clique duas vezes no arquivo `index.html`.
3. Insira sua data de nascimento e explore o espaço! 🌌

---

## 📁 Estrutura do Projeto

- `backend/`: Código API FastAPI, gerenciamento de ambiente e lógica de proxy para a NASA.
- `frontend/`: Interface visual (HTML, CSS animado e JavaScript).
- `.env`: Armazena com segurança sua chave da API.
