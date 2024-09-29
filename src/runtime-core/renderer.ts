import { createComponentInstance } from "./component";
import { setupComponent } from "./component";
export function render(vnode, container) {
  // patch
  patch(vnode, container);
}
function patch(vnode, container) {
  // 去处理组件

  processComponent(vnode, container);
}

function processComponent(vnode, container) {
  // 1. 处理组件
  mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode); //{vnode}实例
  setupComponent(instance);
  setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
  const subTree = instance.render();
  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container);
}
