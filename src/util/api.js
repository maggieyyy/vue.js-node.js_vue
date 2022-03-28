const axios = require('axios')
const baseUrl = 'http://127.0.0.1:3000/'
const api = {}

const apiAxios = async(method, url, params) =>{
    // 项目既定fapp
    let headers = ''
    if(url.includes('upload')){
        headers = {fapp:'book'}
    }else{
    headers = {fapp:'book','Content-Type':'application/json'}}
    // 读取存储在sessionStorage中的Token
    if(sessionStorage.getItem('token')){
        headers.token = sessionStorage.getItem('token')
    }
    if(sessionStorage.getItem('username')){
        headers.username = sessionStorage.getItem('username')
    }
    return await new Promise((resolve=>{
        axios({
            //如果缓存里有token，则所有请求都包含它
            headers:headers,
            method:method,
            url: baseUrl+url,
            //数据内容
            data:method === 'POST'?params:null,
            params:method === 'GET'?params:null
        }).then((res)=>{
            resolve(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }))
}

//GET请求
api.get = async(url,params,)=>{
    return await apiAxios('GET',url,params)
}

//POST请求
api.post = async(url,params,)=>{
    return await apiAxios('POST',url,params)
}

module.exports = api