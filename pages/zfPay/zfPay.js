// pages/zfPay/zfPay.js
import api from '../../api/api'
import {
  rentDetail,
  addOrder
} from '../../api/bjUrl/cz'
import wxPay from '../../utils/pay'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mouths: [],
    days: [],
    newDays: [],
    titleYear: "",
    titleMouth: "",
    titleDays: "",
    value: [1, 1],
    showPickerView: 'none',

    res: '', // 房源详情
    isTrue: true
  },

  showSelectTime() {
    this.setData({
      showPickerView: 'block'
    })
  },

  hideTM(e) {
    if (e.target.dataset.tm === 'mask') {
      this.setData({
        showPickerView: 'none',
        titleMouth: "",
        titleDays: "",
      })
    }
  },

  sureTime() {
    this.setData({
      showPickerView: 'none',
    })
  },

  bindChange(e) {
    var that = this
    var val = (e.detail.value)[0]
    var newDays = that.data.days
    that.setData({
      newDays: newDays[val],
      titleMouth: e.detail.value[0],
      titleDays: e.detail.value[1]
    })
  },

  // 提交表单接口
  // 提交表单
  getVal(e) {
    var that = this
    let getLoginId = wx.getStorageSync("LOGIN");
    if (e.detail.value.name == '' || this.data.titleMouth == '' || e.detail.value.phone == '') {
      wx.showToast({
        title: '请填写完整的信息',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if(this.data.isTrue) {
      this.setData({
        isTrue: false
      })
      setTimeout(() => {
        this.setData({
          isTrue: true
        })
      }, 3000);
      api.post(addOrder, {
          'address': that.data.res.address,
          'amountPayable': that.data.res.monthlyRent,
          'earnest': that.data.res.earnest,
          'type': (that.data.res.type)=='整租'?'all':'join',
          'memberId': getLoginId.id,
          'num': that.data.res.num,
          'person': e.detail.value.name,
          'phone': e.detail.value.phone,
          'date': `${that.data.titleYear}-${that.data.titleMouth+1}-${that.data.titleDays+1}`,
          'point': 0,
          'title': that.data.res.title
        })
        .then(res => {
          console.log(res)
          wxPay.Pay('/wechat/pay/rentOrderPay.htm',res.ts,'ts')
          .then((rest) => {
            if (rest === 'succ') {
              wx.redirectTo({
                url: `../zfPaySucc/zfPaySucc?num=${res.ts}`,
              });
            } 
            // else if (rest === 'fail') {
            //   wx.redirectTo({
            //     url: `../bjDailyClean/bjDailyClean?sn=${res.orderSn}`,
            //   });
            // }
          })
        })
    }
  },
  // url: '../zfOrderList/zfOrderList',


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    

    api.get(rentDetail, {
        'num': options.num
      })
      .then(res => {
        if (res.img_url != null) {
          res.img_url = res.img_url.split(',')[0]
        }
        that.setData({
          res: res
        })
      })

    // 获取年份
    var times = Date.parse(new Date())
    var date = new Date(times)
    var year = date.getFullYear()

    // 判断是否闰年的三个条件
    var cond1 = (year % 4 == 0)
    var cond2 = (year % 100 != 0)
    var cond3 = (year % 400 == 0)
    var cond = cond1 && cond2 || cond3
    // console.log(cond)  2019 false
    // console.log(year)

    // 自己循环出一年的月份和日期
    var arr = []
    for (let i = 0; i < 12; i++) {
      arr[i] = []
      if (i === 0 || i === 2 || i === 4 || i === 6 || i === 7 || i === 9 || i === 11) {
        for (let j = 1; j <= 31; j++) {
          arr[i].push(j)
        }
      } else if (i === 3 || i === 5 || i === 8 || i === 10) {
        for (let j = 1; j <= 30; j++) {
          arr[i].push(j)
        }
      } else {
        if (cond) {
          for (let j = 1; j <= 29; j++) {
            arr[i].push(j)
          }
        } else {
          for (let j = 1; j <= 28; j++) {
            arr[i].push(j)
          }
        }
      }
    }
    // 把索引当作月份，值当作日期，重新分为两个数组 mouths 和 days 
    var mouths = []
    var days = []
    for (let key in arr) {
      mouths[key] = parseInt(key) + 1
      days[key] = arr[key]
    }
    // console.log(mouths)
    // console.log(days)
    that.setData({
      mouths: mouths,
      days: days,
      newDays: days[0], // 初始化  (一开始没点击月份，就初始化日期数据出来)
      titleYear: year
    })
    console.log(that.data.days)
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