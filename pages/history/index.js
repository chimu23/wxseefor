import {
  request
} from "../../utils/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    collectionList: [],
    isHis:false
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let collect = wx.getStorageSync("hisUrl") || [];
    let result = [];
    let collectionList = []
    collect.forEach(async (element) => {
      result.push(request({
        query: "?wd=" + element.name
      }));
    });
    if(result.length==0) return
    Promise.all(result).then((res) => {
      res.forEach((i) => {
        collectionList.push(i.data[0])
      })
      this.setData({
        collectionList,
        isHis:true
      })
    });
  },
  handleBtn(){
    wx.setStorageSync('hisUrl', [])
    this.setData({
      collectionList:[],
      isHis:false
    })
  },
  onMyEvent: function(){
    this.setData({
      isHis:false
    })
  }
})