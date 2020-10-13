import {API} from '../../plugins/api'


export default {
    state: {
        email: localStorage.getItem('email') || null,
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        profile: {
            email: '',
            firstName: '',
            lastName: '',
            description: '',
        }
    },

    getters: {
        isLogged(state) {
            return state.accessToken !== null
        },
        token(state) {
            return state.accessToken
        },
        profile(state) {
            return state.profile
        }

    },

    mutations: {
        setEmail(state, payload) {
            localStorage.setItem('email', payload)
            state.email = payload
        },

        setTokens(state, payload) {
            localStorage.setItem('accessToken', payload.accessToken)
            localStorage.setItem('refreshToken', payload.refreshToken)
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
        },

        removeTokens(state) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            state.accessToken = null
            state.refreshToken = null
        },

        updateAccessToken(state, payload) {
            state.accessToken = payload
        },

        setProfile(state, payload) {
            state.profile = payload
        }

    },

    actions: {
        registerUser(context, payload) {
            return new Promise((resolve, reject) => {
                API.post('/api/user/register/', {
                    email: payload.email,
                    password: payload.password,
                    first_name: payload.firstName,
                    last_name: payload.lastName,
                })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        loginUser(context, payload) {
            return new Promise((resolve, reject) => {
                API.post('/api/user/login/', {
                    email: payload.email,
                    password: payload.password,
                }).then(response => {
                    context.commit('setEmail', payload.email)
                    context.commit('setTokens', {
                        accessToken: response.data.access,
                        refreshToken: response.data.refresh
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        logoutUser(context) {
            context.commit('removeTokens')
            localStorage.removeItem('email')
            // context.commit('setEmail', null)
        },

        refreshAccessToken(context) {
            return new Promise((resolve, reject) => {
                API.post('/api/user/login/refresh/', {
                    email: context.state.email,
                    refresh: context.state.refreshToken
                }).then(response => {
                    context.commit('setTokens', {
                        accessToken: response.data.access,
                        refreshToken: response.data.refresh
                    })
                    resolve()
                })
                    .catch(error => {
                        context.dispatch('logoutUser')
                        reject(error)
                    })
            })
        },

        getProfile(context, payload) {
            return new Promise((resolve, reject) => {
                API.get('/api/user/profile/', {})
                    .then(response => {
                        context.commit('setProfile', {
                            email: response.data.email,
                            firstName: response.data.first_name,
                            lastName: response.data.last_name,
                            description: response.data.description
                        })
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        setProfile(context, payload) {
            return new Promise((resolve, reject) => {
                API.put('/api/user/profile/', {
                    email: payload.email,
                    first_name: payload.firstName,
                    last_name: payload.lastName,
                    description: payload.description,
                    password: payload.password,
                })
                    .then((response) => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },


    }
}

