### Características
- Se necesita tener docker para el funcionamiento.
- Es creado con nodejs, express, vuejs y postgres.
- Algunas formas de correr los datos del docker para la conexión se obtendrá en está lectura.

**Table of Contents**

[TOCM]

[TOC]

# Instalando paquetes

npm install
e instalará los siguientes paquetes:
- "@hapi/boom": "^9.1.4",
- "axios": "^0.24.0",
- "core-js": "^3.6.5",
-  "cors": "^2.8.5",
-    "dotenv": "^10.0.0",
-    "express": "^4.17.1",
-    "faker": "^5.5.3",
-    "joi": "^17.5.0",
-    "jwt-decode": "^3.1.2",
-    "pg": "^8.7.1",
-   "pg-hstore": "^2.3.4",
-  "sequelize": "^6.12.0-beta.3",
-    "vue": "^2.6.11",
-    "vue-router": "^3.2.0",
-    "vuetify": "^2.4.0",
-    "vuex": "^3.4.0"
-   "@vue/cli-plugin-babel": "~4.5.0",
-   "@vue/cli-plugin-router": "~4.5.0",
-   "@vue/cli-plugin-vuex": "~4.5.0",
-   "@vue/cli-service": "~4.5.0",
-   "eslint": "^8.4.0",
-   "eslint-config-prettier": "^8.3.0",
-   "eslint-plugin-prettier": "^4.0.0",
-   "nodemon": "^2.0.15",
-   "prettier": "^2.5.1",
-   "sass": "~1.32.0",
-   "sass-loader": "^10.0.0",
-   "vue-cli-plugin-vuetify": "~2.4.2",
-   "vue-template-compiler": "^2.6.11",
-   "vuetify-loader": "^1.7.0"

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
