// components/showPhotos/showPhotos.js
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    collectionList: {
      type: Array,
      Value: []
    },
    type: {
      type: String,
      value: ""
    }
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
    longTap(e) {
      let {
        wd
      } = e.currentTarget.dataset
      let type = this.properties.type
      let data = wx.getStorageSync(type) || []
      let index = this.properties.collectionList.findIndex(item => item.vod_name == wd)
      console.log(index)
      data.splice(index, 1)
      this.properties.collectionList.splice(index, 1)
      this.setData({
        collectionList: this.properties.collectionList
      })
      wx.setStorageSync(type, data)
      return wx.showToast({
        title: '已移除',
        icon: "none"
      })
    }
  },
  observers: {
    'collectionList': function (collectionList) {
      if (this.properties.collectionList.length == 0) {
        this.triggerEvent('myevent')
      }
    }
  }
})