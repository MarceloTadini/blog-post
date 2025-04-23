# 🚀 Blog Posts

## 📖 Introdução

O **Blog Posts** é um projeto desenvolvido com **Next.js** e **Tailwind CSS** para oferecer um ambiente de compartilhamento de posts para alunos e professores. O blog permite que alunos visualizem postagens sem necessidade de login, enquanto professores podem criar, editar e excluir posts, além de ter todas as funcionalidades dos alunos.

🖥️ A aplicação é **responsiva** e se ajusta automaticamente ao tamanho da tela.

## 🛠️ Tecnologias Utilizadas  

- ⚡ **Next.js**: Utilizado como framework React para otimizar a performance da aplicação, oferecendo renderização híbrida (SSR/SSG) e uma estrutura organizada para desenvolvimento.  
- 🎨 **Tailwind CSS**: Escolhido para estilização devido à sua abordagem baseada em classes utilitárias, permitindo um design responsivo e ágil sem a necessidade de escrever CSS customizado extenso.  
- 📡 **Axios**: Biblioteca utilizada para realizar requisições HTTP de forma simplificada, permitindo melhor controle de erros e interceptação de respostas.  
- ✨ **Lucide React**: Conjunto de ícones flexível e moderno, utilizado para melhorar a interface do usuário sem comprometer a performance.  
- 📑 **Formik e Yup**: Utilizados para lidar com schemas e validações de formulários, garantindo uma experiência fluida para o usuário e prevenindo erros de entrada de dados.  
- 🔹 **TypeScript**: Adotado para fornecer tipagem estática ao código, reduzindo erros e melhorando a manutenção e escalabilidade da aplicação.  
- 🖥️ **Node.js v20.12.0**: Usado como ambiente de execução para a aplicação e no processo de build, garantindo compatibilidade com as dependências do projeto.    
- 📦 **NPM v10.5.0**: Gerenciador de pacotes responsável por instalar e gerenciar dependências do projeto, garantindo a consistência do ambiente de desenvolvimento.  


## 🏛️ Arquitetura da Aplicação
A estrutura do projeto está organizada da seguinte forma:

```sh 
├── public
    └── images
    │   └── default-image.png 
├── src
    ├── app
    │   ├── components # 🏗️ Componentes reutilizáveis 
    │   │   ├── Breadcrumbs.tsx
    │   │   ├── ErrorInputText.tsx
    │   │   ├── FormPost.tsx
    │   │   ├── Header.tsx
    │   │   ├── SearchInput.tsx
    │   │   └── YoutubeVideo.tsx
    │   ├── context # 🔄 Contextos globais para autenticação e posts 
    │   │   ├── AuthContext.tsx
    │   │   └── PostsContext.tsx
    │   ├── globals.css # 🎨 Estilos globais da aplicação 
    │   ├── layout.tsx
    │   ├── page.tsx # 🏠 Página inicial 
    │   └── types # 📌 Definições de tipos TypeScript 
    │   │   └── index.ts
    └── pages
    │   ├── _app.tsx # ⚙️ Configuração principal da aplicação 
    │   ├── api # 🔗 Comunicação com a API 
    │       ├── login.ts
    │       ├── logout.ts
    │       └── token.ts
    │   ├── blog # ✍️ Rotas relacionadas aos posts 
    │       ├── [id].tsx
    │       ├── edit
    │       │   └── [id].tsx 
    │       ├── index.tsx
    │       └── new.tsx
    │   └── register # 🆕 Rota de cadastro de professores 
    │       └── index.tsx

```

## 🚏 Rotas da Aplicação

- **/** 🏠 - Rota de acesso à aplicação. Responsável pelo login, pelo redirecionamento à rota /blog e para a rota de cadastro.

- **/register** 🆕 - Rota responsável pela criação de novos usuários (professores).

- **/blog** 📃 - Rota responsável pela listagem dos posts.

- **/blog/:id** 🔍 - Rota responsável por exibir um post específico completo, com: título, introdução, autor, conteúdo, vídeo e imagem.

- **/blog/new** ✍️ - Rota responsável pela criação de novos posts.

- **/blog/edit/:id** ✏️ - Rota responsável por editar um post específico.


## 🚀 Acesso à Aplicação  
A aplicação está disponível em: [**Blog Posts**](https://blog-post-ten-blond.vercel.app/)  

⚠️ **Observação:** Ao acessar a rota `/blog`, aguarde um tempo para que a API hospedada no Render seja ativada.  

---

## 🏗️ Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [NVM](https://github.com/nvm-sh/nvm) instalados. Para rodar o projeto, utilize os seguintes comandos:


### Ajuste a versão do node.js

```sh
nvm use 20.12.0
```

### Instale as dependências do node.js
```sh
npm i
```

### Rode a aplicação
```sh
npm run dev
```

Isso garantirá que você esteja utilizando a versão correta do Node.js e que todas as dependências estejam instaladas.

## 🎥 Vídeo do Projeto
👉 **[Link para o vídeo](https://youtu.be/Y2KxBHfQjng)**  


## 🎯 Conclusão  
📌 No início, o design da aplicação foi construído com elementos estáticos e voltado apenas para **desktop**.  

📱 Posteriormente, foi realizada a adaptação para **telas menores**, garantindo **responsividade**.  

🔑 Um dos principais desafios do projeto foi **salvar o `access_token` JWT retornado pela API em um cookie**, pois essa abordagem era nova para mim.  

🔄 Após essa etapa, foram adicionados **contextos** para compartilhar os **cookies e os posts entre todas as páginas**, melhorando a experiência do usuário e a manutenção do código.  

✅ O projeto foi um grande aprendizado e resultou em uma aplicação **funcional e bem estruturada**. 🚀  
