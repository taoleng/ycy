import axios from 'axios'
import { Message } from 'element-ui';
import QS from 'qs';
import router from '../../router';

axios.defaults.baseURL = process.env.NODE_API;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
const toLogin = () =>{
	localStorage.removeItem('LddUserInfo');
	localStorage.removeItem('LddToken');
	localStorage.setItem("LddBackLink",window.location.href)
	router.replace({                            
		path: '/login',                            
		query: { 
			redirect: router.currentRoute.fullPath 
		}                        
	});    
}
//状态码处理
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
		case 400:
        case 401:
            // toLogin();
			Message({
				type:"info",
				message:"未登录状态，跳转登录页"
			})
			setTimeout(() => {
				toLogin()
			}, 1000);
            break;
        // 403 token过期
        case 403:
		case 408:
			Message({
				type:"info",
				message:"登录超时，请重新登录"
			})
			setTimeout(() => {
				toLogin()
			}, 1000);
			break;
        // 404请求不存在
        case 404:
			// Message('请求的资源不存在')
            break;
        default:
            console.log(other);   
	}
}
//请求拦截
axios.interceptors.request.use(
	config => {
		let token = localStorage.getItem('LddToken');
		token && (config.headers.Ticket = token);
		return config;
	},
	error => Promise.reject(error)
)
//响应拦截
axios.interceptors.response.use(
	//请求成功
	res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
	error => {
		const { response } = error;
		if (response) {
			// 请求已发出，但是不在2xx的范围 
			errorHandle(response.status, response.data.message);
			return Promise.reject(response);
		} else {
			// 处理断网的情况
			// eg:请求超时或断网时，更新state的network状态
			if(!window.navigator.onLine){
				alert('断网');
				return
			}
			return Promise.reject(error)
		}
	}
)


function get(url, params){    
    return new Promise((resolve, reject) =>{       
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}
function post(url, params,bool) {   
	var params = params;
	if(!bool){
		params = QS.stringify(params);
	}
    return new Promise((resolve, reject) => {      
        axios.post(url, params)        
        // axios.post(url, params)        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}
function jsonp(url,data){
    if(!url)
        throw new Error('url is necessary')
    const callback = 'CALLBACK' + Math.random().toString().substr(9,18)
    const JSONP = document.createElement('script')
          JSONP.setAttribute('type','text/javascript')

    const headEle = document.getElementsByTagName('head')[0]

    let ret = '';
    if(data){
        if(typeof data === 'string')
            ret = '&' + data;
        else if(typeof data === 'object') {
            for(let key in data)
                ret += '&' + key + '=' + encodeURIComponent(data[key]);
        }
        ret += '&_time=' + Date.now();
    }
    JSONP.src = `${url}?callback=${callback}${ret}`;
	
	console.log(JSONP.src);
    return new Promise( (resolve,reject) => {
        window[callback] = r => {
          resolve(r)
          headEle.removeChild(JSONP)
          delete window[callback]
        }
        headEle.appendChild(JSONP)
    })
}


export {
	post,get,jsonp
}