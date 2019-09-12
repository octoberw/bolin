// components/integral/integral.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    point: Number,
    dangqianPoint: Number,
    jifenduihuan: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    integral: 0,
    showIntegral: 'none',
    getNum: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getNumber(e) {
      if (e.detail.value === '') {
        this.setData({
          integral: 0
        })
      } else {
        var getNum = parseInt(e.detail.value)
        if (getNum >= this.properties.dangqianPoint) {
          getNum = this.properties.dangqianPoint
          this.setData({
            integral: getNum / (this.properties.jifenduihuan),
            getNum: getNum
          })
          return this.properties.dangqianPoint
        }
        if (getNum >= this.properties.point) {
          getNum = this.properties.point
          this.setData({
            integral: getNum / (this.properties.jifenduihuan),
            getNum: getNum
          })
          return this.properties.point
        }
        this.setData({
          integral: getNum / (this.properties.jifenduihuan),
          getNum: getNum
        })
      }
    },

    hideIntegral() {
      if (this.data.showIntegral === 'block') {
        this.setData({
          showIntegral: 'none'
        })
      }
    },

    showIntegral() {
      if (this.data.showIntegral === 'none') {
        this.setData({
          showIntegral: 'block'
        })
      }
    },

    _tapSucc() {
      var sendBlOrder = {
        integral: this.data.integral,
        getNum: this.data.getNum
      }
      this.triggerEvent('succ', sendBlOrder)
    }
  }
})