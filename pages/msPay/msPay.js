var Moment = require("../../utils/moment.js");
const app = getApp();

import api from '../../api/api'
import {
  homeStayDetail,
  addOrder
} from '../../api/bjUrl/ms'
import wxPay from '../../utils/pay'

// pages/msPay/msPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择日期
    checkInDate: "",
    checkOutDate: "",
    days: "",

    showChildError: 'none', // 传值给popup 隐藏确定按钮

    res: '', //房子详情数据
    roomRate: Number, //总价格,

    peopleID: '',
    peopleName: '',
    people: [],
    isTrue: true
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

  // 添加入住人
  addPeopel() {
    wx.navigateTo({
      url: '../msAddPeopel/msAddPeopel',
    });
  },

  // 删除入住人
  closePeople(e) {
    console.log(e)
    var people = this.data.people
    var newPeople = people.filter(item => {
      return item != people[e.currentTarget.dataset.key]
    })
    this.setData({
      people: newPeople
    })
  },

  // 房屋详情
  homeStayDetail(numData) {
    var that = this
    api.get(homeStayDetail, {
        'num': numData
      })
      .then(res => {
        res.img_url = res.img_url.split(',')[0]
        let getDate = wx.getStorageSync("ROOM_SOURCE_DATE")
        res.tag = res.tag.slice(0, 3)
        that.setData({
          res: res,
          roomRate: res.roomRate * getDate.days + res.tip
        })
        // console.log(that.data.res)
        // console.log(this.data.checkInDate)
        // console.log(this.data.checkOutDate)
      })
  },

  mspay(e) {
    let getLoginId = wx.getStorageSync("LOGIN");
    let token = wx.getStorageSync("TOKEN");

    if (e.detail.value.name == '' || e.detail.value.phone == '' || this.data.people.length <= 0) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1500,
      });
      return
    }

    if (this.data.isTrue) {
      this.setData({
        isTrue: false
      })
      setTimeout(() => {
        this.setData({
          isTrue: true
        })
      }, 1500);
      wx.request({
        url: `${app.globalData.host}${addOrder}`,
        data: {
          'address': this.data.res.address,
          'amountPayable': this.data.roomRate,
          'days': this.data.days,
          'itemVoes': this.data.people,
          'mPoint': '',
          'point': '',
          'memberId': getLoginId.id,
          'num': this.data.res.num,
          'person': e.detail.value.name,
          'phone': e.detail.value.phone,
          'remark': e.detail.value.value,
          'startDate': this.data.checkInDate,
          'endDate': this.data.checkOutDate,
          'tip': parseInt(this.data.res.tip),
          'roomRate': this.data.res.roomRate
        },
        header: {
          'content-type': 'application/json',
          'token': token.token
        },
        method: 'POST',
        success: (res) => {
          console.log(res)
          if (res.data.code === 0) {
            var res = res.data.data
            wx.redirectTo({
              url: `../msPaySuccess/msPaySuccess?hs=${res.hs}&id=${res.id}`
            });
          }
        },
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.homeStayDetail(options.num)
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
    // 日期选择
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate,
      days: getDate.days,
    })

    var peopleArr = this.data.people
    var pages = getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 1]; // 当前页面
    var peopleObj = {}
    if (prevPage.data.peopleName && prevPage.data.peopleID) {
      peopleObj.k = prevPage.data.peopleName
      peopleObj.v = prevPage.data.peopleID
      peopleArr.push(peopleObj)
      this.setData({
        people: peopleArr,
      })
      let obj = {}
      var newPeopleArr = this.data.people.reduce((cur, next) => {
        obj[next.v] ? "" : obj[next.v] = true && cur.push(next);
        return cur;
      }, [])
      if (this.data.people.length > newPeopleArr.length) {
        wx.showToast({
          title: '用户已存在',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      }
      this.setData({
        people: newPeopleArr,
      })
      console.log('newPeopleArr', newPeopleArr)
      prevPage.data.peopleName = ''
      prevPage.data.peopleID = ''
    }
    // console.log('people', peopleArr)

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