// pages/myClean/myClean.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [
      '全部订单',
      '待支付',
      '待分配',
      '已分配',
      '已完成',
      '以取消'
    ],
    cleaner: [{
        id: 1,
        name: '李阿姨',
        times: ['9:00~11:00', '13:00~15:00']
      },
      {
        id: 2,
        name: '吴阿姨',
        times: ['9:00~11:00', '13:00~15:00']
      },
      {
        id: 3,
        name: '张阿姨',
        times: ['9:00~11:00', '13:00~15:00']
      },
      {
        id: 4,
        name: '王阿姨',
        times: ['9:00~11:00', '13:00~15:00']
      },
    ],
    num: 0
  },

  bindViewTap: function (e) {
    this.setData({
      num: e.target.dataset.num
    })
    console.log(e)
  },
  gotoWxDetails: function () {
    wx.navigateTo({
      url: '../wxOrderDetails/wxOrderDetails',
    })
  },
  gotoComment:function () {
    wx.navigateTo({
      url:'../myCleanComment/myCleanComment'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})