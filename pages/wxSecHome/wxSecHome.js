// pages/wxSecHome/wxSecHome.js
import api from '../../api/api'
import {
  secondIndex
} from '../../api/bjUrl/wx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    secId: 0,
    thirdid:0,
    secList: [] //全部内容
  },

  gotoMTST(e) {
    this.setData({
      thirdid: e.target.dataset.thirdid
    })
    wx.navigateTo({
      url: `../wxMTST/wxMTST?thirdid=${this.data.thirdid}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      secId: options.secondid
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
    api.get(secondIndex, {
        'id': this.data.secId
      })
      .then(res => {
        this.setData({
          secList: res
        })
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