// pages/czHome/czHome.js
import treeData from '../../utils/util'
import qqmap from '../../utils/map';
import api from '../../api/api'
import {
  czHome,
  location,
  searchRent,
  houserAttribute,

} from '../../api/bjUrl/cz'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: '', //当前定位

    res: {  // 首页数据
      houseTags: [],
      longRents: [],
      tags: [],
    }, 
    homenum: '', // 房源号
    totalPage: '',
    pageNumber: '',

    weizhiList: [], // 位置筛选
    secWeizhiList: [], // 二级位置
    thirWeizhiList: [], // 三级位置
    attributeList: {}, // 筛选信息

    sendWeizhi: '', // 位置
    type: '', // 租房类型
    minMoney: '', //选择最小钱
    maxMoney: '', //选择最大钱
    newVid: '', //筛选模块的id

    weizhi: 'none',
    zujin: 'none',
    leixing: 'none',
    shaixuan: 'none',
    toTop: Number,
    toCenter: Number,
    toTopt: Number,
    num: 0,
    num1: 0,
    vid: [],

    houseList: [{
      image: "../../image/cz/img_c1.png",
    }, {
      image: "../../image/cz/img_c2.png",
    }, {
      image: "../../image/cz/img_c3.png",
    }, {
      image: "../../image/cz/img_c4.png",
    }],

    // 区域 地铁
    tree: [],
    childTree: [],
    childChildTree: [],
  },

  // 监听滚动
  // onPageScroll(e) {
  //   console.log(e.scrollTop)
  // },

  // 处理头部点击筛选
  clickTitle(e) {
    this.searchRent(this.data.location, '', '', '', '', '', e.currentTarget.dataset.id)
  },

  // 处理租金事件
  gotoTop_showZJ() {
    // 去到指定位置
    wx.pageScrollTo({
      scrollTop: this.data.toTop + this.data.toTopt,
      duration: 500
    });
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

  bindZujin(e) {
    var that = this
    var money = e.target.dataset.money.split('-')
    that.setData({
      minMoney: parseInt(money[0]),
      maxMoney: parseInt(money[1])
    })
    this.searchRent(that.data.location, that.data.sendWeizhi, that.data.type, that.data.minMoney, that.data.maxMoney, that.data.newVid, '')
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
      this.searchRent(that.data.location, that.data.sendWeizhi, that.data.type, that.data.minMoney, that.data.maxMoney, that.data.newVid, '')
      that.setData({
        zujin: 'none'
      })
    }
  },

  // 处理租房类型事件
  gotoTop_showLX() {
    wx.pageScrollTo({
      scrollTop: this.data.toTop + this.data.toTopt,
      duration: 500
    });
    // 显示类型
    if (this.data.leixing === 'none') {
      this.setData({
        leixing: 'block',
        zujin: 'none',
        weizhi: 'none',
        shaixuan: 'none'
      })
    } else {
      this.setData({
        leixing: 'none'
      })
    }
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
    wx.pageScrollTo({
      scrollTop: this.data.toTop + this.data.toTopt,
      duration: 500
    });
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
          secWeizhiList: [], // 二级位置
          thirWeizhiList: [], // 三级位置
          num1: 0,
          num: 0
        })
      }
    }
  },

  getHouserAttribute() {
    api.get(houserAttribute, {})
      .then(res => {
        this.setData({
          attributeList: res
        })
        console.log(this.data.attributeList)
      })
  },

  // 处理筛选事件
  gotoTop_showSX() {
    var that = this
    wx.pageScrollTo({
      scrollTop: this.data.toTop + this.data.toTopt + this.data.toCenter,
      // scrollTop: this.data.toTop,
      duration: 500
    });

    that.getHouserAttribute()

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
          thirWeizhiList: [],
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
      this.searchRent(that.data.location, that.data.sendWeizhi, that.data.type, that.data.minMoney, that.data.maxMoney, that.data.newVid, '')
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
    this.searchRent(that.data.location, that.data.sendWeizhi, that.data.type, that.data.minMoney, that.data.maxMoney, that.data.newVid, '')
  },

  // 类型筛选
  bindZufang(e) {
    var that = this
    this.setData({
      type: e.target.dataset.type,
      leixing: 'none',
    })
    this.searchRent(that.data.location, that.data.sendWeizhi, that.data.type, that.data.minMoney, that.data.maxMoney, that.data.newVid, '')
  },


  // 点击筛选
  clickBtn(e) {
    // console.log(e.target.dataset.id)
    var that = this
    var index = parseInt(e.target.dataset.id)
    console.log(index)
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
  },

  // 清空筛选选项
  reset() {
    this.setData({
      newVid: [],
      vid: [],
    })
  },

  click() {
    var that = this
    this.searchRent(that.data.location, that.data.sendWeizhi, that.data.type, that.data.minMoney, that.data.maxMoney, that.data.newVid, '')
    that.setData({
      shaixuan: 'none',
    })
  },


  // 跳转到搜索页面
  // gotozfScarch() {
  //   wx.navigateTo({
  //     url: '../zfSearch/zfSearch',
  //   });
  // },

  // 跳转到房子详情
  gotoZfListHome(e) {
    wx.navigateTo({
      url: `../zfSearchListHome/zfSearchListHome?num=${e.currentTarget.dataset.homenum}`,
    });
  },


  // 筛选请求接口
  searchRent(cityData, positionIdData, typeData, minData, maxData, attrsData, tagIdData) {
    api.get(searchRent, {
        'city': cityData,
        'positionId': positionIdData,
        'type': typeData,
        'min': minData,
        'max': maxData,
        'attrs': attrsData,
        'tagId': tagIdData
      })
      .then(res => {
        console.log(res)
        var that = this
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
        that.setData({
          res: res
        })
      })
      .catch(res => {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 1500,
        });
      })
  },

  // 渲染首页
  getHome(pageNumberData) {
    var that = this
    return new Promise((res, ret) => {
      api.get(czHome, {
          'city': that.data.location,
          'pageNumber': pageNumberData
        })
        .then(res => {
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
          res.houseTags = this.data.res.houseTags.concat(res.houseTags)
          res.longRents = this.data.res.longRents.concat(res.longRents)
          that.setData({
            res: res,
            pageNumber: res.pageNumber,
            totalPage: res.totalPage
          })
        })
      res()
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化地铁 区域数据
    // console.log(treeData.treeData)
    var that = this
    that.setData({
      tree: treeData.treeData
    })

    var that = this
    // 获取位置
    new qqmap().getLocateInfo()
      .then(res => {
        // console.log(res.result)
        this.setData({
          location: res,
          sendWeizhi: '', // 位置
          type: '', // 租房类型
          minMoney: '',
          maxMoney: '',
          weizhi: 'none',
          zujin: 'none',
          leixing: 'none',
          shaixuan: 'none',
        })

        // 获取城区筛选列表
        api.get(location, {
            'city': that.data.location
          })
          .then(res => {
            that.setData({
              weizhiList: res.positionVoes
            })
          })
        that.getHome(1)
          .then(() => {
            // 页面加载就使用query api 获取 '#topID' 的高度
            var query = wx.createSelectorQuery();
            query.select('#topID').boundingClientRect()
            query.select('#centerID').boundingClientRect()
            query.select('#topIDt').boundingClientRect()
            query.exec(res => {
              console.log(res)
              // console.log(res[0].height)
              this.setData({
                toTop: res[0].height,
                toTopt: res[2].height,
                toCenter: res[1].height
              })
            })
          })
      })

    // var vids = that.data.vid
    // for (let i = 0; i < 21; i++) {
    //   vids.push(i)
    // }
    // that.setData({
    //   vid: vids
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    if (this.data.pageNumber < this.data.totalPage) {
      this.getHome(this.data.pageNumber + 1)
    } else if (this.data.pageNumber = this.data.totalPage) {
      wx.showToast({
        title: '没有更多房源',
        icon: 'none',
        duration: 1500,
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})