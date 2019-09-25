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
    point: '',
    token: '',
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
        if (res.point === null) {
          res.point = 0
        }
        this.setData({
          point: res.point
        })
      })
  },

  cleanUserInfo() {
    wx.clearStorageSync();
  },

  //事件处理函数
  onLoad: function () {},
  getUserInfo: function (e) {
    wx.navigateTo({
      url: '/pages/homeLogin/homeLogin'
    });
  },
  onShow() {
    wx.getStorage({
      key: 'TOKEN',
      success: (result) => {
        this.setData({
          token: result.data.token
        })
        this.getMemberPoint()
      },
      fail: () => {
        this.setData({
          token: ''
        })
      },
    });
  }
})