// pages/zxAnli/zxAnli.js
import api from '../../api/api'
import {
  anliHome,
  search
} from '../../api/bjUrl/zx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFX: 'none',
    showMJ: 'none',
    showFG: 'none',
    minMJ: Number,
    maxMJ: Number,

    item: {
      fx: ['一室', '二室', '三室', '四室', '五室或以上', '复式', '别墅', '其他房型'],
      fg: ['北欧风格', '现代风格', '日式风格', '美式风格', '中式风格', '其他风格']
    },

    res: '',

    houseTypeData: '',
    styleData: '',
    minData: '',
    maxData: '',
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
  },
  closeFX(e) {
    // 通过事件代理data-name的方式阻止向下冒泡
    if (e.target.dataset.name === 'mask') {
      this.setData({
        showFX: 'none'
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

  bindFX(e) {
    this.setData({
      houseTypeData: e.currentTarget.dataset.index
    })
    var houseTypeData = String(this.data.houseTypeData)
    var maxData = this.data.maxData
    var minData = this.data.minData
    var styleData = String(this.data.styleData)
    this.search(houseTypeData, minData, maxData, styleData)
    this.setData({
      showFX: 'none'
    })
  },
  bindFG(e) {
    this.setData({
      styleData: e.currentTarget.dataset.index
    })
    var houseTypeData = String(this.data.houseTypeData)
    var maxData = this.data.maxData
    var minData = this.data.minData
    var styleData = String(this.data.styleData)
    this.search(houseTypeData, minData, maxData, styleData)
    this.setData({
      showFG: 'none'
    })
  },

  // 面积输入
  bindInputMoney(e) {
    var that = this
    if (e.detail.value.min != "" && e.detail.value.max != "") {
      that.setData({
        minData: parseInt(e.detail.value.min),
        maxData: parseInt(e.detail.value.max)
      })
      var houseTypeData = String(this.data.houseTypeData)
      var maxData = this.data.maxData
      var minData = this.data.minData
      var styleData = String(this.data.styleData)
      this.search(houseTypeData, maxData, minData,styleData)
      that.setData({
        showMJ: 'none'
      })
    }
  },

  houseType(typeID) {
    var type = '' //['一室', '二室', '三室', '四室', '五室或以上', '复式', '别墅', '其他房型'],
    switch (typeID) {
      case 0:
        type = '一室'
        break;
      case 1:
        type = '二室'
        break;
      case 2:
        type = '三室'
        break;
      case 3:
        type = '四室'
        break;
      case 4:
        type = '五室或以上'
        break;
      case 5:
        type = '复式'
        break;
      case 6:
        type = '别墅'
        break;
      case 7:
        type = '其他房型'
        break;
    }
    return type
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

  anliHome() {
    api.get(anliHome, {})
      .then(res => {
        for (let i of res.decorates) {
          i.houseType = this.houseType(parseInt(i.houseType))
          i.style = this.style(parseInt(i.style))
        }
        this.setData({
          res: res.decorates
        })
        console.log(this.data.res)
      })
  },

  search(houseTypeData, maxData, minData, styleData) {
    api.get(search, {
        'houseType': houseTypeData,
        'max': maxData,
        'min': minData,
        'style': styleData
      })
      .then(res => {
        for (let i of res.decorates) {
          i.houseType = this.houseType(parseInt(i.houseType))
          i.style = this.style(parseInt(i.style))
        }
        this.setData({
          res: res.decorates
        })
        console.log(this.data.res)
      })
  },

  // 整屋案例详情
  gotoZxAnliListDetails(e) {
    wx.navigateTo({
      url: `../zxAnliListDetails/zxAnliListDetails?id=${e.currentTarget.dataset.id}`,
    });
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
    this.anliHome()
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