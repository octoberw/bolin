// pages/myCleanDetails/myCleanDetails.js
import api from '../../api/api'
import {
  orderDetail,
  cancelOrde,
  addEvaluate
} from '../../api/bjUrl/wx'
import {
  getMemberPoint,
  calculate
} from '../../api/bjUrl/user'
import wxPay from '../../utils/pay'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [],
    id: '',
    isPay: true,
    apiUrl: addEvaluate
  },


  getList(data) {
    var that = this
    var arr = []
    api.get(orderDetail, {
        'id': data
      })
      .then(res => {
        switch (res.order.timePeriod) {
          case 'one':
            arr.push('08:00-09:00')
            break;
          case 'two':
            arr.push('09:00-10:00')
            break;
          case 'three':
            arr.push('10:00-11:00')
            break;
          case 'four':
            arr.push('11:00-12:00')
            break;
          case 'five':
            arr.push('13:00-14:00')
            break;
          case 'six':
            arr.push('14:00-15:00')
            break;
          case 'seven':
            arr.push('15:00-16:00')
            break;
          case 'eight':
            arr.push('16:00-17:00')
            break;
          case 'nine':
            arr.push('19:00-20:00')
            break;
          case 'ten':
            arr.push('20:00-21:00')
            break;
          case 'eleven':
            arr.push('21:00-22:00')
            break;
        }
        res.order.date = res.order.date.split(' ')[0]
        res.order.createDate = res.order.createDate.split('.')[0]
        res.order.timePeriod = arr
        if (res.evaluate && res.evaluate.star != null) {
          res.evaluate.star = parseInt(res.evaluate.star)
        }
        if (res.evaluate && res.evaluate.labels != null) {
          var newLabels = res.evaluate.labels.split('#')
          res.evaluate.labels = newLabels.filter(item => item)
        }
        if (res.order.tags != null) {
          var newTags = res.order.tags.split('#')
          res.order.tags = newTags.filter(item => item)
        }
        that.setData({
          res: res
        })
        console.log(this.data.res)
      })
  },

  // 取消服务
  showPopup: function () {
    this.popupcancel.showPopup()
  },

  _error: function (e) {
    var that = this
    console.log('你取消订单了')
    api.post(cancelOrde, {
        'id': that.data.res.order.id,
        'reason': e.detail
      })
      .then(res => {
        console.log(res)
        that.getList(that.data.res.order.id)
      })
    that.popupcancel.hidePopup()
    that.popupcancel.cleanVal()
  },
  _success: function () {
    console.log('你放弃取消订单了')
    this.popupcancel.hidePopup()
    this.popupcancel.cleanVal()
  },

  // 评论
  showComment() {
    this.comment.showCom()
  },
  _hideComErr() {
    this.comment.hideCom()
  },
  _hideComSucc(e) {
    this.comment.hideCom()
    if (e.detail.toSunSn) {
      console.log('e',e)
      wx.redirectTo({
        url: `../../pages/wxOrderDetails/wxOrderDetails?id=${e.detail.toSunSn}`,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.getList(options.id)
    this.popupcancel = this.selectComponent("#popup")
    this.comment = this.selectComponent('#comment')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  gotoDetailsCancel() {
    wx.navigateTo({
      url: '../wxOrderDetailsCancel/wxOrderDetailsCancel',
    })
  },

  gotoDetailsPay() {
    if (this.data.isPay === true) {
      this.pay()
    }
    setTimeout(() => {
      this.setData({
        isPay: true
      })
    }, 3500);
  },

  pay() {
    this.setData({
      isPay: false
    })
    wxPay.Pay('/wechat/pay/maintainOrderPay.htm', this.data.res.order.os, 'os')
      .then((rest) => {
        if (rest === 'succ') {
          wx.redirectTo({
            url: `../wxOrderDetails/wxOrderDetails?id=${this.data.id}`,
          })
        } else if (rest === 'fail') {
          wx.showToast({
            title: '支付已取消',
            icon: 'none',
            duration: 1500,
          });
        }
      })
  },

  getMemberPoint() {
    api.get(getMemberPoint, {})
    .then(res => {
      this.setData({
        jifenduihuan: res.ratio
      })
    })
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