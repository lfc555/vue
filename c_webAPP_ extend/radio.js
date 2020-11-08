Vue.component("radio", {
  props: {
    defaultPicked: {
      type: String
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
          <input type="radio"\
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
      this.picked = undefined;
    }
  },
  mounted: function() {
    //console.log(this.optionsList);
  },
  watch: {
    picked: function(val, oldV) {
      this.$parent.radioData(this.id, val, oldV, this.optionsList);
      //以下内容放到了父page中
      // if (!oldV && val) {
      //   this.$parent.updateSubmitStatus(true);
      // }
      // if (oldV && !val) {
      //   this.$parent.updateSubmitStatus(false);
      // }
      // if (val) {
      //   var findItem = this.optionsList.find(function(item) {
      //     return item.value == val;
      //   });
      //   console.log(findItem.text);
      //   this.$parent.info = findItem.text + "（" + val + "）";
      // }
    }
  }
});
