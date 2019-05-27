// pages/wxNoBlOrder/wxNoBlOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdisplay: 'block',
    showChildError: 'none' // 传值给popup 隐藏确定按钮
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.popup = this.selectComponent("#popup")
    this.selecttime = this.selectComponent("#selecttime")
  },

  // 点击显示内圈
  showNq: function () {
    console.log(this.data.showdisplay)
    if (this.data.showdisplay === 'none') {
      this.setData({
        showdisplay: 'block'
      })
    } else {
      this.setData({
        showdisplay: 'none'
      })
    }
  },

  // 显示条款界面
  showPopup: function () {
    this.popup.showPopup()
  },

  // 确定回调
  _error: function () {},

  // 取消回调
  _success: function () {
    console.log('你确定了')
    if (this.data.showdisplay === 'none') {
      this.setData({
        showdisplay: 'block'
      })
    }
    this.popup.hidePopup()
  },

  showSelectTime: function () {
    this.selecttime.showSelectTime()
  },
  _successSelect: function () {
    this.selecttime.hideSelectTime()
  },

  gotoLocation: function () {
    wx.navigateTo({
      url: '../location/location'
    })
  },

  gotoConfirmOrder: function () {
    wx.navigateTo({
      url: '../confirmOrder/confirmOrder'
    })
  },

  showNoBlDescribe: function () {
    wx.navigateTo({
      url: '../wxNoBlDescribe/wxNoBlDescribe'
    })
  },

  showNoBlRemark: function () {
    wx.navigateTo({
      url: '../wxNoBlRemark/wxNoBlRemark'
    })
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