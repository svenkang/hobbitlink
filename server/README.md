# hobbitlink &middot; [![Made with](https://img.shields.io/badge/made_with-nestjs-blue.svg)](https://nestjs.com/) [![Node Version](https://img.shields.io/badge/node-v16.9.1-blue)](https://github.com/fieldnation/calculate-pay/blob/master/.nvmrc) [![Coverage](https://img.shields.io/badge/coverage-100%-brightgreen.svg)]()

## Features
* **TypeScript:** Built fully with TypeScript for scale.
* **UnitTest:** Full unit test coverage.
* **Containerized:** Containerized with docker and compose with health checks.
* **Secure:** Secure with helmet and cors. No vulnerabilities in audit.

## Installation
```bash
$ git clone https://github.com/svenkang/hobbitlink.git
$ cd hobbitlink/server
$ npm install
```

## Running
```bash
$ docker-compose up
```

## Testing
```bash
$ npm run test:cov
$ npm run test:e2e
```

## Documentation
This service supports OpenAPI specification powered by swagger.
After running the service, from the browser, go to: [http://localhost:8080/api](http://localhost:8080/api)

## Todo
- [x] create a hobbit link from a url
- [ ] store the urls in mysql
- [ ] proxy hobbit url
- [ ] serve the urls in with variable expiration
- [ ] require auth and login
- [ ] add limit per user
- [ ] track clicks 
- [ ] track meta data

