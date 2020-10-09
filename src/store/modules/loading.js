const state = {
    isLoading: false
}

const getters = {
    isLoading: (state) => state.isLoading
}

const mutations = {
    SET_IS_LOADING(state, payload) {
        state.isLoading = payload
    }
}

export default {
    state, getters, mutations
}