// pages/homeMyFankui/homeMyFankui.js
import api from '../../api/api'
import {
  addFeedBack
} from '../../api/bjUrl/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindFankui(e) {
    api.post(addFeedBack,{
        'content': e.detail.value.val,
        'email': e.detail.value.email,
        'phone': e.detail.value.phone
      })
      .then(res => {
        if(res == 'ok') {
          wx.redirectTo({url: '/pages/homeMyFankuiSucc/homeMyFankuiSucc'});
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 1500,
          });
          return
        }
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