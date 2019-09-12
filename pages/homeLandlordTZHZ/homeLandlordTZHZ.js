// pages/homeLandlordTZHZ/homeLandlordTZHZ.js
import api from '../../api/api'
import {
  yxjm
} from '../../api/bjUrl/fd'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:''
  },

  bindTJXQ(e) {
    wx.getStorage({
      key: 'LOGIN',
      success: (result) => {
        api.post(yxjm, {
            'address': e.detail.value.fwzk,
            'area': e.detail.value.area,
            'locations': e.detail.value.city,
            'message': e.detail.value.val,
            'person': e.detail.value.name,
            'phone': e.detail.value.phone,
            'plot': e.detail.value.house,
            'type': this.data.type,
            'weChat': e.detail.value.wxid,
            'memberId': result.data.id
          })
          .then(res => {
            console.log(res)
            if (res == 'ok') {
              wx.redirectTo({
                url: '../homeLandlordSucc/homeLandlordSucc',
              });
            }
          })
      },
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type
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