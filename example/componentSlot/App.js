import { h, createTextVNode } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
export const App = {
  name: "App",
  render() {
    naem: "App";
    const app = h("div", {}, "app");
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => h("p", {}, "header" + age),
        footer: ({ age }) => [
          h("p", {}, "footer" + age),
          createTextVNode("aliang"),
        ],
      }
    );
    return h("div", {}, [app, foo]);
  },
  setup() {
    return {};
  },
};
