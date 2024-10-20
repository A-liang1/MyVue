import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance } from "./component";
import { setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";
import { effect } from "../reactivity/effect";
import { EMPTY_OBJ } from "../shared";
export function createRenderer(options) {
  const {
    createElement: hostCreasteElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render(vnode, container, parentComponent) {
    // patch
    patch(null, vnode, container, parentComponent);
  }
  // n1 -> 牢大
  // n2 -> 新的
  function patch(n1, n2, container, parentComponent) {
    //shapeFlag
    const { type, shapeFlag } = n2;
    //Fragment
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;
      case Text:
        processText(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
        break;
    }
  }
  function processFragment(n1, n2, container, parentComponent) {
    mountChildren(n2, container, parentComponent);
  }
  function processText(n1, n2, container) {
    const { children } = n2;
    const textNode = (n2.el = document.createTextNode(children));
    container.append(textNode);
  }

  function processElement(n1, n2, container, parentComponent) {
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container);
    }
  }
  function patchElement(n1, n2, container) {
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    const el = (n2.el = n1.el);
    patchProps(el, oldProps, newProps);
  }
  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      // 牢大在新的有更改，新的替换牢大
      for (const key in newProps) {
        const prevProp = oldProps[key];
        const nextProp = newProps[key];
        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        // 新的没有 牢大删除
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null);
          }
        }
      }
    }
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

      hostPatchProp(el, key, null, val);
    }
    // container.append(el);
    hostInsert(el, container);
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach((v) => {
      patch(null, v, container, parentComponent);
    });
  }

  function processComponent(n1, n2, container, parentComponent) {
    // 1. 处理组件
    mountComponent(n2, container, parentComponent);
  }

  function mountComponent(initialVNode, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent); //{vnode}实例
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }
  function setupRenderEffect(instance, initialVNode, container) {
    effect(() => {
      if (!instance.isMounted) {
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));
        // vnode -> patch
        // vnode -> element -> mountElement
        patch(null, subTree, container, instance);
        initialVNode.el = subTree.el;
        instance.isMounted = true;
      } else {
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;
        instance.subTree = subTree;
        patch(prevSubTree, subTree, container, instance);
      }
    });
  }

  return {
    createApp: createAppAPI(render),
  };
}
