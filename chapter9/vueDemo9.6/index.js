var app = new Vue({
  el: "#app",
  data: {
    columns: [
      {
        title: "姓名",
        key: "name"
      },
      {
        title: "年龄",
        key: "age",
        sortable: true
      }
    ],
    data: [
      {
        name: "王小明",
        age: 18,
        birthday: "1991-8-5",
        address: "新乡市"
      }
    ]
  }
});
