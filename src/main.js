import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/font_icon/iconfont.css";

import * as ELIcons from "@element-plus/icons-vue";

const app = createApp(App);

for (let iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName]);
}

app.use(store).use(router).use(ElementPlus).mount("#app");
