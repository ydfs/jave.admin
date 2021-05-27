import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../theme/index.css";

import IconSvg from "./plugins/icons";
import BreadCrumb from "./components/BreadCrumb.vue";

import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);

Vue.use(ElementUI);
Vue.use(IconSvg);

Vue.component("bread-crumb", BreadCrumb);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
