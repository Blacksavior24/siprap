<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
        <v-card>
            <v-card-title class="d-flex justify-center">
            <span class="text-h5">Cambiar contraseña</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            :append-icon="mostrar1 ? 'visibility' : 'visibility_off'"
                            :type="mostrar1 ? 'text' : 'password'"
                            @click:append="mostrar1 = !mostrar1"
                            prepend-icon="lock"
                            v-model="passwordActual"
                            label="Ingrese su contraseña actual"
                            required
                            :rules="[rules.required]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            :append-icon="mostrar2 ? 'visibility' : 'visibility_off'"
                            :type="mostrar2 ? 'text' : 'password'"
                            @click:append="mostrar2 = !mostrar2"
                            prepend-icon="lock"
                            v-model="passwordNuevo"
                            label="Ingrese su contraseña nueva"
                            required
                            :rules="[rules.required]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            :append-icon="mostrar3 ? 'visibility' : 'visibility_off'"
                            :type="mostrar3 ? 'text' : 'password'"
                            @click:append="mostrar3 = !mostrar3"
                            prepend-icon="lock"
                            v-model="passwordNuevoConfirmado"
                            label="Confirmar contraseña"
                            required
                            :rules="[rules.required]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <div class="ml-7">
                    <h3 v-if="ContraseñaIgual == 'Contraseñas desiguales'" class="red--text">{{ContraseñaIgual}}</h3>
                    <h3 v-else-if="ContraseñaIgual == 'Contraseñas iguales'" class="green--text">{{ContraseñaIgual}}</h3>
                </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn
                    color="blue darken-1"
                    dark
                    @click="Confirmar"
                >
                    Confirmar
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    dark
                    :to="{name: 'login'}"
                >
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data:()=>({
        mostrar1: false,
        mostrar2: false,
        mostrar3: false,
        dialog: true,
        correo: '',
        passwordActual: '',
        passwordNuevo: '',
        passwordNuevoConfirmado: '',
        contraseñasIguales: 'Contraseñas iguales',
        contraseñasDesiguales: 'Contraseñas desiguales',
        rules: {
          required: value => !!value || 'Campo requerido',
          min: v => v.length >= 6 || 'Minimo 6 caracteres',
        },
    }),
    methods:{
        confirmar(){

        }
    },
    computed:{
        ContraseñaIgual(){
            if(this.passwordNuevo == '' || this.passwordNuevoConfirmado == ''){
                return '';
            }else if(this.passwordNuevo == this.passwordNuevoConfirmado){
                return this.contraseñasIguales;
            }else{
                return this.contraseñasDesiguales;
            }
        }
    },
}
</script>
