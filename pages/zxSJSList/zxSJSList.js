// pages/zxSJSList/zxSJSList.js
import api from '../../api/api'
import {
  SJSHome,
  SJSLocation,
  SJSsearch
} from '../../api/bjUrl/zx'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: '',
    location: [],
    imgArr: '',
    location: '',
    locationProvince: '',
    locationObj: '',
    city: '',
    num1: 0,
    fg: ['北欧风格', '现代风格', '日式风格', '美式风格', '中式风格', '其他风格'],
    px: [{
      order: 'desc',
      name: '价格高低'
    }, {
      order: 'asc',
      name: '好评度'
    }],

    cityID: '',
    order: '',
    style: '',

    showFX: 'none',
    showMJ: 'none',
    showFG: 'none',
  },

  bindSJS(e) {
    wx.navigateTo({
      url: `../zxSJS/zxSJS?id=${e.currentTarget.dataset.id}`,
    });
  },

  gotoTop_showFX() {
    if (this.data.showFX === 'none') {
      this.setData({
        showFX: 'block',
        showMJ: 'none',
        showFG: 'none',
      })
    } else {
      this.setData({
        showFX: 'none',
        showMJ: 'none',
        showFG: 'none',
      })
    }
    this.SJSLocation()
  },
  closeFX(e) {
    // 通过事件代理data-name的方式阻止向下冒泡
    if (e.target.dataset.name === 'mask') {
      this.setData({
        showFX: 'none',
        city: '',
        num1: 0,
      })
    }
  },
  gotoTop_showMJ() {
    if (this.data.showMJ === 'none') {
      this.setData({
        showFX: 'none',
        showMJ: 'block',
        showFG: 'none',
      })
    } else {
      this.setData({
        showFX: 'none',
        showMJ: 'none',
        showFG: 'none',
      })
    }
  },
  closeMJ(e) {
    // 通过事件代理data-name的方式阻止向下冒泡
    if (e.target.dataset.name === 'mask') {
      this.setData({
        showMJ: 'none'
      })
    }
  },
  gotoTop_showFG() {
    if (this.data.showFG === 'none') {
      this.setData({
        showFX: 'none',
        showMJ: 'none',
        showFG: 'block',
      })
    } else {
      this.setData({
        showFX: 'none',
        showMJ: 'none',
        showFG: 'none',
      })
    }
  },
  closeFG(e) {
    // 通过事件代理data-name的方式阻止向下冒泡
    if (e.target.dataset.name === 'mask') {
      this.setData({
        showFG: 'none'
      })
    }
  },

  bindLocationProvince(e) {
    var obj = this.data.locationObj
    this.setData({
      num1: e.currentTarget.dataset.num1,
      city: obj[e.currentTarget.dataset.val]
    })
  },

  bindCity(e) {
    this.setData({
      cityID: String(e.currentTarget.dataset.id) 
    })
    var cityID = this.data.cityID
    var order = this.data.order
    var style = this.data.style
    this.SJSsearch(cityID,order,style)
    this.setData({
      showFX: 'none'
    })
  },

  bindFG(e) {
    this.setData({
      style: String(e.currentTarget.dataset.index) 
    })
    var cityID = this.data.cityID
    var order = this.data.order
    var style = this.data.style
    this.SJSsearch(cityID,order,style)
    this.setData({
      showMJ: 'none'
    })
  },

  bindPX(e) {
    this.setData({
      order: String(e.currentTarget.dataset.order) 
    })
    var cityID = this.data.cityID
    var order = this.data.order
    var style = this.data.style
    this.SJSsearch(cityID,order,style)
    this.setData({
      showFG: 'none'
    })
  },


  style(styleID) {
    var styleData = '' // ['北欧风格', '现代风格', '日式风格', '美式风格', '中式风格', '其他风格']
    switch (styleID) {
      case 0:
        styleData = '北欧风格'
        break;
      case 1:
        styleData = '现代风格'
        break;
      case 2:
        styleData = '日式风格'
        break;
      case 3:
        styleData = '美式风格'
        break;
      case 4:
        styleData = '中式风格'
        break;
      case 5:
        styleData = '其他风格'
        break;
    }
    return styleData
  },

  // 设计师主页 设计师列表
  SJSHome() {
    api.get(SJSHome, {})
      .then(res => {
        for (let i of res.designers) {
          i.style = this.style(parseInt(i.style))
          i.workPhoto = i.workPhoto.split(',')
        }
        this.setData({
          res: res.designers,
        })
      })
  },

  // 设计师主页地区筛选
  SJSLocation() {
    api.get(SJSLocation, {})
      .then(res => {
        var province = []
        var obj = {}
        for (let i of res) {
          var pro = i.province
          obj[pro] = i.city
          province.push(i.province)
        }
        this.setData({
          location: res,
          locationProvince: province,
          locationObj: obj
        })
      })
  },

  // 设计师搜索
  SJSsearch(cityIdData, orderData, styleData) {
    api.get(SJSsearch, {
        'cityId': cityIdData,
        'order': orderData,
        'style': styleData
      })
      .then(res => {
        for (let i of res.designers) {
          i.style = this.style(parseInt(i.style))
          i.workPhoto = i.workPhoto.split(',')
        }
        this.setData({
          res: res.designers,
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
    this.SJSHome()
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