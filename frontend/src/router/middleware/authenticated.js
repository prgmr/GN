export default function guest({next, store}) {
    if (store.getters.isLogged) {
        return next({
            name: 'Home'
        })
    }

    return next()
}