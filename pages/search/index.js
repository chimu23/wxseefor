import { request } from "../../utils/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal:"",
    searchData: [],
    showBtn:false
  },
  timer: -1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  changeInput(e) {   
    if(!e.detail.value.trim()||!e.detail.value) { return  clearTimeout(this.timer);}
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
     let res = await request({ query: "?wd=" + e.detail.value });
      if(res.data.length===0){
        wx.showToast({
          title: '暂时查不到该内容呢',
          icon:'none'
        })
      }
      res.data.forEach(item=>item.vod_continu=item.vod_continu.replace('HD','电影'))
      this.setData({
        searchData: res.data,
        showBtn:true
      });
    }, 2000);
  },
  handleCancel(){
    this.setData({
      inputVal:"",
      searchData: [],
      showBtn:false
    })
  }
});
