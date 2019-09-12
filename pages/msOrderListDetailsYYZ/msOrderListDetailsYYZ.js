import api from '../../api/api'
import {
  orderDetail,
  cancelOrder,
  addEvalute
} from '../../api/bjUrl/ms'
import msPay from '../../utils/pay'

// pages/msPay/msPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChildError: 'none', // 传值给popup 隐藏确定按钮

    hideview: 'none', // 显示取消

    res: '', // 订单详情数据

    id: '',
    
    isPay: true,

    apiUrl: addEvalute
  },

  // 显示预约确定页面
  showYuyue() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    });
    if(!this.data.res.isCanceled) {
      wx.showToast({
        title: '已过取消时间，如有问题请联系客服',
        icon: 'none',
        duration: 1500,
      });
      return 
    } else {
      this.setData({
        hideview: 'block'
      })
    }
  },

  // 放弃取消订单
  colseYuyue() {
    this.setData({
      hideview: 'none'
    })
  },

  // 确认取消订单
  cancelYuyue() {
    this.cancelOrder(this.data.res.hs)
    this.setData({
      hideview: 'none'
    })
    wx.redirectTo({
      url: '../msOrderList/msOrderList',
    });
  },


  // 跳转到选择时间
  gotoSelectTime() {
    wx.navigateTo({
      url: '../msSelectTime/msSelectTime',
    });
  },

  // 点击显示内圈
  showNq: function () {
    if (this.data.showdisplay === 'none') {
      this.setData({
        showdisplay: 'block'
      })
    } else {
      this.setData({
        showdisplay: 'none'
      })
    }
  },

  // 取消订单接口
  cancelOrder(hsData) {
    api.post(cancelOrder, {
        'hs': hsData
      })
      .then(res => {
        console.log(res)
      })
  },

  // 订单详情接口
  orderDetail(orderIdData) {
    var that = this
    api.post(orderDetail, {
        'orderId': orderIdData
      })
      .then(res => {
        if(res.evaluate) {
          if(res.evaluate.star) {
            res.evaluate.star = parseInt(res.evaluate.star)
          }
          if(res.evaluate.labels) {
            res.evaluate.labels = res.evaluate.labels.split('#')
          }
        }
        that.setData({
          res: res
        })
        console.log(that.data.res)
      })
  },

  // 支付接口
  gotoPay() {
    if (this.data.isPay === true) {
      this.send_pay()
    }
    setTimeout(() => {
      this.setData({
        isPay: true
      })
    }, 2000);
  },

  send_pay() {
    this.setData({
      isPay: false
    })
    msPay.Pay('/wechat/pay/homeOrderPay.htm', this.data.res.hs, 'hs')
    .then((rest) => {
      if (rest === 'succ') {
        wx.redirectTo({
          url: `../msOrderListDetailsYYZ/msOrderListDetailsYYZ?id=${this.data.id}`,
        });
      } else if (rest === 'fail') {
        wx.showToast({
          title: '支付取消',
          icon: 'none',
          duration: 1500,
        });
      }
    })
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
          url: `../../pages/msOrderListDetailsYYZ/msOrderListDetailsYYZ?id=${e.detail.toSunSn}`,
        })
      }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.comment = this.selectComponent('#comment')

    this.orderDetail(options.id)
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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