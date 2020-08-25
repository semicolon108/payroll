const state = {
    accessToken: localStorage.getItem('accessToken') || null
}

const getters = {
    getToken(state) {
        return state.accessToken
    },
    isAuth(state) {
        return state.accessToken !== null
    }
}

const mutations = {
    SET_TOKEN(state, accessToken) {
        state.accessToken = accessToken
        localStorage.setItem('accessToken', accessToken)
    }
}


export default { state, getters, mutations }