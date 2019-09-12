// pages/homeLandlordContent/homeLandlordContent.js
import api from '../../api/api'
import {
  jpjd,
  ppgy,
} from '../../api/bjUrl/fd'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    num:''
  },

  // 品牌公寓
  ppgy() {
    api.get(ppgy, {})
      .then(res => {
        console.log(res)
        this.setData({
          content: res.content.replace(/\<img/g, '<img style="width:auto;height:auto;display:block"')
        })
      })
  },

  // 精品酒店
  jpjd() {
    api.get(jpjd, {})
      .then(res => {
        console.log(res)
        this.setData({
          content: res.content.replace(/\<img/g, '<img style="width:auto;height:auto;display:block"')
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: options.num
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
    if(this.data.num == 1) {
      this.ppgy()
      wx.setNavigationBarTitle({
        title: '品牌公寓',
      });
    } else if(this.data.num == 2) {
      this.jpjd()
      wx.setNavigationBarTitle({
        title: '精品酒店',
      });
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