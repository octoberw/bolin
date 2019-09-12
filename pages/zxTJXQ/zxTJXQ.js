// pages/zxTJXQ/zxTJXQ.js
import api from '../../api/api'
import {
  SJSaddOrder
} from '../../api/bjUrl/zx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    peopleid: '',
    istrue: true
  },

  bindTJXQ(e) {
    if (this.data.istrue) {
      this.setData({
        istrue: false
      })
      setTimeout(() => {
        this.setData({
          istrue: true
        })
      }, 2000);
      wx.getStorage({
        key: 'LOGIN',
        success: (result) => {
          api.post(SJSaddOrder, {
              'area': e.detail.value.area,
              'budget': e.detail.value.money,
              'checkInTime': e.detail.value.endtime,
              'decorateTime': e.detail.value.begintime,
              'designerId': this.data.id ? this.data.id : 0,
              'houseType': e.detail.value.house,
              'locations': e.detail.value.city,
              'person': e.detail.value.name,
              'phone': e.detail.value.phone,
              'population': e.detail.value.people,
              'remark': '',
              'situations': e.detail.value.fwzk,
              'style': e.detail.value.style,
              'memberId': result.data.id
            })
            .then(res => {
              console.log(res)
              if (res.orderNum) {
                wx.redirectTo({
                  url: `../zxPaySucc/zxPaySucc?orderNum=${res.orderNum}`,
                });
              }
            })
        },
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
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