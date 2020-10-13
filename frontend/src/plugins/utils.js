import {API} from './api'

const getBalance = async (page) => {
    return new Promise((resolve, reject) => {
        API.get(`/api/user/balance/?page=${page}`, {})
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getCalls = async (page) => {
    return new Promise((resolve, reject) => {
        API.get(`api/user/call/?page=${page}`, {})
            .then(response => {
                resolve(response)
            }).catch(error => {
            reject(error)
        })
    })

}

export {getBalance, getCalls}