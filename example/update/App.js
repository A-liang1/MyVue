import { h, ref } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  name: "App",
  setup() {
    const count = ref(0);
    const onClick = () => {
      count.value++;
    };
    const props = ref({
      foo: "foo",
      bar: "bar",
    });
    const onChangePropsDemo1 = () => {
      props.value.foo = "new-foo";
    };
    const onChangePropsDemo2 = () => {
      props.value.foo = undefined;
    };
    const onChangePropsDemo3 = () => {
      props.value = {
        foo: "foo",
      };
    };
    return {
      count,
      onClick,
      props,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
    };
  },
  render() {
    return h("div", { id: "root", ...this.props }, [
      h("div", {}, "count:" + this.count),
      h("button", { onClick: this.onClick }, "click"),
      h(
        "button",
        { onClick: this.onChangePropsDemo1 },
        "change props demo1 - 值改变了 - 修改"
      ),
      h(
        "button",
        { onClick: this.onChangePropsDemo2 },
        "change props demo2 - 值编程了undefined - 删除"
      ),
      h(
        "button",
        { onClick: this.onChangePropsDemo3 },
        "change props demo3 - key在新的里面没有了 - 删除"
      ),
    ]);
  },
};
