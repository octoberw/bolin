// pages/fdHome/fdHome.js
import api from '../../api/api'
import {
  image
} from '../../api/bjUrl/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headData: ['业主委托', '民宿合作', '房屋管家', '投资合作'],
    num: 0,

    on: 'block',
    off: 'none',

    yzwt: 'block',
    mshz: 'none',
    fwgj: 'none',
    tzhz: 'none'
  },

  tapCall(){
    wx.makePhoneCall({
      phoneNumber: '020-89449859',
    });
  },

  gotoppgy() {
    wx.navigateTo({
      url: '../homeLandlordContent/homeLandlordContent?num=1',
    });
  },

  gotojpjd() {
    wx.navigateTo({
      url: '../homeLandlordContent/homeLandlordContent?num=2',
    });
  },

  gotoTZHZ() {
    if (this.data.tzhz === 'block') {
      wx.navigateTo({
        url: '../homeLandlordTZHZtwo/homeLandlordTZHZtwo',
      });
    } else if (this.data.yzwt === 'block') {
      wx.navigateTo({
        url: '../homeLandlordTZHZ/homeLandlordTZHZ?type=Yezhu',
      });
    } else if (this.data.mshz === 'block') {
      wx.navigateTo({
        url: '../homeLandlordTZHZ/homeLandlordTZHZ?type=MinSu',
      });
    } else if (this.data.fwgj === 'block') {
      wx.navigateTo({
        url: '../homeLandlordTZHZ/homeLandlordTZHZ?type=fangWu',
      });
    }
  },

  comeback() {
    wx.switchTab({
      url: '../home/home',
    });
  },

  openOn() {
    this.setData({
      on: 'none',
      off: 'block'
    })
  },

  // 客服回调函数 触发客服的时候关闭客服按钮
  bindcnt(e) {
    this.setData({
      on: 'block',
      off: 'none'
    })
  },

  bindHead(e) {
    this.setData({
      num: e.currentTarget.dataset.index
    })
    var num = this.data.num
    switch (num) {
      case 0:
        this.setData({
          yzwt: 'block',
          mshz: 'none',
          fwgj: 'none',
          tzhz: 'none'
        })
        break;
      case 1:
        this.setData({
          yzwt: 'none',
          mshz: 'block',
          fwgj: 'none',
          tzhz: 'none'
        })
        break;
      case 2:
        this.setData({
          yzwt: 'none',
          mshz: 'none',
          fwgj: 'block',
          tzhz: 'none'
        })
        break;
      case 3:
        this.setData({
          yzwt: 'none',
          mshz: 'none',
          fwgj: 'none',
          tzhz: 'block'
        })
        break;

      default:
        break;
    }
  },

  image() {
    api.get(image, {})
      .then(res => {
        console.log(res)
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
    wx.hideTabBar({
      animation: true,
    });
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