<template>
  <v-app id="inspire">
      
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
      fixed
      height="50px"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!--<h1>Icono de usuarios y salir Ingeniería de sistemas</h1>-->
      <div class="text-center">
        <v-btn icon>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template>
          <v-list-item-group color="primary">
            <v-list-item :to="{ path: '/'}">
              <v-list-item-icon>
                <v-icon>home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </template>
        <template>
          <v-list-group :value="false" prepend-icon="accessibility">
            <template v-slot:activator>
              <v-list-item-content>
                  <v-list-item-title>Accesos</v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list-item :to="{ path: 'listarUsuario'}">
              <v-list-item-title>Usuarios</v-list-item-title>
              <v-list-item-icon>
                <v-icon>people</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item :to="{ path: 'Ejemplo_0'}">
              <v-list-item-title>Roles</v-list-item-title>
              <v-list-item-icon>
                <v-icon>manage_accounts</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group :value="false" prepend-icon="domain">
            <template v-slot:activator>
              <v-list-item-content>
                  <v-list-item-title>Almacen</v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list-item :to="{ path: 'Categoria'}">
              <v-list-item-title>Categorías</v-list-item-title>
              <v-list-item-icon>
                <v-icon>category</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item :to="{ path: 'Productos'}">
              <v-list-item-title>Productos</v-list-item-title>
              <v-list-item-icon>
                <v-icon>fence</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group :value="false" prepend-icon="add_shopping_cart">
            <template v-slot:activator>
              <v-list-item-content>
                  <v-list-item-title>Compras</v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list-item :to="{ path: 'Ejemplo_03'}">
              <v-list-item-title>Sub-modulo-3</v-list-item-title>
              <v-list-item-icon>
                <v-icon>wb_iridescent</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item :to="{ path: 'Ejemplo_04'}">
              <v-list-item-title>Sub-modulo-3</v-list-item-title>
              <v-list-item-icon>
                <v-icon>wb_iridescent</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group :value="false" prepend-icon="price_change">
            <template v-slot:activator>
              <v-list-item-content>
                  <v-list-item-title>Ventas</v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list-item :to="{ path: 'Ejemplo_05'}">
              <v-list-item-title>Sub-modulo-4</v-list-item-title>
              <v-list-item-icon>
                <v-icon>wb_iridescent</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item :to="{ path: 'Ejemplo_06'}">
              <v-list-item-title>Sub-modulo-4</v-list-item-title>
              <v-list-item-icon>
                <v-icon>wb_iridescent</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <!--Footer-->
    <v-footer
      color="primary"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="primary lighten py-4 text-center white--text"
          cols="top"
        >
          {{ new Date().getFullYear() }} — <strong>Footer</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
      selectedItem: 0,
      items: [
        { text: 'Agencia', icon: 'real_estate_agent' },
        { text: 'Nuevo rol', icon: 'group' },
        { text: 'Usuarios', icon: 'group_add' },
        { text: 'Equipos', icon: 'people_outline' },
      ],
      datosPersona: [{foto: 'https://cdn.vuetifyjs.com/images/john.png', nombre: 'Juan pablo', correo: 'saul23@gmail.com', cargo: 'Gerente'}],
      admins: [
        ['Management', 'help_outline'],
        ['Settings', 'help_outline'],
      ],
      cruds: [
        ['Create', 'help_outline'],
        ['Read', 'help_outline'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],
      drawer: true,
      group: null,
      //dialog: false,
      
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
};
</script>