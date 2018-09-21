Page({
  data: {
    ordersToConfirm:''
  },

  onLoad:function(option){
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5b970ac8458965131f4aef1b/tmhPro/ordersToConfirm',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          ordersToConfirm: res.data.results
        })
      }
    })
  },

  confirmOrder:function(e){
    var carNum = e.currentTarget.dataset.carnum;
    this.setData(carNum);
    console.log(carNum);
    wx.navigateTo({
      url: '../confirmOrder/confirmOrder?carNum=' + carNum,
    })
  }
})
