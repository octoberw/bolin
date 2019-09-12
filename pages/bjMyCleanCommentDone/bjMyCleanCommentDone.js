// pages/myCleanCommentDone/myCleanCommentDone.js
import api from '../../api/api'
import {
  orderDetail
} from '../../api/bjUrl/cleaningOrder'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [], // 所有数据
    arrTimes: [],
    evaluateStar: 0, // 评论星星
    evaluateLabels: [], // 评论标签
    evaluateContent: '' // 评论内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var arr = [] //记录时间段得
    api.get(orderDetail, {
        sn: options.sn
      })
      .then(res => {
        that.setData({
          res: res,
          evaluateStar: parseInt(res.orderEvaluate.star),
          evaluateLabels: (res.orderEvaluate.labels).split("#"),
          evaluateContent: res.orderEvaluate.content ? res.orderEvaluate.content : ''
        })

        // 处理时间段
        for (let i of res.timePeriod) {
          switch (i.timePeriod) {
            case 'one':
              arr.push('08:00-09:00')
              break;
            case 'two':
              arr.push('09:00-10:00')
              break;
            case 'three':
              arr.push('10:00-11:00')
              break;
            case 'four':
              arr.push('11:00-12:00')
              break;
            case 'five':
              arr.push('13:00-14:00')
              break;
            case 'six':
              arr.push('14:00-15:00')
              break;
            case 'seven':
              arr.push('15:00-16:00')
              break;
            case 'eight':
              arr.push('16:00-17:00')
              break;
            case 'nine':
              arr.push('19:00-20:00')
              break;
            case 'ten':
              arr.push('20:00-21:00')
              break;
            case 'eleven':
              arr.push('21:00-22:00')
              break;
          }
        }
        that.setData({
          arrTimes: arr
        })


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