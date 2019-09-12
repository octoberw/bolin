// pages/wxMTST/wxMTST.js

import api from '../../api/api'
import {
  serverDetail
} from '../../api/bjUrl/wx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thirdId: 0,
    thirdIdList: [], // 全部数据
    item: [], // 项目价钱
    content: "", // 富文本内容
  },

  // 咨询热线
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '020-8944 9859',
    });
  },

  // 非柏林下单
  gotoNoBlOrder() {
    wx.navigateTo({
      url: `../wxBlOrder/wxBlOrder?wxId=${this.data.thirdId}&isBoLin=2`,      
    });
  },


  //泊邻下单
  gotoBlOrder() {
    wx.navigateTo({
      url: `../wxBlOrder/wxBlOrder?wxId=${this.data.thirdId}&isBoLin=1`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      thirdId: parseInt(options.thirdid)
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
    var that = this
    api.get(serverDetail, {
        'id': this.data.thirdId
      })
      .then(res => {
        console.log(res)
        wx.setNavigationBarTitle({
          title: res.server.name,
        });
        that.setData({
          thirdIdList: res.server,
          item: JSON.parse(res.server.item),
          content: res.server.content.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"'),
          wxId: parseInt(res.server.id)
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