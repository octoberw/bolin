// pages/wxNoBlDescribe/wxNoBlDescribe.js
const app = getApp();

import api from '../../api/api'
import {
  description
} from '../../api/bjUrl/wx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thirdId: 0, //维修项目id
    tags: [], // 标签
    clickId: [],

    // 字符串拼接后发到后台
    strClickId: '',
    // 图片上传
    images: [], //保存在本地的图片路径
    arrUrl: [], // 图片字符串拼接
    // 表单内容
    content: "",
    contentBeizhu: "" // 备注
  },

  gotoNoBlOrder() {
    var that = this
    var i = 0
    // that.getcontent()
    if (this.data.images.length > 0) {
      that.upImgs(i)
        .then(() => {
          var pages = getCurrentPages(); //  获取页面栈
          var prevPage = pages[pages.length - 2]; // 上一个页面
          prevPage.setData({
            arrUrl: that.data.arrUrl, // 状况描述的图片
            content: that.data.content, // 状况描述的内容
            strClickId: that.data.strClickId, // 状况描述的标签                      // 假数据
          })
          wx.navigateBack({
            delta: 1
          });
        })
    } else {
      var pages = getCurrentPages(); //  获取页面栈
      var prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.setData({
        arrUrl: that.data.arrUrl, // 状况描述的图片
        content: that.data.content, // 状况描述的内容
        strClickId: that.data.strClickId, // 状况描述的标签                      // 假数据
      })
      wx.navigateBack({
        delta: 1
      });
    }

  },

  clickTaps(e) {
    var id = e.currentTarget.dataset.index
    var clickId = this.data.clickId.slice()
    var tags = this.data.tags.slice()

    for (let i = 0; i < clickId.length; i++) {
      if (id == i + 1 && clickId[id - 1] != '') {
        clickId[id - 1] = ''
      } else if (id == i + 1 && clickId[id - 1] == '') {
        clickId[id - 1] = tags[i]
      }
      this.setData({
        clickId: clickId,
        strClickId: this.data.clickId.join('#')
      })
    }
  },

  // 上传图片
  chooseImage() {
    var that = this
    var images = this.data.images
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        // 合并数组
        var newImages = images.concat(tempFilePaths)
        that.setData({
          images: newImages
        })
        if (this.data.images.length === 3) {
          that.setData({
            hiddenBtn: 0
          })
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },

  // 预览图片
  previewImage(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      urls: this.data.images,
      current: current,
      success: (result) => {
        console.log('预览成功')
      },
      fail: () => {},
      complete: () => {}
    });
  },

  // 获取内容
  getcontent(e) {
    console.log(e.detail.value.content)
    this.setData({
      content: e.detail.value.content
    })
  },


  // 上传图片封装函数  需要传一个i 记录图片数量
  upImgs(dataI) {
    var that = this
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        // url: 'http://192.168.50.168:8081/app/file/upload.htm',
        url: `${app.globalData.host}/app/file/upload.htm`,
        filePath: (that.data.images)[dataI],
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function (res) {
          // console.log('成功调用', (JSON.parse(res.data)).url);
          (that.data.arrUrl)[dataI] = (JSON.parse(res.data)).url
          that.setData({
            arrUrl: that.data.arrUrl
          })
        },
        fail: function (res) {
          console.log()
          reject(res);
          // console.log('失败调用', res);
        },
        complete: function (complete) {
          // console.log('调用完成的回调', complete)
          dataI++
          if (dataI == that.data.images.length) {
            resolve()
          } else if (dataI < that.data.images.length) {
            that.upImgs(dataI)
              .then(resolve) // 递归  
          }
        }
      })
    })
  },

  // upLoadFile() {
  //   var that = this
  //   var i = 0
  //   console.log('upLoadFile啊啊啊啊啊啊啊啊啊')
  //   return new Promise((resolve, reject) => {
  //     // 等待api
  //     wx.showLoading({
  //       title: '上传评论中...',
  //       mask: true,
  //     })
  //     console.log('that.data.images.length',that.data.images.length)
  //       that.upImgs(i)
  //         .then(() => {
  //           that.apiPost()
  //             .then(resolve) //  1
  //         })
  //   })
  // },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      thirdId: options.thirdId
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
    api.get(description, {
        'id': this.data.thirdId
      })
      .then(res => {
        var tags = res.tags.split('#')
        console.log(tags)
        this.setData({
          tags: tags
        })
        var clickId = []
        for (let j = 1; j <= tags.length; j++) {
          clickId[j - 1] = ''
        }
        this.setData({
          clickId: clickId
        })
        console.log(this.data.clickId)

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