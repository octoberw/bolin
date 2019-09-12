// pages/czHome/czHome.js
import treeData from '../../utils/util'

import api from '../../api/api'
import {
  homeStayIndex,
  location,
  houserAttribute,
  searchHome
} from '../../api/bjUrl/ms'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weizhi: 'none',
    zujin: 'none',
    leixing: 'none',
    shaixuan: 'none',
    toTop: Number,
    num: 0,
    num1: 0,
    vid: [],
    bigPeople: 0,
    smallPeople: 0,
    location: '',
    leixingVid: ['on', ''], // 类型选择(整租，合租)
    xianshi: 'more',


    // 区域 地铁
    weizhiList: [], // 位置筛选
    secWeizhiList: [], // 二级位置
    thirWeizhiList: [], // 三级位置
    attributeList: {}, // 筛选信息
    minMoney: '', //选择最小钱
    maxMoney: '', //选择最大钱
    type: 'self', // 默认租房类型
    checkInDate: '', //开始时间
    checkOutDate: '', // 结束时间
    allPeople: '', //住的人数
    address: '', // 关键字搜索
    newVid: '', //筛选模块的id
    sendWeizhi: '', //位置id,
    pageNumber: 1,
    totalPage: '',

    // list 集合
    res: {
      headAndStar:[],
      homeStay:[],
      houseTags:[],
      tags:[],
    },
    headAndStar: {},
    homeStayLen: Number // 长度
  },

  // 监听滚动
  // onPageScroll(e) {
  //   console.log(e.scrollTop)
  // },
  sousuo(e) {
    this.setData({
      address: e.detail.value
    })
    this.searchHome(this.data.newVid, this.data.maxMoney, this.data.minMoney, this.data.sendWeizhi, '')
  },


  // 处理租金事件
  gotoTop_showZJ() {
    // 显示租金
    if (this.data.zujin === 'none') {
      this.setData({
        zujin: 'block',
        leixing: 'none',
        weizhi: 'none',
        shaixuan: 'none'
      })
    } else {
      this.setData({
        zujin: 'none'
      })
    }
  },
  closeZJ(e) {
    // 通过事件代理data-name的方式阻止向下冒泡
    if (e.target.dataset.name === 'mask') {
      if (this.data.zujin === 'none') {
        this.setData({
          zujin: 'block'
        })
      } else {
        this.setData({
          zujin: 'none'
        })
      }
    }
  },

  // 重置
  chongzhi() {
    this.setData({
      bigPeople: 0,
      smallPeople: 0,
    })
  },

  // 处理租房类型事件
  gotoTop_showLX() {
    // 显示类型
    // if (this.data.leixing === 'none') {
    //   this.setData({
    //     leixing: 'block',
    //     zujin: 'none',
    //     weizhi: 'none',
    //     shaixuan: 'none'
    //   })
    // } else {
    //   this.setData({
    //     leixing: 'none'
    //   })
    // }
    wx.navigateTo({
      url: '../msSelectTime/msSelectTime',
    });
  },
  closeLX(e) {
    // 通过事件代理data-name的方式阻止向下冒泡
    if (e.target.dataset.name === 'mask') {
      if (this.data.leixing === 'none') {
        this.setData({
          leixing: 'block'
        })
      } else {
        this.setData({
          leixing: 'none'
        })
      }
    }
  },

  // 处理房子位置事件
  gotoTop_showWZ() {
    api.get(location, {
        'city': this.data.location
      })
      .then(res => {
        this.setData({
          weizhiList: res.positionVoes
        })
        console.log(res)
      })

    // 显示类型
    if (this.data.weizhi === 'none') {
      this.setData({
        weizhi: 'block',
        leixing: 'none',
        zujin: 'none',
        shaixuan: 'none'
      })
    } else {
      this.setData({
        weizhi: 'none'
      })
    }
  },
  closeWZ(e) {
    // 通过事件代理data-name的方式阻止向下冒泡
    if (e.target.dataset.name === 'mask') {
      if (this.data.weizhi === 'none') {
        this.setData({
          weizhi: 'block'
        })
      } else {
        this.setData({
          weizhi: 'none',
          childTree: [],
          childChildTree: [],
          num1: 0,
          num: 0
        })
      }
    }
  },

  // 位置筛选
  bindChange(e) {
    var that = this
    var num1 = e.currentTarget.dataset.num1
    var secWz = that.data.weizhiList

    that.setData({
      secWeizhiList: secWz[num1].positionVoes
    })

    that.setData({
      num1: num1,
      num: 0,
      thirWeizhiList: []
    })
    // console.log(that.data.childTree)
  },

  bindChangeChild(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var num = e.currentTarget.dataset.num
    var thirWz = that.data.secWeizhiList

    that.setData({
      num: num,
      thirWeizhiList: []
    })

    if (thirWz[index].positionVoes.length > 0) {
      that.setData({
        thirWeizhiList: thirWz[index].positionVoes,
      })
    } else {
      that.setData({
        weizhi: 'none',
        num1: 0,
        num: 0,
        secWeizhiList: [], // 二级位置
        thirWeizhiList: [], // 三级位置
        sendWeizhi: thirWz[index].id
      })
      this.searchHome(this.data.newVid, this.data.maxMoney, this.data.minMoney, this.data.sendWeizhi, '')
    }
  },

  bindChangeSecChild(e) {
    var that = this
    var num2 = e.currentTarget.dataset.num2
    that.setData({
      weizhi: 'none',
      num1: 0,
      secWeizhiList: [], // 二级位置
      thirWeizhiList: [], // 三级位置
      sendWeizhi: that.data.thirWeizhiList[num2].id
    })
    this.searchHome(this.data.newVid, this.data.maxMoney, this.data.minMoney, this.data.sendWeizhi, '')
  },

  // 租金筛选
  bindZujin(e) {
    var that = this
    var money = e.target.dataset.money.split('-')
    that.setData({
      minMoney: parseInt(money[0]),
      maxMoney: parseInt(money[1])
    })
    this.searchHome(this.data.newVid, this.data.maxMoney, this.data.minMoney, this.data.sendWeizhi, '')
    that.setData({
      zujin: 'none'
    })
  },

  bindInputMoney(e) {
    var that = this
    if (e.detail.value.min != "" && e.detail.value.max != "") {
      that.setData({
        minMoney: parseInt(e.detail.value.min),
        maxMoney: parseInt(e.detail.value.max)
      })
      this.searchHome(this.data.newVid, this.data.maxMoney, this.data.minMoney, this.data.sendWeizhi, '')
      that.setData({
        zujin: 'none'
      })
    }
  },


  // 处理筛选事件
  gotoTop_showSX() {
    wx.pageScrollTo({
      scrollTop: this.data.toTop,
      duration: 300
    });
    // 显示筛选
    if (this.data.shaixuan === 'none') {
      this.setData({
        weizhi: 'none',
        leixing: 'none',
        zujin: 'none',
        shaixuan: 'flex'
      })
    } else {
      this.setData({
        weizhi: 'none'
      })
    }
    this.houserAttribute()
  },
  closeSX(e) {
    if (e.target.dataset.name === 'mask') {
      if (this.data.shaixuan === 'none') {
        this.setData({
          shaixuan: 'flex'
        })
      } else {
        this.setData({
          shaixuan: 'none',
          childTree: [],
          childChildTree: [],
          num1: 0,
          num: 0
        })
      }
    }
  },

  // 点击筛选
  clickBtn(e) {
    // console.log(e.target.dataset.id)
    var that = this
    var index = parseInt(e.target.dataset.id)
    var vids = that.data.vid
    if (!(vids[index])) {
      vids[index] = index
      that.setData({
        vid: vids
      })
    } else if (vids[index] == index) {
      vids[index] = undefined
      that.setData({
        vid: vids
      })
    }

    var newVid = that.data.vid.filter(item => item)
    that.setData({
      newVid: newVid.join(',')
    })
    console.log(this.data.newVid)
  },

  clickBtnLeixing(e) {
    var leixingVid = this.data.leixingVid
    // 合租整租类型
    if (leixingVid[0] == 'on') {
      leixingVid[0] = ''
      leixingVid[1] = 'on'
      this.setData({
        leixingVid: leixingVid,
        type: 'join'
      })
    } else if (leixingVid[1] == 'on') {
      leixingVid[0] = 'on'
      leixingVid[1] = ''
      this.setData({
        leixingVid: leixingVid,
        type: 'self'
      })
    }
  },

  click() {
    this.setData({
      allPeople: (this.data.smallPeople + this.data.bigPeople == 0 ? '' : this.data.smallPeople + this.data.bigPeople)
    })
    this.searchHome(this.data.newVid, this.data.maxMoney, this.data.minMoney, this.data.sendWeizhi, '')
    this.setData({
      shaixuan: 'none'
    })
  },

  // 清空筛选选项
  reset() {
    this.setData({
      newVid: [],
      vid: [],
    })
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



  // 成人加减法
  minus() {
    var bigPeople = this.data.bigPeople
    if (bigPeople === 0) {
      bigPeople = 0
    } else {
      bigPeople -= 1
    }
    this.setData({
      bigPeople: bigPeople
    })
  },

  add() {
    var bigPeople = this.data.bigPeople
    if (bigPeople >= 50) {
      bigPeople = 50
    } else {
      bigPeople += 1
    }
    this.setData({
      bigPeople: bigPeople
    })
  },

  // 小孩加减法
  smallminus() {
    var smallPeople = this.data.smallPeople
    if (smallPeople === 0) {
      smallPeople = 0
    } else {
      smallPeople -= 1
    }
    this.setData({
      smallPeople: smallPeople
    })
  },

  smalladd() {
    var smallPeople = this.data.smallPeople
    if (smallPeople >= 50) {
      smallPeople = 50
    } else {
      smallPeople += 1
    }
    this.setData({
      smallPeople: smallPeople
    })
  },


  // 获取搜索列表封装函数
  getHouseList(cityData, peopleData, pageNumberData) {
    api.get(homeStayIndex, {
        'city': cityData,
        'people': peopleData,
        'pageNumber': pageNumberData
      })
      .then(res => {
        var headAndStar = this.data.headAndStar
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
        res.headAndStar = this.data.res.headAndStar.concat(res.headAndStar)
        res.homeStay = this.data.res.homeStay.concat(res.homeStay)
        res.houseTags = this.data.res.houseTags.concat(res.houseTags)
        res.tags = this.data.res.tags.concat(res.tags)
        this.setData({
          res: res,
          headAndStar: headAndStar,
          homeStayLen: res.homeStay.length,
          pageNumber: res.pageNumber,
          totalPage: res.totalPage
        })
      })
  },

  // 筛选列表封装函数
  houserAttribute() {
    api.get(houserAttribute, {})
      .then(res => {
        this.setData({
          attributeList: res
        })
      })
  },

  // 搜索条件封装函数
  searchHome(attrsData, maxData, minData, positionIdData, tagIdData) {
    api.get(searchHome, {
        'address': this.data.address,
        'attrs': attrsData,
        'city': this.data.location,
        'max': maxData,
        'min': minData,
        'people': this.data.allPeople,
        'positionId': positionIdData,
        'tagId': tagIdData,
        'type': this.data.type
      })
      .then(res => {
        if (res != "暂无数据") {
          var headAndStar = {}
          if (res.headAndStar) {
            for (let i of res.headAndStar) {
              i.star = parseInt(i.star)
              headAndStar[i.parentId] = i
            }
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
          this.setData({
            res: res,
            headAndStar: headAndStar,
            homeStayLen: res.homeStay.length
          })
        } else {
          this.setData({
            xianshi: 'less'
          })
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 1500,
          });
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 初始化地铁 区域数据
    // console.log(treeData.treeData)
    that.setData({
      tree: treeData.treeData,
      location: options.city ? options.city : '',
      allPeople: options.people ? options.people : ''
    })

    // 页面加载就使用query api 获取 '#topID' 的高度
    var query = wx.createSelectorQuery();
    query.select('#centerID').boundingClientRect()
    query.exec(res => {
      console.log(res)
      // console.log(res[0].height)
      this.setData({
        toTop: res[0].height,
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHouseList(this.data.location, this.data.allPeople, this.data.pageNumber)

    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate,
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
    if (this.data.pageNumber < this.data.totalPage) {
      wx.showToast({
        title: '没有更多房源',
        icon: 'none',
        duration: 1500,
      });
      this.getHouseList(this.data.location, this.data.allPeople, this.data.pageNumber + 1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})