// pages/zfOrderListDetails/zfOrderListDetails.js
import api from '../../api/api'
import {
  orderDetail,
  cancelOrder
} from '../../api/bjUrl/cz'

import wxPay from '../../utils/pay'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: '', // 详情数据
    id: '' // 订单id
  },

  // 取消订单
  showYuyue() {
    api.post(cancelOrder, {
        'id': this.data.id
      })
      .then(res => {
        if(res==='操作成功'){
          wx.navigateBack({
            delta: 1
          });
        }
      })
  },

  pay() {
    wxPay.Pay('/wechat/pay/rentOrderPay.htm', this.data.res.rt, 'ts')
    .then((rest) => {
      if (rest === 'succ') {
        wx.redirectTo({
          url: `/pages/zfOrderListDetails/zfOrderListDetails?id=${this.data.res.id}`,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    that.setData({
      id: options.id
    })

    api.get(orderDetail, {
        'id': options.id
      })
      .then(res => {
        console.log(res)
        that.setData({
          res: res
        })
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