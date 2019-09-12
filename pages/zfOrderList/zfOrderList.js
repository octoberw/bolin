// pages/myClean/myClean.js
import api from '../../api/api'
import {
  rentOrders
} from '../../api/bjUrl/cz'

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
        key: 'nopay'
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
    resList: [], // 订单列表
    timePeriod: []
  },

  getList(status) {
    var that = this
    let getLoginId = wx.getStorageSync("LOGIN");
    api.get(rentOrders, {
        'memberId': getLoginId.id,
        'status': status
      })
      .then(res => {
        if(res.orderList.length<=0) {
          this.setData({
            resList:''
          })
          return
        }
        console.log(res)
        for (let i = 0; i < res.orderList.length; i++) {
          (res.orderList)[i].date = ((res.orderList)[i].date.split(' '))[0]
        }
        // res.orderList.date = res.orderList.date.split(' ')
        that.setData({
          resList: res.orderList
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
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../zfOrderListDetails/zfOrderListDetails?id=${e.currentTarget.dataset.id}`,
    });
  },
  gotoComment: function (e) {
    // wx.navigateTo({

    // })
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