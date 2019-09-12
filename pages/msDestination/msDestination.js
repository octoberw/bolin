// pages/msDestination/msDestination.js
import api from '../../api/api'
import {
  destination
} from '../../api/bjUrl/ms'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: ''
  },

  sendCity(e) {
    console.log(e.currentTarget.dataset.city)
    var pages = getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      city: e.currentTarget.dataset.city, // 状况描述的图片
    })
    wx.navigateBack({
      delta: 1
    });
  },

  destination() {
    api.get(destination, {})
      .then(res => {
        var res = res.cities
        let resObj = {}
        res.forEach(obj => {
          let arr = resObj[obj['letter']] || []
          arr.push(obj.city)
          resObj[obj['letter']] = arr
        });
        this.setData({
          res: resObj
        })
        console.log(this.data.res)
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
    this.destination()
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