# MINI PROJETO EM NEXT JS
Mini projeto com finalidades de apresentar conhecimentos básicos em Next JS, com cadastro e autenticação de usuário e CRUD completo de postagens. 

### REQUISITOS
Para instalar o projeto local e rodar localmente na sua máquina é necessário os seguintes requisitos:

```sh
 -  Node.js versão 22.12.0 ou superior
```
[Guia de instalação do Node.js](https://nodejs.org/en/download)

### INSTALAÇÃO DO PROJETO
Para instalar o projeto siga as etapas:

1. Clonar o projeto do GitLab (em qualquer diretório do seu computador. recomendado criar um diretório em Documentos/projetos/):
```sh
 git clone https://github.com/renananchieta/nextjs-miniprojeto.git
```

2. Criar o arquivo .env.local com o seguinte conteúdo com base na porta da api:
```sh
 NEXT_PUBLIC_API_URL=http://localhost:8888/api
 API_URL=http://localhost:8888/api
```

3. Instalar o projeto e seus pacotes, execute o comando:
```sh
 npm install
```

4. Após a instalação de todos os pacotes e sem nenhum erro, para iniciar o modo de desenvolvimento local, execute:
```sh
 npm run dev
```

# CORRER O PROJETO COM DOCKER
Para rodar o projeto com docker execute o seguinte comando:
```sh
 docker compose up -d
```

1. Verificar o container que está rodando a aplicação front end:
```sh
 docker ps
```

Você verá a seguinte tela:

```sh
CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                                         NAMES
f450d45095c1   aula-nextjs      "docker-entrypoint.s…"   12 minutes ago   Up 12 minutes   0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp   next-app
```

2. Para acessar a aplicação:
```sh
 localhost:3000/
```

3. Usuario de teste:
```sh
 Login: renananchieta
 Senha: 'Teste1234#'
```