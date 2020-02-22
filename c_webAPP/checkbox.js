Vue.component("checkbox", {
  props: {
    defaultPicked: {
      type: Array,
      default: function() {
        return [];
      }
    },
    optionsList: {
      required: true,
      type: Array
    },
    id: {
      required: true,
      type: String
    }
  },
  template:
    '\
      <div>\
          <div\
          v-for="(item,index) in optionsList"\
          >\
            <input type="checkbox"\
            :id="genId(index)"\
            :value="item.value"\
            v-model="picked"\
            >\
                <label :for="genId(index)">{{item.text}}</label>\
          </div>\
    </div>\
      ',
  data: function() {
    return {
      picked: this.defaultPicked
    };
  },
  methods: {
    genId: function(index) {
      return this.id + "_" + index;
    },
    reset: function() {
      this.picked = [];
    }
  },
  mounted: function() {
    //console.log(this.optionsList);
  },
  watch: {
    picked: function(val, oldV) {
      //this.$emit("checkboxEvent", { newValue: val, oldValue: oldV });//没有效果

      this.$parent.checkboxData(this.id, val, oldV, this.optionsList);
      //下面的内容放到了父页面
      //   if (oldV.length == 0 && val.length > 0) {
      //     this.$parent.updateSubmitStatus(true);
      //   }
      //   if (oldV.length > 0 && val.length == 0) {
      //     this.$parent.updateSubmitStatus(false);
      //   }
      //   var findItem = this.optionsList.filter(function(item) {
      //     var b = val.some(function(temp, index) {
      //       return temp == item.value;
      //     });
      //     return b;
      //   });
      //   var info = "";
      //   findItem.forEach(function(item) {
      //     info += item.text + "（" + item.value + "）<br>";
      //   });
      //   //console.log(findItem);
      //   this.$parent.info = info;
      //   this.$parent.pageData.checkbox = "1212312";
    }
  }
});
