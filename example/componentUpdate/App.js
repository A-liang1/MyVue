import { h, ref } from "../../lib/guide-mini-vue.esm.js";
import Child from "./Child.js";

export const App = {
  name: "App",
  setup() {
    const msg = ref("123");
    const count = ref(1);
    window.msg = msg;
    const changeChlidProps = () => {
      msg.value = "456";
    };
    const changeCount = () => {
      count.value++;
    };
    return {
      msg,
      count,
      changeChlidProps,
      changeCount,
    };
  },
  render() {
    return h("div", {}, [
      h("div", {}, "您好"),
      h("button", { onClick: this.changeChlidProps }, "changeChild"),
      h(Child, { msg: this.msg, count: this.count }),
      h("button", { onClick: this.changeCount }, "changeCount"),
      h("p", {}, "count:" + this.count),
    ]);
  },
};
