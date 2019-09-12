// pages/rimClean/rimClean.js
import api from '../../api/api'
import {
  rentDetail
} from '../../api/bjUrl/cz'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [], // 详情总数据
    imgArr: [], // 图片预览集合
    current: 0, // 图片集下标
    latitude: Number,
    longitude: Number,
    property: [], // 更多
    content: "", // 副文本内容
    minFacilities: [], // 配套设置少于8个
    facilities: [], // 配套设置大于8个
    showFac: false, //配套设置展示
    showAll: '展示全部',

    scale: 16,
    // latitude: "",
    // longitude: "",
    markers: [],
    show: true,
    isTrue: true
  },

  // 联系房东
  callLandlord(){
    wx.makePhoneCall({
      phoneNumber: res.phone,
    });
  },

  clickShow() {
    this.setData({
      show: !this.data.show
    })
  },

  gotoPay() {
    if(this.data.isTrue) {
      this.setData({
        isTrue: false
      })
      setTimeout(() => {
        this.setData({
          isTrue: true
        })
      }, 1500);
      wx.navigateTo({
        url: `../zfPay/zfPay?num=${this.data.res.num}`,
      });
    }
  },

  gotoAppointment() {
    if(this.data.isTrue) {
      this.setData({
        isTrue: false
      })
      setTimeout(() => {
        this.setData({
          isTrue: true
        })
      }, 1500);
      wx.navigateTo({
        url: `../zfAppointment/zfAppointment?num=${this.data.res.num}`,
        // url: `../zfAppointment/zfAppointment?num=${this.data.res.num}&earnest=${this.data.res.earnest}&tag=${this.data.tag}&avator=${this.data.avator}$title=${this.res.title}`,
      });
    }
  },

  // 图片预览器
  previewImage() {
    var that = this
    wx.previewImage({
      current: that.data.imgArr[that.data.current],
      urls: that.data.imgArr,
    });
  },

  changeCurrent(e) {
    this.setData({
      current: e.detail.current
    })
  },

  gotoZfListHome(e){
    this.rentDetail(e.currentTarget.dataset.num)
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
  rentDetail(numData) {
    var that = this
    return new Promise((resolve, reject) => {
      api.get(rentDetail, {
          'num': numData
        })
        .then(res => {
          var imgArr = []
          var minFacilities = []

          if (res.img_url != null) {
            imgArr = res.img_url.split(',')
          }
          if(res.facilities){
            if (res.facilities.length > 8) {
              for (let i = 0; i < 7; i++) {
                minFacilities.push((res.facilities)[i])
              }
            }
          }
          if (res.likeTags) {
            for (let i = 0; i < res.like.length; i++) {
              var newLike = (res.like)[i].id
              newLike = []
              for (let j = 0; j < res.likeTags.length; j++) {
                if((res.likeTags)[j].parentId == (res.like)[i].id){
                  newLike.push((res.likeTags)[j])
                }
              }
              (res.like)[i].id = newLike.slice(0,2)
            }
          }

          that.setData({
            res: res,
            latitude: res.latitude,
            longitude: res.longitude,
            imgArr: imgArr,
            property: JSON.parse(res.otherProperty),
            content: res.content,
            facilities: res.facilities,
            minFacilities: minFacilities
          })
          console.log(that.data.res)
          resolve()
        })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.rentDetail(options.num)
      .then(() => {
        wx.getLocation({
          type: 'wgs84',
          altitude: false,
          success: (res) => {
            this.setData({
              latitude: that.data.latitude,
              longitude: that.data.longitude,
              markers: [{
                id: "1",
                latitude: that.data.latitude,
                longitude: that.data.longitude,
                width: 45,
                height: 45,
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