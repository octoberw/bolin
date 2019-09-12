import api from '../../api/api'
import {
  maintainIndex
} from '../../api/bjUrl/wx'
// pages/wxHome/wxHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 全部内容
    evaluateList: [] //评论内容
  },

  gotoSecHome(e) {
    var secondid = e.target.dataset.secondid
    wx.navigateTo({
      url: `../wxSecHome/wxSecHome?secondid=${secondid}`,
    });
  },

  gotoMTWX(e) {
    var thirdid = e.target.dataset.thirdid
    wx.navigateTo({
      url: `../wxMTST/wxMTST?thirdid=${thirdid}`,
    });
  },

  gotoComment() {
    wx.navigateTo({
      url: '../wxComment/wxComment?fr=wx',
    });
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
    var that = this
    api.get(maintainIndex, {})
      .then(res => {
        that.setData({
          evaluateList: res.evaluateList,
          list: res.list
        })
        console.log(that.data.evaluateList)
        console.log(that.data.list)
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