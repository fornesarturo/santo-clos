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

Static Router
```javascript
+ GET /
```

Authentication Router
```javascript
+ POST /auth/token
    Request Body:
        {
            username: "USERNAME",
            password: "HASHED PASSWORD"
        }
    Response:
        {
            type: "TOKEN TYPE"
            access_token: "{token value}"
        }
# POST /auth/whoami
    Request Body [Optional because it uses Cookies]:
        {
            token: "{token value}"
        }
    Response:
        {
            username: "USERNAME OF THE TOKEN"
        }
```

API JSON Router
```javascript
# GET /api/json/user?user={username}
    Response:
        {
            "data": [
                {
                    "username": "USERNAME",
                    "name": "Name McNamey",
                    "email": "user@emailprovider.com"
                }
            ],
            "user": "USERNAME OF THE TOKEN"
        }

+ POST /api/json/user
    Request Body:
        {
            username: "USERNAME",
            password: "HASHED PASSWORD",
            name: "Name McNamey",
            email: "user@emailprovider.com"
        }

# GET /api/json/event/users?id={eventId}
    Response:
        {
            "data": [
                {
                    "username": "USER THAT BELONGS TO THE EVENT",
                    "eventId": "THIS EVENT ID",
                    "giftee": "WHO THIS USER GIFTS"
                },
                ...
            ],
            "user": "USERNAME OF THE TOKEN"
        }

# GET /api/json/event/wishlist?id={eventId}&user={username}
    Response:
        {
            "data": [
                {
                    "eventId": "EVENT THAT THIS WISH BELONGS TO",
                    "admin": "WHO'S THE ADMIN OF THIS EVENT",
                    "name": "NAME OF THE EVENT",
                    "eventDate": "YYYY-MM-DD",
                    "address": "ADDRESS OF THE EVENT",
                    "amount": "NUMERIC_LIMIT",
                    "wishId": "WISH IDENTIFIER",
                    "username": "TO WHOM THIS WISH BELONGS TO",
                    "wish": "WISH DESCRIPTION"
                }
            ],
            "user": "USER OF THE TOKEN"
        }

# GET /api/json/event/giftee?id={eventId}&user={username}
    Response:
        {
            "data": [
                {
                    "giftee": "fornesarturo"
                }
            ],
            "user": "watsalacanoa"
        }
```

API XML Router
```javascript
// Each route returns the same that its quasi-namesake in api/json does.

# GET /api/xml/user

# GET /api/xml/event/users?id={eventId}

# GET /api/xml/event/wishlist?id={eventId}&user={username}

# GET /api/xml/event/giftee?id={eventId}&user={username}
```

In case of any error the response is the following:
```javascript
{
    "error": {
        "name": "ERROR NAME",
        "message": "ERROR DESCRIPTION"
    },
    "code": ERROR_CODE_NUMBER
}
```