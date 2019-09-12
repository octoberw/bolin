import verify from '../../utils/verify'

// pages/msAddPeopel/msAddPeopel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id_pass: false,
    id_pass_cha: false,
    id_val: "",
    name_pass: false,
    name_pass_cha: false,
    name_val: ""
  },

  bind_ID(e) {
    var pass = verify.ID(e)
    console.log('pass', pass)
    if (pass.length >= 2) {
      this.setData({
        id_pass: pass[0],
        id_val: pass[1],
        id_pass_cha: false
      })
    } else {
      this.setData({
        id_pass_cha: true,
        id_pass: false,
      })
    }
  },

  bind_name(e) {
    var name = verify.name(e)
    console.log('name', name)
    if (name != undefined) {
      this.setData({
        name_pass: true,
        name_val: name[0],
        name_pass_cha: false
      })
    } else {
      this.setData({
        name_pass_cha: true,
        name_pass: false,
      })
    }
  },

  addPeople() {
    if (this.data.id_pass && this.data.name_pass) {
      var pages = getCurrentPages(); //  获取页面栈
      var prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.setData({
        peopleID: this.data.id_val,
        peopleName: this.data.name_val
      })
      wx.navigateBack({
        delta: 1
      });
    }
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