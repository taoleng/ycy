<template>
	<div class="hotBus">
		<div class="w1200">
			<div class="hotBus-title flex">
				<div class="title">热门车型</div>
				<div class="flex-1 flex changeBus">
					<span :class="{'on':typeNum == index}" @click="changeType(item.ID,index)" v-for="(item,index) in typeList" :key="index">{{item.CarType}}</span>
				</div>
			</div>
			<div class="hotMain flex">
				<div class="banner"></div>
				<div class="slideWrap flex-1" v-loading="loading">
					<div class="slide flex flex-wrap flex-pack-justify">
						<router-link to="/bus" class="slide-item" v-for="(item,index) in carList" :key="index">
							<div class="img" v-lazy:background-image="item.ExteriorImg"></div>
							<div class="flex flex-pack-justify flex-align-center info">
								<div class="set">{{item.Seat}}座</div>
								<div class="car">{{item.BrandNames}} | {{item.CarLevelName}} | {{item.CarYearName}}</div>
							</div>
						</router-link>
					</div>
					<div @click="prev" class="pagechange prev flex flex-align-center flex-pack-center" v-if="prevFlag"><i class="el-icon-arrow-left"></i></div>
					<div @click="next" class="pagechange next flex flex-align-center flex-pack-center" v-if="nextFlag"><i class="el-icon-arrow-right"></i></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { homeCar,homeCarTitle } from '../../assets/js/api.js';
	export default{
		data(){
			return {
				loading:true,
				city:JSON.parse(localStorage.getItem('LddCity')) || {},
				typeList:[],
				carList:[],
				typeNum:0,
				typeId:"",
				pageIndex:1,
				pageCount:1,
				prevFlag:false,
				nextFlag:false,
			}
		},
		created(){
			//获取座位数
			var self = this;
			self.getCarTitle(function(){
				self.typeId = self.typeList[0].ID;
				self.getCar();
			});
		},
		methods:{
			getCarTitle(fn){
				var self = this;
				var data = {
					provinceId:self.city.ParentId,
					cityId:self.city.ID
				}
				homeCarTitle(data).then(res => {
					if(res.Code == 1){
						self.typeList = res.Data.carTypeList;
						fn && fn();
					}
				})
			},
			getCar(){
				var data = {
					pageIndex:this.pageIndex,
					pageSize:6,
					typeid:this.typeId,
				}
				this.loading = true;
				homeCar(data).then(res => {
					if(res.Code == 1){
						this.carList = res.Data;
						this.loading = false
						this.pageCount = res.PageCount;
						this.prevFlag = this.pageIndex == 1 ? false : true;
						this.nextFlag = this.pageIndex == this.pageCount ? false : true;
					}
				})
			},
			changeType(id,num){
				this.pageIndex = 1;
				if(this.typeNum != num){
					this.typeId = id;
					this.typeNum = num;
					this.getCar();
				}
			},
			prev(){
				if(this.pageIndex > 1){
					this.pageIndex--;
					this.getCar()
				}
			},
			next(){
				if(this.pageIndex < this.pageCount){
					this.pageIndex++;
					this.getCar()
				}
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';
	.hotBus{
		margin-top: 30px;
		.hotBus-title{
			color: #333;
			border-bottom: 1px solid @cc;
			padding: 10px 0;
			margin-bottom: 10px;
			.title{
				width: 380px;
				font-size: 16px;
				font-weight: bold;
			}
			.changeBus{
				span{
					font-size: 14px;
					margin-right: 20px;
					position: relative;
					top: 8px;
					cursor: pointer;
					&.on{
						color: @def;
						font-weight: bold;
					}
				}
			}
		}
		.hotMain{
			.banner{
				width: 350px;
				height: 480px;
				.bg();
				background: url(../../../static/img/hotBus/hotBus.jpg);
				margin-right: 30px;
				box-shadow: @box;
			}
			.slideWrap{
				position: relative;
				box-shadow: @box;
				.loading{
					position: absolute;
					width: 100%;
					height: 100%;
					top:0;
					left:0
				}
				.pagechange{
					position: absolute;
					width: 24px;
					height: 40px;
					background: rgba(0,0,0,0.5);
					top:50%;
					margin-top: -20px;
					cursor: pointer;
					font-size: 18px;
					color: @cf;
					z-index: 10;
					&.next{
						right: 0;
					}
					&.prev{
						left: 0;
					}
				}
			}
			.slide{
				.slide-item{
					width:260px;
					height: 230px;
					box-shadow: 0 0 2px rgba(0,0,0,0.5);
					margin-bottom: 19px;
					&:nth-child(4),&:nth-child(5),&:nth-child(6){
						margin-bottom: 0;
					}
					.img{
						width: 100%;
						height: 180px;
						.bg()
					}
					.info{
						height: 50px;
						padding: 0 10px;
						.set{
							font-size: 16px;
							color: @c6;
							font-weight: bold;
						}
						.car{
							font-size: 14px;
							color: #3ab0b0;
						}
					}
					
				}
			}
		}
	}
</style>
