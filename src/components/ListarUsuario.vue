<template>
    <v-container fluid>
    <v-layout justify-center>
        <v-flex>
            <v-toolbar color="white">
                <v-toolbar-title>Usuario</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="500px">
                        <!--<v-btn slot="activator" color="primary" dark class="mb-2">Agregar nuevo</v-btn>-->
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            v-bind="attrs"
                            v-on="on"
                            class="primary"
                            >
                            Nuevo
                            </v-btn>

                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>

                            <!--v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="id" label="ID"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>-->

                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="fullname" label="Nombres y Apellidos"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="user" label="Nombre Usuario"></v-text-field>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="email" label="Correo"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="typeIDcard" :items="tDocumento" label="Tipo Documento">
                                        </v-select>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="IDcard" label="Número Documento"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="phone" label="Teléfono"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="role" :items="rol" label="Rol">
                                        </v-select>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="status" :items="estado" label="Estado">
                                        </v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click.native="close">Cancelar</v-btn>
                            <v-btn color="primary" @click.native="save">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                class="elevation-1"
            >
                <template v-slot:[`item.opciones`]="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
    </v-container>
</template>
<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                //id: '',

                user: '',
                fullname: '',
                typeIDcard: '',
                IDcard: '',
                email: '',
                role:'',
                phone:'',
                password: '',
                status: '',

                dialog: false,
                headers: [
                    { text: 'Usuario', align: 'left', value: 'user',sortable: false },
                    { text: 'Nombre Apellido', value: 'fullname' },
                    { text: 'Tipo Documento', value: 'typeIDcard',sortable: false },
                    { text: 'Num. Documento', value: 'IDcard',sortable: false },
                    { text: 'Correo', value: 'email',sortable: false },
                    { text: 'Rol', value: 'role' },
                    { text: 'Teléfono', value: 'phone',sortable: false },
                    { text: 'Password', value: 'password',sortable: false },
                    { text: 'Estado', value: 'status',sortable: false },
                    { text: 'Opciones', value: 'opciones', sortable: false }
                ],
                search: '',
                desserts: [],
                editedIndex: -1,
                tDocumento: ['DNI', 'RUC', 'PASAPORTE'],
                rol: ['administrador', 'vendedor', 'almacenero', 'cajero'],
                estado: ['activo', 'inactivo'],
                editedItem: {
                    user: '',
                    fullname: '',
                    typeIDcard: '',
                    IDcard: '',
                    email: '',
                    role:'',
                    phone:'',
                    password: '',
                    status: '',
                    },
                defaultItem: {
                    user: '',
                    fullname: '',
                    typeIDcard: '',
                    IDcard: '',
                    email: '',
                    role:'',
                    phone:'',
                    password: '',
                    status: '',
                    }
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Agregar nuevo' : 'Editar usuario'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.initialize()
        },
        methods:{
            estadoActualizar(){

            },
            initialize () {
                let me=this;
                axios.get('api/v1/users').then(function(response){
                    //console.log(response);
                    me.desserts=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },

            editItem (item) {
            this.dialog = true
            this.id = item.id;
            this.user = item.user;
            this.fullname = item.fullname;
            this.typeIDcard = item.typeIDcard;
            this.IDcard = item.IDcard;
            this.email = item.email;
            this.role = item.role;
            this.phone = item.phone;
            this.password = item.password;
            this.status = item.status;
            this.editedIndex = 1;
            },

            deleteItem (item) {
                let me = this;
                axios.delete('api/v1/users/'+item.id).then(function(response){
                    me.initialize();
                    alert("Eliminado correctamente")
                }).catch(function(error){
                    console.log(error)
                })
            },

            close () {
            this.dialog = false
            this.limpiar();
            },

            limpiar(){
                //this.id = "";
                this.user = "";
                this.fullname = "";
                this.typeIDcard = "";
                this.IDcard = "";
                this.email = "";
                this.role = "";
                this.phone = "";
                this.password = "";
                this.status = "";
                this.editedIndex = -1;
            },

            save () {
                if (this.editedIndex > -1) {
                    //Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    let me = this;
                    axios.patch('api/v1/users/'+parseInt(this.id),{
                        //'id': parseInt(this.id),
                        'user': this.user,
                        'fullname': this.fullname,
                        'typeIDcard': this.typeIDcard,
                        'IDcard': this.IDcard,
                        'email': this.email,
                        'role': this.role,
                        'phone': this.phone,
                        'password': this.password,
                        'status': this.status
                        //'createdAt': "2021-12-23T00:00:00.000Z"
                    }).then(function(response){
                        me.close();
                        me.initialize();
                        me.limpiar();
                    }).catch(function(error){
                        console.log(error)
                    })
                } else {
                    //this.desserts.push(this.editedItem)
                    let me = this;
                    axios.post('api/v1/users/',{
                        //'id': parseInt(this.id),
                        'user': this.user,
                        'fullname': this.fullname,
                        'typeIDcard': this.typeIDcard,
                        'IDcard': this.IDcard,
                        'email': this.email,
                        'role': this.role,
                        'phone': this.phone,
                        'password': this.password,
                        'status': this.status,
                        //'createdAt': "2021-12-23T00:00:00.000Z"
                    }).then(function(response){
                        me.close();
                        me.initialize();
                        me.limpiar();
                    }).catch(function(error){
                        console.log(error)
                    })
                }
                this.close();
            }
        }
    }
</script>
