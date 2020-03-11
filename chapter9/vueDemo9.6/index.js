var app = new Vue({
  el: "#app",
  data: {
    columns: [
      {
        title: "姓名",
        key: "name",
        width: 150
      },
      {
        title: "年龄",
        key: "age",
        sortable: true,
        width: 100
      }
    ],
    data: [
      {
        name: "王小明",
        age: 18,
        birthday: "1991-8-5",
        address: "新乡市"
      },
      {
        name: "张剑",
        age: 21,
        birthday: "1991-8-5",
        address: "深圳市"
      },
      {
        name: "李圳",
        age: 10,
        birthday: "1991-8-5",
        address: "北京市"
      }
    ]
  }
});
