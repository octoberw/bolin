// components/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    error: {
      type: String,
      value: '确定'
    },
    success: {
      type: String,
      value: '我在想想'
    },
    showError: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hideview: 'none'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPopup() {
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
    hidePopup() {
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
    _error() {
      this.triggerEvent("error")
    },
    _success() {
      this.triggerEvent("success")
    }
  }
})