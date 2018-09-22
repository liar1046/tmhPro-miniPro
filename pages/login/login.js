Page({
  data: {

  },

  bindProjectCodeInput: function(e) {
    this.setData({
      projectCode: e.detail.value
    })
  },

  login: function(e) {
    if (this.data.projectCode == 'tom') {
      // console.log(this.data.projectCode);
      wx.request({
        url: 'http://localhost:8080/tmhPro/loginServlet?projectCode=' + this.data.projectCode,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log(res.data)
          if(res.data == 0){
            wx.showModal({
              title: '登录失败',
              content: '工程识别码错误，请重新输入',
            })
          }else{
            // wx.switchTab 从非tab界面跳转到tab界面
            wx.switchTab({
              url: '../task/task',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '登录失败',
        content: '请重新输入工程识别码',
      });
    }
  }
})