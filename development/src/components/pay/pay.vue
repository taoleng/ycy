<template>
	<div class="bgf">
		<div class="pay w1200">
			<div class="item" v-if="car.startTime">
				<div class="title">租车订单信息</div>
				<div class="pay-bus flex flex-align-center">
					<div class="pay-bus" v-if="car.info">
						<el-image :preview-src-list="car.info.carimg" class="pay-img" :src="car.info.carimg[0]" fit="cover"></el-image>
					</div>
					<div class="bus-info flex-1 flex-pack-justify flex flex-v">
						<div>出发时间：{{car.startTime}}</div>
						<div>出发地址：{{car.startAddress}}</div>
						<div>到达地址：{{car.endAddress}}</div>
						<div v-if="car.info">车辆信息：{{car.info.title}}</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="title">支付方式</div>
				<div class="pay-select">
					<el-radio v-model="payType" label="wx" border>
						<img class="pay-img" src="../../../static/img/pay-wx.png" alt="微信">
					</el-radio>
					<el-radio v-model="payType" label="bao" border>
						<img class="pay-img" src="../../../static/img/pay-zfb.png" alt="支付宝">
					</el-radio>
				</div>
				<div class="flex flex-end pay-btn">
					<div>
						<div class="text">支付：￥<span>{{money | fix}}</span></div>
						<el-button type="warning" size="medium" @click="submit" :loading="flag">去付款</el-button>
					</div>
				</div>
			</div>
		</div>
		<el-dialog @closed="close" :title="payType == 'wx' ? '请微信扫二维码进行支付' : '请支付宝扫二维码进行支付'" width="400px" center :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
		  <img v-lazy="src" class="popImg">
		</el-dialog>
	</div>
</template>

<script>
	import tl from '../../assets/tl.js'
	import {
		payStatus,
		wxPay,
		baoPay
	} from '../../assets/js/api.js'
	export default{
		data () {
			return {
				payType: 'wx',
				id:"",
				bt:0,
				ot:0,
				car:{},
				flag:false,
				dialogTableVisible: false,
				src:'../../../static/img/pay-wx.png',
				timer:null,
				money:0
		  };
		},
		created(){
			this.car = JSON.parse(localStorage.getItem("LddPayInfo")) || {};
			this.id = this.$route.query.id;
			this.bt = this.$route.query.bt;
			this.ot = this.$route.query.ot;
			this.money = Number(this.$route.query.m);
		},
		filters:{
			fix(num){
				return tl.tofix(num,2)
			}
		},
		destroyed(){
			clearInterval(this.timer)
		},
		methods:{
			submit(){
				this.flag = true;
				var data = {
					BusinessTypeEnum:this.bt,
					OrderPayTypeEnum:this.ot,
					OrderIdList:this.id
				}
				if(this.payType == 'wx'){
					this.dialogTableVisible = true;
					wxPay(data).then(res =>{
						this.flag = false;
						if(res.Code == 1){
							this.src = res.Data;
							this.timer = setInterval(()=>{this.getPayStatus()},1500)
						}else{
							tl.toast(res.Msg)
						}
					})
				}else{
					baoPay(data).then(res =>{
						this.flag = false;
						if(res.Code == 1){
							let routerData = this.$router.resolve({path:'/payGateWay',query:{ htmlData: res.Data}})
							 // 打开新页面
							window.open(routerData.href, '_ blank');
							this.timer = setInterval(()=>{this.getPayStatus()},1500)
						}else{
							tl.toast(res.Msg)
						}
					})
				}
			},
			getPayStatus(){
				var data = {
					BusinessTypeEnum:'1',
					OrderPayTypeEnum:'1',
					OrderIdList:this.id
				}
				payStatus(data).then(res => {
					if(res.Code == 1){
						//关闭定时器，
						clearInterval(this.timer)
						this.$router.push('/user')
					}
				})
			},
			close(){
				clearInterval(this.timer)
			}
		}
	}
</script>

<style scoped lang="less">
@import '../../assets/less/common.less';
.popImg{
	width: 100%;
}
.pay{
	padding-bottom: 40px;
	padding-top: 15px;
	.item{
		background: @cf;
		box-shadow: @box;
		margin-bottom: 15px;
		.title{
			height: 60px;
			line-height: 60px;
			padding:0 30px;
			font-size: 20px;
			font-weight: bold;
			color: @def;
			border-bottom: 1px solid @cc;
		}
	}
	.pay-img{
		display: inline-block;
		vertical-align: middle;
		width: 120px;
		&.el-image{
			height: 80px;
		}
	}
	.el-radio.is-bordered{
		height: auto;
		padding-bottom: 10px;
	}
	.pay-select{
		padding: 30px 50px 20px;
	}
	.pay-bus{
		padding:10px 30px;
		.pay-bus img{
			width: 150px;
			height: 100px;
		}
	}
	.bus-info{
		font-size: 16px;
	}
	.pay-btn{
		padding: 20px 150px 50px;
		text-align: center;
		.text{
			font-size: 16px;
			color: #E6A23C;
			span{
				font-size: 30px;
			}
		}
		.el-button{
			font-size: 16px;
			margin: 10px auto;
			width: 150px;
		}
	}
}
</style>
