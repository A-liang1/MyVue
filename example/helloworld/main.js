import { createApp } from "../../lib/guide-mini-vue.esm.js";
import { App } from "./App.js";

const rootContailer = document.querySelector("#app");
createApp(App).mount(rootContailer);
