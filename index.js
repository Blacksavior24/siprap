const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes')

const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./src/middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
/*
const whitelist = ['http://localhost:8080', 'https://myapp.co'];//colocar la url del front que corre para que acepté la peticion
const options = {
  origin: (origin, callback)=>{
    if (whitelist.includes(origin)|| !origin) {
      callback(null,true);
    }else{
      callback(new Error('no permitido'));
    }
  }
*/
app.use(cors());


routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);

app.use(express.static('frontend'));

app.listen(port, ()=>{
  console.log('mi port'+ port);
});
