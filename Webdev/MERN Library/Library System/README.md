# library system

Web application that interacts with a MongoDB database using the MERN (Mongo, Express, React, NodeJS) stack . The application implements the 4 CRUD operations (Create/Read/Update/Delete).
Although not fully fleshed out, this application should showcase a personal understanding in building a web applciation using a popular develpoment stack.


* Open up command prompt and chnage directory to the location of the project, you must be able to see the .

```bash
$ cd library system
```

* You must be able to see the **react-frontend** and the **nem-backend/**

## Running the backend
* In the project folder, Change directory into /nem-backend and run **npm install** to install the npm packages dependencies and **npm start** to start the backend.

```bash
$ npm install 
$ node server.js
```
* The last command will show you a list of apis routes being exposed by the backend. 
```
$node server.js
Server is running on port 8080.
[
  { path: '/', methods: [ 'GET' ], middleware: [ 'anonymous' ] },
  {
    path: '/api/books',
    methods: [ 'POST', 'GET', 'DELETE' ],
    middleware: [ 'anonymous' ]
  },
  {
    path: '/api/books/published',
    methods: [ 'GET' ],
    middleware: [ 'anonymous' ]
  },
  [...]
 ```
 
* If the backend does not start, check to see if the file /app/config/db.config.js was cloned. If not you will need to recreate it.
    Code as follows. File=db.config.js, File start:
```
    module.exports = {
    url: "[**databaseurl**]"
     };
```
OBS: The database consists in two DinamodDB collecations named as **books** and **users**.

* Yo can check to see if the backend is running accessing the url **http://localhost:8080/**

```bash
$ curl http://localhost:8080/
```

## Running the frontend

* In the project folder, Change directory into /nem-backend and run **npm install** to install the npm packages dependencies and **npm start** to start the backend.

```bash
$ npm install 
$ npm start 
```
* The app should open on your webbrowser http://localhost:8081/. If for any reason the frontend does not load on the port 8081, create a **.env** file in the /frontend root folder with the content below.

```bash
cat frontend/.env
PORT=8081
```


## Login Details

* Username - login
* Password - password




