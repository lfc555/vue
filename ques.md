Vue实践中遇到的一些问题
==========================
*问题1*：组件中内容**未渲染**  
方案：**template**的DOM结构必须被 <u>**一个元素**</u> 包含  
示例1：  
> 正确：   
> `<div>这里是组件的内容</div>`  
> 错误：   
> `这里是组件的内容`  

示例2：  
> 正确：   
> ~~~
> <div>  
>       <div v-for="item in arrylist">这里是组件的内容</div>
> </div>
> ~~~
> 错误：   
> ` <div v-for="item in arrylist">这里是组件的内容</div>`  

*****************************************************************
