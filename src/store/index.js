import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        parts: null,
        // cheapestParts: null,
    },
    mutations: {
        addRobotToCart(state, robot) {
            state.cart.push(robot);
        },
        updateParts(state, parts) {
            state.parts = parts;
        },
    },
    actions: {
        getParts({ commit }) {
            axios.get('/api/parts')
            .then(result => commit('updateParts', result.data))
            .catch(console.error);
        },
    },
    getters: {
        cartSaleItems(state) {
            return state.cart.filter(item => item.head.onSale);
        },
        cheapestParts(state) { 
            let parts = null;       
            if(state.parts)  {
                parts = {
                    heads: state.parts.heads.filter(item => item.cost < 1000 ),
                    arms: state.parts.arms.filter(item => item.cost < 200 ),
                    torsos: state.parts.torsos.filter(item => item.cost < 1000 ),
                    bases: state.parts.bases.filter(item => item.cost < 1000 ),
                }
            }

            return parts;
        },
    },
});