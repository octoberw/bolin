import api from '../../api/api'
import {
  wxLogin
} from '../../api/bjUrl/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  // login
  // onGotUserInfo(e) {
  //   wx.setStorage({
  //     key: 'ENCRYPTEDDATA_IV',
  //     data: {
  //       encryptedData: e.detail.encryptedData,
  //       iv: e.detail.iv
  //     }
  //   });

  //   wx.navigateBack({
  //     delta: 1
  //   });
  // },

  onGotUserInfo(e) {
    this.getSetting(e.detail.encryptedData, e.detail.iv)
  },

  getSetting(encryptedData, ivStrData) {
    wx.getSetting({
      success: (result) => {
        if (result.authSetting['scope.userInfo']) {
          wx.login({
            timeout: 1000,
            success: (resLogin) => {
              api.post(wxLogin, {
                  'code': resLogin.code,
                  'encryptedData': encryptedData,
                  'ivStr': ivStrData
                })
                .then(res => {
                  wx.clearStorage();

                  wx.setStorage({
                    key: 'LOGIN',
                    data: {
                      id: res.id,
                    }
                  });
                  wx.setStorage({
                    key: 'TOKEN',
                    data: {
                      token: res.token,
                    }
                  });
                  wx.navigateBack({
                    delta: 1
                  });
                })
            }
          });
        } else if (result.authSetting['scope.userInfo'] === false) {
          wx.clearStorage();
          wx.switchTab({
            url: '/pages/home/home'
          });
        }
      },
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