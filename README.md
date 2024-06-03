# ViewDefinition Designer

[![Deployment](https://github.com/Aidbox/viewdefinitions/actions/workflows/deployment.yml/badge.svg)](https://github.com/Aidbox/viewdefinitions/actions/workflows/deployment.yml)
[![Check dependencies](https://github.com/Aidbox/viewdefinitions/actions/workflows/dependencies.yml/badge.svg)](https://github.com/Aidbox/viewdefinitions/actions/workflows/dependencies.yml)

## Client

To run the client, you'll need to have Clojure, Node.js and npm installed on your machine. Once you have those, follow these steps:

1. Install the dependencies: `npm install`
2. Install postcss globally - `npm install -g postcss postcss-cli`
3. Start the development server: `make client-rep`

The client should now be running at `http://localhost:8280`.

## Server

To run server, you need to have Clojure and Docker installed on your machine. Once you have it, follow these steps:

1. Source `.env` dev environment variables.
2. Start local DB `docker compose --profile local up`
3. Start the server: `make server-repl`

The server should now be running at `http://localhost:8080`.

> [!NOTE]
> Server will serve client static as well

## Contributions

Each commit should adhere a variation of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary), with only requirements:

- use commit type prefix (eg `feat: ...`)
- specify issue ref (eg `feat(#1): ...`)
- body is optional

NOTE: each commit should not address more than one issue!
