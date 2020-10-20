const state = {
    isLoading: false,
    loadingMessage: 'loading',
    isCompleted: false,
    isError: false
}

const getters = {
    isLoading: state => state.isLoading,
    isCompleted: state => state.isCompleted,
    isError: state => state.isError
}

const mutations = {
    SET_IS_LOADING(state, payload) {
        state.isLoading = payload
    },
    SET_LOADING_MESSAGE(state, payload) {
        state.message = payload
    },
    SET_IS_COMPLETED(state, payload) {
        state.isCompleted = payload
    },
    SET_IS_ERROR(state, payload) {
        state.isError = payload
    }
}

const actions = {
    async loading({commit}, message) {
        commit('SET_IS_COMPLETED', false)
        commit('SET_IS_ERROR', false)
        commit('SET_IS_LOADING', true)
        commit('SET_LOADING_MESSAGE', message)
    },
    async completed({commit}, message) {
        return new Promise(async resolve => {
            await timeout(500)
            commit('SET_IS_LOADING', false)
            commit('SET_IS_ERROR', false)
            await timeout(400)
            commit('SET_IS_COMPLETED', true)
            commit('SET_LOADING_MESSAGE', message)
            resolve('done')
            await timeout(1400)
            commit('SET_IS_COMPLETED', false)
        })
    },
    async error({commit}, message) {
        return new Promise(async resolve => {
            await timeout(500)
            commit('SET_IS_LOADING', false)
            commit('SET_IS_COMPLETED', false)
            await timeout(400)
            commit('SET_IS_ERROR', true)
            commit('SET_LOADING_MESSAGE', message)
            resolve('done')
            await timeout(1400)
            commit('SET_IS_ERROR', false)
        })
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
    state,
    getters,
    mutations,
    actions
}