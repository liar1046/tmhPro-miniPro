var Charts = require('../../utils/wxcharts-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var finish = 0;
    var need = 0;
    var total = 0;

    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5b970ac8458965131f4aef1b/tmhPro/tasks',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          task: res.data.results
        })

        var arr = that.data.task;
        for (var i = 0; i < arr.length; i++) {
          finish += parseInt(arr[i].finish);
          need += parseInt(arr[i].need)
        }

        that.setData({
          total: finish + need
        })

        // 初始化饼图
        new Charts({
          canvasId: 'canvas',
          type: 'pie',
          series: [{
            name: '已签收',
            data: finish
          }, {
            name: '未签收',
            data: need
          }],
          width: 375,
          height: 280,
          dataLabel: true,
        });
      }
    })
  },

  // 跳转到任务日历界面
  taskDate: function(e) {
    wx.navigateTo({
      url: '../taskDate/taskDate',
    })
  },

  // 跳转到任务详情界面，参数时taskId
  taskItem: function(e) {
    var taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: '../taskInfo/taskInfo?taskId=' + e.currentTarget.dataset.taskid,
    })
  },
})