import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
window.self = null;
export const App = {
  name: "App",

  render() {
    window.self = this;
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
        onClick() {
          console.log("click");
        },
        onMousedown() {
          console.log("mousedown");
        },
      },
      [h("div", {}, "hi " + this.msg), h(Foo, { count: 2 })]
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
