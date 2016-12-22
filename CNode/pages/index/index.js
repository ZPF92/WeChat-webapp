//index.js
import Api from '../../utils/api';
import getDateDiff from '../../utils/util';
Page({
  data : {
    title : '话题列表',
    postList : [],
    hidden : false,
    page : 1,
    tab : 'all'
  },
  onLoad : function(){
    console.log("is load");
    this.getData();
  },
  //页面首次渲染完后调用此函数，清除loading状态，无须开setTimeout仿异步
  onReady : function(){
    this.setData({
      hidden : true
    });
  },
  getData : function(data = {}){
    !data.page && (data.page = 1);
    //默认进来先清除之前的列表数据
    if(data.page == 1){
      this.setData({
        postList : []
      });
    }
    //调用微信内部api发起请求
    wx.request({
      url: Api.getLists(data),
      success : function(res){
        let list = res.data.data;
        if(Array.isArray(list)){
          this.setData({
            postList : this.data.postList.concat(list.map(item => {
              item.last_reply_at = getDateDiff(new Date(item.last_reply_at));
              return item;
            }))
          });
          this.setData({
            hidden : true
          });
        }
      }.bind(this)
    });
  },
  //点击头部
  onTabstar : function(e){
    //取当前项id作为参数
    let tab = e.currentTarget.id;
    this.setData({
      tab : tab,
      hidden : false
    });
    this.getData({
      tab : tab
    });
  },
  layoutMore : function(){
    this.setData({
      page : ++this.data.page
    });
    this.getData({
      tab : this.data.tab,
      page : this.data.page
    });
  },
  readItemContent : function(e){
    let id = e.currentTarget.id;
    //微信内部的页面跳转
    wx.navigateTo({
      url : '../detail/detail?id='+id
    });
  }
});
