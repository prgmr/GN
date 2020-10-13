<template>

    <div>
        <h1>Balance</h1>

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
    import {getBalance} from '../plugins/utils'

    export default {
        name: "Balance",
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
                {text: 'Balance', value: 'sum', sortable: false},
            ],
            items: [],
        }),

        methods: {
            retrieveBalance(page) {
                getBalance(page)
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
                    this.retrieveBalance(this.options.page)
                }
            },
        }
    }
</script>
