import api from '../../api/api'
import {
  detail
} from '../../api/bjUrl/user'
// pages/homeMyRZXZ/homeMyRZXZ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: ''
  },

  detail() {
    api.get(detail)
      .then(res => {
        res.content = res.content.replace(/\<img/g, '<img style="width:100%;height:auto;display:block"')
        this.setData({
          res: res
        })
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
    this.detail()
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