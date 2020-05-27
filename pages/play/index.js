// pages/play/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    playList: [],
    index: 0,
    itemIndex: 0
  },
  videoContext: {},
  onReady(res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      url,
      wd
    } = options
    let hisUrl = wx.getStorageSync('hisUrl') || []
    let index = hisUrl.findIndex(item => item.vod_name == wd)
    wx.setNavigationBarTitle({
      title: hisUrl[index].playList[hisUrl[index].index].name,
    })
    this.setData({
      url,
      playList: hisUrl[index].playList,
      itemIndex: index,
      index: hisUrl[index].index,
    })
  },
  handleRate(e) {
    let {
      rate
    } = e.currentTarget.dataset
    this.videoContext.playbackRate(Number(rate))
    this.myshowToast(`倍速(${rate})`)
  },
  handleJump(e) {
    let {
      jump
    } = e.currentTarget.dataset
    let changIndex = this.data.index + Number(jump)
    if (changIndex >= 0 && changIndex < this.data.playList.length) {
      let url = this.data.playList[this.data.index + Number(jump)].url
      let hisUrl = wx.getStorageSync('hisUrl') || []
      hisUrl[this.data.itemIndex].index = changIndex
      hisUrl[this.data.itemIndex].url = url
      wx.setStorageSync('hisUrl', hisUrl)
      wx.setNavigationBarTitle({
        title: this.data.playList[this.data.index + Number(jump)].name,
      })
      this.myshowToast(`播放${this.data.playList[this.data.index + Number(jump)].name}`)
      this.setData({
        url,
        index: this.data.index + Number(jump)
      })
    } else {
      return wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      })
    }
  },
    myshowToast(e){
      wx.showToast({
        title: e,
        icon:'none'
      })
    }
})