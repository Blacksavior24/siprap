<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
        <v-card>
            <v-card-title class="d-flex justify-center">
            <span class="text-h4">Iniciar Sesión</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            prepend-icon="account_circle"
                            v-model="nombreUsuario"
                            label="Nombre usuario"
                            type="text"
                            :rules="[rules.required]"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                            :append-icon="mostrar1 ? 'visibility' : 'visibility_off'"
                            :type="mostrar1 ? 'text' : 'password'"
                            @click:append="mostrar1 = !mostrar1"
                            :rules="[rules.required]"
                            prepend-icon="lock"
                            v-model="password"
                            label="Contraseña"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container class="d-flex justify-center">
                    <v-btn
                        text
                        :to="{name: 'recuperarPassword'}"
                    >
                        ¿Olvido su contraseña?
                    </v-btn>
                </v-container>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn
                    color="blue darken-1"
                    dark
                    @click="Ingresar"
                >
                    Ingresar
                </v-btn>
                <!--<v-btn
                    text
                    :to="{name: 'registroUsuario'}"
                >
                    Registrarse
                </v-btn>-->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data:()=>({
        dialog: true,
        nombreusuario: '',
        password: '',
        rules: {
           required: value => !!value || 'Campo requerido',
           min: v => v.length >= 6 || 'Minimo 6 caracteres',
        },
        mostrar1: false,
    }),
    methods:{
        ingresar(){

        }
    },
    computed:{
        
    }
}
</script>
