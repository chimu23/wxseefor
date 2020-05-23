export const request = (params)=>{
  const baseUrl="https://cj.bajiecaiji.com/inc/feifei3bjm3u8/index.php"
  let times = 0;
  return new Promise((res,rej)=>{
    times ++ 
    wx.showLoading({
      title: '正在加载',
    })
    if(params.query===undefined){
      params.query=""
      
    }
    wx.request({
      ...params,
      url: baseUrl+params.query,
      success:(result)=>{
        times -- 
        res(result.data)
        if(times === 0 ){
          wx.hideLoading()
        }
      },
      complete:()=>{
        wx.hideLoading()      
      },
      fail:()=>{
        wx.showToast({
          title: '未知错误，请稍后重试',
          icon:'none',
          duration:1000
        })
        
      }
    })
  })
}