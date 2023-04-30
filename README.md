<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
##  
yarn remove prettier
yarn remove eslint-config-prettier eslint-plugin-prettier
<!--  -->
nest g res pokemon --no-spec

## Docker
docker-compose up -d
# Ejecutar enn desarrollo
1.-Clonar el repositorio
2.-Ejecutar
```
  yarn install

```
3.-Tener next CLI instalado
```
npm i -g @nestjs/cli
```
4.-Levantar la base de datos
```
docker-compose up -d
```
## Srack usado
* MogoDB
* Nest

# Conectar nest con mongo 

```
$ npm i @nestjs/mongoose mongoose
yarn add @nestjs/mongoose mongoose
```
# clas Vlaidator

```
yarn add class-validator class-transformer
```

<!-- NOTE -->
Si tienes instaldo Mongo compass es posible que no se conecte a tableplus
Detener los servicios de MongoDB

<!-- Estructura pra crear una pipe global -->
nest g mo common

nest g pi common/pipes/parseMongoId --no-spec

# Creando un seed
nest g res seed --no-spec

## Nota de actualización - Axios
En la siguiente clase, instalamos el paquete axios para realizar las peticiones HTTP.

En la última versión del mismo, está dando inconvenientes con NestJS (cannot read properties of undefined).

Pueden ver la issue sin resolver a día de hoy: https://github.com/axios/axios/issues/5100.


Por lo que a la hora de instalar axios, recomendamos instalen la versión 0.27.2 hasta que liberen una versión superior con el inconveniente solventado.

Pueden usar el comando 
```
yarn add axios@0.27.2 
```
```
npm install axios@0.27.2.
```

instlar axios

yarn add axios