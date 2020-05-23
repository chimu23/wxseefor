import{request} from '../../utils/request'

Page({
  data: {
    rencentList:[]
  },
  onLoad: function () {
    this.getData()
  },
 async getData(){
  const res =  await request({query:"?cid=17"})
      this.setData({
        rencentList:res.data
      })
    
  }
})