export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    // key: props?.["key"],
    el: null,
  };
  return vnode;
}
