Page({
  data: {
    projectId: ''
  },

  bindProjectIdInput: function(e) {
    this.setData({
      projectId: e.detail.value
    })
  },

  onTap: function(e) {
    if (this.data.projectId == 'tom') {
      console.log(this.data.projectId);
      wx.switchTab({
        url: '../task/task',
      });
    } else {
      wx.showModal({
        title: '登录失败',
        content: '请重新输入工程识别码',
      });
    }
  }
})