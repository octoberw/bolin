// pages/location/location.js
import api from '../../api/api'
import {
  map
} from '../../api/bjUrl/cleaningOrder'
import {
  findPlot
} from '../../api/bjUrl/wx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 16,
    latitude: "",
    longitude: "",
    markers: [],
    cleanerId: 0,

    id: 0, // 判断是否是泊邻用户还是非泊邻用户

    input: null,
    location: [], //保存搜索出来的地址
    inputVal: "",
    areaId: 0
  },

  gotoAppointmentView(e) {
    var location = e.detail.value.location
    var pages = getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      location: location, // 地址全称
      cleanerId: this.data.cleanerId, // 栋数
    })
    wx.navigateBack({
      delta: 1
    });
  },

  // 获取input的内容
  getVal(e) {
    var that = this
    if (e.detail.value != that.data.input) {
      that.setData({
        input: e.detail.value
      })
      if (e.detail.value == that.data.input) {
        api.get(findPlot, {
            'key': that.data.input
          })
          .then(res => {
            that.setData({
              location: res.address
            })
            if (res.address === undefined) {
              that.setData({
                location: []
              })
            }
            console.log(that.data.location)
          })
      }
    }
  },

  // 替换input内容
  getInputVal(e) {
    var that = this
    this.setData({
      inputVal: e.currentTarget.dataset.fullname,
      areaId: e.currentTarget.dataset.areaid,
      location: []
    })
    // wx.navigateTo({
    //   url: `../wxBlOrder/wxBlOrder?location=${this.data.inputVal}&areaId=${this.data.areaId}`,
    // });
    var pages = getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      location: that.data.inputVal, // 地址全称
      areaId: this.data.areaId, // 栋数
    })
    wx.navigateBack({
      delta: 1
    });
  },

  // 清空input内容
  closeInputVal() {
    this.setData({
      inputVal: ""
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id // 1是泊邻用户  2是非泊邻用户
    this.setData({
      id: parseInt(id) 
    })
    console.log(this.data.id)

    var that = this
    that.setData({
      cleanerId: parseInt(options.cleanerId)
    })

    // 初始化地图
    wx.getLocation({
      type: 'gcj02',
      altitude: false,
      success: (res) => {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        if (options.id == 1) {
          console.log('泊邻用户')
        } else if(options.id == 3) {
          // 请求数据附近的保洁阿姨ID
          api.post(map, {
              'distance': 3,
              'latitude': res.latitude,
              'longitude': res.longitude,
              // 'latitude': 23.158275116267664,
              // 'longitude': 113.27331510185239,
              'distanceUnit': 'KILOMETERS'
            })
            .then(rest => {
              console.log(rest)
              var cleanerID = []
              var point = []
              var markers = []
              for (let i = 0; i < rest.length; i++) {
                cleanerID.push(parseInt(rest[i].content.name))
                point.push(rest[i].content.point)
                // 设置附近的保洁阿姨位置
                markers.push({
                  id: i,
                  latitude: point[i].y, 
                  longitude: point[i].x,
                  width: 20,
                  height: 20,
                  iconPath: "../../resources/img/1.png",
                  title: ""
                })
              }
              that.setData({
                cleanerID: cleanerID,
                markers: markers
              })
            })
        }
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