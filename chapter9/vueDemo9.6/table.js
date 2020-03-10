Vue.component({
  prpps: {
    columns: {
      type: Array,
      default: function() {
        return [];
      },
      data: {
        type: Array,
        default: function() {
          return [];
        }
      }
    }
  },
  data: function() {
    return {
      currentColumns: [],
      currentData: []
    };
  },
  methods: {
    makeColumns: function() {
      this.currentColumns = this.columns.map(function(col, index) {
        col._sortType = "normal"; //当前列的排序状态
        col._index = index; //当前列的索引
        return col;
      });
    },
    makeData: function() {
      this.currentData = this.data.map(function(row, index) {
        row._index = index; //当时列的索引
        return row;
      });
    }
  },
  render: function(h) {
    var _this = this;
    var ths = [];
    var trs = [];
    //获取所有数据
    this.currentData.forEach(function(row) {
      var tds = [];
      _this.currentData.forEach(function(cell) {
        tds.push(h("td", row[cell.key]));
      });
      _this.trs.push(h("tr", tds));
    });
    //
    return h("table", [h("thdead", [h("tr", ths)]), h("tbody", trs)]);
  },
  mounted() {
    this.makeColumns();
    this.makeData();
  }
});
