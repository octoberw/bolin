// pages/homeMySCJ/homeMySCJ.js
import api from '../../api/api'
import {
  showCollects
} from '../../api/bjUrl/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: ''
  },

  tapid(e) {
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.exist == 'false') {
      wx.showToast({
        title: '文章已被删除',
        icon: 'none',
        duration: 1500,
      });
    } else if (e.currentTarget.dataset.type === 'Experience') {
      wx.navigateTo({
        url: `../zxJingyanDetails/zxJingyanDetails?id=${e.currentTarget.dataset.id}`,
      });
    } else if(e.currentTarget.dataset.type === 'LongRent') {
      wx.navigateTo({
        url: `/pages/homeTjListDetail/homeTjListDetail?id=${e.currentTarget.dataset.id}&yuyue=LongRent`,
      });
    }
    else if(e.currentTarget.dataset.type === 'ShorTerm') {
      wx.navigateTo({
        url: `/pages/homeTjListDetail/homeTjListDetail?id=${e.currentTarget.dataset.id}&yuyue=ShorTerm`,
      });
    }
  },

  gotoZxJingyanDetails(e) {

  },

  showCollects() {
    api.get(showCollects, {})
      .then(res => {
        console.log(res)
        if (res === '暂无收藏!') {
          this.setData({
            res: ''
          })
        } else {
          this.setData({
            res: res.collections
          })
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
    this.showCollects()
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