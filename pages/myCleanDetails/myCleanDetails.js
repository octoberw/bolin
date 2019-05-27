// pages/myCleanDetails/myCleanDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancel: false,
    foot: '取消订单',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获得popup组件
    this.popup = this.selectComponent("#popup")
  },

  showPopup: function () {
    this.popup.showPopup()
  },

  _error: function () {
    console.log('你取消了')
    this.setData({
      cancel: !this.data.cancel,
      foot:'订单已取消'
    })
    this.popup.hidePopup()
  },
  _success: function () {
    console.log('你确定了')
    this.popup.hidePopup()
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