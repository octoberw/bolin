// components/selectTime/selectTime.js
import api from '../../api/api'
import {
  serviceTime
} from '../../api/bjUrl/cleaningOrder'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cleanerId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    hideview: 'none',
    times: [],
    sendTimes: [],
    newSendTimes: '',
    classIndex: [0, 1, 1, 1, 1, 1, 1], //初始化选中当前天数的class为 bgc_fff
    timePeriod: ['', '', '', '', '', '', '', '', '', '', ''],
    selid: ['', '', '', '', '', '', '', '', '', '', ''], // 选择时间段的点击事件
    strSelid:['', '', '', '', '', '', '', '', '', '', ''], // 选择时间段的点击事件  String
    seltime: [], // 存储选取的时间段
    newSelTime: [],
    clickTimeId: 0 // 记录点击日期的id
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showSelectTime() {
      var that = this
      that.getTimes()

      // 点击进去直接渲染一次时间段
      api.get(serviceTime, {
          'cleanerId': that.properties.cleanerId,
          'date': (that.data.sendTimes)[0]
        })
        .then(res => {
          var that = this
          var timeId = res.serviceTime

          var timePeriod = that.data.timePeriod.slice()
          for (let o = 0; o < timePeriod.length; o++) {
            timePeriod[o] = ''
          }
          for (let j of timeId) {
            for (let i = 0; i < timePeriod.length; i++) {
              timePeriod[(parseInt(j.timePeriod)) - 1] = j
            }
          }
          that.setData({
            timePeriod: timePeriod,
            classIndex: [0, 1, 1, 1, 1, 1, 1],
            newSendTimes: (that.data.sendTimes)[0]
          })
          console.log(that.data.timePeriod)
        })
        .catch(res=>{
          this.setData({
            timePeriod: ['', '', '', '', '', '', '', '', '', '', ''],
          })
          wx.showToast({
            title: '今天没有排班',
            icon: 'none',
          });
        })

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
      this.triggerEvent("success", {
        seltime: this.data.seltime,
        cleanerId: this.properties.cleanerId,
        date: this.data.newSendTimes,
        newSelTime: this.data.newSelTime
      })
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
      console.log('日期',this.data.sendTimes)
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
        strSelid:['', '', '', '', '', '', '', '', '', '', ''],
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

      var sendTimes = that.data.sendTimes
      // 获取是否可以预约时间段
      api.get(serviceTime, {
          'cleanerId': that.properties.cleanerId,
          'date': `${sendTimes[id]}`
        })
        .then(res => {
          console.log('times',res)
          var that = this
          if(res.serviceTime) {
            var timeId = res.serviceTime
  
            var timePeriod = that.data.timePeriod.slice()
            for (let o = 0; o < timePeriod.length; o++) {
              timePeriod[o] = ''
            }
            for (let j of timeId) {
              for (let i = 0; i < timePeriod.length; i++) {
                timePeriod[(parseInt(j.timePeriod)) - 1] = j
              }
            }
            that.setData({
              timePeriod: timePeriod,
              newSendTimes: sendTimes[id]
            })
            console.log('周',that.data.newSendTimes)
          } 
        })
        .catch(res=>{
          this.setData({
            timePeriod: ['', '', '', '', '', '', '', '', '', '', ''],
          })
          wx.showToast({
            title: '今天没有排班',
            icon: 'none',
          });
        })
    },

    // 选择时间段 
    selectTime(e) {
      var that = this
      var selid = that.data.selid
      var strSelid = that.data.strSelid
      var id = e.target.dataset.selid - 1
      for (let i = 0; i < selid.length; i++) {
        if (selid[id] == '') {
          selid[id] = e.target.dataset.seltime
          strSelid[id] = e.target.dataset.strseltime
        } else {
          selid[id] = ''
          strSelid[id] = ''
        }
      }
      var seltime = selid.filter(item => item)
      var strseltime = strSelid.filter(itemStr => itemStr)
      var newStrSelid = strseltime.join(' / ')
      that.setData({
        selid: selid,
        seltime: seltime,
        newSelTime: newStrSelid
      })
      // console.log(that.data.selid)
      // console.log(that.data.seltime)
      console.log(that.data.newSelTime)
    }
  }
})