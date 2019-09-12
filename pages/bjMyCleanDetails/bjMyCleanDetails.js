// pages/myCleanDetails/myCleanDetails.js
import api from '../../api/api'
import {
  orderDetail,
  cancelOrder,
  addCleanEvalute
} from '../../api/bjUrl/cleaningOrder'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancel: '',
    foot: '取消订单',
    details: {},
    arrTimes: [],
    sn: '',
    cleanerId:'',
    apiUrl: addCleanEvalute
  },


  showPopup: function () {
    this.popup.showPopup()
  },
  _error: function () {
    console.log('你确定取消了')
    this.popup.hidePopup()
    console.log(this.data.sn)

    // 拼接sn到请求url
    var newCancelOrder = cancelOrder //+ '?sn=' + this.data.sn
    api.post(newCancelOrder, {
        sn: this.data.sn,

      })
      .then(res => {
        console.log(res)
      })

    api.get(orderDetail, {
        'sn': this.data.sn
      })
      .then(res => {
        console.log(res)
        this.setData({
          details: res,
          sn: res.cleanOrder.sn
        })
      })

  },
  _success: function () {
    console.log('你放弃取消了')
    this.popup.hidePopup()
  },


  showComment() {
    this.comment.showCom()
  },
  _hideComErr() {
    console.log('你放弃取消了')
    this.comment.hideCom()
  },
  _hideComSucc(e) {
    console.log('你确定取消了')
    this.comment.hideCom()
    console.log('111', e)
    if (e.detail.toSunSn) {
      wx.redirectTo({
        url: `../../pages/bjMyCleanCommentDone/bjMyCleanCommentDone?sn=${e.detail.toSunSn}`,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取全部订单的sn码
    var sn = options.sn
    this.setData({
      sn: sn
    })
    console.log('sn:', this.data.sn)
    var arr = []

    // 请求预约详情得接口
    api.get(orderDetail, {
        'sn': sn
      })
      .then(res => {
        console.log(res)
        this.setData({
          details: res,
          // sn: res.cleanOrder.sn
        })

        for (let i of res.timePeriod) {
          switch (i.timePeriod) {
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
        }
        this.setData({
          arrTimes: arr
        })
      })

    this.comment = this.selectComponent('#comment')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获得popup组件
    this.popup = this.selectComponent("#popup")
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