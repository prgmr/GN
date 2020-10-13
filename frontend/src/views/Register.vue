<template>

    <div>
        <v-card class="px-4">
            <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="firstName" :rules="[rules.required]"
                                          label="First Name" maxlength="20" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="lastName" :rules="[rules.required]"
                                          label="Last Name" maxlength="20" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail"
                                          required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="password"
                                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                          :rules="[rules.required, rules.min]"
                                          :type="showPassword ? 'text' : 'password'" name="input-10-1"
                                          label="Password" hint="At least 8 characters" counter
                                          @click:append="showPassword = !showPassword">

                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field block v-model="verifyPassword"
                                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                          :rules="[rules.required, passwordMatch]"
                                          :type="showPassword ? 'text' : 'password'" name="input-10-1"
                                          label="Confirm Password" counter
                                          @click:append="showPassword = !showPassword">

                            </v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                            <v-btn x-large block :disabled="!valid" color="success"
                                   @click="register">Register
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
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
        name: "Register",

        data: () => ({
            valid: true,
            showPassword: false,
            response: false,
            responseText: '',
            firstName: '',
            lastName: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            verifyPassword: '',
            rules: {
                required: value => !!value || "Required.",
                min: v => (v && v.length >= 8) || "Min 8 characters"
            }

        }),
        methods: {
            register() {
                if (this.$refs.registerForm.validate()) {
                    this.response = false
                    this.$store.dispatch('registerUser', {
                        email: this.email,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName,
                    }).then((response) => {
                        this.response = true
                        this.responseText = response.data
                        this.$router.push({name: 'Login'})
                    }).catch(error => {
                        this.response = true
                        this.responseText = error.message
                    })
                }
            },
        },

        computed: {
            passwordMatch() {
                return () => this.password === this.verifyPassword || "Password must match";
            }
        },
    }
</script>

<style scoped>

</style>