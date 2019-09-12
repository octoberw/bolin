import api from '../../api/api'
import {
  pointList
} from '../../api/bjUrl/user'

// pages/homeMyJfmx/homeMyJfmx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [],
    pageNumber: '',
    totalPage: ''
  },

  pointList(pageNumberData) {
    api.get(pointList, {
        'pageNumber': pageNumberData ? pageNumberData : 1
      })
      .then(res => {
        for (let i of res.pointList) {
          i.changePoint = parseInt(i.changePoint)
          i.createDate = i.createDate.split('.')[0]
        }
        this.setData({
          res: this.data.res.concat(res.pointList),
          pageNumber: res.pageNumber,
          totalPage: res.totalPage
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
    this.pointList()
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
    if(this.data.pageNumber<this.data.totalPage) {
      this.pointList(this.data.pageNumber+1)
    } else {
      wx.showToast({
        title: '已无更多',
        icon: 'none',
        duration: 1500,
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})