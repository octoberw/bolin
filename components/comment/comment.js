// components/Comment/Comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    comStyle: 'none'
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
      this.triggerEvent('success')
    },
    _hideComErr() {
      this.triggerEvent('error')
    }
  }
})