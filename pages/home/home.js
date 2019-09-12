// pages/home/home.js
import api from '../../api/api'
import {
  home,
  show,
  articleList
} from '../../api/bjUrl/homeApi'

const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: '',
    showimg: '',
    pageNumber: 1,
    articles: []
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  goshow(e) {
    wx.navigateTo({
      url: `/pages/homeshow/homeshow?id=${e.currentTarget.dataset.id}`
    });
  },

  gotoZxJingyanDetails(e) {
    wx.navigateTo({
      url: `../zxJingyanDetails/zxJingyanDetails?id=${e.currentTarget.dataset.id}`,
    });
  },

  // 跳转到房子详情
  gotoZfListHome(e) {
    // console.log(e.currentTarget.dataset.homenum)
    wx.navigateTo({
      url: `../zfSearchListHome/zfSearchListHome?num=${e.currentTarget.dataset.tozfnum}`,
    });
  },

  toHouse(e) {
    if (e.currentTarget.dataset.types == 'join') {
      wx.navigateTo({
        url: `../msSearchListHome/msSearchListHome?num=${e.currentTarget.dataset.tomsnum}`,
      });
    } else if (e.currentTarget.dataset.types == 'self') {
      wx.navigateToMiniProgram({
        appId: 'wxc147016e2b3bf9d6',
        path: e.currentTarget.dataset.outline,
        extraData: {},
        envVersion: 'release',
      });
    }
  },

  // 跳转长租首页
  gotochangzu() {
    wx.navigateTo({
      url: '../homeHouse/homeHouse',
    });
  },

  // 跳转名宿首页
  gotomingsu() {
    wx.navigateTo({
      url: '../msSearchList/msSearchList?city=&people=',
    });
  },

  // 精选房源推荐跳转
  tapLongRentId(e) {
    console.log(e)
    wx.navigateTo({
      url: `../homeTjListDetail/homeTjListDetail?id=${e.currentTarget.dataset.longrentid}&yuyue=LongRent`,
    });
  },

  // 民宿推荐跳转
  tapShortTermId(e) {
    wx.navigateTo({
      url: `../homeTjListDetail/homeTjListDetail?id=${e.currentTarget.dataset.shorttermid}&yuyue=ShorTerm`,
    });

  },

  // 精选房源跳转
  gotoHomeZfList() {
    wx.navigateTo({
      url: `../homeTjList/homeTjList?type=LongRent`,
    });
  },

  // 精选民宿跳转
  gotoHomeMsList() {
    wx.navigateTo({
      url: `../homeTjList/homeTjList?type=ShortTerm`,
    });
  },

  // 装修跳转
  gotoZXHome() {
    wx.navigateTo({
      url: '../zxHome/zxHome',
    });
  },

  gotoRimClean() {
    wx.navigateTo({
      url: '../bjDailyClean/bjDailyClean'
    })
  },

  gotoWxHome() {
    wx.navigateTo({
      url: '../wxHome/wxHome'
    })
  },

  gotoms() {
    wx.navigateTo({
      url: '../msHome/msHome'
    })
  },

  gotozf() {
    wx.navigateTo({
      url: '../homeHouse/homeHouse'
    })
  },

  // 跳转装修首页
  gotoZxHome() {
    wx.navigateTo({
      url: '../zxHome/zxHome',
    });
  },

  // 请求首页接口
  getHomeApi() {
    var that = this
    api.get(home, {})
      .then(res => {
        var rents = [] // 推荐长租房子数量限制
        for (let i of res.rents) {
          i.area = i.area.split('.')[0]
        }
        if (res.rents.length >= 2) {
          for (let i = 0; i < 2; i++) {
            rents.push(res.rents[i])
          }
          res.rents = rents
        }

        // 处理 headAndStar 和 home 的数据
        for (let j of res.home) {
          for (let o of res.headAndStar) {
            o.star = parseInt(o.star)
            if (o.parentId == j.id) {
              j.id = o
            }
          }
        }

        // 处理 houseTags 和 home 的数据
        for (let k of res.home) {
          var houseTags = []
          for (let l of res.houseTags) {
            if (k.id.parentId == l.parentId) {
              houseTags.push(l)
            }
          }
          k.id.parentId = houseTags.slice(0, 2)
        }

        res.home = res.home.slice(0, 2)

        that.setData({
          res: res
        })
      })
  },

  // 广告轮播
  show() {
    api.get(show)
      .then(res => {
        this.setData({
          showimg: res.list
        })
      })
  },

  // 获取文章列表
  articleList() {
    api.get(articleList, {
        'pageNumber': this.data.pageNumber
      })
      .then(res => {
        res.articles = this.data.articles.concat(res.articles)
        this.setData({
          articles: res.articles,
          pageNumber: res.pageNumber
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
    this.getHomeApi()
    wx.showTabBar({
      animation: true,
    });
    this.show()
    this.articleList()
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