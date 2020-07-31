# Teste - Mestres da WEB

Este projeto foi criado para o processo seletivo da Mestres da Web. Ele consiste em uma aplicação de controle de estoque, em que o usuário pode possuir X lojas cadastradas em sua conta e Y produtos cadastrados por loja.

## Tecnologias Utilizadas
 - **NodeJS** para construção da API REST;
 - **ReactJS** para a construção do Frontend;
 - **PostgreSQL** como Banco de Dados;

## Instalação e Execução
#### API
Faça a instalação de todas as dependências através do comando:
		

   	$ yarn install

Utilize como modelo o arquivo `.env.example` e crie um arquivo chamado `.env` para configurar os dados da aplicação. 

Para configurar seu banco de dados, crie uma imagem do PostgreSQL no Docker, através do comando:

	$ docker run --name mestresDaWeb -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
	
Em seguida, execute o comando para subir as migrations para o banco de dados, através do comando:

	$ yarn sequelize db:migrate


Para a executar a api, utilize o comando:


	$ yarn dev


**Endpoints**

Criação de usuário: POST `/users`

		{
			email: string,
			password: string
		}


Autenticação de usuário: POST `/sessions`

		{
			email: string,
			password: string
		}

Para os seguintes endpoints, é necessário informar o `Bearer token` no header.

Criação de Lojas: POST `/stores`

		{
			name: string
		}

Listagem de Lojas: GET `/stores`

Delete de Lojas: DELETE `/stores/:store_id`


Criação de Produtos: POST `/stores/:store_id/products`

		{
			name: string,
			price: integer,
			quantity: integer
		}

Listagem de Produtos: GET `/stores/:store_id/products`

Update de Produtos: PUT `/stores/:store_id/products/:product_id`

		{
			checkout: integer
		}

Delete de Produtos: PUT `/stores/:store_id/products/:product_id`

#### Frontend
Faça a instalação de todas as dependências através do comando:
		

   	$ yarn install

Para a executar a aplicação, utilize o comando:


	$ yarn start
