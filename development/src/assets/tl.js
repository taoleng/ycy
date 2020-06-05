import { Message } from 'element-ui';
const tl = {
	//判断手机号
	isPhone(s) {
		var patrn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		if (!patrn.exec(s))
			return false;
		return true;
	},
	//弹窗
	toast(opt){
		if(typeof opt == 'string'){
			Message({
				message:opt || "",
				duration:2000,
				type:opt.type || 'error',
				showClose:true
			})
		}else{
			Message({
				message:opt.message || "",
				duration:2000,
				type:opt.type || 'error',
				showClose:true
			})
		}
	},
	//获取样式宽高等
	getStyle(obj,attr) {
		return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	},
	//将对象转为数组
	getRouteInfo(data) {
		var list = [];
		for (var key in data) {
			data[key].forEach(item => {
				item.time = key
			})
			list = list.concat(data[key]);
		}
		return list
	},
	tofix(num,n){
		return num.toFixed(n || 2);
	},
	// twoAfter(start,end){
	// 	var t= new Date(start).getTime() - (new Date().getTime() + 2*60*60*1000);
	// 	if(t < 0){
	// 		tl.toast('出发时间必须大于2小时')
	// 		return
	// 	}
	// },
	//订单状态
	orderStatus(num){
		var arr = ["待支付","已派车","行程中","已完成","已取消","车辆审核"];
		return arr[num-1]
	},
	settleType(num){
		var arr = ["未结账","已结账"];
		return arr[num]
	},
	travelForm(num){
		var arr = ["全包","半包"];
		return arr[num]
	},
	businessType(num){
		var arr = ["包租车","协议包车","定制包车","单接单送","都市直通车","特价包车","代理包车","顺风包车"];
		return arr[num-1]
	},
	orderPayType(num){
		var arr = ["定金","下欠款","挂账款"];
		return arr[num-1]
	},
	bookKeepingType(num){
		var arr = ["收入","手续费","退款"];
		return arr[num]
	},
	PayMode(num){
		var arr = ["微信","支付宝"];
		return arr[num]
	},
}

export default tl