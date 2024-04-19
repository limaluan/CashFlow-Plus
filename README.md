<h1 align="center">
  <img alt="Coffee Delivery" title="Coffee Delivery" src="./src/assets/logo.svg" width="440px" />
</h1>

<p align="center">
  <a href="#-contexto">Contexto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;
</p>

## 🧠 Contexto

<p>O CashFlow Plus é uma aplicação que permite registros de movimentos financeiros.</p>

<p align="center">
  <img alt="Página Inicial / Dashboard" src="https://i.imgur.com/czSRIyr.png" width="100%">
</p>

<p>O CashFlow Plus possui features como:</p>

- Sistema de autenticação
- Cadastro de Transações
- Busca de Transações
- Paginação de Transações

Você pode acessar o Back-End da aplicação feito em Java com SpringBoot seguindo esse [link](https://github.com/limaluan/api-cashflow-java).

( ⚠️ Também existe uma versão da API que eu fiz em NodeJs que está um pouco desatualizada, por isso não é mais compativél com branch principal deste projeto, sendo assim necessário o front end estar na branch [nodejs-version](https://github.com/limaluan/CashFlow-Plus/tree/nodejs-version))

## 🚀 Tecnologias

<h2><img height="36px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" /> Angular</h2>

<p>O <b>Angular</b> foi o framework utilizado para o Front-End.</p>

<h2><img height="36px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg"/> SpringBoot</h2>

<p>O <b>SpringBoot</b> foi utilizado para criação da API no Back-End.</p>

<h2><img height="36px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg"/> NodeJs</h2>

<p>O <b>NodeJs</b> foi utilizado para criar a API da branch **nodejs-version**.</p>

<h3>Outras tecnologias utilizadas:</h3>

- PostgreSQL
- Spring Security

<!-- ## 💻 Projeto -->

## 📔 Projeto

<h2>Visão do cliente</h2>


<h2>Tela de Login</h1>
<p align="center">
  <img alt="Página de Login" src="https://i.imgur.com/WixjdDZ.png" width="100%">
</p>

<h2>Tela de Cadastro</h2>

<p align="center">
  <figure>
    <img alt="Tela de Cadastro" src="https://i.imgur.com/VdZm5hT.png" width="100%"/>
    <figcaption>Ao tentar acessar a tela de Administrador através da URL "/admin", o usuário será redirecionado para uma tela de Login caso não tenha feito o login nenhuma vez anteriormente</figcaption>
  </figure>
</p>

<h2>Cadastro de Transação</h2>

<p align="center">
  <figure>
    <img alt="Cadastro de Transação" src="https://i.imgur.com/97UdeHe.png" width="100%"/>
    <figcaption>Ao tentar acessar a tela de Administrador através da URL "/admin", o usuário será redirecionado para uma tela de Login caso não tenha feito o login nenhuma vez anteriormente</figcaption>
  </figure>
</p>

## 🔖 Layout

Você pode visualizar o layout base do projeto através [desse link](https://www.figma.com/file/KENaPQfB2l2RZmF0af1lEE/CahsFlow-Plus?type=design&node-id=0%3A1&mode=design&t=Qt9yLc1rNqvx3wDl-1). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

---

## ⚒️ Executando o Projeto

Execute um dos dois comandos abaixo a depender do seu gerenciador de pacotes.

```bash
npm install
npm run start
# or
yarn install
yarn start
```

Para o funcionamento da aplicação por completo, é necessário executar também a API, que se encontra neste [repositório]([url](https://github.com/limaluan/CashFlow-Plus/tree/master)).
Com a API clonada, execute este comando na pasta raiz do projeto:

```bash
mvn spring-boot:run
```

O Front End será hospedado no domínio [http://localhost:4200](http://localhost:4200).

O Back End será hospedado no domínio [http://localhost:8080](http://localhost:8080).

Feito com ♥ by [Luan Lima](https://github.com/limaluan).
