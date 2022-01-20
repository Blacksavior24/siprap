const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes')

const {logErrors, errorHandler, boomErrorHandler} = require('./src/middlewares/error.handler');

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

app.get('/', (req, res)=>{
  res.send('hola mi server');
});

app.get('/nueva-ruta', (req, res)=>{
  res.send('hola soy nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('mi port'+ port);
});
