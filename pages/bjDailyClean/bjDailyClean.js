// pages/dailyClean/dailyClean.js
import api from '../../api/api'
import {
  map,
  cleaner,
  add
} from '../../api/bjUrl/cleaningOrder'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMore: 'none',
    showHead: 'block',

    // 地图数据
    scale: 16,
    latitudeID: "",
    longitudeID: "",
    markers: [],
    circles: [],

    x: '',
    y: '',
    isMap: true,

    // 附近保洁阿姨数据
    cleanerID: [],
    moreCleaner: [], //所有附近保洁人员
    cleaner: [], //截取3条保洁人员
    cleanerPoint: []
  },

  gotoComment() {
    wx.navigateTo({
      url: '../wxComment/wxComment?fr=bj',
    });
  },

  gotoMore() {
    if (this.data.showHead === 'block') {
      this.setData({
        showMore: 'block',
        showHead: 'none',
      })
    } else {
      this.setData({
        showMore: 'none',
        showHead: 'block',
      })
    }
  },
  gotoAppointmentView(e) {
    var cleanerId = parseInt(e.target.dataset.cleanerid)
    wx.navigateTo({
      url: `../bjAppointmentView/bjAppointmentView?cleanerId=${cleanerId}`
    })
  },


  // 发送用户经纬度到后台
  add(latitudeData, longitudeData) {
    api.post(add, {
        'latitude': latitudeData,
        'longitude': longitudeData
      })
      .then(res => {
        // console.log(res)
      })
  },

  // 移动地图中心点改变
  regionchange(e) {
    var that = this;
    // 改变中心点位置  
    if (e.type == "end") {
      that.getCenterLocation1();
    }
  },

  getCenterLocation1: function () {
    var that = this;
    var mapCtx = wx.createMapContext("mapCtx");
    mapCtx.getCenterLocation({
      success: function (res) {
        that.map(res.latitude, res.longitude);
      }
    })
  },

  // 获取周边服务者接口
  map(latitudeData, longitudeData) {
    var that = this
    api.post(map, {
        'distance': 3,
        'distanceUnit': 'KILOMETERS',
        'latitude': latitudeData,
        'longitude': longitudeData,
      })
      .then(res => {
        // console.log(res)
        var cleanerID = []
        var point = []
        var markers = []
        for (let i = 0; i < res.length; i++) {
          cleanerID.push(parseInt(res[i].content.name))
          point.push(res[i].content.point)

          // 设置附近的保洁阿姨位置
          markers.push({
            id: i,
            latitude: point[i].y,
            longitude: point[i].x,
            width: 35,
            height: 35,
            iconPath: "../../resources/img/1.png",
            title: ""
          })
        }

        that.setData({
          markers: markers
        })
        if (cleanerID.length > 0) {
          let getLoginId = wx.getStorageSync("LOGIN");
          api.get(cleaner, {
              'cleanerIds': cleanerID.join(','), // string
              'memberId': getLoginId.id,
            })
            .then(res => {
              // console.log(res.cleaner)
              var moreCleaner = [] // 处理距离的数据(先截取4位距离,然后重新赋值),全部附近保洁人员
              var cleaner = [] // 截取5个附近保洁人员
              for (let i of res.cleaner) {
                i.distance = i.distance.slice(0, 4)
                moreCleaner.push(i)
              }

              for (let c = 0; c < 5; c++) {
                cleaner.push(moreCleaner[c])
              }
              cleaner = cleaner.filter(item => item)

              that.setData({
                moreCleaner: moreCleaner,
                cleaner: cleaner
              })
            })
        } else {
          wx.showToast({
            title: '附近没有保洁人员，请重新定位',
            icon: 'none',
            duration: 1500,
          });
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // 初始化地图
    wx.getLocation({
      type: 'gcj02',
      altitude: false,
      success: (res) => {
        // console.log(res)
        that.add(res.latitude, res.longitude)
        this.setData({
          latitudeID: res.latitude,
          longitudeID: res.longitude,
        })
        // that.moveTolocation()
      },
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