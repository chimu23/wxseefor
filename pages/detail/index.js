import {
  request
} from "../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: {},
    isShow: false,
    isCollection: false,
    wd: "",
    index: -1,
    playUrl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      wd
    } = options;
    let index = -1;
    let collect = wx.getStorageSync("collect") || [];

    wd = wd.split(/[:/：\-\·\~]/)
    wd = wd[wd.length-1]

    if (collect.length >= 0) {
      index = collect.findIndex((i) => i.name == wd);
    }
    let isCollection = index != -1 ? true : false;

    this.setData({
      wd,
      index,
      isCollection,
    });
    this.getData(wd);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  async getData(params) {
    const res = await request({
      query: "?wd=" + params
    });

    if (res.data.length === 0) {
      return wx.navigateBack({
        complete: (res) => {
          wx.showToast({
            title: '无法显示该内容',
            icon: 'none',
            duration: 1000,

          })
        }
      })
    }

    let {
      vod_name,
      list_name,
      vod_language,
      vod_year,
      vod_pic,
      vod_url,
      vod_continu,
      vod_content,
    } = res.data[0];
    let all = `${list_name}/${vod_language}/${vod_year}`;
 
    let playUrl = []
     vod_url.split('\n').forEach(element => {
         let name = element.split('$')[0]
         let url = element.split('$')[1]
         playUrl.push({name,url})
    });   
    this.setData({
      listData: {
        vod_name,
        vod_pic,
        all,
        vod_continu,
        vod_content,        
      },
      playUrl
    });
  },
  showContent() {
    this.setData({
      isShow: !this.data.isShow,
    });
  },
  collect() {
    let collect = wx.getStorageSync("collect") || [];

    if (!this.data.isCollection) {
      //收藏
      collect.push({
        name: this.data.wd,
        vod_pic:this.data.listData.vod_pic
      });
    } else {
      collect.splice(this.data.index, 1)
    }
    wx.setStorage({
      key: "collect",
      data: collect,
    });
    this.setData({
      isCollection: !this.data.isCollection,
    });
  },
  handleBtn(e){
    let {index} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/play/index?url='+index+'&wd='+this.data.wd,
    }) 
  }
});