// pages/msHome/msHome.js

import qqmap from '../../utils/map';
import api from '../../api/api'
import {
  czHome,
} from '../../api/bjUrl/cz'

// 日期选择
var Moment = require("../../utils/moment.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日期选择
    checkInDate: "",
    checkOutDate: "",
    days: "", // 时间差

    bigPeople: 0,
    smallPeople: 0,

    renshu: 'none',

    location: '广州', // 默认位置为广州

    allPeople: '', // 总人数
    city: '广州市' // 请求接口数据 默认未广州市
  },

  // 跳转到搜索
  gotoSarch() {
    wx.navigateTo({
      url: `../msSearchList/msSearchList?city=${this.data.city}&people=${this.data.allPeople}`,
    });
  },

  // 跳转到选择时间
  gotoSelectTime() {
    wx.navigateTo({
      url: '../msSelectTime/msSelectTime',
    });
  },

  // 跳转到目的地选择
  gotoDestination() {
    wx.navigateTo({
      url: '../msDestination/msDestination',
    });
  },

  // 处理加减法事件
  gotoTop_showRS() {
    // 显示租金
    if (this.data.renshu === 'none') {
      this.setData({
        renshu: 'block',
      })
    } else {
      this.setData({
        renshu: 'none'
      })
    }
  },
  closeRS(e) {
    // 通过事件代理data-name的方式阻止向下冒泡
    if (e.target.dataset.name === 'mask') {
      if (this.data.zujin === 'none') {
        this.setData({
          renshu: 'block'
        })
      } else {
        this.setData({
          renshu: 'none'
        })
      }
    }
  },
  // 重置
  chongzhi() {
    this.setData({
      bigPeople: 0,
      smallPeople: 0,
    })
  },

  sendRS() {
    this.setData({
      renshu: 'none',
      allPeople: this.data.bigPeople + this.data.smallPeople
    })
  },

  // 大人加减法
  minus() {
    var bigPeople = this.data.bigPeople
    if (bigPeople === 0) {
      bigPeople = 0
    } else {
      bigPeople -= 1
    }
    this.setData({
      bigPeople: bigPeople
    })
  },

  add() {
    var bigPeople = this.data.bigPeople
    if (bigPeople >= 50) {
      bigPeople = 50
    } else {
      bigPeople += 1
    }
    this.setData({
      bigPeople: bigPeople
    })
  },

  // 小孩加减法
  smallminus() {
    var smallPeople = this.data.smallPeople
    if (smallPeople === 0) {
      smallPeople = 0
    } else {
      smallPeople -= 1
    }
    this.setData({
      smallPeople: smallPeople
    })
  },

  smalladd() {
    var smallPeople = this.data.smallPeople
    if (smallPeople >= 50) {
      smallPeople = 50
    } else {
      smallPeople += 1
    }
    this.setData({
      smallPeople: smallPeople
    })
  },

  // 搜索
  sousuo() {
    // console.log(this.data.city)
    wx.navigateTo({
      url: `../msSearchList/msSearchList?city=${this.data.city}&people=${this.data.allPeople}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取定位地址
    new qqmap().getLocateInfo()
      .then(res => {
        var location = (res.split('市'))[0]
        that.setData({
          location: location,
          city: res
        })
      })

    var checkInDate = Moment(new Date()).format('yyyy-MM-DD') // 当前日期
    var checkOutDate = Moment(new Date()).add(1, 'day').format('yyyy-MM-DD') // 结束日期
    var days = Moment(new Date()).differ(checkInDate, checkOutDate)

    this.setData({
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      days: days
    })

    // 日期选择
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('yyyy-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('yyyy-MM-DD'),
        days: days
      }
    });
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
    // 日期选择
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate,
      days: getDate.days
    })

    var pages = getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 1]; // 当前页面
    this.setData({
      location: prevPage.data.city.split('市')[0]
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