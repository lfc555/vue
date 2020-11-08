Vue.component("checkbox", {
  props: {
    defaultPicked: {
      type: Array,
      default: function () {
        return [];
      },
    },
    optionsList: {
      required: true,
      type: Array,
    },
    //复选框，至少选择数量，默认1
    lessLength: {
      type: Number,
      default: 1,
    },
    id: {
      required: true,
      type: String,
    },
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
  data: function () {
    return {
      picked: this.defaultPicked,
    };
  },
  methods: {
    genId: function (index) {
      return this.id + "_" + index;
    },
    reset: function () {
      this.picked = [];
    },
  },
  mounted: function () {
    //console.log(this.optionsList);
  },
  watch: {
    picked: function (val, oldV) {
      //this.$emit("checkboxEvent", { newValue: val, oldValue: oldV });//没有效果
      this.$parent.checkboxData(this.id, val,oldV,this.lessLength, this.optionsList);
    },
  },
});
