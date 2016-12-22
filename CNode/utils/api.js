'use strict';
const HOST_URI = 'https://cnodejs.org/api/v1';
const GET_TOPICS = '/topics';
const GET_TOPIC_BY_ID = '/topic/';

function json2url(json = {}){
    if(Object.is(Object,json.constructor)){
        //判断如果传进来是json
        return Object.keys(json).map(name => {
            return encodeURIComponent(name)+'='+encodeURIComponent(json[name]);
        }).join('&');
    }else{
        return '';
    }
}

export default {
    //获取列表数据
    getLists:function(json = {}){
       return HOST_URI + GET_TOPICS + '?' + json2url(json);
    },
    //获取某条内容
    getItemContent:function(id = '',json = {}){
        return HOST_URI + GET_TOPIC_BY_ID + id + '?' + json2url(json);
    }
};