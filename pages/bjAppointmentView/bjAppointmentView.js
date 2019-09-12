// pages/appointmentView/appointmentView.js
import api from '../../api/api'
import {
  cleaner,
  addOrder,
} from '../../api/bjUrl/cleaningOrder'
import wxPay from '../../utils/pay'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdisplay: 'block',
    showChildError: 'none', // 传值给popup 隐藏确定按钮
    cleanerId: 0,
    cleaner: [],
    location: '请输入服务地址',
    doorNum: 0,
    floorNum: 0,
    phone: 0,
    seltime: [],
    date: '',
    newSelTime: '',
    amountPayable: Number, //支付总价格
    isPay:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this
    if (!options.location) {
      that.setData({
        cleanerId: parseInt(options.cleanerId),
        location: '请输入服务地址'
      })
    } else {
      that.setData({
        cleanerId: parseInt(options.cleanerId),
        location: options.location
      })
    }

    this.popup = this.selectComponent("#popup")
    this.selecttime = this.selectComponent("#selecttime")
  },

  // 点击显示内圈
  showNq: function () {
    console.log(this.data.showdisplay)
    if (this.data.showdisplay === 'none') {
      this.setData({
        showdisplay: 'block'
      })
    } else {
      this.setData({
        showdisplay: 'none'
      })
    }
  },

  // 显示条款界面
  showPopup: function () {
    this.popup.showPopup()

  },

  // 确定回调
  _error: function () {},

  // 取消回调
  _success: function () {
    console.log('你确定了')
    if (this.data.showdisplay === 'none') {
      this.setData({
        showdisplay: 'block'
      })
    }
    this.popup.hidePopup()
  },

  // 显示时间选择组件
  showSelectTime: function () {
    this.selecttime.showSelectTime()
  },
  // 选完时间的处理函数
  _successSelect: function (e) {
    this.setData({
      seltime: e.detail.seltime,
      date: e.detail.date,
      amountPayable: parseFloat(e.detail.seltime.length) * parseInt(this.data.cleaner.cost),
    })
    console.log(this.data.date, this.data.seltime)
    console.log(this.data.cleaner.cost * parseFloat(this.data.seltime.length))

    this.selecttime.hideSelectTime()
  },

  gotoLocation: function () {
    wx.navigateTo({
      url: '../location/location'
    })
  },

  // 获取表单数据
  getcontent(e) {
    var that = this
    if(this.data.isPay) {
      this.setData({
        isPay: false
      })
      setTimeout(() => {
        this.setData({
          isPay: true
        })
      }, 3000);
      let getLoginId = wx.getStorageSync("LOGIN");
      if(e.detail.value.doorNum==''||e.detail.value.floorNum==''||e.detail.value.phone==''||that.data.date=='') {
        wx.showToast({
          title: '请填写完整的信息',
          icon: 'none',
          duration: 1500,
        });
        return
      }
      this.setData({
        doorNum: e.detail.value.doorNum,
        floorNum: e.detail.value.floorNum,
        phone: e.detail.value.phone,
      })
      api.post(addOrder, {
          'address': that.data.location,
          'amountPayable': that.data.seltime.length * that.data.cleaner.cost,
          'cost': parseFloat(that.data.cleaner.cost),
          'date': that.data.date,
          'memberId': getLoginId.id,
          'cleanerId': parseInt(that.data.cleanerId),
          'phone': that.data.phone,
          'timePeriods': that.data.seltime
        })
        .then(res => {
          wxPay.Pay('/wechat/pay/clean_order_pay.htm',res.orderSn,'sn')
            .then((rest) => {
              if (rest === 'succ') {
                wx.redirectTo({
                  url: `../bjConfirmOrder/bjConfirmOrder?sn=${res.orderSn}`,
                });
              } else if (rest === 'fail') {
                wx.redirectTo({
                  url: `../bjDailyClean/bjDailyClean?sn=${res.orderSn}`,
                });
              }
            })
        })
    }
  },

  // 跳到填写地址页面
  gotoLocation() {
    wx.navigateTo({
      url: `../bjLocation/bjLocation?cleanerId=${this.data.cleanerId}&id=3`,
    });
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
    var that = this
    let getLoginId = wx.getStorageSync("LOGIN");
    api.get(cleaner, {
        'cleanerIds': this.data.cleanerId,
        'memberId': getLoginId.id
      })
      .then(res => {
        console.log(res)
        var newCleaner = res.cleaner[0]
        newCleaner.distance = (newCleaner.distance).slice(0, 4)
        if (newCleaner.cost) {
          newCleaner.cost = parseFloat(newCleaner.cost)
        }
        that.setData({
          cleaner: newCleaner
        })
        console.log('cleaner',this.data.cleaner)
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