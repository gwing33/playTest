# Play! Framework

Created a test web server with supporting JavaScript code to show a complete working example of a web server.

Would also like to add a React Native application along side as well.

## Install & Building JavaScript

Install the npm packages and build the JavaScript:
```bash
npm install
npm install -g webpack
webpack
```


## Application Structure

**Pages**
* Index (Home)
* Login
* Events
* Event Details
* Style Guide

**API Calls**
* /api/login
* /api/logoff
* /api/events - Returns Mocked Data
* /api/events/:id - Returns Mocked Data



### Web Server TODOs
* [x] ~~Create Play routes~~
* [x] ~~ES6 Linting (.jshintrc)~~
* [x] ~~WebPack~~
    * [x] ~~Multiple Entries to break out JavaScript.~~
    * [x] ~~Less Styles~~
* [x] ~~Login / Logout on Server~~
* [x] Login form on Client
* [ ] Work out Backend Structure
* [ ] Add Jest Framework and tests
* [ ] Add some mock API calls for Events (simple json list)
* [ ] i18n - FormatJS
* [ ] Compile JavaScript in the cmds/build script
* [ ] Live Reload / Modular Reloading?

### React Native
* [ ] Create a Login page
* [ ] Get a list of all events from the web server and display them.
