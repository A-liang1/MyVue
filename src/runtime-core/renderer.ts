import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance } from "./component";
import { setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";

export function createRenderer(options) {
  const {
    createElement: hostCreasteElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render(vnode, container, parentComponent) {
    // patch
    patch(vnode, container, parentComponent);
  }
  function patch(vnode, container, parentComponent) {
    //shapeFlag
    const { type, shapeFlag } = vnode;
    //Fragment
    switch (type) {
      case Fragment:
        processFragment(vnode, container, parentComponent);
        break;
      case Text:
        processText(vnode, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent);
        }
        break;
    }
  }
  function processFragment(vnode, container, parentComponent) {
    mountChildren(vnode, container, parentComponent);
  }
  function processText(vnode, container) {
    const { children } = vnode;
    const textNode = (vnode.el = document.createTextNode(children));
    container.append(textNode);
  }

  function processElement(vnode, container, parentComponent) {
    mountElement(vnode, container, parentComponent);
  }

  function mountElement(vnode, container, parentComponent) {
    const el = (vnode.el = hostCreasteElement(vnode.type));
    const { children, shapeFlag } = vnode;
    //shpaeFlag
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent);
    }
    //props
    const { props } = vnode;
    for (const key in props) {
      const val = props[key];

      hostPatchProp(el, key, val);
    }
    // container.append(el);
    hostInsert(el, container);
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach((v) => {
      patch(v, container, parentComponent);
    });
  }

  function processComponent(vnode, container, parentComponent) {
    // 1. 处理组件
    mountComponent(vnode, container, parentComponent);
  }

  function mountComponent(initialVNode, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent); //{vnode}实例
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }
  function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree, container, instance);
    initialVNode.el = subTree.el;
  }

  return {
    createApp: createAppAPI(render),
  };
}
