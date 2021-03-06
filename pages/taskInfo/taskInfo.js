// pages/taskInfo/taskInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      taskId:options.taskId
    })

    wx.request({
      url: 'https://easy-mock.com/mock/5b970ac8458965131f4aef1b/tmhPro/taskItem?taskId='+this.data.taskId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          taskInfo: res.data.results
        })
      }
    })
  },
})