// pages/homeshow/homeshow.js
import api from '../../api/api'
import {
  showdetail
} from '../../api/bjUrl/homeApi'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    res: ''
  },

  style(styleID) {
    var styleData = '' // ['北欧风格', '现代风格', '日式风格', '美式风格', '中式风格', '其他风格']
    switch (styleID) {
      case 0:
        styleData = '北欧风格'
        break;
      case 1:
        styleData = '现代风格'
        break;
      case 2:
        styleData = '日式风格'
        break;
      case 3:
        styleData = '美式风格'
        break;
      case 4:
        styleData = '中式风格'
        break;
      case 5:
        styleData = '其他风格'
        break;
    }
    return styleData
  },

  showdetail(idData){
    api.get(showdetail,{
      'id': idData
    })
    .then(res=>{
      res.content = res.content.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"')
      if(res.longRents&&res.houseTags) {
        var houseTags = res.houseTags
        var longRents = res.longRents
        for (let j = 0; j < longRents.length; j++) {
          var newLongRents = longRents[j].id.slice()
          longRents[j].id = []
          for (let i = 0; i < houseTags.length; i++) {
            if (newLongRents == houseTags[i].parentId) {
              longRents[j].id.push(houseTags[i])
            }
          }
          longRents[j].id = longRents[j].id.length > 2 ? longRents[j].id.slice(0, 2) : longRents[j].id
        }
        res.longRents = longRents
      }
      if(res.designers) {
        for (let i of res.designers) {
          i.style = this.style(parseInt(i.style))
          i.workPhoto = i.workPhoto.split(',')
        }
      }
      var headAndStar = {}
      if(res.homeStay) {
        for (let i of res.headAndStar) {
          i.star = parseInt(i.star)
          headAndStar[i.parentId] = i
        }
        for (let j of res.homeStay) {
          var homeStay = j.id
          homeStay = []
          for (let o of res.houseTags) {
            if (o.parentId == j.id) {
              homeStay.push(o)
            }
          }
          j.id = homeStay
        }
      }
      console.log(res)
      this.setData({
        res: res
      })
    })
  },

  gotoMTWX(e) {
    var thirdid = e.target.dataset.thirdid
    wx.navigateTo({
      url: `../wxMTST/wxMTST?thirdid=${thirdid}`,
    });
  },

  gotoZfListHome(e) {
    wx.navigateTo({
      url: `../zfSearchListHome/zfSearchListHome?num=${e.currentTarget.dataset.homenum}`,
    });
  },

  bindSJS(e) {
    wx.navigateTo({
      url: `../zxSJS/zxSJS?id=${e.currentTarget.dataset.id}`,
    });
  },

  toHouse(e) {
    if (e.currentTarget.dataset.types == 'join') {
      wx.navigateTo({
        url: `../msSearchListHome/msSearchListHome?num=${e.currentTarget.dataset.num}`,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.showdetail(this.data.id)
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