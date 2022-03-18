const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes');
const path = require('path');
const router = require('./frontend/router');

const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./src/middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.set('views',path.join(__dirname, 'frontend/views'));
app.set('view engine', 'ejs');

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

require('./src/utils/auth');

//app.use(router);

//INICIO

//ESTUDIANTES
app.get('/', (req, res) => {
  console.log('nueva ruta');
  res.render('index', { title: 'First Web Node' });
});

app.get('/estudianteMain', (req, res) => {
  console.log('nueva ruta');
  res.render('estudianteMain');
});

app.get('/estudiantePerfil', (req, res) => {
  console.log('nueva ruta');
  res.render('estudiantePerfil');
});

app.get('/lineasdeinvestigacion', (req, res) => {
  console.log('nueva ruta');
  res.render('lineasdeinvestigacion');
});

app.get('/informes', (req, res) => {
  console.log('nueva ruta');
  res.render('informes');
});

app.get('/repositorio', (req, res) => {
  console.log('nueva ruta');
  res.render('repositorio');
});

app.get('/herramientas', (req, res) => {
  console.log('nueva ruta');
  res.render('herramientas');
});

app.get('/estudianteContacto', (req, res) => {
  console.log('nueva ruta');
  res.render('estudianteContacto');
});

//DOCENTES

app.get('/docenteMain', (req, res) => {
  console.log('nueva ruta');
  res.render('docenteMain');
});

app.get('/docentePerfil', (req, res) => {
  console.log('nueva ruta');
  res.render('docentePerfil');
});

app.get('/borradorInformes', (req, res) => {
  console.log('nueva ruta');
  res.render('borradorInformes');
});

app.get('/docenteContacto', (req, res) => {
  console.log('nueva ruta');
  res.render('docenteContacto');
});

//COORDINADOR

app.get('/coordinadorMain', (req, res) => {
  console.log('nueva ruta');
  res.render('coordinadorMain');
});

app.get('/coordinadorInformes', (req, res) => {
  console.log('nueva ruta');
  res.render('coordinadorInformes');
});

app.get('/coordinadorDocentes', (req, res) => {
  console.log('nueva ruta');
  res.render('coordinadorDocentes');
});

app.get('/coordinadorEstudiantes', (req, res) => {
  console.log('nueva ruta');
  res.render('coordinadorEstudiantes');
});

routerApi(app);


app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);


app.use(express.static(path.join(__dirname,'frontend/public')));



app.listen(port, ()=>{
  console.log('mi port'+ port);
  
});
