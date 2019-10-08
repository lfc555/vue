var app = new Vue({
  el: "#app",
  data: {
    isCheckAll: false,
    list: [
      { id: 1, name: "iphone7", price: 6188, count: 1, check: 0 },
      { id: 2, name: "iPad Pro", price: 588, count: 2, check: 0 },
      { id: 3, name: "MacBook Pro", price: 8955, count: 1, check: 0 }
    ]
  },
  computed: {
    totalPrice: function() {
      var total = 0;
      var checkList = this.list.filter(function(item) {
        return item.check !== 0;
      });
      for (var i = 0; i < checkList.length; i++) {
        var item = this.list[i];
        total += item.price * item.count;
      }
      return total.toString().replace(/\B (?= (\d {3}) +$)/g, ",");
    }
  },
  methods: {
    decrease: function(index) {
      if (this.list[index].count === 1) return;
      this.list[index].count--;
    },
    increase: function(index) {
      this.list[index].count++;
    },
    remove: function(index) {
      this.list.splice(index, 1);
    },
    //单选
    check: function(index) {
      if (this.list[index].check === 1) {
        this.list[index].check = 0;
      } else {
        this.list[index].check = 1;
      }
    },
    //全选/反选
    checkAll: function() {
      if (this.isCheckAll == true) {
        this.isCheckAll=false;
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].check=0;
        }
      }
      else{
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].check=1;
        }
        this.isCheckAll=true;

      }
    }
  }
});
