// pages/dailyClean/dailyClean.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 16,
    latitude: "",
    longitude: "",
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (res)=>{
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            width: 70,
            height: 70,
            iconPath: "../../resources/img/1.png"
          }]
        })
      },
    });
  },

  gotoMore() {
    wx.navigateTo({
      url:"../rimClean/rimClean"
    })
  },
  gotoAppointmentView (){
    wx.navigateTo({
      url:"../appointmentView/appointmentView"
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