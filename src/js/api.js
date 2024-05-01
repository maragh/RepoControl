import axios from "axios"

const service = axios.create({
    baseURL: 'https://api.github.com',
    headers:{
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Accept": "application/vnd.github+json"
    }
})

export default {
    config: function () {
        console.log('api loaded.')
    },
    fetch_repository: async function(repo){
        const response = await service.get(`/repos/${repo}`);
        return await response.data
    },
    fetch_repositories: async function(page = 1){
        const response = await service.get(`/user/repos?visibility=public&sort=created&page=${page}`);
        return await response.data
    },
    delete_repository: async function(repo){
        const response = await service.delete(`/repos/${repo}`);
        console.log(repo)
        return await response.data
    }
}