import { isObject } from "../shared/index";
import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance } from "./component";
import { setupComponent } from "./component";
export function render(vnode, container) {
  // patch
  patch(vnode, container);
}
function patch(vnode, container) {
  //shapeFlag
  const { shapeFlag } = vnode;
  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container);
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container);
  }
}
function processElement(vnode, container) {
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  const el = (vnode.el = document.createElement(vnode.type));
  const { children, shapeFlag } = vnode;
  //shpaeFlag
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el);
  }
  //props
  const { props } = vnode;
  for (const key in props) {
    const val = props[key];
    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }
  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function processComponent(vnode, container) {
  // 1. 处理组件
  mountComponent(vnode, container);
}

function mountComponent(initialVNode, container) {
  const instance = createComponentInstance(initialVNode); //{vnode}实例
  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  console.log("subTree", subTree);
  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container);
  initialVNode.el = subTree.el;
}
