// pages/homeTjListDetail/homeTjListDetail.js
import api from '../../api/api'
import {
  detail
} from '../../api/bjUrl/homeApi'
import {
  addCollects,
  cancleCollects
} from '../../api/bjUrl/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: '',
    content: '',
    imgArr: [], // 图片预览集合
    current: 0, // 图片集下标
    show: true,
    yuyue: '',
    shoucang: '', // 收藏
    id: '',
    onceTurn: true,
    dianzan: '' //点赞
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


  gotoTjListDetail(e) {
    if (this.data.yuyue === 'LongRent') {
      wx.navigateTo({
        url: `../homeTjListDetail/homeTjListDetail?id=${e.currentTarget.dataset.id}&yuyue=LongRent`,
      });
    } else if (this.data.yuyue === 'ShorTerm') {
      wx.navigateTo({
        url: `../homeTjListDetail/homeTjListDetail?id=${e.currentTarget.dataset.id}&yuyue=ShorTerm`,
      });
    }
  },

  clickShow() {
    this.setData({
      show: !this.data.show
    })
  },

  // 预约
  gotoDetail(e) {
    console.log(e.currentTarget.dataset.num)
    if (this.data.yuyue === 'LongRent') {
        wx.navigateTo({
          url: `../zfSearchListHome/zfSearchListHome?num=${e.currentTarget.dataset.num}`,
        });
    } else if (this.data.yuyue === 'ShorTerm') {
      if (e.currentTarget.dataset.types == '非自营') {
        wx.navigateTo({
          url: `../msSearchListHome/msSearchListHome?num=${e.currentTarget.dataset.num}`,
        });
      } else if (e.currentTarget.dataset.types == '自营') {
        wx.navigateToMiniProgram({
          appId: 'wxc147016e2b3bf9d6',
          path: e.currentTarget.dataset.outline,
          extraData: {},
          envVersion: 'release',
        });
      }
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

  // 取消收藏
  cancleCollects() {
    return new Promise((resolve, reject) => {
      this.setData({
        onceTurn: false
      })
      api.post(cancleCollects, {
          'collectionId': this.data.id,
          'type': this.data.yuyue
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
          'type': this.data.yuyue
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

  // 房源详情接口
  detail(idData) {
    api.post(detail, {
        'optimizationId': idData
      })
      .then(res => {

        var imgArr = []
        if (res.images != null) {
          imgArr = res.images.split(',')
        }

        console.log(res.isCollect)

        this.setData({
          res: res,
          imgArr: imgArr,
          content: res.content.replace(/\<img/g, '<img style="width:auto;height:auto;display:block"'),
          shoucang: res.isCollect
        })
        wx.setNavigationBarTitle({
          title: res.kindTitle,
        });
        console.log(this.data.shoucang)
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    console.log('类型',options.yuyue)
    this.setData({
      yuyue: options.yuyue,
      id: options.id
    })
    this.detail(options.id)
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