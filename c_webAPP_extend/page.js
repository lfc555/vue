Vue.component("page", {
  props: {
    //title
    title: { type: String },
    name: {
      required: true,
      type: String,
    },
  },
  template: '<div v-show="show">\
    <div><slot></slot></div>\
    </div>',
  data: function () {
    return {
      show: true,
      info: "",
    };
  },
  methods: {
    updateSubmitStatus: function (v) {
      this.$parent.updateSubmitStatus(v);
    },
    reset: function () {
      if (this.show) {
        //只重置本页面的内容
        this.$children.forEach(function (item) {
          if (item.reset && typeof item.reset === "function") {
            item.reset();
          }
        });
      }
      this.info = "";
    },
    //textarea
    textareaData: function (id, val, oldV, minLength) {
      var _this = this;
      var validatorParams = this.$parent.pageList.find((item) => {
        return item.name == _this.name;
      });
      if (validatorParams) {
        let validatorObject = validatorParams.validList.find((item) => {
          return item.id == id;
        });
        if (validatorObject) {
          //
          let error = ""; //验证不通过 错误信息描述
          let isValid = false; //验证是否通过
          if (val.length >= minLength) {
            //验证通过
            if (validatorObject.valid && validatorObject.valid == true) {
            } else {
              validatorParams.validTotal += 1;
            }
            isValid = true;
            error = "";
          }

          if (val.length < minLength) {
            //验证不通过
            if (validatorObject.valid && validatorObject.valid == true) {
              validatorParams.validTotal -= 1;
            }
            isValid = false;
            error = "不少于10字";
          }

          //更新该对象的验证结果
          validatorObject.valid = isValid;
          validatorObject.error = error;
          //检查 该页面是否验收通过
          validatorParams.validaotr =
            validatorParams.validaotrTotal == validatorParams.validTotal;
          this.$parent.updateStatus();
        }
      }
      this.$parent.pageData[id] = val;
      this.info = val;
    },
    //radio
    radioData: function (id, val, oldV, optionsList) {
      var _this = this;
      var validatorParams = this.$parent.pageList.find((item) => {
        return item.name == _this.name;
      });
      if (validatorParams) {
        let validatorObject = validatorParams.validList.find((item) => {
          return item.id == id;
        });
        if (validatorObject) {
          //
          let error = ""; //验证不通过 错误信息描述
          let isValid = false; //验证是否通过
          //选择值后，初始化 下一步、提交按钮状态：启用
          if (!oldV && val) {
            //验证通过
            validatorParams.validTotal += 1;
            isValid = true;
            error = "";
          }

          //取消选择值后，初始化 下一步、提交按钮状态：禁用
          if (oldV && !val) {
            //验证不通过
            if (validatorObject.valid && validatorObject.valid == true) {
              validatorParams.validTotal -= 1;
            }
            isValid = false;
            error = "至少选择1项";
          }

          //更新该对象的验证结果
          validatorObject.valid = isValid;
          validatorObject.error = error;
          //检查 该页面是否验收通过
          validatorParams.validaotr =
            validatorParams.validaotrTotal == validatorParams.validTotal;
          //
          this.$parent.pageData[id] = val;
          this.$parent.updateStatus();
        }
      }
      //
      var _info = "";
      if (val) {
        var findItem = optionsList.find(function (item) {
          return item.value == val;
        });
        console.log(findItem.text);
        _info = findItem.text + "（" + val + "）";
      }
      this.info = _info;
    },
    //checkbox
    checkboxData: function (id, val, oldV, lessPickLength, optionsList) {
      var _this = this;
      var validatorParams = this.$parent.pageList.find((item) => {
        return item.name == _this.name;
      });
      if (validatorParams) {
        let validatorObject = validatorParams.validList.find((item) => {
          return item.id == id;
        });
        if (validatorObject) {
          //
          let error = ""; //验证不通过 错误信息描述
          let isValid = false; //验证是否通过
          //
          if (val && val.length >= lessPickLength) {
            //验证通过
            if (validatorObject.valid && validatorObject.valid == true) {
            } else {
              validatorParams.validTotal += 1;
            }
            isValid = true;
            error = "";
          }

          if (!val || val.length < lessPickLength) {
            //验证不通过
            if (validatorObject.valid && validatorObject.valid == true) {
              validatorParams.validTotal -= 1;
            }
            isValid = false;
            error = "至少选择：" + lessPickLength + "项";
          }

          //更新该对象的验证结果
          validatorObject.valid = isValid;
          validatorObject.error = error;
          //检查 该页面是否验收通过
          validatorParams.validaotr =
            validatorParams.validaotrTotal == validatorParams.validTotal;
          //
          this.$parent.pageData[id] = val;
          this.$parent.updateStatus();

          var findItem = optionsList.filter(function (item) {
            var b = val.some(function (temp, index) {
              return temp == item.value;
            });
            return b;
          });
        }
      }
      var _info = "";
      findItem.forEach(function (item) {
        _info += item.text + "（" + item.value + "）<br>";
      });
      this.info = _info;
      //
    },
  },
  watch: {
    title: function (val) {
      this.$parent.updatePage();
    },
    info: function (val) {
      console.log(val);
    },
  },
});
