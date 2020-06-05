<template>
	<div class="bgf">
		<div class="enter w1200">
			<div class="enter-top  flex flex-align-center flex-pack-justify">
				<div class="flex-1 flex flex-align-center flex-pack-justify">
					<div class="title">定制包车-企业列表</div>
					<div class="search">
						<el-input placeholder="请输入企业名称" v-model="searchInput" class="input-with-select">
						    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
					    </el-input>
					</div>
				</div>
			</div>
			<div class="enter-main" v-loading="loading">
				<div class="enter-item" v-for="(item,index) in enterpriseList">
					<div class="enter-title flex flex-align-center">
						<div class="ent">{{item.Name}}</div>
					</div>
					<div class="enter-info flex flex-pack-justify">
						<div class="img" v-lazy:background-image="item.Image"></div>
						<div class="info flex flex-v flex-pack-justify flex-1">
							<div class="text flex-1">{{item.EnterPriseContent}}</div>
							<div class="flex flex-end">
							   <el-button type="warning" plain @click="item.show = !item.show">企业详情<i class="el-icon-arrow-up el-icon--right"></i></el-button>
							   <el-button type="danger" plain @click="go(item.ID)">查看车辆</el-button>
							</div>
						</div>
					</div>
					<div class="enter-con">
						<div class="enter-con-item flex flex-pack-justify">
							<div class="left flex flex-align-center flex-pack-center"><i class="el-icon-phone"></i>业务联系人</div>
							<div class="right flex-1">
								<span v-for="(it,index) in item.Conetect">{{it.UserName}} {{it.UserPhone}}、</span>
							</div>
						</div>
					</div>
					<div class="enter-open" v-show="item.show">
						<template v-for="(it,index) in item.EnterPrisePhoto">
							<div class="img flex flex-pack-center flex-wrap">
								<div class="bgimg" v-lazy:background-image="it.Photo"></div>
							</div>
							<div class="text">{{it.PhotoTitle}}</div>
						</template>
					</div>
					
				</div>
				<el-button type="success" plain class="more" :loading="loaingTrue" @click="more">{{moreText}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		busHomeList,
	} from '../../assets/js/api.js';
	import tlMap from '../../common/map/map.vue';
	import tl from '../../assets/tl.js';
	export default{
		data(){
			return {
				city: JSON.parse(localStorage.getItem('LddCity')),
				searchInput:"",
				loaingTrue:true,
				loading:true,
				enterpriseList:[],
				
				pageIndex: 1, //车辆列表
				pageCount: 1,
				moreText: "查看更多车辆",
				enterpriseName:""
			}
		},
		created(){
			this.getCompany();
		},
		metaInfo: {
			title: '定制包车', // set a title
		},
		methods:{
			go(id){
				localStorage.removeItem("LddCarInfo");
				this.$router.push('/bus?enterpriseId='+id)
			},
			more(){
				if (this.pageIndex < this.pageCount) {
					this.pageIndex++;
					this.loaingTrue = true;
					this.getCompany();
				}
			},
			search(){
				this.pageIndex = 1;
				this.enterpriseList = [];
				this.loading = true;
				this.getCompany()
			},
			getCompany() {
				var data = {
					// provinceId: this.city.ParentId,
					// isConcern: false,
					pageIndex: this.pageIndex,
					pageSize: 3,
					// cityId: this.city.ID,
					enterpriseName:this.searchInput,
					address:this.city.Name
				}
				busHomeList(data).then(res => {
					if(this.loading){
						this.loading = false;
					}
					if (res.Code == 1) {
						res.Data.forEach(item => {
							if(item.EnterPrisePhoto.length){
								item.phone = item.EnterPrisePhoto[0].Photo
								item.show=false;
							}
						})
						this.enterpriseList =this.enterpriseList.concat(res.Data) ;
						this.pageCount = res.PageCount;
						if (this.pageIndex < res.PageCount) {
							this.loaingTrue = false;
							this.moreText = '查看更多车辆';
						}
						if (this.pageIndex >= res.PageCount) {
							this.moreText = '暂无更多数据了';
							this.loaingTrue = false;
						}
					}else{
						tl.toast(res.Msg);
					}
				})
			},
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';
	.enter{
		padding: 15px 0;
		.more{
			display: block;
			margin:20px auto 0;
		}
		.enter-main{
			box-shadow: @box;
			background: @cf;
			padding-bottom: 20px;
			min-height: 300px;
		}
		.enter-top{
			height: 60px;
			background: @cf;
			box-shadow: @box;
			margin-bottom: 15px;
			.title{
				font-size: 16px;
				color: @c3;
				text-indent: 20px;
			}
			.search{
				width: 30%;
				margin-right: 20px;
			}
		}
		.enter-con{
			padding: 0 20px;
			.enter-con-item{
				margin-bottom: 3px;
				
			}
			.left,.right{
				background: @ce;
				padding: 5px 0;
			}
			.right{
				padding:5px 10px;
			}
			.left{
				margin-right: 10px;
				width: 150px;
				text-align: center;
				i{
					margin-right: 3px;
				}
			}
		}
		.enter-item{
			background: @cf;
			color: @c6;
			padding-bottom: 10px;
			.enter-title{
				height: 50px;
				background: #079984;
				padding: 0 20px;
				color: @ce;
				.ent{
					font-size:14px;
					margin-right: 10px;
				}
				.per{
					padding: 5px 10px;
					border: 1px solid @ce;
					border-radius: 4px;
				}
			}
			.enter-info{
				padding: 15px 20px;
				overflow: hidden;
				height: 160px;
				.info{
					height: 100%;
				}
				.img {
					width: 30%;
					height: 100%;
					margin-right: 20px;
					.bg();
				}
				.text{
					font-size: 14px;
					text-indent: 2em;
					text-align: justify;
					color: @c3;
					overflow: hidden;
					margin-bottom: 24px;
					.lines(5);
				}
			}
			.enter-open{
				padding:10px 20px;
				.text{
					font-size: 14px;
					line-height: 1.4;
					text-indent: 2em;
					text-align: center;
				}
				.img{
					margin-top: 10px;
					.bgimg{
						margin: 0 10px 10px;
						width: 400px;
						height: 200px;
						.bg()
					}
				}
			}
		}
	}
</style>
