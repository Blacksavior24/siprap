### Características
- Se necesita tener docker para el funcionamiento.
- Es creado con nodejs, express, vuejs y postgres.
- Algunas formas de correr los datos del docker para la conexión se obtendrá en está lectura.

# Error de contenido por arreglar

- Docentes con grados se quitarán hasta una nueva versión

# Corriendo  .env

Crean el archivo .env tal como se coloca en .env.example

# Corriendo docker

docker-compose up -d postgres
- así corre la base de datos.

docker-compose up -d pgadmin
- así logramos correr el entorno gráfico para ver la base de datos postgres
- localhost:5050

docker-compose ps
- así veremos los contenedores funcionando.
# Corriendo base de datos en el contenedor docker

- Una vez entrando al localhost:5050 veremos un entorno gráfico pgdamin
- Luego de eso se pone "agregar servidor"
- Pone cualquier nombre
- En el lado de conexión :
  - Dirección del servidor: postgres
  - Base de datos mantenimiento: siprap
  - Usuario: arte
  - Pass: admin123

# Iniciando la aplicación
...
