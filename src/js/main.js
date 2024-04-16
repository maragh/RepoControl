import * as bootstrap from 'bootstrap'
import * as Popper from "@popperjs/core"

import { createApp, reactive } from "vue/dist/vue.esm-bundler.js"
import 'dotenv/config'
import _ from 'lodash'

import api from './api'

globalThis.__VUE_OPTIONS_API__ = process.env.NODE_ENV === "development"
globalThis.__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === "development"
globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = process.env.NODE_ENV === "development"

const App = {
    created(){
        console.log(`environment: ${process.env.NODE_ENV}`)
    },
    mounted(){
        this.load_repos()
    },
    data(){
        return {
            repositories: [],
            repository: []
        }
    },
    methods:{
        load_repos: function(){
            api.fetch_repositories().then(data => {
                this.repositories = data
                console.log(data)
            }).catch(error => {
                console.log(error)
            })
        },
        delete_repo: function(repo){
            api.delete_repository(repo).then(response => {
                console.log(response)
            }).catch(error => {
                console.error(error)
            })

        },
        delete_repository: function(){
            
            let modal = bootstrap.Modal.getInstance(document.getElementById("confirm_action_modal"))
            modal.hide()

            _.map(this.repository, this.delete_repo)

            this.repository = []
            this.repositories = []
            this.load_repos()

        }
    }
}


createApp(App).mount("#app")