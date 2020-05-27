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
    playUrl: [],
    lastIndex:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      wd
    } = options;
    let index = -1;
    //判断是否收藏
    let collect = wx.getStorageSync("collect") || [];

    wd = wd.split(/[:/：\-\·\~]/)
    wd = wd[wd.length - 1]

    if (collect.length >= 0) {
      index = collect.findIndex((i) => i.vod_name == wd);
    }
    let isCollection = index != -1 ? true : false;
    //判断上次看到哪集
    let hisUrl = wx.getStorageSync("hisUrl") || [];
    let lastIndex = hisUrl.findIndex(item=>item.vod_name == wd )
    
    this.setData({
      wd,
      index,
      isCollection,
      lastIndex:lastIndex==-1?-1:hisUrl[lastIndex].index
    });
    this.getData(wd);
  },
  onShow:function(){
    
    let hisUrl = wx.getStorageSync('hisUrl') || []
    let item = hisUrl.findIndex(item=>item.vod_name == this.data.wd)
    if(item==-1) return

    this.setData({lastIndex:hisUrl[item].index})
    
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
      playUrl.push({
        name,
        url
      })
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
        vod_name: this.data.wd,
        vod_pic: this.data.listData.vod_pic
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
  },//点击按钮跳转播放
  handleBtn(e) {
    let {
      index,
      url
    } = e.currentTarget.dataset
    let hisUrl = wx.getStorageSync('hisUrl') || []
    let isHis = hisUrl.findIndex(item => item.vod_name == this.data.wd)
    if (isHis == -1) {
      hisUrl.push({
        vod_name: this.data.wd,
        url: url,
        index,
        vod_pic: this.data.listData.vod_pic,
        playList: this.data.playUrl
      })
    } else {
      hisUrl[isHis].url = url,
      hisUrl[isHis].index = index
    }
    this.setData({lastIndex:index})
    wx.setStorageSync('hisUrl', hisUrl)
    wx.navigateTo({
      url: '/pages/play/index?url=' + url+'&wd='+this.data.wd,
    })
  },
  handlePlay(){
    let hisUrl = wx.getStorageSync('hisUrl') || []
    let item = hisUrl.findIndex(item=>item.vod_name==this.data.wd)
    let url 
    if(item==-1){
      url = this.data.playUrl[0].url
    }else{
      url = hisUrl[item].url
    }
    wx.navigateTo({
      url: '/pages/play/index?url=' + url +'&wd='+this.data.wd,
    })
    
  }
});