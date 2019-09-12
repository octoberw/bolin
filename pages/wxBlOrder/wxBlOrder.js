// pages/wxNoBlOrder/wxNoBlOrder.js
import api from '../../api/api'
import {
  serverDetail,
  addOrder,
  checkAddress
} from '../../api/bjUrl/wx'

import {
  getMemberPoint,
  calculate
} from '../../api/bjUrl/user'

import wxPay from '../../utils/pay'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdisplay: 'block',
    showChildError: 'none', // 传值给popup 隐藏确定按钮
    nobolin_tiaozhuan: 'none',

    thirdId: 0,
    isBoLin: 0, //是否是泊邻用户
    isPay: true, //限制点击次数

    // 提交订单
    location: "请输入您的地址", // 地址
    areaId: "", // 地址id
    arrUrl: [], // 状况描述的图片
    content: '', // 状况描述的内容
    strClickId: '', // 状况描述的标签
    contentBeizhu: '', //备注内容
    itemName: '', // 项目名
    cost: '', // 总价格
    point: '', //可用积分
    dangqianPoint: '', // 当前积分
    jifenduihuan: '', // 积分兑换 
    useIntegral: 0, // 使用积分后的钱
    isBoLinBoolean: Boolean, // 布尔传值给后台  是否为泊邻用户
    getNum: 0, // 消耗掉的积分
    id: '',
    userId: '',
    itemjiance: '',
    valueCost: '',
    memberPoint: '',


    // 选择时间
    hideview: 'none',
    times: [],
    sendTimes: [],
    newSendTimes: '',
    classIndex: [0, 1, 1, 1, 1, 1, 1], //初始化选中当前天数的class为 bgc_fff
    timePeriod: ['', '', '', '', '', '', '', '', '', '', ''],
    selid: ['', '', '', '', '', '', '', '', '', '', ''], // 选择时间段的点击事件
    strSelid: ['', '', '', '', '', '', '', '', '', '', ''], // 选择时间段的点击事件  String
    seltime: [], // 存储选取的时间段        // 发后台
    seldate: '', // 存储选择的日期
    newSelTime: [],
    clickTimeId: 0, // 记录点击日期的id

  },

  closetiaozhuan() {
    this.setData({
      nobolin_tiaozhuan: 'none'
    })
  },

  // 选择时间
  showSelectTime() {
    var that = this
    that.getTimes()

    if (this.data.hideview === 'block') {
      this.setData({
        hideview: 'none'
      })
    } else {
      this.setData({
        hideview: 'block'
      })
    }
  },
  hideSelectTime() {
    if (this.data.hideview === 'block') {
      this.setData({
        hideview: 'none'
      })
    } else {
      this.setData({
        hideview: 'block'
      })
    }
  },

  // 选择积分
  successIntegral: function () {
    if(this.data.dangqianPoint<=0) {
      wx.showToast({
        title: '您的积分不足',
        icon: 'none',
        duration: 1500,
      });
      return 
    } else {
      this.integral.showIntegral()
    }
  },

  _successIntegral: function (e) {
    console.log('你确定了积分', e)
    this.setData({
      useIntegral: e.detail.integral,
      getNum: e.detail.getNum
    })
    api.get(calculate, {
        'maintainId': this.data.id,
        'userPoint': e.detail.getNum
      })
      .then(res => {
        console.log(res)
        this.setData({
          cost: res.finalValue
        })
      })
    this.integral.hideIntegral()
  },

  // 处理几天
  getTimes() {
    var times = new Array();
    //获取最近7天日期
    times.push(this.getDay(0) + this.xingqi(0)); //当天日期
    times.push(this.getDay(1) + this.xingqi(1));
    times.push(this.getDay(2) + this.xingqi(2));
    times.push(this.getDay(3) + this.xingqi(3));
    times.push(this.getDay(4) + this.xingqi(4));
    times.push(this.getDay(5) + this.xingqi(5));
    times.push(this.getDay(6) + this.xingqi(6));

    this.setData({
      times: times,
    })
    console.log('11', this.data.sendTimes)
  },

  // 处理星期
  xingqi(i) {
    var aa
    if (i + new Date().getDay() >= 7) {
      aa = "周" + "日一二三四五六".charAt(new Date().getDay() + i - 7); //获取当前星期X(0-6,0代表星期天)
    } else {
      aa = "周" + "日一二三四五六".charAt(new Date().getDay() + i);
    }
    return aa
  },

  // 处理月
  getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day; // n天后的日期
    today.setTime(targetday_milliseconds); //注意，这行是关键代码 
    var tYear = today.getFullYear()
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    this.data.sendTimes[day] = `${tYear}-${tMonth+1}-${tDate}`
    return (tMonth + 1) + "月" + tDate + "日" + " ";
  },

  // 选择日期
  clickTime(e) {
    var that = this
    var id = e.target.dataset.id
    var classIndex = that.data.classIndex
    that.setData({
      selid: ['', '', '', '', '', '', '', '', '', '', ''],
      strSelid: ['', '', '', '', '', '', '', '', '', '', ''],
      newSelTime: []
    })
    for (let i = 0; i < 7; i++) {
      if (id == i) {
        classIndex[i] = 0
      } else {
        classIndex[i] = 1
      }
    }
    that.setData({
      classIndex: classIndex,
      clickTimeId: id
    })
    // console.log((this.data.sendTimes)[this.data.clickTimeId])  //2019.7.6  发后台
  },

  // 选择时间段 
  selectTime(e) {
    var that = this
    var selid = that.data.selid
    var strSelTime = e.target.dataset.strseltime
    console.log(strSelTime)
    var id = e.target.dataset.selid - 1

    for (let i = 0; i < selid.length; i++) {
      if (i == id) {
        selid[id] = e.target.dataset.seltime
      } else {
        selid[i] = ''
      }
    }

    var seltime = selid.filter(item => item) // 发后台
    that.setData({
      selid: selid,
      seltime: seltime,
      newSendTimes: strSelTime
    })
  },

  gotoNoBolin() {
    wx.redirectTo({
      url: `/pages/wxBlOrder/wxBlOrder?wxId=${this.data.thirdId}&isBoLin=2`
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var isBoLinBoolean = options.isBoLin == 1 ? true : false
    this.setData({
      thirdId: options.wxId,
      isBoLin: options.isBoLin,
      isBoLinBoolean: isBoLinBoolean
    })
    this.popup = this.selectComponent("#popup")
    this.integral = this.selectComponent("#integral")
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
    } else {
      this.setData({
        hideview: 'none'
      })
    }
  },

  _success_popup: function () {
    this.popup.hidePopup()
  },


  gotoLocation: function () {
    wx.navigateTo({
      url: '../bjLocation/bjLocation?id=1'
    })
  },

  gotoConfirmOrder: function (e) {
    if (this.data.isPay === true) {
      this.send_from_pay(e)
    }
    setTimeout(() => {
      this.setData({
        isPay: true
      })
    }, 3500);
  },

  send_from_pay(e) {
    var that = this
    console.log('isPay', this.data.isPay)
    this.setData({
      isPay: false
    })
    if (this.data.showdisplay == 'none') {
      wx.showToast({
        title: '请确定阅读《维修服务协议》',
        icon: 'none',
        duration: 1500,
      });
      return
    }
    if (this.data.isBoLinBoolean) {
      if (!(that.data.location) || !(e.detail.value.doorNum) || !(e.detail.value.menpaiMun)) {
        wx.showToast({
          title: '请填写完整的数据',
          icon: 'none',
          duration: 1500,
        });
      } else {
        api.get(checkAddress, {
            'floor': e.detail.value.menpaiMun,
            'fullName': that.data.location,
            'houseNum': e.detail.value.doorNum
          })
          .then(res => {
            if (res.isBolin == true) {
              if (e.detail.value.phoneNum && this.data.sendTimes.length >= 1) {
                api.post(addOrder, {
                    'address': that.data.location,
                    'amountPayable': that.data.cost,
                    'areaId': that.data.areaId,
                    'bolin': that.data.isBoLinBoolean,
                    'date': (this.data.sendTimes)[this.data.clickTimeId],
                    'description': that.data.content,
                    'floor': e.detail.value.menpaiMun,
                    'houseNum': e.detail.value.doorNum,
                    'images': that.data.arrUrl,
                    'item': that.data.itemjiance,
                    'maintainServe': that.data.itemName,
                    'memberId': that.data.userId,
                    'name': '',
                    'phone': e.detail.value.phoneNum,
                    'point': that.data.point,
                    'remark': that.data.contentBeizhu,
                    'tags': that.data.strClickId,
                    'timePeriod': that.data.seltime,
                    'usedPoint': that.data.getNum,
                    'value': that.data.valueCost,
                    'maintainId': that.data.id
                  })
                  .then(res => {
                    wx.navigateTo({
                      url: '../wxOrderList/wxOrderList',
                    });
                  })
              } else {
                wx.showToast({
                  title: '请填写完整的数据',
                  icon: 'none',
                  duration: 1500,
                });
              }

            } else if (res.isBolin == false) {
              this.setData({
                nobolin_tiaozhuan: 'block'
              })
            }
          })
      }
    } else {
      if (!(that.data.location) || !(e.detail.value.doorNum) || !(e.detail.value.menpaiMun) || !(e.detail.value.phoneNum) || (e.detail.value.phoneNum.length < 11) || !(this.data.sendTimes.length >= 1)) {
        wx.showToast({
          title: '请填写完整的数据',
          icon: 'none',
          duration: 1500,
        });
      } else {
        api.post(addOrder, {
            'address': that.data.location,
            'amountPayable': that.data.cost,
            'areaId': that.data.areaId,
            'bolin': that.data.isBoLinBoolean,
            'date': (this.data.sendTimes)[this.data.clickTimeId],
            'description': that.data.content,
            'floor': e.detail.value.menpaiMun,
            'houseNum': e.detail.value.doorNum,
            'images': that.data.arrUrl,
            'item': that.data.itemjiance,
            'maintainServe': that.data.itemName,
            'memberId': that.data.userId,
            'name': '',
            'phone': e.detail.value.phoneNum,
            'point': that.data.point,
            'remark': that.data.contentBeizhu,
            'tags': that.data.strClickId,
            'timePeriod': that.data.seltime,
            'usedPoint': that.data.getNum,
            'value': that.data.valueCost,
            'maintainId': that.data.id
          })
          .then(res => {
            console.log(res)
            wxPay.Pay('/wechat/pay/maintainOrderPay.htm', res.os, 'os')
              .then((rest) => {
                if (rest === 'succ') {
                  wx.redirectTo({
                    url: '../wxOrderList/wxOrderList',
                  });
                } else {
                  wx.showToast({
                    title: '支付已取消',
                    icon: 'none',
                    duration: 1500,
                  });
                  wx.redirectTo({
                    url: `../wxOrderDetails/wxOrderDetails?id=${res.id}`,
                  });
                }
              })
          })
      }
    }
  },

  showNoBlDescribe: function () {
    wx.navigateTo({
      url: `../wxNoBlDescribe/wxNoBlDescribe?thirdId=${this.data.thirdId}`
    })
  },

  showNoBlRemark: function () {
    wx.navigateTo({
      url: '../wxNoBlRemark/wxNoBlRemark'
    })
  },

  getMemberPoint() {
    api.get(getMemberPoint, {})
    .then(res => {
      console.log(res)
      this.setData({
        dangqianPoint: res.point,
        jifenduihuan: res.ratio
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
    this.setData({
      memberPoint: wx.getStorageSync("MemberPoint")
    })
    var that = this
    var pages = getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 1]; // 上一个页面
    this.setData({
      arrUrl: prevPage.data.arrUrl, // 状况描述的图片
      content: prevPage.data.content, // 状况描述的内容
      strClickId: prevPage.data.strClickId, // 状况描述的标签
      contentBeizhu: prevPage.data.contentBeizhu, //备注内容
      location: prevPage.data.location,
      areaId: prevPage.data.areaId,
    })
    console.log('arrUrl', this.data.arrUrl)
    console.log('content', this.data.content)
    console.log('strClickId', this.data.strClickId)
    console.log('contentBeizhu', this.data.contentBeizhu)
    console.log('location', this.data.location)
    console.log('areaId', this.data.areaId)

    api.get(serverDetail, {
        'id': this.data.thirdId
      })
      .then(res => {
        console.log(res)
        that.setData({
          itemName: res.server.name,
          cost: JSON.parse(res.server.item)[0].v,
          valueCost: JSON.parse(res.server.item)[0].v,
          point: res.server.point,
          id: res.server.id,
          itemjiance: JSON.parse(res.server.item)[0].k,
        })
      })

    let getId = wx.getStorageSync("LOGIN");
    this.setData({
      userId: getId.id,
    })

    this.getMemberPoint()
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