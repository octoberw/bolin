import api from '../../api/api'
import {
  getMemberPoint,
  detail
} from '../../api/bjUrl/user'
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hideview: 'none',
    hidejifen: 'none',
    point:''
  },

  // 跳客服
  bindkefu() {

  },

  // 打开收藏夹
  gotoSCJ() {
    wx.navigateTo({
      url: '../homeMySCJ/homeMySCJ',
    });
  },

  // 提交反馈
  sendfankui(e) {
    this.setData({
      hideview: 'none'
    })
  },

  // 显示积分明细
  showHomeMyJfmx() {
    wx.navigateTo({
      url: '../homeMyJfmx/homeMyJfmx',
    });
  },

  _error() {
    this.setData({
      hideview: 'none'
    })
  },

  openfankui() {
    wx.navigateTo({
      url: '/pages/homeMyFankui/homeMyFankui'
    });
  },

  // 显示积分
  showjifen() {
    this.setData({
      hidejifen: 'block'
    })
  },

  closejifen() {
    this.setData({
      hidejifen: 'none'
    })
  },

  gotocz() {
    wx.navigateTo({
      url: '../zfOrderList/zfOrderList'
    })
  },

  gotoms() {
    wx.navigateTo({
      url: '../msOrderList/msOrderList'
    })
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../bjMyClean/bjMyClean'
    })
  },
  gotoWxOrderList() {
    wx.navigateTo({
      url: '../wxOrderList/wxOrderList'
    })
  },

  getMemberPoint() {
    api.get(getMemberPoint)
      .then(res => {
        wx.setStorage({
          key: 'MemberPoint',
          data: res,
        });
        if(res.point === null) {
          res.point = 0
        }
        this.setData({
          point: res.point
        })
      })
  },

  //事件处理函数
  onLoad: function () {
    var userInfo = wx.getStorageSync('USER_INFO');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: userInfo.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow() {
    this.getMemberPoint()
  }
})
