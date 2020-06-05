<template>
	<div class="hotBus">
		<div class="w1200">
			<div class="hotBus-title flex flex-pack-justify" style="align-items: flex-end;">
				<div class="title">客运企业</div>
				<el-input placeholder="请输入企业名称" v-model="searchInput" class="input-with-select">
				    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input>
			</div>
			<div class="hotMain flex">
				<div class="banner"></div>
				<div class="slideWrap flex-1" v-loading="loading">
					<div class="slide flex flex-wrap">
						<!-- <router-link to="/bus" class="slide-item" v-for="(item,index) in carList" :key="index">
							<div class="img" v-lazy:background-image="item.ExteriorImg"></div>
							<div class="flex flex-pack-justify flex-align-center info">
								<div class="set">{{item.Seat}}座</div>
								<div class="car">{{item.BrandNames}} | {{item.CarLevelName}} | {{item.CarYearName}}</div>
							</div>
						</router-link> -->
						<div class="slide-item" v-for="(item,index) in carList" :key="index" @mouseleave="item.flag = false" @mouseover="item.flag = true">
							<div class="img" v-lazy:background-image="item.Image"></div>
							<div class="flex flex-pack-justify flex-align-center info">
								 <div class="set">{{item.Name}}</div>
								<!-- <div class="car">{{item.BrandNames}} | {{item.CarLevelName}} | {{item.CarYearName}}</div> -->
								<div class="el-icon-arrow-right"></div>
							</div>
							<transition name="fade">
							    <div class="slide-bg" v-if="item.flag">
							    	<div class="slide-bgEn">{{item.Name}}</div>
							    	<div class="flex flex-pack-justify slide-jd">
							    		<div>计调人员：</div>
							    		<div class="flex-1">
							    			<div v-for="(oItem,oItemIndex) in item.Conetect" v-if="oItemIndex < 3">{{oItem.UserName}} {{oItem.UserPhone}}</div>
							    		</div>
							    	</div>
							    	<div class="btn">
							    		<el-button type="warning" v-if="item.Conetect.length > 2" size="small" @click="pop(item.Conetect)">全部计调</el-button>
							    		<el-button type="success" size="small" @click="go(item.ID)">查询车辆</el-button>
							    	</div>
							    </div>
							  </transition>
						</div>
					</div>
					<div @click="prev" class="pagechange prev flex flex-align-center flex-pack-center" v-if="prevFlag"><i class="el-icon-arrow-left"></i></div>
					<div @click="next" class="pagechange next flex flex-align-center flex-pack-center" v-if="nextFlag"><i class="el-icon-arrow-right"></i></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { busHomeList } from '../../assets/js/api.js';
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
				searchInput:""
			}
		},
		created(){
			//获取座位数
			this.getCar();
		},
		methods:{
			go(id){
				this.$router.push('/bus?enterpriseId='+id)
			},
			pop(item){
				var html = "";
				item.forEach(item => {
					html+="<div>"+item.UserName+" "+ item.UserPhone+"</div>"
				})
				this.$alert(html, '计调人员', {dangerouslyUseHTMLString: true})
			},
			search(){
				this.pageIndex = 1;
				this.getCar()
			},
			getCar(){
				var data = {
					// provinceId: this.city.ParentId,
					// isConcern: false,
					pageIndex: this.pageIndex,
					pageSize: 6,
					// cityId: this.city.ID,
					enterpriseName:this.searchInput,
					address:this.city.Name
				}
				this.loading = true;
				busHomeList(data).then(res => {
					if(res.Code == 1){
						res.Data.forEach(item =>{
							item.flag = false
						})
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
			.input-with-select{
				margin-bottom: 0;
				width: 350px;
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
				.slide-bg{
					position: absolute;
					bottom: 0;
					width: 260px;
					left: 0;
					height: 160px;
					background: @cf;
					
					box-shadow: @box;
					.slide-bgEn{
						height: 40px;
						border-bottom: 1px solid @c9;
						line-height: 40px;
						font-size: 14px;
						padding: 0 20px;
					}
					.slide-jd{
						color: @c6;
						height: 80px;
						font-size: 14px;
						line-height: 25px;
						padding: 0 20px;
					}
					.btn{
						text-align: center;
					}
				}
				.slide-item{
					width:260px;
					height: 230px;
					box-shadow: 0 0 2px rgba(0,0,0,0.5);
					margin-bottom: 19px;
					margin-right: 20px;
					position: relative;
					&:nth-child(3n){
						margin-right: 0;
					}
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
							font-size: 14px;
							color: @c6;
							font-weight: bold;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						.el-icon-arrow-right{
							font-size: 16px;
							color: @def;
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
