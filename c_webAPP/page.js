Vue.component("page", {
  props: {
    //title
    title: { type: String }
  },
  template:
    '<div v-show="show">\
    <div><slot></slot></div>\
    <div>您选择或填写的内容：<br><span v-html="info">/span></div>\
    </div>',
  data: function() {
    return {
      show: true,
      info: ""
    };
  },
  methods: {
    updateSubmitStatus: function(v) {
      this.$parent.updateSubmitStatus(v);
    },
    reset: function() {
      if (this.show) {
        //只重置本页面的内容
        this.$children.forEach(function(item) {
          if (item.reset && typeof item.reset === "function") {
            item.reset();
          }
        });
      }
      this.info = "";
    },
    //textarea
    textareaData: function(id, val, oldV) {
      this.info = val;
      //
      this.$parent.pageData[id] = val;
    },
    //radio
    radioData: function(id, val, oldV, optionsList) {
      if (!oldV && val) {
        this.$parent.updateSubmitStatus(true);
      }
      if (oldV && !val) {
        this.$parent.updateSubmitStatus(false);
      }
      var _info = "";
      if (val) {
        var findItem = optionsList.find(function(item) {
          return item.value == val;
        });
        console.log(findItem.text);
        _info = findItem.text + "（" + val + "）";
      }
      this.info = _info;
      //
      this.$parent.pageData[id] = val;
    },
    //checkbox
    checkboxData: function(id, val, oldV, optionsList) {
      if (oldV.length == 0 && val.length > 0) {
        this.$parent.updateSubmitStatus(true);
      }
      if (oldV.length > 0 && val.length == 0) {
        this.$parent.updateSubmitStatus(false);
      }
      var findItem = optionsList.filter(function(item) {
        var b = val.some(function(temp, index) {
          return temp == item.value;
        });
        return b;
      });
      var _info = "";
      findItem.forEach(function(item) {
        _info += item.text + "（" + item.value + "）<br>";
      });
      this.info = _info;
      //
      this.$parent.pageData[id] = val;
    }
  },
  watch: {
    title: function(val) {
      this.$parent.updatePage();
    }
  }
});
