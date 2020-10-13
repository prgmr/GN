<template>

    <v-app-bar app dark flat class="primary">

        <router-link :to="'/'" tag="span" style="cursor: pointer">
            <v-toolbar-title v-text="'GN LK'"></v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <div v-if="isLoggedIn">
            <v-btn icon :to="{name: 'Profile'}">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <v-btn icon @click="logout">
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </div>

    </v-app-bar>

</template>

<script>
    export default {
        name: "AppHeader",

        methods: {
            logout() {
                this.$store.dispatch('logoutUser')
                    .then(() => {
                        this.$router.push({name: 'Login'})
                    })
            }
        },

        computed: {
            isLoggedIn() {
                return this.$store.getters.isLogged
            }
        }
    }
</script>
