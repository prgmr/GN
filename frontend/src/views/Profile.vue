<template>
    <div>
        <v-form
                ref="profileForm"
                v-model="valid"
        >
            <h1>Profile</h1>

            <v-text-field
                    v-model="profile.email"
                    :rules="emailRules"
                    label="E-mail"
            >
            </v-text-field>

            <v-text-field
                    v-model="password"
                    type="password"
                    :rules="passwordRules"
                    label="Password"
            >
            </v-text-field>

            <v-text-field
                    v-model="profile.firstName"
                    label="First Name"
            ></v-text-field>

            <v-text-field
                    v-model="profile.lastName"
                    label="Last Name"
            ></v-text-field>

            <v-textarea
                    v-model="profile.description"
                    label="Description"
            ></v-textarea>


            <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="mr-4"
                    @click="save"
            >
                Save
            </v-btn>

        </v-form>

        <v-snackbar
                v-model="response.show"
                :multi-line="true"
        >
            {{ response.text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                        color="red"
                        text
                        v-bind="attrs"
                        @click="response.show = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>

</template>

<script>
    export default {
        name: "Profile",

        data: () => ({
            valid: true,
            password: '',
            response: {
                show: false,
                text: '',
            },

            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],

            passwordRules: [
                value => !!value || "Required.",
                v => (v && v.length >= 8) || "Min 8 characters",
            ],
        }),

        methods: {
            save() {
                let prof = this.profile
                prof['password'] = this.password
                this.$store.dispatch('setProfile', prof)
                    .then(response => {
                        this.response.show = true
                        this.response.text = response.data
                    }).catch(error => {
                    this.response.show = true
                    this.response.text = error.message
                })
            }
        },

        computed: {
            profile() {
                return this.$store.getters.profile
            }
        },

        created() {
            this.$store.dispatch('getProfile')
        }
    }
</script>
