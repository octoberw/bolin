const app = getApp();
import api from '../../api/api'


// components/Comment/Comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toCommentSn: String, // 父亲传值过来得sn  用去请求接口  然后重新得到返回得sn
    toCommentCleanerId: String,
    apiUrl: String,
    orderNum: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    comStyle: 'none',
    // 评论标签
    vid: [{
        id: 0,
        name: '服务非常到位'
      },
      {
        id: 1,
        name: '态度很友好'
      },
      {
        id: 2,
        name: '很友好'
      },
      {
        id: 3,
        name: '很有礼貌'
      },
      {
        id: 4,
        name: '非常专业'
      },
      {
        id: 5,
        name: '角落处理很仔细'
      }
    ],
    // 星星
    start: [1, 2, 3, 4, 5],
    newStart: [],
    images: [], //保存在本地的图片路径
    hiddenBtn: 1,
    fromStrat: 0,
    fromName: ['', '', '', '', '', ''],
    arrUrl: [],
    content: '',
    commentSn: '' // 获取服务器返回得sn          
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      that.upLoadFile()
        .then(() => {
          wx.hideLoading(); //关闭等待api
          that.triggerEvent('success', {
            toSunSn: that.data.commentSn
          })
        })
    },
    _hideComErr() {
      this.triggerEvent('error')
    },

    // 获取内容
    getcontent(e) {
      console.log(e.detail.value.content)
      this.setData({
        content: e.detail.value.content
      })
    },

    // 点击标签
    clickBtn(e) {
      console.log(e.target.dataset.id)
      var index = parseInt(e.target.dataset.id)
      var vids = this.data.vid
      var name = this.data.fromName.slice()
      if (index === vids[index].id) {
        vids[index].id = 'on'
        name[index] = vids[index].name
        this.setData({
          vid: vids,
          fromName: name
        })
      } else {
        vids[index].id = index
        name[index] = ''
        this.setData({
          vid: vids,
          fromName: name
        })
      }
      console.log(this.data.vid)
      console.log(this.data.fromName)
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
          url: `${app.globalData.host}/app/file/upload.htm`,
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
                .then(resolve) // 递归  
            }
          }
        })
      })
    },

    // 上传评论内容的封装函数
    apiPost() {
      return new Promise((resolve, reject) => {
        var that = this
        console.log(that.properties.apiUrl)
        // 数组去空
        var arrFromName = that.data.fromName.filter(item => item)
        // 数组以#变成字符串拼接
        var strFromName = arrFromName.join('#')

        let getLoginId = wx.getStorageSync("LOGIN");

        if (!that.properties.toCommentCleanerId) {

          api.post(that.properties.apiUrl, {
              'labels': strFromName,
              'star': that.data.fromStrat,
              'images': that.data.arrUrl,
              'content': that.data.content,
              [that.properties.orderNum]: that.properties.toCommentSn,
              'memberId': getLoginId.id
            })
            .then(res => {
              console.log('获得评论返回:', res)
              that.setData({
                commentSn: res.id
              })
              resolve() //  1
            })
        } else {
          api.post(apiUrl, {
              'labels': strFromName,
              'star': that.data.fromStrat,
              'images': that.data.arrUrl,
              'content': that.data.content,
              [that.properties.orderNum]: that.properties.toCommentSn,
              'cleanerId': that.properties.toCommentCleanerId,
              'memberId': getLoginId.id
            })
            .then(res => {
              console.log('获得评论返回:', res)
              that.setData({
                commentSn: res.evaluate.sn
              })
              resolve() //  1
            })
        }
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
                .then(resolve) //  1
            })
        } else {
          that.apiPost()
            .then(resolve) //  1
        }
      })
    }
  }
})