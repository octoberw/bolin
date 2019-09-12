// pages/homeCzList/homeCzList.js
import api from '../../api/api'
import {
  moreRecommend,
  recommendDetail
} from '../../api/bjUrl/homeApi'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: '',
    resTitle:'',
    type: '',
    num: 0
  },

  tapTitle(e) {
    console.log(e)
    this.setData({
      num : parseInt(e.currentTarget.dataset.index) 
    })
    this.recommendDetail(e.currentTarget.dataset.id)
  },

  tapid(e){
    if(this.data.type === 'LongRent'){
      wx.navigateTo({
        url: `../homeTjListDetail/homeTjListDetail?id=${e.currentTarget.dataset.id}&yuyue=LongRent`,
      });
    } else if(this.data.type === 'ShortTerm') {
      wx.navigateTo({
        url: `../homeTjListDetail/homeTjListDetail?id=${e.currentTarget.dataset.id}&yuyue=ShorTerm`,
      });
    }
  },

  // 跟多房源推荐筛选接口
  recommendDetail(idData) {
    api.get(recommendDetail,{
      'kindId': idData
    })
    .then(res=>{
      this.setData({
        res: res.detail,
      })
    })
  },

  // 更多房源推荐接口
  moreRecommend() {
    api.get(moreRecommend, {
        'type': this.data.type
      })
      .then(res => {
        this.setData({
          res: res.first,
          resTitle: res.top
        })
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
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
    if(this.data.type === 'LongRent'){
      wx.setNavigationBarTitle({
        title: '品牌公寓',
      });
    } else if(this.data.type === 'ShortTerm') {
      wx.setNavigationBarTitle({
        title: '民宿酒店',
      });
    }
    this.moreRecommend()
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