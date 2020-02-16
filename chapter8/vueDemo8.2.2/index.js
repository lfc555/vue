var app = new Vue({
  el: "#app",
  data: {
    timeNow: new Date().getTime(),
    timeM:1581861671000,
    timeH:1581854471000,
    timeD:1581782351000,
    timeBefore: 1488930695721,
  }
});

console.log("getUnix:"+Time.getUnix());
console.log("getTodayUnix:"+Time.getTodayUnix());

