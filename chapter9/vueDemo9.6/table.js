Vue.component("vTable", {
  props: {
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      currentColumns: [],
      currentData: []
    };
  },
  render: function(h) {
    var _this = this;
    var trs = [];
    //获取所有body数据
    this.currentData.forEach(function(row) {
      var tds = [];
      _this.currentColumns.forEach(function(cell) {
        tds.push(h("td", row[cell.key]));
      });
      trs.push(h("tr", tds));
    });
    //获取所有head数据
    var ths = [];
    var colgroup = [];
    this.currentColumns.forEach(function(col, index) {
      var minWidth = 80;
      if (col.width === undefined) {
        col.width = minWidth;
      }
      colgroup.push(
        h("colgroup", {
          attrs: {
            width: col.width + "px"
          }
        })
      );
      //
      if (col.sortable) {
        //可排序
        ths.push(
          h("th", [
            h("span", col.title),
            //升序
            h(
              "a",
              {
                class: {
                  on: col._sortType === "asc"
                },
                on: {
                  click: function() {
                    _this.handleSortByAsc(index);
                  }
                }
              },
              "↑"
            ),
            //降序
            h(
              "a",
              {
                class: {
                  on: col._sortType === "desc"
                },
                on: {
                  click: function() {
                    _this.handleSortByDesc(index);
                  }
                }
              },
              "↓"
            )
          ])
        );
      } else {
        //不可排序，直接渲染文本
        //新增一个功能：调整列宽
        ths.push(
          h("th", [
            h("span", col.title),
            h(
              "a",
              {
                class: {
                   dynWidth: true
                },
                on: {
                  click: function() {
                    _this.handleMoreWid(index);
                  }
                }
              },
              "+"
            ),
            h(
              "a",
              {
                class: {
                  dynWidth: true
                },
                on: {
                  click: function() {
                    _this.handleLessWid(index);
                  }
                }
              },
              "-"
            )
          ])
        );
      }
    });
    //返回结果
    return h("table", [colgroup,h("tr", ths),trs]);
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
    },
    //升序
    handleSortByAsc: function(index) {
      var key = this.currentColumns[index].key;
      this.currentColumns.forEach(function(col) {
        col._sortType = "normal";
      });
      this.currentColumns[index]._sortType = "asc";
      this.currentData.sort(function(a, b) {
        return a[key] > b[key] ? 1 : -1;
      });
    },
    //降序
    handleSortByDesc: function(index) {
      var key = this.currentColumns[index].key;
      this.currentColumns.forEach(function(col) {
        col._sortType = "normal";
      });
      this.currentColumns[index]._sortType = "desc";
      this.currentData.sort(function(a, b) {
        return a[key] < b[key] ? 1 : -1;
      });
    },
    //增加列宽
    handleMoreWid: function(index) {
      var w = this.currentColumns[index].width;
      if (w <= 200) {
        this.currentColumns[index].width = w + 1;
      }
    },
    //减少列宽
    handleLessWid: function(index) {
      var w = this.currentColumns[index].width;
      if (w > 50) {
        this.currentColumns[index].width = w - 1;
      }
    }
  },
  mounted() {
    this.makeColumns();
    this.makeData();
  },
  watch: {
    data: function() {
      //重置赋值
      this.makeData();
      //
      var sortedColumn = this.currentColumns.filter(function(col) {
        return col._sortType != "normal";
      });
      if (sortedColumn.length > 0) {
        if (sortedColumn[0]._sortType === "asc") {
          this.handleSortByAsc(sortedColumn[0].index);
        } else {
          this.handleSortByDesc(sortedColumn[0].index);
        }
      }
    }
  }
});
