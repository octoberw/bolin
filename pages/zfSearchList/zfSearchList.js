// pages/czHome/czHome.js
import treeData from '../../utils/util'

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

    houseList: [{
      image: "../../image/cz/img_c1.png",
    }, {
      image: "../../image/cz/img_c2.png",
    }, {
      image: "../../image/cz/img_c3.png",
    }, {
      image: "../../image/cz/img_c4.png",
    }, {
      image: "../../image/cz/img_c2.png",
    }],

    // 区域 地铁
    tree: [],
    childTree: [],
    childChildTree: []
  },

  // 监听滚动
  // onPageScroll(e) {
  //   console.log(e.scrollTop)
  // },

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

  // 处理租房类型事件
  gotoTop_showLX() {
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

  bindChange(e) {
    var that = this
    var treeList = that.data.tree
    var num1 = e.currentTarget.dataset.num1
    var list = []
    for (let i = 0; i < treeList.length; i++) {
      if (treeList[i].children) {
        var child = treeList[i].children
        for (let i of child) {
          if (parseInt(e.currentTarget.id) === i.parentID) {
            list.push(i)
          }
        }
      }
    }
    that.setData({
      childTree: list,
      num1: num1,
      num: 0,
      childChildTree: [],
    })
    // console.log(that.data.childTree)
  },

  bindChangeChild(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var num = e.currentTarget.dataset.num
    var arr = (that.data.childTree)[index]
    if (arr.children) {
      that.setData({
        childChildTree: arr.children,
        num: num
      })
    }
    // console.log(that.data.childChildTree)
  },


  // 点击筛选
  clickBtn(e) {
    // console.log(e.target.dataset.id)
    var that = this
    var index = parseInt(e.target.dataset.id)
    var vids = that.data.vid
    if (index === vids[index]) {
      vids[index] = 'on'
      that.setData({
        vid: vids
      })
    } else {
      vids[index] = index
      that.setData({
        vid: vids
      })
    }
    console.log(that.data.vid)
  },


  toHouse() {
    wx.navigateTo({
      url: '../zfSearchListHome/zfSearchListHome',
    });
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

    var vids = that.data.vid
    for (let i = 0; i < 21; i++) {
      vids.push(i)
    }
    that.setData({
      vid: vids
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