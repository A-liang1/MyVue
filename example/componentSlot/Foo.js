import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js";
export const Foo = {
  name: "Foo",
  setup() {},
  render() {
    const foo = h("div", {}, "foo");
    console.log(this.$slots);
    const age = 19;
    return h("div", {}, [
      renderSlots(this.$slots, "header", { age }),
      foo,
      renderSlots(this.$slots, "footer", { age }),
    ]);
  },
};
