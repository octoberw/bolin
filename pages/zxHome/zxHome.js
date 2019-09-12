// pages/zxHome/zxHome.js
import api from '../../api/api'
import {
  zxHome
} from '../../api/bjUrl/zx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    decorates: '', // 整屋案例
    experiences: '' // 家居经验
  },

  // 案例List跳转
  gotoZxAnliList() {
    wx.navigateTo({
      url: '../zxAnliList/zxAnliList',
    });
  },

  // 经验List跳转
  gotoZxJingyan() {
    wx.navigateTo({
      url: '../zxJingyan/zxJingyan',
    });
  },

  // 跳转到设计师列表
  gotoSJSList() {
    wx.navigateTo({
      url: '../zxSJSList/zxSJSList',
    });
  },

  // 整屋案例详情
  gotoZxAnliListDetails(e) {
    wx.navigateTo({
      url: `../zxAnliListDetails/zxAnliListDetails?id=${e.currentTarget.dataset.id}`,
    });
  },

  // 家居经验详情
  gotoZxJingyanDetails(e) {
    wx.navigateTo({
      url: `../zxJingyanDetails/zxJingyanDetails?id=${e.currentTarget.dataset.id}`,
    });
  },

  // 跳转提交设计
  gotoZxTJXQ() {
    wx.navigateTo({
      url: '../zxTJXQ/zxTJXQ',
    });
  },

  zxHomeApi() {
    api.get(zxHome, {})
      .then(res => {
        console.log(res)
        this.setData({
          decorates: res.decorates,
          experiences: res.experiences
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

    this.zxHomeApi()


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