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
// const nextChildren =  [h("p", { key: "B" }, "b"), h("p", { key: "C" }, "c")];
// 5.删除牢大 (在牢大里面存在，新的里面不存在)
// 5.1
// a,b,(c,d),f,g
// a,b,(e,c),f,g
// const prevChildren = [
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "C", id: "c-prev" }, "c"),
//   h("p", { key: "D" }, "d"),
//   h("p", { key: "F" }, "f"),
//   h("p", { key: "G" }, "g"),
// ];
// const nextChildren = [
//   h("p", { key: "A" }, "a"),
//   h("p", { key: "B" }, "b"),
//   h("p", { key: "E" }, "e"),
//   h("p", { key: "C", id: "c-next" }, "c"),
//   h("p", { key: "F" }, "f"),
//   h("p", { key: "G" }, "g"),
// ];
// 5.1.1
// a,b,(c,e,d),f,g
// a,b,(e,c),f,g
// 中间部分，牢大比新的多，那么多出来的直接就可以被干掉(优化删除逻辑)
const prevChildren = [
  h("p", { key: "A" }, "a"),
  h("p", { key: "B" }, "b"),
  h("p", { key: "C", id: "c-prev" }, "c"),
  h("p", { key: "E" }, "e"),
  h("p", { key: "D" }, "d"),
  h("p", { key: "F" }, "f"),
  h("p", { key: "G" }, "g"),
];
const nextChildren = [
  h("p", { key: "A" }, "a"),
  h("p", { key: "B" }, "b"),
  h("p", { key: "E" }, "e"),
  h("p", { key: "C", id: "c-next" }, "c"),
  h("p", { key: "F" }, "f"),
  h("p", { key: "G" }, "g"),
];
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
