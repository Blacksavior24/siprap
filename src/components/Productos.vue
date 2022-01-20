<template>
  <v-container fluid>
      <v-layout justify-center>
          <v-flex>
              <v-toolbar flat>
                  <v-toolbar-title>Productos</v-toolbar-title>
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
                                  <v-flex xs6 sm6 md6>
                                      <v-text-field v-model="nombre_producto" label="Nombre"></v-text-field>
                                  </v-flex>
                                  <v-flex xs6 sm6 md6>
                                      <v-select v-model="id_categoria" :items="listaCategorias" label="Categoría"></v-select>
                                  </v-flex>
                                  <v-flex xs6 sm6 md6>
                                      <v-text-field v-model="codigo_producto" label="Código"></v-text-field>
                                  </v-flex>
                                  <v-flex xs6 sm6 md6>
                                      <v-text-field v-model="descripcion_producto" label="Descripción"></v-text-field>
                                  </v-flex>
                                  <v-flex xs6 sm6 md6>
                                      <v-text-field type="number" v-model="precioC_producto" label="Precio compra"></v-text-field>
                                  </v-flex>
                                  <v-flex xs6 sm6 md6>
                                      <v-text-field type="number" v-model="precioV_producto" label="Precio venta"></v-text-field>
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
              </v-toolbar>
              <v-data-table 
                :headers="listaProductos" 
                :items="productos" 
                :search="search" 
                class="elevation-1"
              >
                  <template v-slot:[`item.actions`]="{ item }">
                      <td>
                          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
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
            /*Listar productos*categorias*/
            productos:[],
            listaProductos: [
                { text: 'Nombre', value: 'name' },
                { text: 'Código', value: 'code', sortable: false},
                { text: 'Descripción', value: 'description', sortable: false  },
                { text: 'Precio compra', value: 'purchasePrice', sortable: false},
                { text: 'Precio venta', value: 'salePrice', sortable: false},
                { text: 'Opciones', value: 'actions', sortable: false }
            ],
            //Categorias
            id_categoria:'',
            listaCategorias:[],
            //Productos
            id_productos:'',
            nombre_producto:'',
            codigo_producto:'',
            descripcion_producto:'',
            precioC_producto:0,
            precioV_producto:0,

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
                return this.editedIndex === -1 ? 'Nuevo producto' : 'Actualizar producto'
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
            this.select();
        },

        methods:{
            fechaEstan(){
                return {
                    fechaIn: fechaInicio.toISOString()
                }
            },
            listar(){
                let me=this;
                axios.get('api/v1/products').then(function(response){
                    //console.log(response);
                    me.productos=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            select(){
                let me=this;
                var categoriasArray=[];
                axios.get('api/v1/categories').then(function(response){
                    categoriasArray=response.data;
                    categoriasArray.map(function(x){
                        me.listaCategorias.push({text: x.name, value: x.id});
                    });
                }).catch(function(error){
                    console.log(error);
                });
            },
            editItem (item) {
                //Varriales para editar
                this.id_productos = item.id;
                this.nombre_producto = item.name;
                this.codigo_producto = item.code;
                this.descripcion_producto = item.description;
                this.precioC_producto = item.purchasePrice;
                this.precioV_producto = item.salePrice;
                this.id_categoria = item.categoryId;

                this.editedIndex=1;
                this.dialog = true
            },
            deleteItemConfirm () {
                this.desserts.splice(this.editedIndex, 1);
                this.closeDelete();
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
                this.nombre_producto="";
                this.codigo_producto="";
                this.descripcion_producto="";
                this.precioC_producto=""; 
                this.precioV_producto="";
                this.id_categoria="";

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
                    axios.patch('api/v1/products/'+parseInt(this.id_productos),{
                        'name': me.nombre_producto,
                        //'code': me.codigo_producto,
                        'description': me.descripcion_producto,
                        'purchasePrice': me.precioC_producto,
                        'salePrice': me.precioV_producto,
                        'categoryId': me.id_categoria,
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
                    axios.post('api/v1/products',{
                        'name': me.nombre_producto,
                        'code': me.codigo_producto,
                        'description': me.descripcion_producto,
                        'purchasePrice': me.precioC_producto,
                        'salePrice': me.precioV_producto,
                        'categoryId': me.id_categoria,
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
                if (this.nombre_producto.length<3 || this.nombre_producto >50){
                    this.valida_Mensaje.push("El nombre debe tener mas de 3 caracteres y menos de 50 caracteres.");
                }
                if (!this.id_categoria){
                    this.valida_Mensaje.push("Seleccione una categoría.");
                }
                if (!this.codigo_producto){
                    this.valida_Mensaje.push("Ingrese código del producto.");
                }
                if (!this.descripcion_producto){
                    this.valida_Mensaje.push("Ingrese la descripción del producto.");
                }
                if (!this.precioC_producto || this.precioC_producto==0){
                    this.valida_Mensaje.push("Ingrese precio compra del producto.");
                }
                if (!this.precioV_producto || this.precioV_producto==0){
                    this.valida_Mensaje.push("Ingrese precio venta del producto.");
                }
                if (this.valida_Mensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },

        }
    }
</script>