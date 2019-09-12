// pages/myClean/myClean.js
import api from '../../api/api'
import {
  cleaningOrder
} from '../../api/bjUrl/cleaningOrder'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [
      '全部订单',
      '待服务',
      '已完成',
      '已取消',
      '待支付',
      '待审核'
    ],
    cleaner: [],
    order: '',
    num: 0, // 头部点击切换的标注,
    
  },

  bindViewTap: function (e) {
    let getLoginId = wx.getStorageSync("LOGIN");
    this.setData({
      num: e.target.dataset.num
    })
    console.log(e.target.dataset.num)
    if (e.target.dataset.num == 1) {
      e.target.dataset.num = 'service'
    } else if (e.target.dataset.num == 2) {
      e.target.dataset.num = 'finish'
    } else if (e.target.dataset.num == 3) {
      e.target.dataset.num = 'cancel'
    } else if (e.target.dataset.num == 0) {
      e.target.dataset.num = ''
    }else if (e.target.dataset.num == 4) {
      e.target.dataset.num = 'noPay'
    }
    else if (e.target.dataset.num == 5) {
      e.target.dataset.num = 'checking'
    }
    // 点击头部重新渲染页面
    if (e.target.dataset.num !== 0) {
      api.get(cleaningOrder, {
          'status': e.target.dataset.num,
          'memberId': getLoginId.id
        })
        //和外面的this指向是相同的
        .then(res => {
          if(res.allOrder.length<=0) {
            this.setData({
              order:''
            })
            return
          }
          for (let i of res.allOrder) {
            var arr = []
            for (let ar of i.timePeriod) {
              switch (ar) {
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
            i.timePeriod = arr
          }
          var newCleaner = {}
          for (let o of res.cleaner) {
            newCleaner[o.cleanerId] = o
          }
          this.setData({
            cleaner: newCleaner,
            order: res.allOrder,
          })
          // console.log(this.data.cleaner)
        }).catch(err => {
          console.log(err)
        })
    }
  },
  gotoDetails(e) {
    console.log(e.currentTarget.dataset.evaluate)
    var sn = e.currentTarget.dataset.sn
    var status = e.currentTarget.dataset.status
    var evaluate = e.currentTarget.dataset.evaluate
    if (evaluate === 'true') {
      wx.navigateTo({
        url: `../bjMyCleanCommentDone/bjMyCleanCommentDone?sn=${sn}`,
      })
    } else if (evaluate === 'false') {
      wx.navigateTo({
        url: `../bjMyCleanDetails/bjMyCleanDetails?sn=${sn}&status=${status}`,
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let getLoginId = wx.getStorageSync("LOGIN");
    api.get(cleaningOrder, {
        'status': '',
        'memberId': getLoginId.id
      })
      //和外面的this指向是相同的
      .then(res => {
        if(res.allOrder.length<=0) {
          this.setData({
            order: ''
          })
          return
        }
        for (let i of res.allOrder) {
          var arr = []
          for (let ar of i.timePeriod) {
            switch (ar) {
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
          i.timePeriod = arr
        }
        var newCleaner = {}
        for (let o of res.cleaner) {
          newCleaner[o.cleanerId] = o
        }
        // for(let i = 0; i< res.allOrder.length; i++) {
        //   res.allOrder.timePeriod = arr[i]
        // }
        this.setData({
          cleaner: newCleaner,
          order: res.allOrder,
        })
      }).catch(err => {
        console.log(err)
      })
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