# hobbitlink &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/facebook/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

## Features
* **TypeScript:** Built fully with TypeScript 
* **UnitTest:** Full unit test coverage
* **Containerized:** Dockerized with health checks
* **Secure:** Secure with helmet and cors

## Installing
```bash
$ git clone https://github.com/svenkang/hobbitlink.git
$ cd hobbitlink/server
$ npm install
```

## Running
```bash
$ docker compose up
```

## Testing
```bash
$ npm run test:cov
$ npm run test:e2e
```

## Documentation
This service supports OpenAPI specification powered by swagger.
After running the service, from the browser, go to `http://localhost:8080/api`

## TODO
- [x] create a hobbit link from a url
- [ ] store the urls in mysql
- [ ] proxy hobbit url
- [ ] serve the urls in with variable expiration
- [ ] require auth and login
- [ ] add limit per user
- [ ] track clicks 
- [ ] track meta data

