import * as bootstrap from 'bootstrap'
import * as Popper from "@popperjs/core"

import { createApp, reactive } from "vue/dist/vue.esm-bundler.js"
import 'dotenv/config'
import _ from 'lodash'

import api from './api'

globalThis.__VUE_OPTIONS_API__ = process.env.NODE_ENV === "development"
globalThis.__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === "development"
globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = process.env.NODE_ENV === "development"

const defaultPageSize = 30
const pageSize = process.env.RESULTS_PER_PAGE || defaultPageSize

const App = {
    created(){
        console.log(`environment: ${process.env.NODE_ENV}`)
    },
    mounted(){
        this.load_repos()
    },
    data(){
        return {
            pageNumber: 1,
            repositoryCount: 0,
            maxSize: pageSize,
            repositories: [],
            repository: []
        }
    },
    methods:{
        nextPage: function (event) {
            const nextButton = event.target
            const previousButton = nextButton.previousSibling

            unHideButton(previousButton)

            if (this.repositoryCount < this.maxSize) {
                hideButton(nextButton)
                return
            }
            
            this.pageNumber += 1
            this.load_repos(this.pageNumber)
        },
        previousPage: function(event) {
            const previousButton = event.target
            const nextButton = previousButton.nextSibling
            unHideButton(nextButton)

            if (this.pageNumber <= 1) {
                hideButton(previousButton)
                return
            }

            this.pageNumber -= 1
            this.load_repos(this.pageNumber)
        },
        load_repos: async function(page){
            api.fetch_repositories(page).then(data => {
                this.repositories = data
                this.repositoryCount = data.length
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

const hideButton = (button) => {
    button.classList.add('invisible')
}

const unHideButton = (button) => {
    button.classList.remove('invisible')
}

createApp(App).mount("#app")