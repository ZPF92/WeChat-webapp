'use strict';
import Api from '../../utils/api';
import getDateDiff from '../../utils/util';
Page({
    data : {
        title : '话题详情',
        detail : {},
        hidden : false
    },
    onLoad : function(options){
        //取出跳转过来当前内容页id
        let {id} = options;
        this.getData(id);
    },
    onReady : function(){
        this.setData({
            hidden : true
        });
    },
    getData : function(id){
        wx.request({
            url : Api.getItemContent(id,{mdrender : false}),
            success : function(res){
                let data = res.data.data;
                data.create_at = getDateDiff(new Date(data.create_at));
                data.replies = data.replies.map(item => {
                    item.create_at = getDateDiff(new Date(item.create_at));
                    return item;
                });
                this.setData({
                   detail : data 
                });
            }.bind(this)
        });
    }
});