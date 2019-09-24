import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blurred: '',
    reviews: [],
    cur_editing: '',
    sessionUser: {},
  },
  getters: {
    getBlurred(state) {
      return state.blurred;
    },
    getReviews(state) {
      return state.reviews;
    },
    getCurEdit(state) {
      return state.cur_editing;
    },
    getSessionUser(state) {
      return state.getSessionUser;
    },
  },
  mutations: {
    setBlurred(state, id) {
      state.blurred = id;
    },
    setCurEdit(state, id) {
      state.cur_editing = id;
    },
    setReviews(state, { reviews, updateOperator, index }) {
      // state.reviews = reviews;
      if (!updateOperator || updateOperator === 'set') state.reviews = reviews;
      else if (updateOperator === 'unshift') state.reviews.unshift(reviews);
      else if (updateOperator === 'remove') state.reviews.splice(index, 1);
    },
    setSessionUser(state, user) {
      state.sessionUser = user;
    },
    clearSessionUser(state) {
      state.sessionUser = {};
    },
  },
  actions: {
    setBlurred({ commit }, { id }) {
      commit('setBlurred', id);
    },
    setReviews({ commit }, payload) {
      commit('setReviews', payload);
    },
    setCurEdit({ commit }, id) {
      commit('setCurEdit', id);
    },
    setSessionUser({ commit }, { axios, link }) {
      axios
        .get(link)
        .then((res) => {
          commit('setSessionUser', res.data);
        })
        .catch((res) => {
          console.error(res);
          commit('clearSessionUser');
        });
    },
  },
});
