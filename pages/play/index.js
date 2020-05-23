// pages/play/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"" 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {url, wd} = options
    let hisUrl = wx.getStorageSync('hisUrl')||[]
    let index = hisUrl.findIndex(item=>item == wd)
    if(index == -1){
    hisUrl.push({name:wd})
    }
    wx.setStorageSync('hisUrl', hisUrl)
    this.setData({
      url
    })
  }


})