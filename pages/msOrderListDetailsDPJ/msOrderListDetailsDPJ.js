var Moment = require("../../utils/moment.js");

// pages/msPay/msPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择日期
    checkInDate: "",
    checkOutDate: "",

    showChildError: 'none', // 传值给popup 隐藏确定按钮

    hideview: 'none',  // 显示取消

    // 评论标签
    comStyle: 'none',
    // 星星
    start: [1, 2, 3, 4, 5],
    newStart: [],
    images: [], //保存在本地的图片路径
    hiddenBtn: 1,
    fromStrat: Number,
    fromName: ['', '', '', '', '', ''],
    arrUrl: [],
    content: '',
    commentSn: '' // 获取服务器返回得sn    
  },

    // 评论
    showCom() {
      if (this.data.comStyle === 'none') {
        this.setData({
          comStyle: 'block'
        })
      } else {
        this.setData({
          comStyle: 'none'
        })
      }
    },
    hideCom() {
      if (this.data.comStyle === 'none') {
        this.setData({
          comStyle: 'block'
        })
      } else {
        this.setData({
          comStyle: 'none'
        })
      }
    },
    _hideComSucc() {
      var that = this
      wx.navigateTo({
        url: '',
      });
      // that.upLoadFile()
        // .then(() => {
        //   wx.hideLoading(); //关闭等待api
        //   that.triggerEvent('success', {
        //     toSunSn: that.data.commentSn
        //   })
        // })
    },

    // 获取内容
    getcontent(e) {
      console.log(e.detail.value.content)
      this.setData({
        content: e.detail.value.content
      })
    },


    // 点击星星
    clickStart(e) {
      var index = parseInt(e.target.dataset.index)
      var start = this.data.start.slice()
      console.log(start)
      for (let i in start) {
        if (i <= start[index]) {
          start[parseInt(i)] = 0
        }
      }
      this.setData({
        newStart: start,
        fromStrat: index + 1
      })
      // console.log(this.data.newStart)
      console.log(this.data.fromStrat)
    },

    // 上传图片
    chooseImage() {
      var that = this
      var images = this.data.images
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          var tempFilePaths = res.tempFilePaths
          // 合并数组
          var newImages = images.concat(tempFilePaths)
          that.setData({
            images: newImages
          })
          if (this.data.images.length === 3) {
            that.setData({
              hiddenBtn: 0
            })
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },

    // 预览图片
    previewImage(e) {
      var current = e.target.dataset.src
      wx.previewImage({
        urls: this.data.images,
        current: current,
        success: (result) => {
          console.log('预览成功')
        },
        fail: () => {},
        complete: () => {}
      });
    },


    // 上传图片封装函数  需要传一个i 记录图片数量
    upImgs(dataI) {
      var that = this

      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: 'http://192.168.50.168:8081/app/file/upload.htm',
          filePath: (that.data.images)[dataI],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            // console.log('成功调用', (JSON.parse(res.data)).url);
            (that.data.arrUrl)[dataI] = (JSON.parse(res.data)).url
            that.setData({
              arrUrl: that.data.arrUrl
            })
          },
          fail: function (res) {
            reject(res);
            // console.log('失败调用', res);
          },
          complete: function (complete) {
            // console.log('调用完成的回调', complete)
            dataI++
            if (dataI == that.data.images.length) {
              resolve()
            } else if (dataI < that.data.images.length) {
              that.upImgs(dataI)
                .then(resolve)        // 递归  
            }
          }
        })
      })
    },

    // 上传评论内容的封装函数
    apiPost() {
      return new Promise((resolve, reject) => {
        var that = this
        // 数组去空
        var arrFromName = that.data.fromName.filter(item => item)
        // 数组以#变成字符串拼接
        var strFromName = arrFromName.join('#')

        api.post(addCleanEvalute, {
            'labels': strFromName,
            'star': that.data.fromStrat,
            'images': that.data.arrUrl,
            'content': that.data.content,
            'sn': that.properties.toCommentSn
          })
          .then(res => {
            console.log('获得评论返回:', res)
            that.setData({
              commentSn: res.evaluate.sn
            })
            resolve()                       //  1
          })
      })
    },

    // 点击上传函数
    upLoadFile() {
      var that = this
      var imgurl = that.data.images
      var i = 0

      return new Promise((resolve, reject) => {
        // 等待api
        wx.showLoading({
          title: '上传评论中...',
          mask: true,
        })
        if (imgurl.length != 0) {
          that.upImgs(i)
            .then(() => {
              that.apiPost()
                .then(resolve)            //  1
            })
        } else {
          that.apiPost()
            .then(resolve)                //  1
        }
      })
    },

    // 显示评价页面
    showPingjia() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      });
      this.setData({
        hideview: 'block'
      })
    },
    
    colseYuyue(){
      this.setData({
        hideview: 'none'
      })
    },

  // 跳转到选择时间
  gotoSelectTime() {
    wx.navigateTo({
      url: '../msSelectTime/msSelectTime',
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 日期选择
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('yyyy-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('yyyy-MM-DD')
      }
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
    // 日期选择
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate
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