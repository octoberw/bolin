// pages/zxAnliListDetails/zxAnliListDetails.js

import api from '../../api/api'
import {
  addCollects,
  cancleCollects
} from '../../api/bjUrl/user'
import {
  anliDetail
} from '../../api/bjUrl/zx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showQR: 'none',
    res: '', // 整屋案例详情数据
    content: '', // 富文本数据
    imgArr: '', // 图片
    current: 0, // 图片集下标
    shoucang: '',
    id: '',
    onceTurn: true
  },

  cancelShoucang() {
    if (this.data.onceTurn) {
      this.cancleCollects()
        .then(() => {
          setTimeout(() => {
            this.setData({
              onceTurn: true
            })
          }, 1000);
        })
    } else {
      return
    }
  },


  addShoucang() {
    if (this.data.onceTurn) {
      this.addCollects()
        .then(() => {
          setTimeout(() => {
            this.setData({
              onceTurn: true
            })
          }, 1000);
        })
    } else {
      return
    }
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

  // 整屋案例详情
  gotoZxAnliListDetails(e) {
    wx.navigateTo({
      url: `../zxAnliListDetails/zxAnliListDetails?id=${e.currentTarget.dataset.id}`,
    });
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

  // 取消收藏
  cancleCollects() {
    return new Promise((resolve, reject) => {
      this.setData({
        onceTurn: false
      })
      api.post(cancleCollects, {
          'collectionId': this.data.id,
          'type': 'Decorate'
        })
        .then(res => {
          this.setData({
            shoucang: false,
          })
          resolve()
        })
    })
  },

  // 添加收藏
  addCollects() {
    return new Promise((resolve, reject) => {
      this.setData({
        onceTurn: false
      })
      api.post(addCollects, {
          'collectionId': this.data.id,
          'type': 'Decorate'
        })
        .then(res => {
          console.log('click')
          this.setData({
            shoucang: true,
          })
          resolve()
        })
    })
  },

  // 找他设计
  gotoZxTJXQ(){
    wx.navigateTo({
      url: `../zxTJXQ/zxTJXQ?id=${this.data.id}`,
    });
  },

  anliDetail(idData) {
    api.post(anliDetail, {
        'id': idData
      })
      .then(res => {
        console.log(res)

        var imgArr = []
        if (res.images != null) {
          imgArr = res.images.split(',')
        }

        this.setData({
          res: res,
          imgArr: imgArr,
          content: res.content.replace(/\<img/g, '<img style="width:auto;height:auto;display:block"'),
          shoucang: res.isCollect
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.anliDetail(options.id)
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