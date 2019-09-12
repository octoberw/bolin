var Moment = require("../../utils/moment.js");

// pages/msPay/msPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择日期
    checkInDate: "",
    checkOutDate: "",

    showChildError: 'none', // 传值给popup 隐藏确定按钮

    hideview: 'none',  // 显示取消
  },

    // 显示预约确定页面
    showYuyue() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      });
      this.setData({
        hideview: 'block'
      })
    },
    
    colseYuyue(){
      this.setData({
        hideview: 'none'
      })
    },

  // 跳转到选择时间
  gotoSelectTime() {
    wx.navigateTo({
      url: '../msSelectTime/msSelectTime',
    });
  },

  // 点击显示内圈
  showNq: function () {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 日期选择
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('yyyy-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('yyyy-MM-DD')
      }
    });
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
    // 日期选择
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate
    })
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