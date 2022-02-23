# Rentx

<img src="rentx.png" alt="Rentx logo" height="50" position="center">

> API REST de uma locadora de carros

## Informações sobre a aplicação

## Tecnologias

As seguintes tecnologias foram utilizadas no projeto:

- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)
- [Amazon SES](https://aws.amazon.com/pt/ses/)
- [Amazon S3](https://aws.amazon.com/pt/s3/)
- [Amazon EC2](https://aws.amazon.com/pt/ec2)

## Executando o projeto

- Copie o arquivo de ambiente e preencha as variáveis:
  ```bash
    cp .env.example .env
  ```
- Copie o arquivo de configuração do banco de dados e preencha as informações de conexão:
  ```bash
    cp ormconfig.example.json ormconfig.json
  ```
- Com yarn e node instalados, atualize as dependências do projeto:
  ```bash
    yarn
  ```
- Crie um banco de dados e execute as migrations:
  ```bash
    yarn typeorm migration:run
  ```
- Para executar a aplicação em ambiente de desenvolvimento:
  ```bash
    yarn dev
  ```
- Para executar o banco de dados:
  ```bash
    docker-compose up -d
  ```
