import {getCompany, updateCompany} from "@/apis/company-api";


const state = {
    accessToken: localStorage.getItem('accessToken') || null,
    company: localStorage.getItem('company') || {}
}


const getters = {
    getToken(state) {
        return state.accessToken
    },
    isAuth(state) {
        return state.accessToken !== null
    },
    getCompany(state) {
        return JSON.parse(state.company) || {}
    }
}

const mutations = {
    SET_TOKEN(state, accessToken) {
        state.accessToken = accessToken
        localStorage.setItem('accessToken', accessToken)
    },
    SET_COMPANY(state, company) {
        state.company = JSON.stringify(company)
        localStorage.setItem('company', JSON.stringify(company))
    },
    DESTROY_TOKEN(state) {
        state.accessToken = null
        localStorage.removeItem('accessToken')

        state.company = null
        localStorage.removeItem('company')
    }
}


const actions  =  {
    async getMyCompany({ commit }) {
        const company = await getCompany()
        commit('SET_COMPANY', company)
    },
    async updateCompany({ commit }, form) {
        const company = await updateCompany(form)
        commit('SET_COMPANY', company)
    }
}

export default { state, getters, mutations, actions }