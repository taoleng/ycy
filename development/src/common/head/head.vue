<template>
	<div class="tl-homeFix flex flex-align-center">
		<div class="tl-homeTop flex flex-align-center flex-pack-justify w1200">
			<div class="tl-homeLogo flex flex-align-center">
				<div class="logoImg">
					<router-link to="/"><img src="../../../static/img/homeFix/fixLogo.png"></router-link>
				</div>
				<div class="city flex flex-align-center flex-pack-center">
					当前城市：<span class="el-dropdown-link">
							{{cityName | toCity}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
					<!-- <el-dropdown @command="handleCommand" trigger="click">
						<span class="el-dropdown-link">
							{{cityName}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="item.Name" v-for="(item,index) in cityList" :key="index">{{item.Name}}</el-dropdown-item>
							<el-dropdown-item :command="cityName" divided>{{cityName}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown> -->
					<div class="el-popover el-popper el-popover--plain">
						<div v-for="(item,index) in cityList" :key="index">
							<div class="title">{{item.Name}}</div>
							<div class="flex flex-wrap">
								<span class="el-item" @click="changeCity(it)" v-for="(it,itIndex) in item.SysArea" :key="itIndex">{{it.Name | toCity}}</span>
							</div>
						</div>
						
						<div class="popper__arrow" style="top: -6px;left: 50%;margin-right: 3px;border-top-width: 0;border-bottom-color: #ebeef5;"></div>
					</div>
				</div>
			</div>
			<div class="tl-homeNav flex flex-1">
				<router-link to="/">首页</router-link>
				<router-link to="/bus">包租车</router-link>
				<router-link to="/enterprise">定制包车</router-link>
				<router-link to="/about/0">关于我们</router-link>
			</div>
			<!-- <div class="tl-icon"><el-button type="primary" icon="el-icon-s-unfold"></el-button></div> -->
			<div class="tl-login flex flex-pack-justify">
				<div class="left" v-if="!userInfo.Mobile">
					<router-link to="/login">登录</router-link>
					<router-link to="/register">注册</router-link>
				</div>
				<div class="left" v-else>
					<router-link to="/user">您好，{{userInfo.Name}}</router-link>
					<router-link to="/user">我的订单</router-link>
					<a href="javascript:;" @click="loginOut" class="unlogin">注销</a>
				</div>
				<div class="right">
					<el-tooltip class="item" effect="light" content="客服热线：400-666-1590">
						<div><i class="el-icon-headset"></i>400-666-1590</div>
					</el-tooltip>
				</div>
			</div>
			<div class="tl-wx">
				<div class="wx"><i class="iconfont icon-weixin"></i>微信</div>
				<div class="code">
					<img src="../../../static/img/homeFix/homeFixCode.jpg" class="img">
					<span>扫一扫，关注微信</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getCity,getCityNew
	} from '../../assets/js/api.js';
	import tl from '../../assets/tl.js';
	export default {
		data() {
			return {
				cityName: "武汉市",
				userInfo: {},
				cityList: [],
				loading:true,
				centerDialogVisible:false
			}
		},
		created() {
			//用户信息
			var defaultCity = {Name: "武汉市",ID: "0f9ba8e5-9af1-4059-af5f-3280ae8d561f",ParentId: "2a6fdf06-8e43-43b6-8985-63016e656d70"}
			var cityObj = JSON.parse(localStorage.getItem('LddCity')) || {};
			if(cityObj.Name){
				this.cityName = cityObj.Name;
			}else{
				localStorage.setItem('LddCity',JSON.stringify(defaultCity));
			}
			this.userInfo = JSON.parse(localStorage.getItem('LddUserInfo')) || {};
			//获取城市信息
			this.city();
		},
		filters:{
			toCity(str){
				return str.replace(/市$/,"")
			}
		},
		methods: {
			changeCity(item){
				if(item.Name != this.cityName){
					this.cityName = item.Name;
					var LddCity = {
						Name:item.Name,
						ParentId: item.ParentId,
						ID: item.ID
					}
					localStorage.removeItem('LddCity');
					localStorage.setItem('LddCity',JSON.stringify(LddCity));
					window.location.reload();
				}else{
					tl.toast({
						type:'info',
						message:"当前城市是:"+item.Name
					})
				}
			},
			// handleCommand(command) {
			// 	if(command != this.cityName){
			// 		this.cityName = command;
			// 		this.cityList.forEach(item =>{
			// 			if(item.Name == command){
			// 				var LddCity = {
			// 					Name:item.Name,
			// 					ParentId: item.ParentId,
			// 					ID: item.ID
			// 				}
			// 				localStorage.removeItem('LddCity');
			// 				localStorage.setItem('LddCity',JSON.stringify(LddCity));
			// 				window.location.reload();
			// 			}
			// 		})
			// 	}
			// },
			loginOut() {
				this.$confirm('您确定要退出登录嘛?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.removeUserInfo()
					window.location.reload();
				})
			},
			city() {
				var self = this;
				var cityName = self.cityName;
				getCityNew({
					cityName: cityName
				}).then(res => {
					if(res && res.length){
						self.cityList = res;
						
					}
				})
				
				//获取用户所在城市信息
			    function showCityInfo() {
			        //实例化城市查询类
					var citysearch;
					AMap.service(["AMap.CitySearch"], function () {
								try {
									citysearch = new AMap.CitySearch();
								} catch (e) {
									console.error(e);
								}
					});
			        //自动获取用户IP，返回当前城市
			        citysearch.getLocalCity(function(status, result) {
			            if (status === 'complete' && result.info === 'OK') {
			                if (result && result.city && result.bounds) {
								var IncludeFlag = false;
								var Ldd={}
								if(self.cityName == result.city){
									return
								}
								self.cityList.forEach(item => {
									if(item.Name == result.province){
										item.SysArea.forEach(it => {
											if(it.Name == result.city){
												IncludeFlag = true;
												Ldd = it;
											}
										})
										if(IncludeFlag){
											self.$confirm('当前定位城市为'+result.city+',是否切换城市?', '温馨提示', {
											  confirmButtonText: '确定',
											  cancelButtonText: '取消',
											  type: 'warning'
											}).then(() => {
											  var LddCity = {
													Name:Ldd.Name,
													ParentId: Ldd.ParentId,
													ID: Ldd.ID
												}
												localStorage.removeItem('LddCity');
												localStorage.setItem('LddCity',JSON.stringify(LddCity));
												window.location.reload();
											})
										}
									}
								})
			                    console.log(result);
			                }
			            }
			        });
			    }
			    showCityInfo();
				// getCity({
				// 	cityName: cityName
				// }).then(res => {
				// 	if (res && res.length) {
				// 		res.forEach(item => {
				// 			self.cityList.push({
				// 				Name: item.Name,
				// 				ParentId: item.ParentId,
				// 				ID: item.ID
				// 			});
				// 			if(cityName == item.Name){
				// 				var LddCity = {
				// 					Name:item.Name,
				// 					ParentId: item.ParentId,
				// 					ID: item.ID
				// 				}
				// 				localStorage.removeItem('LddCity');
				// 				localStorage.setItem('LddCity',JSON.stringify(LddCity));
				// 			}
				// 		})
				// 	}
				// })
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';
	a {
		&:hover {
			color: @hover !important;
			transform: scale(0.95);
		}
	}
	.el-dropdown-menu {
		max-height: 400px;
		overflow: auto;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: @def;
	}
	.tl-icon {
		margin-right: 20px;
	}
	.tl-homeFix {
		height: 70px;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: @c3;
		color: #eee;
		z-index: 1000;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);

		.tl-homeLogo {
			width: 30%;

			.city {
				width: 206px;
				height: 70px;
				position: relative;
				margin-left: 10px;
				font-size: 16px;
				&:hover{
					.el-popover{
						display: block;
					}
				}
				.el-popover{
					padding: 10px 10px 10px 20px;
					display: none;
				}
				.title{
					font-size: 14px;
					color: @c3;
					height: 30px;
					line-height: 30px;
					font-weight: bold;
				}
				.el-item{
					padding-right: 2%;
					font-size: 14px;
					width: 31.33%;
					text-align: left;
					color: @c3;
					cursor: pointer;
					height: 30px;
					line-height: 30px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					&:hover{
						color: @def;
					}
				}
				.el-popover{
					top: 60px;
				}
			}

			.logoImg {
				width: 120px;

				img {
					width: 100%;
				}
			}

		}

		.tl-homeNav {
			margin-left: 1%;
			margin-right: 1%;

			a {
				color: #eee;
				padding: 0 10px;
				font-size: 14px;
				transition: 0.2s;

				&.on {
					color: @def;
				}
			}
		}

		.tl-login {
			font-size: 14px;
			color: @def;

			.left {
				margin-right: 20px;

				a {
					color: @def;
					padding: 0 4px;
					transition: 0.2s;

				}

				.unlogin {
					color: #E6A23C;
				}
			}

			.right {
				color: #eee;

				i {
					margin-right: 5px;
				}
			}
		}

		.tl-wx {
			margin-left: 2%;
			height: 70px;
			line-height: 70px;
			position: relative;

			.wx {
				i {
					margin-right: 10px;
					color: #fff;
				}
			}

			&:hover {
				.code {
					display: block;
				}
			}

			.code {
				position: absolute;
				top: 70px;
				left: 50%;
				margin-left: -100px;
				width: 200px;
				box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
				background: @cf;
				padding-bottom: 10px;
				display: none;

				.img {
					width: 100%;
					display: block;
				}

				span {
					display: block;
					text-align: center;
					line-height: 30px;
					height: 30px;
					color: @c3;
					font-size: 14px;
				}
			}
		}
	}
</style>
