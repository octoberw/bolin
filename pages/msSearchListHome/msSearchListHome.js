// pages/rimClean/rimClean.js

// 日期选择
var Moment = require("../../utils/moment.js");

import api from '../../api/api'
import {
  homeStayDetail
} from '../../api/bjUrl/ms'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 16,
    markers: [],
    show: true,
    hideview: 'none', // 显示预约

    // 选择日期
    checkInDate: "",
    checkOutDate: "",
    days: "",

    // 详情数据
    res: [], // 详情总数据
    imgArr: [], // 图片预览集合
    current: 0, // 图片集下标
    latitude: Number,
    longitude: Number,
    otherProperty: [], // 更多
    content: "", // 副文本内容
    minFacilities: [], // 配套设置少于8个
    facilities: [], // 配套设置大于8个
    showFac: false, //配套设置展示
    showAll: '展示全部',
  },

  cons(){
    wx.makePhoneCall({
      phoneNumber: '13119640013',
    });
  },

  callLandlord(){
    wx.makePhoneCall({
      phoneNumber: res.phone,
    });
  },

  // 显示预约确定页面
  showYuyue() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    });
    this.setData({
      hideview: 'block'
    })
  },

  colseYuyue() {
    this.setData({
      hideview: 'none'
    })
  },

  // 跳转到选择时间
  gotoSelectTime() {
    wx.navigateTo({
      url: '../msSelectTime/msSelectTime',
    });
  },

  clickShow() {
    this.setData({
      show: !this.data.show
    })
  },

  gotoPay() {
    wx.navigateTo({
      url: `../msPay/msPay?num=${this.data.res.num}`,
    });
  },

  // gotoAppointment() {
  //   wx.navigateTo({
  //     url: '../zfAppointment/zfAppointment',
  //   });
  // },

  // 图片预览器
  previewImage() {
    var that = this
    wx.previewImage({
      current: that.data.imgArr[that.data.current],
      urls: that.data.imgArr,
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });
  },

  changeCurrent(e) {
    this.setData({
      current: e.detail.current
    })
  },

  gotoZfListHome(e) {
    this.homeStayDetail(e.currentTarget.dataset.num)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    });
  },

  // 展示全部配套设置
  showFacilities() {
    this.setData({
      showFac: !(this.data.showFac),
    })
    if (this.data.showAll == '展示全部') {
      this.setData({
        showAll: '收起'
      })
    } else {
      this.setData({
        showAll: '展示全部'
      })
    }
  },

  // 请求rentDetail接口
  homeStayDetail(numData) {
    var that = this
    return new Promise((resolve, reject) => {
      var that = this
      api.get(homeStayDetail, {
          'num': numData
        })
        .then(res => {
          var imgArr = []
          var minFacilities = []

          if (res.img_url != null) {
            imgArr = res.img_url.split(',')
          }
          if (res.facilities.length > 8) {
            for (let i = 0; i < 7; i++) {
              minFacilities.push((res.facilities)[i])
            }
          }

          if (res.likeTags) {
            for (let i = 0; i < res.like.length; i++) {
              var newLike = (res.like)[i].id
              newLike = []
              for (let j = 0; j < res.likeTags.length; j++) {
                if ((res.likeTags)[j].parentId == (res.like)[i].id) {
                  newLike.push((res.likeTags)[j])
                }
              }
              (res.like)[i].id = newLike.length > 2 ? newLike.slice(0, 2) : newLike
            }
          }

          var property = res.property ? JSON.parse(res.property) : ''

          if(res.evaluates) {
            for(let i of res.evaluates) {
              if(i.star) {
                i.star = parseInt(i.star)
              }
            }
          }

          console.log(res)

          that.setData({
            res: res,
            imgArr: imgArr,
            otherProperty: property,
            content: res.content,
            facilities: res.facilities,
            minFacilities: minFacilities
          })
          resolve([res.latitude, res.longitude])
          wx.setNavigationBarTitle({
            title: res.title,
          });
        })
      // res(this.data.res.latitude,this.data.res.longitude)
      // console.log(that.data.res)
      // res(this.data.res.latitude,this.data.res.longitude)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.num)
    var that = this

    this.homeStayDetail(options.num)
      .then((dingwei) => {
        wx.getLocation({
          type: 'wgs84',
          altitude: false,
          success: (res) => {
            this.setData({
              latitude: dingwei[0],
              longitude: dingwei[1],

              markers: [{
                id: "1",
                latitude: dingwei[0],
                longitude: dingwei[1],
                width: 35,
                height: 35,
                iconPath: "../../resources/img/1.png"
              }]
            })
          },
        });
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
    // 日期选择
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate,
      days: getDate.days,
      hideview: 'none',
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