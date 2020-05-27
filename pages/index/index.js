import { request } from "../../utils/request";

Page({
  data: {
    rencentList: [],
    Allmsg:[]
  },
  onLoad: function () {
    this.getData();
  },
  async getData() {
    // const res =  await request({query:"?cid=17"})
    //     this.setData({
    //       rencentList:res.data
    //     })
    // 新分类
    let ReqArr = [
      await request({ query: "?cid=3" }),
      await request({ query: "?cid=6" }),
      await request({ query: "?cid=12" }),
      await request({ query: "?cid=17" }),
      await request({ query: "?cid=92" })
    ];
    Promise.all(ReqArr).then((res) => {
      let Allmsg=[]
      res.forEach((item) => {
        Allmsg.push(item.data);
      });
      this.setData({
        Allmsg
      })
    });
    
  },
});
