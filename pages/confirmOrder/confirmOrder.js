Page({

  data: {
    confirmOrder: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var carNum = e.carNum;
    console.log(carNum);

    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5b970ac8458965131f4aef1b/tmhPro/confirmOrder?carNum=' + carNum,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          confirmOrder: res.data.results
        })
      }
    })
  }
})