<template>

    <v-app>

        <app-header></app-header>

        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>

        <app-footer></app-footer>

    </v-app>

</template>

<script>
    import AppHeader from "./components/AppHeader";
    import AppFooter from "./components/AppFooter";

    export default {
        name: 'App',

        components: {
            AppHeader,
            AppFooter
        },

    };
</script>
