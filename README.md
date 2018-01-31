# Santo Clos
###### Project for the Web Application Development course at ITESM Winter 2018

Santo Clos is a Secret Santa web-app.

## Table of Contents
* [Requirements](#requirements)
* [API Routes](#api-routes)

## Requirements

This project was developed using *NodeJS*, so you should at least have that. To install the needed modules simply clone the repository and use *NPM's* built-in functionality.

```bash
# with https
$ git clone https://github.com/fornesarturo/santo-clos.git
# with ssh
$ git clone git@github.com:fornesarturo/santo-clos.git
# then change into the directory
$ cd santo-clos
# install the node modules
$ npm install
```

And to run the project:

```bash
$ npm start
```

## API Routes

* ##### GET /
* ##### GET /api/json/user
* ##### POST /api/json/user
* ##### GET /api/json/event/users?id={eventId}
* ##### GET /api/json/event/wishlist?id={eventId}&user={username}
* ##### GET /api/json/event/giftee?id={eventId}&user={username}
* ##### GET /api/xml/user
* ##### GET /api/xml/event/users?id={eventId}
* ##### GET /api/xml/event/wishlist?id={eventId}&user={username}
* ##### GET /api/xml/event/giftee?id={eventId}&user={username}