import api from '../../api/api'
import {
  addLikes,
  cancleLikes
} from '../../api/bjUrl/user'

// components/likes/likes.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: Boolean,
    likeId: String,
    type: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapLike() {
      if(this.properties.isLike) {
        this.cancleLikes()
        this.setData({
          isLike: !this.properties.isLike
        })
      } else {
        this.addLikes()
        this.setData({
          isLike: !this.properties.isLike
        })
      }
    },
    addLikes() {
      api.post(addLikes, {
        'likeId': this.properties.likeId,
        'type': this.properties.type
      })
      .then(res=>{
        this.triggerEvent('likes', res)
      })
    },
    cancleLikes() {
      api.post(cancleLikes, {
        'likeId': this.properties.likeId,
        'type': this.properties.type
      })
      .then(res=>{
        this.triggerEvent('likes', res)
      })
    }
  }
})