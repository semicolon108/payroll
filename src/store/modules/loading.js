const state = {
    isLoading: false,
    loadingMessage: 'Completed',
    loadingType: 'Completed',
    isCompleted: false
}

const getters = {
    isLoading: state => state.isLoading,
    isCompleted: state => state.isCompleted,
    loadingType: state => state.type
}

const mutations = {
    SET_IS_LOADING(state, payload) {
        state.isLoading = payload
    },
    SET_LOADING_TYPE(state, payload) {
        state.loadingType = payload
    },
    SET_LOADING_MESSAGE(state, payload) {
        state.message = payload
    },
    SET_IS_COMPLETED(state, payload) {
        state.isCompleted = payload
    }
}

const actions = {
    startLoading({ commit }, {type, message}) {
        commit('SET_IS_LOADING', true)
        commit('SET_LOADING_TYPE', type)
        commit('SET_LOADING_MESSAGE', message)
    },
    stopLoading({ commit }) {
        commit('SET_IS_COMPLETED', true)
       setTimeout(() => {
           commit('SET_IS_LOADING', false)
           commit('SET_IS_COMPLETED', false)

       }, 1200)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}