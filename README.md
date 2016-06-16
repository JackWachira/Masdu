# Introduction

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Bucket List application made with Angular2 using [Angular2 Starter](https://github.com/mgechev/angular2-seed) that talks to a [Django Rest API](https://github.com/andela-jmwangi/MasduRestApi/)

# How to start

**Note** that this requires node v4.x.x or higher and npm 2.14.7.

```bash
git clone --depth 1 https://github.com/andela-jmwangi/Masdu.git
cd Masdu
# install the project's dependencies
npm install
# watches your files and uses livereload by default
npm start
# api document for the app
npm run build.docs

# dev build
npm run build.dev
# prod build
npm run build.prod
```

_Does not rely on any global dependencies._

# Table of Content

- [Introduction](#introduction)
- [How to start](#how-to-start)
- [Table of Content](#table-of-content)
- [Configuration](#configuration)
- [Tools documentation](#tools-documentation)
- [License](#license)

# Configuration

Default application server configuration

```javascript
var PORT             = 5555;
var LIVE_RELOAD_PORT = 4002;
var DOCS_PORT        = 4003;
var APP_BASE         = '/';
```

Configure at runtime

```bash
npm start -- --port 8080 --reload-port 4000 --base /my-app/
```

# Tools documentation

A documentation of the provided tools can be found in [tools/README.md](tools/README.md).

# License

MIT
