Vue.component("input-number", {
    template:
      '\
<div class="input-number">\
    <input type="text" \
:value="currentValue" \
@change="handleChange">\
<button @click="handleDown" \
:disabled="currentValue<=min">-</button>\
<button @click="handleUp"\
:disabled="currentValue>=max">+</button>\
</div>',
    props: {
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data: function() {
      return {
        currentValue: this.value
      };
    },
    //watch 监视 currentValue和value值
    watch: {
      currentValue: function(val) {
        this.$emit("input", val);
        this.$emit("on-change", val);//本项目没有用到
      },
      value: function(val) {
        this.updateValue(val);
      }
    },
    methods: {
      handleDown: function() {
        if (this.currentValue <= this.min) return;
        this.currentValue -= 1;
      },
      handleUp: function() {
        if (this.currentValue >= this.max) return;
        this.currentValue += 1;
      },
      handleChange: function(event) {
        var val = event.target.value.trim(); //取值
        //
        var max = this.max;
        var min = this.min;
        //
        if (isValueNurnber(val)) {
          val = Number(val);
          this.currentvalue = val;
          //
          if (val >= max) {
            this.currentValue = max;
          } else if (val <= min) {
            this.currentvalue = min;
          }
        } else {
          event.target.value = this.currentValue;
        }
      },
      updateValue: function(val) {
        if (val > this.max) val = max;
        if (val < this.min) val = min;
        this.currentValue = val;
      }
    },
    mounted: function() {
     this.updateValue(this.value);
    }
  });

  //其他辅助方法
  // 判断是否为数字
  function isValueNurnber(value) {
    return /(^-?[0-9])+\.{1}\d+$)|(^-?[1-9])[0-9])*$)|(^-? 0{1}$)/.test(
      value + ""
    );
  }