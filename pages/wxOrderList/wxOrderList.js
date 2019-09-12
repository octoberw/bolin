// pages/myClean/myClean.js
import api from '../../api/api'
import {
  orderList
} from '../../api/bjUrl/wx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [{
        name: '全部订单',
        key: ''
      },
      {
        name: '待支付',
        key: 'noPay'
      },
      {
        name: '待审核',
        key: 'checking'
      },
      {
        name: '待分配',
        key: 'assigning'
      },
      {
        name: '已分配',
        key: 'assigned'
      },
      {
        name: '已完成',
        key: 'finish'
      },
      {
        name: '已取消',
        key: 'cancel'
      }
    ],
    num: 0,
    key: '',
    orderList: '', // 订单列表
    timePeriod: []
  },

  getList(status) {
    var that = this
    let getId = wx.getStorageSync("LOGIN");

    var arr = []
    api.get(orderList, {
        'memberId': getId.id,
        'status': status
      })
      .then(res => {
        if(res == '暂无数据') {
          this.setData({
            orderList: ''
          })
          return 
        }
        for (let i of res.orderList) {
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
        for (let i = 0; i < res.orderList.length; i++) {
          var item = (res.orderList)[i]
          item.date = item.date.split(' ')[0]
          item.timePeriod = arr[i]
        }
        that.setData({
          orderList: res.orderList,
        })
      })
  },

  bindViewTap: function (e) {
    this.setData({
      num: e.target.dataset.num,
      key: e.target.dataset.key
    })
    this.getList(this.data.key)
  },
  gotoWxDetails: function (e) {
    wx.navigateTo({
      url: `../wxOrderDetails/wxOrderDetails?id=${e.currentTarget.dataset.id}&status=${e.currentTarget.dataset.status}`,
    })
  },
  gotoComment: function () {
    wx.navigateTo({
      url: '../myCleanComment/myCleanComment'
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
    this.getList(this.data.key)
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