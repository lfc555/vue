//第一种
import './style.css'
//第二种 使用vue
//导入Vue框架
import Vue from 'vue'
//导入 app.vue组件
import App from './app.vue'
//创建Vue根实例 
new Vue({
    el:'#app',
    render:h=>h(App)
});