<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## CLI NEST:

Generar un nuevo proyecto:

```
  nest generate  <name-proyect>

```

Generar controlador:

```
  nest generate controller controllers/<name-controller>
```

otra forma:

```
nest g controller controllers/<name-controller>
```

para que no cree la carpeta del nombre del controler pordemos hacer

```
nest g controller controllers/<name-controller> --flat
```

Generar servicios:

```
nest g s services/<name-service> --flat

```

Generar modulos:

```
nest g mo <nombre modulo>
```

Generar guard:

```
nest g gu <direccion donde queremos guardar>/<nombre archivo> --flat
```

## Documentacion de PIPES:

https://docs.nestjs.com/pipes#built-in-pipes

Crear un pipe personalizado:

```
nest g pipe common/<nombre del pipe>
```

### instalacion de paquete para modulo de configuracion:

```
npm i @nest/config
```

# Documentacion open api:

https://docs.nestjs.com/openapi/introduction

Tener en cuenta:
La documentacion de swagger genera archivos estaticos entonces cada vez que se modifique la configuracion de swagger eliminar carpeta dist y volver a ejecutarlo.

```
rm -rf dist/
```

# Documentacion POSTMAN:

https://documenter.getpostman.com/view/19270942/2s9Y5eMJmm

# Documentacion API Platzi Store (SWAGGER):

http://localhost:3000/docs/

#

## Ver en donde esta corriendo el contenedor:

1. Ejecutar este comando:

```
docker container ps

```

2. Ejecutar este comando

```
 docker inspect <id contenedor>
```

copiar el IPAddress

### TYPEORM Generar migracion:

```
npm run migrations:generate -n <nombre migracion>
```

### Correr migracion:

```
npm run migrations:run
```

### Ver migracion que se han corrido en el momento:

```
npm run migrations:show
```

### Eliminar todas las tablas:

```
npm run migration:drop
```
