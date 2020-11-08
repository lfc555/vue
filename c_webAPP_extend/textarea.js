Vue.component("txtarea", {
  props: {
    minLength: { type: Number },
    id: { type: String }
  },
  template:
    '\
        <div>\
          <textarea :placeholder="placeholder"\
          row="5"\
          id="id"\
          v-model="text"\
          >\
          </textarea>\
      </div>\
        ',
  data: function() {
    return {
      text: ""
    };
  },
  computed: {
    placeholder: function() {
      if (this.minLength > 0) return "不少于" + this.minLength + "字";
      return false;
    }
  },
  methods: {
    reset: function() {
      this.text = "";
    }
  },
  mounted: function() {
    //console.log(this.optionsList);
  },
  watch: {
    text: function(val, oldV) {
      this.$parent.textareaData(this.id, val, oldV, this.minLength);

      if (val.length > this.minLength) {
        //this.$parent.updateSubmitStatus(true);
      } else {
        //this.$parent.updateSubmitStatus(false);
      }
      //this.$parent.info = v;//放入父组件page中
    }
  }
});
