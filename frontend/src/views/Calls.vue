<template>

    <div>
        <h1>Calls</h1>

        <v-data-table
                :headers="headers"
                :items="items"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                class="elevation-1"
                @page-count="pageCount = $event"

                :options.sync="options"
                :server-items-length="totalItems"

        ></v-data-table>

        <div class="text-center pt-2">

            <v-pagination
                    v-model="page"
                    :length="pageCount"
            ></v-pagination>

        </div>

    </div>

</template>

<script>
    import {getCalls} from '../plugins/utils'

    export default {
        name: "Calls",
        data: () => ({
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            totalItems: 0,
            options: {},

            headers: [
                {
                    text: 'Date',
                    align: 'start',
                    sortable: true,
                    value: 'created_at',
                },
                {text: 'Destination', value: 'destination'},
                {text: 'Duration', value: 'duration'},
                {text: 'Cost', value: 'cost'},
            ],

            items: [],

        }),

        methods: {
            retrieveCalls(page) {
                getCalls(page)
                    .then(response => {
                        this.totalItems = response.data.total
                        this.items = response.data.results
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },

        watch: {
            options: {
                handler() {
                    this.retrieveCalls(this.options.page)
                }
            },
        }

    }
</script>
