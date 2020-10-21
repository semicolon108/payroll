const state = {
    isOpen: false,
    isConfirmed: false,
    isCanceled: false
}

const getters = {
    isOpenConfirm: state => state.isOpen
}

const mutations = {
    SET_IS_OPEN(state, payload) {
        state.isOpen = payload
    },
    SET_IS_CONFIRMED(state, payload) {
        state.isConfirmed = payload
    }

}

const actions = {
    async confirm({ commit }) {
       return new Promise(async () => {
           commit('SET_IS_OPEN', true)


       })
    },
    confirmSubmit({ commit }) {
        commit('SET_IS_CONFIRMED', true)
    },
    cancelSubmit() {

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}