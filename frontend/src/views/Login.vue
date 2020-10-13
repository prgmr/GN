<template>
    <div>
        <v-card class="px-4">
            <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="email" :rules="emailRules"
                                          label="E-mail" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="password"
                                          :append-icon="showPassword?'eye':'eye-off'"
                                          :rules="[rules.required, rules.min]"
                                          :type="showPassword ? 'text' : 'password'" name="input-10-1"
                                          label="Password" hint="At least 8 characters" counter
                                          @click:append="showPassword = !showPassword"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                            <v-btn x-large block :disabled="!valid" color="success"
                                   @click="login"> Login
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="{name: 'Register'}"
                        color="orange"
                        text
                >
                    Register?
                </v-btn>
            </v-card-actions>

        </v-card>

        <v-snackbar
                v-model="response"
                :multi-line="true"
        >
            {{ responseText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                        color="red"
                        text
                        v-bind="attrs"
                        @click="response = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>

</template>

<script>
    export default {
        name: "Login",

        methods: {
            login() {
                if (this.$refs.loginForm.validate()) {
                    this.response = false
                    this.$store.dispatch('loginUser', {
                        email: this.email,
                        password: this.password,
                    }).then((response) => {
                        this.$router.push({ name: 'Home' })
                    }).catch(error => {
                        this.response = true
                        this.responseText = error.message
                    })
                }
            },
        },
        data: () => ({
            valid: true,
            showPassword: false,
            response: false,
            responseText: '',
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            rules: {
                required: value => !!value || "Required.",
                min: v => (v && v.length >= 8) || "Min 8 characters"
            }
        })
    }
</script>
