import { h } from "../../lib/guide-mini-vue.esm.js";
window.self = null;
export const App = {
  render() {
    window.self = this;
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      "hi " + this.msg
      // [
      //   h("div", { class: "red" }, "hi " + this.msg),
      //   h("p", { class: "blue" }, "mini-vue"),
      // ]
    );
  },
  setup() {
    //composition api
    return {
      msg: "mini-vue",
    };
  },
};
