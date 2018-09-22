// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 给下拉框设置选项值
    type: ['砼', '砂浆'],
    typeIndex: 0,
    strength: ['C10', 'C15', 'C20', 'C25', 'C30', 'C35', 'C40', 'C45', 'C50', 'C55', 'C60'],
    strengthIndex: 0,
    antifreeze: ['F50', 'F100', 'F150', 'F200', 'F250', 'F300', 'F350', 'F400', '>F400'],
    antifreezeIndex: 0,
    impervious: ['P4', 'P6', 'P8', 'P10', 'P12', '>P12'],
    imperviousIndex: 0,
    collapse: ['100 ± 20', '120 ± 20', '140 ± 20', '160 ± 20', '180 ± 20', '120 ± 20', '220 ± 20'],
    collapseIndex: 0,
    concreting: ['泵送（37米）', '泵送（48米）', '泵送（52米）', '自卸', '自备泵', '塔吊'],
    concretingIndex: 0 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5b970ac8458965131f4aef1b/tmhPro/contract',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          contract: res.data
        });
      }
    })
  },

  //获取各项数据，picker皆为下标
  bindTypeChange: function(e) {
    //   console.log('picker发送选择改变，携带值为', e.detail.value);
    //   console.log(this.data.type[e.detail.value])
    this.setData({
      typeIndex: e.detail.value
    });
  },

  bindStrengthChange: function(e) {
    this.setData({
      strengthIndex: e.detail.value
    });
  },

  bindAntifreezeChange: function(e) {
    this.setData({
      antifreezeIndex: e.detail.value
    });
  },

  bindImperviousChange: function(e) {
    this.setData({
      imperviousIndex: e.detail.value
    });
  },

  bindCollapseChange: function(e) {
    this.setData({
      collapseIndex: e.detail.value
    });
  },

  bindConcretingChange: function(e) {
    this.setData({
      concretingIndex: e.detail.value
    });
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
  },

  formSubmit(e) {
    // console.log(e.detail.value.taskId);
    // console.log(this.data.date);
    // console.log(this.data.concreting[this.data.concretingIndex]);    //根据角标获取数据
    var constructionSite = e.detail.value.constructionSite;
    var need = e.detail.value.need;
    var date = this.data.date;
    var phone = e.detail.value.phone;
    var entering = e.detail.value.entering
    // 对输入框的值进行判断，如果为空，禁止提交
    if (constructionSite == null || need == null || date == null || phone == null) {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！'
      })
    } else {
      wx.request({
        url: 'http://localhost:8080/tmhPro/orderServlet',
        data: {
          contractId: e.detail.value.contractId,
          projectName: e.detail.value.projectName,
          builder: e.detail.value.builder,
          address: e.detail.value.address,
          distance: e.detail.value.distance,
          constructionSite: constructionSite,
          type: this.data.type[this.data.concretingIndex],
          need: need,
          strength: this.data.strength[this.data.strengthIndex],
          antifreeze: this.data.antifreeze[this.data.antifreezeIndex],
          impervious: this.data.impervious[this.data.imperviousIndex],
          collapse: this.data.collapse[this.data.collapseIndex],
          concreting: this.data.concreting[this.data.concretingIndex],
          date: date,
          phone: phone,
          comment: e.detail.value.comment,
          entering: e.detail.value.entering,
          filiale: e.detail.value.filiale
        },
        success: function() {
          wx.showModal({
            title: '提交成功',
            content: '成功下单，等待搅拌站确认',
          })
        },
      });
    }
  }
})