Vue.directive("clickoutside", {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target) && e.keyCode != 27) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    //
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
    if (binding.modifiers.esc) {
      document.addEventListener("keyup", documentHandler);
    }
  },
  unbind: function(el, binding) {
    document.removeEventListener("click", el.__vueClickOutside__);
    if (binding.modifiers.esc) {
      document.removeEventListener("keyup", documentHandler);
    }
    delete el.__vueClickOutside__;
  },
  update: function(el, binding) {
    console.log("update:" + binding.name);
  }
});

/*
• bind ： 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定
时执行一次的初始化动作．
• inserted ： 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document 中） ．
• update： 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后
的绑定值，可以忽略不必要的模板更新。
• componentUpdated ： 被绑定元素所在模板完成一次更新周期时调用．
• unbind ： 只调用一次，指令与元素解绑时调用。
*/
