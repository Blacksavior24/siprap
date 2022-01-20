<template>
  <v-container fluid>
      <v-layout justify-center>
          <v-flex>
              <v-toolbar flat>
                  <v-toolbar-title>Categoría</v-toolbar-title>
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Agregar</v-btn>
                      </template>
                      <v-card>
                          <v-card-title>
                              <span class="text-h5">{{ formTitle }}</span>
                          </v-card-title>
                          <v-container grid-list-md>
                              <v-layout wrap>
                                  <v-flex xs12 sm12 md12>
                                      <v-text-field v-model="nombre_Categoria" label="Nombre"></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                      <v-text-field v-model="nombre_Descripcion" label="Descripcion"></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                      <v-select v-model="estado_categoria" :items="estado" label="Estado" ></v-select>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12 v-show="valida">
                                      <div class="red--text" v-for="v in valida_Mensaje" :key="v" v-text="v"></div>
                                  </v-flex>
                              </v-layout>
                          </v-container>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                              <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-dialog>
                  <v-dialog v-model="adModal" max-width="350px">
                      <v-card>
                          <v-card-title class="headline" v-if="adAccion==1">¿Activar Item?</v-card-title>
                          <v-card-title class="headline" v-if="adAccion==2">¿Desactivar Item?</v-card-title>
                          <v-card-text>
                              Estas a punto de
                              <span v-if="adAccion==1">activar</span>
                              <span v-if="adAccion==2">desactivar</span>
                              el item {{adNombre}}
                          </v-card-text>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="activarDesactivarCerrar">Cancelar</v-btn>
                              <v-btn v-if="adAccion==1" color="blue darken-1" text @click="activar">Activar</v-btn>
                              <v-btn v-if="adAccion==2" color="blue darken-1" text @click="desactivar">Desactivar</v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-dialog>
              </v-toolbar>
              <v-data-table 
                :headers="listaCategoria" 
                :items="categoria" 
                :search="search" 
                class="elevation-1"
              >
                  <template v-slot:[`item.actions`]="{ item }">
                      <td>
                          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                          <template v-if="item.state">
                              <v-icon small class="mr-2" @click="activarDesactivar(2,item)">block</v-icon>
                          </template>
                          <template v-else>
                              <v-icon small class="mr-2" @click="activarDesactivar(1,item)">check</v-icon>
                          </template>
                      </td>
                  </template>
                  <template v-slot:[`item.state`]="{ item }">
                      <td>
                          <div v-if="item.state">
                              <span class="blue--text">Activo</span>
                          </div>
                          <div v-else>
                              <span class="red--text">Inactivo</span>
                          </div>
                      </td>
                  </template>
                  <template v-slot:no-data>
                      <v-btn color="primary" @click="listar">Reset</v-btn>
                  </template>
              </v-data-table>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
        data:()=>({
            search: '',
            dialog: false,
            dialogDelete: false,
            /*Listar Categoria */
            listaCategoria: [
                { text: 'Nombre', value: 'name' },
                { text: 'Descripción', value: 'description', sortable: false  },
                { text: 'Estado', value: 'state'},
                { text: 'Opciones', value: 'actions', sortable: false }
            ],
            categoria:[],
            id_categoria:'',
            nombre_Categoria:'',
            nombre_Descripcion:'',
            estado_categoria: null,
            estado: [
                { text: "Activo", value: true},
                { text: "Inactivo", value: false},
            ],
            /*Validar Datos */
            valida: 0,
            valida_Mensaje:[],
            /*otros*/
            desserts: [],
            editedIndex: -1,
            //Activar desactivar
            adModal: 0,
            adAccion: 0,
            adNombre: '',
            adId: '',

            
        }),
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva categoría' : 'Actualizar categoria'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },
        created () {
            //this.initialize();
            this.listar();
        },

        methods:{
            fechaEstan(){
                return {
                    fechaIn: fechaInicio.toISOString()
                }
            },
            listar(){
                let me=this;
                axios.get('api/v1/categories').then(function(response){
                    //console.log(response);
                    me.categoria=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },

            editItem (item) {
                //Varriales para editar
                this.id_categoria=item.id;
                this.nombre_Categoria=item.name;
                this.nombre_Descripcion=item.description;
                this.estado_categoria=item.state;

                this.editedIndex=1;
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.desserts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false;
                this.limpiar();
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },
            limpiar(){
                this.id_categoria="";
                this.nombre_Categoria="";
                this.nombre_Descripcion="";
                this.estado_categoria=null;

                //Val limpiar
                this.valida="";
                //val editar
                this.editedIndex=-1;
            },
            guardar () {
                if (this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Codigo para editar
                    let me=this;
                    axios.patch('api/v1/categories/'+parseInt(this.id_categoria),{
                        'name': me.nombre_Categoria,
                        'description': me.nombre_Descripcion,
                        'state': me.estado_categoria
                    }).then(function(response){
                        me.listar();
                        me.close();
                        me.limpiar();
                    }).catch(function(error){
                        console.log(error)
                    });
                } else {
                    //Codigo para guardar
                    let me=this;
                    axios.post('api/v1/categories',{
                        'name': me.nombre_Categoria,
                        'description': me.nombre_Descripcion,
                        'state': me.estado_categoria
                    }).then(function(response){
                        me.listar();
                        me.close();
                        me.limpiar();
                    }).catch(function(error){
                        console.log(error)
                    });
                }
            },
            validar(){
                this.valida=0;
                this.valida_Mensaje=[];

                //Validaciones requeridas

                if (this.nombre_Categoria.length<3 || this.nombre_Categoria >50){
                    this.valida_Mensaje.push("El nombre debe tener mas de 3 caracteres y menos de 50 caracteres");
                }
                if (this.nombre_Descripcion.length<5 || this.nombre_Descripcion >50){
                    this.valida_Mensaje.push("El descripción debe tener mas de 5 caracteres y menos de 50 caracteres");
                }
                if (this.valida_Mensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
            //Activar desactivar

            activarDesactivar(state, item){
                this.adModal=1;
                this.adNombre=item.name;
                this.id_categoria=item.id;
                this.estado_categoria=item.state;

                if(state==1){
                    this.adAccion=1;
                }
                else if(state==2){
                    this.adAccion=2;
                }else {
                    this.adModal=0;
                }
            },
            activarDesactivarCerrar(){
                this.adModal=0;
            },
            activar(){
                let me=this;
                axios.patch('api/v1/categories/'+parseInt(this.id_categoria),{'state': true}).then(function(response){
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.id_categoria="";
                    me.listar();
                    me.limpiar();
                }).catch(function(error){
                    console.log(error)
                });
            },
            desactivar(){
                let me=this;
                axios.patch('api/v1/categories/'+ parseInt(this.id_categoria),{'state': false}).then(function(response){
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.id_categoria="";
                    me.listar();
                    me.limpiar();
                }).catch(function(error){
                    console.log(error)
                });
            }

        }
    }
</script>