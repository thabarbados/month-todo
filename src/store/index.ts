import Vue from "vue";
import Vuex from "vuex";

import { createVuexStore } from "vuex-simple";
import { RootModule } from "./store";

Vue.use(Vuex);

const instance = new RootModule();

// create and export our store
export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: [],
});
