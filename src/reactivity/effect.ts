import { extend } from "../shared";
// 全局变量
// 相当于ReactiveEffect的实例对象
let activeEffect;
let shouldTrack;
// 类， 响应式的effect类
export class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true;
  onStop?: () => void;
  public scheduler: Function | undefined;
  constructor(fn, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }
  run() {
    // 让activeEffect = 当前effect创建的实例对象
    activeEffect = this;
    // active是判断stop状态的变量，false为stop状态；当前为stop状态它就直接执行fn并返回，
    // 此时shouldTrack还是false,在track中isTracking时，不会收集依赖，直接return
    if (!this.active) {
      return this._fn();
    }
    //这个为非stop状态，shouldTrack为true，会收集依赖
    shouldTrack = true;
    activeEffect = this;
    const result = this._fn();
    shouldTrack = false;
    return result;
  }
  stop() {
    if (this.active) {
      cleanEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}
const targetMap = new Map();
export function track(target, key) {
  if (!isTracking()) return;
  // target -> key -> dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  trackEffect(dep);
}
export function trackEffect(dep) {
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  triggerEffects(dep);
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
// effect函数， 接受一个函数， 函数会被执行， 函数内部会进行依赖收集， 当数据发生变化时， 会触发依赖
export function effect(fn, options: any = {}) {
  // 创建一个响应式的effect实例对象
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // shared方法，Object.assign 浅拷贝,把options的属性拷贝到_effect上
  extend(_effect, options);
  // 执行effect
  _effect.run();
  // 返回一个runner函数， 函数执行时， 会执行effect的run方法
  const runner: any = _effect.run.bind(_effect);
  // 把effect实例对象挂载到runner上
  runner.effect = _effect;
  // 返回runner函数
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
