/*
分析一下时间转换的逻辑：
• l 分钟以前，显示“刚刚”。
• 1 分钟～ 1 小时之间，显示“ xx 分钟前”．
• 1 小时～ l 天之间，显示“ xx 小时前”．
• l 天～ 1 个月01 天）之间，显示“xx 天前” ．
• 大于1 个月，显示“ xx 年xx 月xx 曰’＼
*/
var Time = {
  //获取当前时间戳
  getUnix: function() {
    var date = new Date();
    return date.getTime();
  },
  //获取当前0时0分0秒0豪秒的时间戳
  getTodayUnix: function() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.getTime();
  },
  //获取当年1月1日0时0分0秒0毫秒的时间戳
  getYearUnix: function() {
    var date = new Date();
    date.setMonth(1);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.getTime();
  },
  //获取标准年月日
  getLastDate: function(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    return year + "-" + month + "-" + day;
  },
  getFormatTime: function(timestamp) {
    var now = this.getUnix(); //当前时间戳
    var today = this.getTodayUnix(); //今天0点时间戳
    var year = this.getYearUnix(); //今年0点时间戳

    var timer = (now - timestamp) / 1000; //转换为秒级时间戳
    var tip = "";
    //一分钟之内
    if (timer <= 0) tip = "刚刚";
    else if (Math.floor(timer / 60) <= 0) tip = "刚刚";
    //1分钟-1小时之间
    else if (timer < 3600) tip = Math.floor(timer / 60) + "分钟前";
    //1小时-1天之间
    else if (timer >= 3600 && timestamp - today > 0)
      tip = Math.floor(timer / 3600) + "小时前";
    // 1~ 1个月01天
    else if (timer / 86400 <= 31) tip = Math.ceil(timer / 86400) + "天前";
    //大于1个月，直接显示上体日期
    else tip = this.getLastDate(timestamp);

    return tip;
  }
};

//自定义指令
Vue.directive("time", {
  bind: function(el, binding) {
    var v = binding.value;
    var formatTime = Time.getFormatTime(v);
    el.innerHTML = formatTime;
    el.__timeout__ = setInterval(function() {
      el.innerHTML = Time.getFormatTime(binding.value);
    }, 60000);
  },
  unbind: function(el) {
    clearInterval(el.__timeout__);
    delete el.__timeout__;
  }
});
