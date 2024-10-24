import { createVNode } from "./vnode";
export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // 1. 先把 rootComponent 转换成虚拟节点
        const vnode = createVNode(rootComponent);
        render(vnode, rootContainer);
      },
    };
  };
}
