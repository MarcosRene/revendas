# 🚀 Configuração do Projeto

Este documento fornece instruções para configurar e executar o projeto corretamente.

## 📌 Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [VSCode](https://code.visualstudio.com/)
- Extensões do VSCode:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 🔧 Configuração do VSCode

Para garantir a formatação automática do código e a correção de erros, crie a pasta `.vscode` na raiz do projeto e dentro dela o arquivo `settings.json`. Em seguida, adicione as seguintes configurações:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## 📁 Configuração do Arquivo `.env`

Duplique o arquivo `.env.example`, renomeie a cópia para `.env` e edite seu conteúdo conforme necessário.

No arquivo `.env`, configure a variável `VITE_API_BASE_URL` com a seguinte URL:

```
https://apicilos.com.br/commandapi
```

## 📦 Instalação das Dependências

Execute o seguinte comando para instalar as dependências do projeto:

```sh
npm install
```

## ▶️ Executando o Projeto

Para iniciar o projeto, utilize o comando:

```sh
npm run dev
```

Agora o projeto estará rodando corretamente! 🎉
