import { ref, h } from "../../lib/guide-mini-vue.esm.js";

// 1. 左侧的对比
// (a b) c
// (a b) d e
// const prevChildren = [
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "C" }, "c"),
// ];
// const nextChildren = [
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "D" }, "d"),
//   h("p", { key: "E" }, "e"),
// ];

// 2. 右侧的对比
// a (b c)
// d e (b c)
// const prevChildren = [
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "C" }, "c"),
// ];
// const nextChildren = [
//   h("p", { key: "D" }, "d"),
//   h("p", { key: "E" }, "e"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "C" }, "c"),
// ];
// 3. 新的比牢大长
// 左侧
// (a b)
// (a b) c
// const prevChildren = [h("p", { key: "A" }, "a"), h("p", { key: "B" }, "b")];
// const nextChildren = [
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "C" }, "c"),
// ];
// 右侧
// c (a b)
// (a b)
// const prevChildren = [h("p", { key: "A" }, "a"), h("p", { key: "B" }, "b")];
// const nextChildren = [
//   h("p", { key: "C" }, "c"),
//   h("p", { key: "D" }, "d"),
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
// ];
// 4. 牢大比新的长 删除
// 左侧
// (a b) c
// (a b)
// const prevChildren = [
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "C" }, "c"),
// ];
// const nextChildren = [h("p", { key: "A" }, "a"), h("p", { key: "B" }, "b")];
// 右侧
// a (b c)
// (b c)
// const prevChildren = [
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "C" }, "c"),
// ];
// const nextChildren = [h("p", { key: "B" }, "b"), h("p", { key: "C" }, "c")];
export default {
  name: "ArrayToArray",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return {
      isChange,
    };
  },
  render() {
    const self = this;
    return self.isChange === true
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
