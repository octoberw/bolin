// pages/wxComment/wxComment.js

import api from '../../api/api'
import {
  moreEvaluate
} from '../../api/bjUrl/wx'
import {
  bjmoreEvaluate
} from '../../api/bjUrl/cleaningOrder'
import {
  msmoreEvaluate
} from '../../api/bjUrl/ms'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: "1", // 评论内容数组
    total: '',
    fr: ''
  },

  showImage() {
    wx.previewImage({
      current: '',
      urls: [],
    });
  },

  bjmoreEvaluate() {
    api.get(bjmoreEvaluate)
      .then(res => {
        for (let i of res.evaluates) {
          i.star = parseInt(i.star)
        }
        this.setData({
          res: res.evaluates,
          total: res.total
        })
      })
  },

  wxmoreEvaluate() {
    api.get(moreEvaluate)
      .then(res => {
        for (let i of res.evaluates) {
          i.star = parseInt(i.star)
        }
        this.setData({
          res: res.evaluates,
          total: res.total
        })
      })
  },

  msmoreEvaluate() {
    api.get(moreEvaluate)
    .then(res => {
      for (let i of res.evaluates) {
        i.star = parseInt(i.star)
      }
      this.setData({
        res: res.evaluates,
        total: res.total
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fr: options.fr
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
    if (this.data.fr == 'wx') {
      this.wxmoreEvaluate()
    } else if (this.data.fr == 'bj') {
      this.bjmoreEvaluate()
    } else if (this.data.fr == 'ms') {
      this.msmoreEvaluate()
    }
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