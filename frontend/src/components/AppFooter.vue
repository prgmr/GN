<template>
    <v-footer padless>
        <v-col
                class="text-center"
                cols="12"
        >
            &copy; {{ new Date().getFullYear() }}
        </v-col>
    </v-footer>
</template>

<script>
    export default {
        name: "AppFooter"
    }
</script>

<style scoped>

</style>