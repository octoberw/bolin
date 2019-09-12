// pages/zxJingyan/zxJingyan.js
import api from '../../api/api'
import {
  jingyanHome,
  jingyanSearch
} from '../../api/bjUrl/zx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: ''
  },

  Scarch(e){
    console.log(e)
    if(e.detail.value!=''){
      api.get(jingyanSearch,{
        'key': e.detail.value
      })
      .then(res=>{
        this.setData({
          res: res.experiences
        })
        console.log(this.data.res)
      })
    } else {
      this.jingyanHome()
    }
  },

  // 家居经验详情
  gotoZxJingyanDetails(e) {
    wx.navigateTo({
      url: `../zxJingyanDetails/zxJingyanDetails?id=${e.currentTarget.dataset.id}`,
    });
  },

  jingyanHome() {
    api.get(jingyanHome, {})
      .then(res => {
        this.setData({
          res: res.experiences
        })
        console.log(this.data.res)
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
    this.jingyanHome()
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