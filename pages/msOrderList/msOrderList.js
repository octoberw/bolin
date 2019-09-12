// pages/msOrderList/msOrderList.js
import api from '../../api/api'
import {
  homeStayOrders
} from '../../api/bjUrl/ms'

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
        name: '预约中',
        key: 'booking'
      },
      {
        name: '待支付',
        key: 'nopay'
      },
      {
        name: '已取消',
        key: 'cancel'
      },
      {
        name: '待入住',
        key: 'servicing'
      },
      {
        name: '待评价',
        key: 'commenting'
      },
      {
        name: '已评价',
        key: 'commented'
      }
    ],
    num: 0,
    status: '',

    // 全部订单
    res: '',
    userId:''
  },

  bindViewTap: function (e) {
    this.setData({
      num: e.target.dataset.num,
      status: e.target.dataset.key
    })
    this.homeStayOrders(this.data.status)
    console.log(e)
  },

  gotoDetails: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../msOrderListDetailsYYZ/msOrderListDetailsYYZ?id=${e.currentTarget.dataset.id}`,
    })
  },
  gotoComment: function () {
    wx.navigateTo({
      url: '../myCleanComment/myCleanComment'
    })
  },

  homeStayOrders(statusData) {
    let getId = wx.getStorageSync("LOGIN");

    api.get(homeStayOrders, {
        'memberId': getId.id,
        'status': statusData
      })
      .then(res => {
        if(res.orders.length<=0) {
          this.setData({
            res: ''
          })
          return
        }
        for(let i of res.orders) {
          i.createDate = i.createDate.split('.')[0]
          i.startDate = i.startDate.split(' ')[0]
          i.endDate = i.endDate.split(' ')[0]
        }
        console.log(res)
        this.setData({
          res: res.orders
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
    this.homeStayOrders(this.data.status)
    let getId = wx.getStorageSync("LOGIN");
    this.setData({
      userId: getId.id,
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