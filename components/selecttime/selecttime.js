// components/selectTime/selectTime.js
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
    hideview: 'none'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showSelectTime() {
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
    _success() {
      this.triggerEvent("success")
    }
  }
})