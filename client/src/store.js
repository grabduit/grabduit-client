/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    playerId: '',
    audio: new Audio('./assets/hereMoney.mp3'),
    audioCacing: new Audio('./assets/ChaChing.mp3'),
  },
  mutations: {
    getUser (state, payload) {
      state.name = localStorage.getItem('name');
      state.playerId = localStorage.getItem('playerId');
    },
    register (state, payload) {
      state.name = payload;
      state.playerId = state.name + (Math.round(Math.random()*899999) + 100000);
      localStorage.setItem('name', state.name);
      localStorage.setItem('playerId', state.playerId);
    },
  },
  actions: {

  }
})
