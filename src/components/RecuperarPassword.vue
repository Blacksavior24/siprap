<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
        <v-card>
            <v-card-title class="d-flex justify-center">
            <span class="text-h5">Recuperar contraseña</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            prepend-icon="email"
                            v-model="correo"
                            label="Ingrese su correo"
                            type="text"
                            :rules="[rules.required]"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
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
        dialog: true,
        correo: '',
        rules: {
          required: value => !!value || 'Campo requerido',
          min: v => v.length >= 6 || 'Minimo 6 caracteres',
        },
       
    }),
    methods:{
        confirmar(){

        }
    }
}
</script>
