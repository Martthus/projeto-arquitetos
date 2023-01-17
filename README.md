<p align="center">
  <img src="./temp/logo-architects.png" width="200"  alt="Arquitetos" />
</p>

## Descrição

É um projeto criado como parte da solução dos problemas dos arquitetos e seus clientes.
(O/A)s arquitetos(as) (Flávio, Luciana, Felipe, João e Christine), estavam com um problema drástico para administrar seus clientes e suas solicitações.

## Instalação

```bash
$ yarn install
```

## Adicionando variável de ambiente:

```bash
# crie um arquivo chamado '.env' e adicione as seguintes variáveis:

APP_PORT= <número>
APP_SECRET= <string>

POSTGRES_DB=<nome-do-banco>
POSTEGRES_USER=<nome-do-usuário>
POSTGRES_PASSWORD=<senha-do-banco>

```

## Rodando a aplicação

```bash
# desenvolvimento
$ yarn start

# modo espectador
$ yarn start:dev

# modo produção
$ yarn start:prod
```

## Rodando a aplicação com Docker

```bash
# Criando e iniciando containers
$ docker compose up
```

## Test

```bash
# testes unitários
$ yarn test

# testes e2e
$ yarn test:e2e

# test coverage
$ yarn test:cov
```



## License

Nest is [MIT licensed](LICENSE).
