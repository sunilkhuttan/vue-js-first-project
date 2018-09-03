import axios from 'axios';

export default {
    namespaced: true,
    state: {
        cart: [],
        parts: null,
        foo: 'robots-foo',
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
        addRobotToCart({ commit, state }, robot) {
            const cart = [...state.cart, robot];
            return axios.post('/api/cart', robot)
            .then(() => commit('addRobotToCart', robot));
        },
    },
    getters: {
        foo (state) {
            return `Robots-getter/${state.foo}`;
        },
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
}