let obj = {
  foo: 1,
  bar: 2,
};
let dummy;
const runner = effect(() => {
  dummy = obj.foo;
  return 123;
});
function effect(fn) {
  const runner = run(fn);
  console.log(typeof runner);

  return runner;
}
function run(fn) {
  return fn();
}
