// pages/zxSJS/zxSJS.js

import api from '../../api/api'
import {
  SJSDetail,
  SJSorderDetail
} from '../../api/bjUrl/zx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showQR: 'none',

    anli: 'block',
    wenzhang: 'none',

    res: '',
    SJSid: '',
    type: 'Decorate',
    SJSWZ: '',
    SJSAL: ''
  },

  gotoZxTJXQ(){
    wx.navigateTo({
      url: `../zxTJXQ/zxTJXQ?id=${this.data.SJSid}`,
    });
  },

  showQR() {
    this.setData({
      showQR: 'block'
    })
  },

  closeQR() {
    this.setData({
      showQR: 'none'
    })
  },

  // 长按识别二维码
  previewImageRWM(e) {
    var current = e.currentTarget.dataset.src;

    console.log(e)
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },

  anli() {
    this.setData({
      anli: 'block',
      wenzhang: 'none',
      type: 'Decorate'
    })
    this.SJSorderDetail(this.data.SJSid, this.data.type)
  },

  wenzhang() {
    this.setData({
      anli: 'none',
      wenzhang: 'grid',
      type: 'Experience'
    })
    this.SJSorderDetailWenzhang(this.data.SJSid, this.data.type)
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

  SJSDetail(idData) {
    api.get(SJSDetail, {
        'id': idData
      })
      .then(res => {
        console.log(res)
        res.style = this.style(parseInt(res.style))
        this.setData({
          res: res
        })
      })
  },

  // 整屋案例
  SJSorderDetail(designerIdData, typeData) {
    api.get(SJSorderDetail, {
        'designerId': designerIdData,
        'type': typeData
      })
      .then(res => {
        for (let i of res.decorates) {
          i.houseType = this.houseType(parseInt(i.houseType))
          i.style = this.style(parseInt(i.style))
        }
        this.setData({
          SJSAL: res.decorates
        })
      })
  },

  // 作品文章
  SJSorderDetailWenzhang(designerIdData, typeData) {
    api.get(SJSorderDetail, {
        'designerId': designerIdData,
        'type': typeData
      })
      .then(res => {
        this.setData({
          SJSWZ: res.experiences
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      SJSid: options.id
    })
    this.SJSDetail(options.id)
    this.SJSorderDetail(options.id, this.data.type)
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