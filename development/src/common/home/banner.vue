<template>
	<div class="banner">
		<el-carousel height="460px" trigger="click" ref="carousel" v-loading="loading" @click.native="go">
			<el-carousel-item style="background:url(../../../static/img/homeBanner/home-banner1.jpg)"></el-carousel-item>
			<el-carousel-item style="background:url(../../../static/img/homeBanner/home-banner2.jpg)"></el-carousel-item>
		    <el-carousel-item :style="'background:url('+item.ImageUrl+')'" v-for="(item,index) in bannerList" :key="index"></el-carousel-item>
		</el-carousel>
		<div class="homeSearch flex">
			<div class="homeSearch-slide flex flex-v">
				<div class="item flex-1 flex-align-center flex-pack-center flex flex-v" :class="{'on':num==0}" @click="changeMod(0)">
					<div><i class="iconfont icon-Bus"></i></div>
					<div>包租车</div>
				</div>
				<div class="item flex-1 flex-align-center flex-pack-center flex flex-v" :class="{'on':num==1}" @click="changeMod(1)">
					<div><i class="iconfont icon-jiejix"></i></div>
					<div>接机</div>
				</div>
				<div class="item flex-1 flex-align-center flex-pack-center flex flex-v" :class="{'on':num==2}" @click="changeMod(2)">
					<div><i class="iconfont icon-songjix"></i></div>
					<div>送机</div>
				</div>
				<div class="item flex-1 flex-align-center flex-pack-center flex flex-v" :class="{'on':num==3}" @click="changeMod(3)">
					<div><i class="iconfont icon-AK-JTgaotiex"></i></div>
					<div>高铁接客</div>
				</div>
				<div class="item flex-1 flex-align-center flex-pack-center flex flex-v" :class="{'on':num==4}" @click="changeMod(4)">
					<div><i class="iconfont icon-AK-JTgaotiebeifenx"></i></div>
					<div>高铁送客</div>
				</div>
			</div>
			<div class="homeSearch-main flex-1" v-show="num==0">
				<el-row>
				    <el-col :span="5" class="title">包车方式</el-col>
				    <el-col :span="19">
						<el-radio-group class="radioGroup" v-model="car.travelType">
							<el-radio label="1">单程</el-radio>
							<el-radio label="2">往返</el-radio>
						</el-radio-group>
					</el-col>
				</el-row>
				<el-row>
				    <el-col :span="5" class="title">包车时间</el-col>
				    <el-col :span="19">
						<el-col :span="24">
							<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.startTime" type="datetime"
							 placeholder="请选择出发时间" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col :span="24" class="mtp" v-show="car.travelType == 2">
							<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.endTime" type="datetime"
							 placeholder="请选择还车时间" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-col>
				</el-row>
				<el-row>
				    <el-col :span="5" class="title">包车线路</el-col>
				    <el-col :span="19">
						<tl-map title="请填写出发地址" @getAddress="startAddress"></tl-map>
						<tl-map title="请填写还车地址" @getAddress="endAddress" class="mtp"></tl-map>
						<div class="mtp flex flex-end">
							<el-button type="warning" plain @click="searchCar" :loading="searchBtnFlag">查询车辆</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="homeSearch-main flex-1" v-show="num==1">
				<el-row>
				    <el-col :span="5" class="title">机场</el-col>
				    <el-col :span="19">
						<el-select @change="selectChange" v-model="car.region" placeholder="请选择机场">
							<el-option :label="item.LocationName" :value="index" v-for="(item,index) in airport" :key="index"></el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
				    <el-col :span="5" class="title">送达地点</el-col>
				    <el-col :span="19">
						<tl-map title="必填,可从异地城市出发" @getAddress="endAddress"></tl-map>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-col :span="5" class="title">用车时间</el-col>
						<el-col :span="19">
							<el-col :span="24">
								<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.startTime" type="datetime"
								 placeholder="请选择用车时间" style="width: 100%;"></el-date-picker>
							</el-col>
							<!-- <el-col :span="24" class="mtp">
								<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.endTime" type="datetime"
								 placeholder="请选择还车时间" style="width: 100%;"></el-date-picker>
							</el-col> -->
						</el-col> 
					</el-col>
					<el-col :span="24">
						<div class="mtp flex flex-end">
							<el-button type="warning" plain class="search" :loading="searchBtnFlag" @click="searchCar">搜索</el-button>
						</div>	 
					</el-col>
				</el-row>
			</div>
			<div class="homeSearch-main flex-1" v-show="num==2">
				<el-row>
				    <el-col :span="5" class="title">机场</el-col>
				    <el-col :span="19">
						<el-select @change="selectChange" v-model="car.region" placeholder="请选择机场">
							<el-option :label="item.LocationName" :value="index" v-for="(item,index) in airport" :key="index"></el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
				    <el-col :span="5" class="title">出发地点</el-col>
				    <el-col :span="19">
						<tl-map title="必填,可从异地城市出发" @getAddress="startAddress"></tl-map>
						<!-- <el-input placeholder="必填,可从异地城市出发" suffix-icon="el-icon-location-outline" v-model="form.startAddress"></el-input> -->
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-col :span="5" class="title">用车时间</el-col>
						<el-col :span="19">
							<el-col :span="24">
								<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.startTime" type="datetime"
								 placeholder="请选择用车时间" style="width: 100%;"></el-date-picker>
							</el-col>
							<!-- <el-col :span="24" class="mtp">
								<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.endTime" type="datetime"
								 placeholder="请选择还车时间" style="width: 100%;"></el-date-picker>
							</el-col> -->
						</el-col> 
					</el-col>
					<el-col :span="24">
						<div class="mtp flex flex-end">
							<el-button type="warning" plain class="search" :loading="searchBtnFlag" @click="searchCar">搜索</el-button>
						</div>	 
					</el-col>
				</el-row>
			</div>
			<div class="homeSearch-main flex-1" v-show="num==3">
				<el-row>
				    <el-col :span="5" class="title">火车站</el-col>
				    <el-col :span="19">
						<el-select @change="selectChange" v-model="car.region" placeholder="请选择火车站">
							<el-option :label="item.LocationName" :value="index" v-for="(item,index) in train" :key="index"></el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
				    <el-col :span="5" class="title">送达地点</el-col>
				    <el-col :span="19">
						<tl-map title="必填,可送达周边城市" @getAddress="endAddress"></tl-map>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-col :span="5" class="title">用车时间</el-col>
						<el-col :span="19">
							<el-col :span="24">
								<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.startTime" type="datetime"
								 placeholder="请选择用车时间" style="width: 100%;"></el-date-picker>
							</el-col>
							<!-- <el-col :span="24" class="mtp">
								<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.endTime" type="datetime"
								 placeholder="请选择还车时间" style="width: 100%;"></el-date-picker>
							</el-col> -->
						</el-col> 
					</el-col>
					<el-col :span="24">
						<div class="mtp flex flex-end">
							<el-button type="warning" plain class="search" :loading="searchBtnFlag" @click="searchCar">搜索</el-button>
						</div>	 
					</el-col>
				</el-row>
			</div>
			<div class="homeSearch-main flex-1" v-show="num==4">
				<el-row>
				    <el-col :span="5" class="title">火车站</el-col>
				    <el-col :span="19">
						<el-select @change="selectChange" v-model="car.region" placeholder="请选择火车站">
							<el-option :label="item.LocationName" :value="index" v-for="(item,index) in train" :key="index"></el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
				    <el-col :span="5" class="title">出发地点</el-col>
				    <el-col :span="19">
						<tl-map title="必填,可送达周边城市" @getAddress="startAddress"></tl-map>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-col :span="5" class="title">用车时间</el-col>
						<el-col :span="19">
							<el-col :span="24">
								<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.startTime" type="datetime"
								 placeholder="请选择用车时间" style="width: 100%;"></el-date-picker>
							</el-col>
							<!-- <el-col :span="24" class="mtp">
								<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.endTime" type="datetime"
								 placeholder="请选择还车时间" style="width: 100%;"></el-date-picker>
							</el-col> -->
						</el-col> 
					</el-col>
					<el-col :span="24">
						<div class="mtp flex flex-end">
							<el-button type="warning" plain class="search" :loading="searchBtnFlag" @click="searchCar">搜索</el-button>
						</div>	 
					</el-col>
				</el-row>
			</div>
		
		</div>
	</div>
</template>

<script>
	import tlMap from '../map/map.vue';
	import tl from '../../assets/tl.js';
	import { homeBanner,getPrantId,getCommonlyLocation } from '../../assets/js/api.js';
	var driving;
	export default{
		data(){
			return {
				num:0,
				cityId:"",
				loading:true,
				bannerList:[],
				searchBtnFlag:false,
				car: {
					travelType: "2", //包车方式   单程1，往返2
					travelFormType: "0", //包车类别  全包0，半包1
					travelPurpose: "旅游包车", //包车用途
					isThrough: "非直达", //是否直达   直达true 非直达false
					startTime: "", //出发日期
					// startTime:"11:23:01",//出发时间
					startAddress: {}, //出发地址
					endTime: "", //还车日期
					// endTime:"11:23:01",//还车时间
					endAddress: {} ,//还车地址
					region:""
				},
				airport:[],
				train:[]
			}
		},
		components:{
			tlMap
		},
		created(){
			var cityObj = JSON.parse(localStorage.getItem('LddCity')) || {};
			localStorage.removeItem("LddCarInfo");
			localStorage.removeItem("LddPayInfo");
			localStorage.removeItem("LddSearch");
			if(cityObj.Name){
				this.cityId = cityObj.ID;
			}
			//获取banner图
			this.banner();
			this.getLocation();
		},
		methods:{
			go(e){
				if(this.$refs.carousel.activeIndex == 0){
					this.$router.push('/banner');
				}
			},
			addressInfo(info){
				return {
					value: info.CityName+'-'+info.DefaultAddress,
					point: info.DefaultLonLat,
					address: info.DefaultAddress,
					city: info.CityName,
					province: info.ProvinceName,
					district: "",
					searchText: info.CityName+'-'+info.DefaultAddress,
					ProvinceId: info.ProvinceID,
					CityId: info.CityID,
					DistrictId: ""
				}
			},
			selectChange(item){
				var info = {}
				if(this.num == 1){
					info = this.airport[item]
					this.car.startAddress = this.addressInfo(info);
				}else if(this.num == 2){
					info = this.airport[item];
					this.car.endAddress = this.addressInfo(info);
				}else if(this.num == 3){
					info = this.train[item];
					this.car.startAddress = this.addressInfo(info);
				}else if(this.num == 4){
					info = this.train[item];
					this.car.endAddress = this.addressInfo(info);
				}
			},
			changeMod(num){
				this.num = num;
				this.car.region = "";
				this.car.startTime = "";
				this.car.endTime = "";
				this.car.startAddress = {};
				this.car.endAddress = {};
				if(num == 0){
					this.car.travelType = "2";
					this.car.isThrough = '非直达';
				}else{
					this.car.travelType = "1";
					this.car.isThrough = '直达';
				}
			},
			getLocation(){
				var data = {
					cityId:this.cityId,
					type:""
				}
				var airport = [],train=[];
				getCommonlyLocation(data).then(res =>{
					if(res.Code == 1){
						res.Data.forEach(item =>{
							if(item.LocationType == 1){
								train.push(item)
							}else{
								airport.push(item)
							}
						})
						this.airport = airport;
						this.train = train;
					}
				})
			},
			banner(){
				var data = {
					CityId: this.cityId,
					BusinessType: 1
				}
				homeBanner(data).then(res=>{
					this.loading = false;
					if(res.Code == 1){
						this.bannerList = res.Data;
					}
				})
			},
			computedTime(startlat,startlng,endlat,endlng,fn){
				var self = this;
				if(!driving){
					driving = new AMap.Driving();
				}
				this.searchBtnFlag = true;
				// 根据起终点经纬度规划驾车导航路线
				driving.search(new AMap.LngLat(startlat,startlng), new AMap.LngLat(endlat,endlng), function(status, result) {
				    // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
				    if (status === 'complete') {
						//获取两地之间距离所需要的时间（分钟） 预计单程变 往返时间*2 +30小时休息时间
						var t = (result.routes[0].time * 1000)*2 + new Date(self.car.startTime).getTime() + 30 * 60*1000;
						self.car.endTime = new Date(t).format('yyyy-MM-dd hh:mm:ss');
						self.searchBtnFlag = false;
						localStorage.setItem("LddSearch",JSON.stringify(self.car));
						self.$router.push('/bus');
				    } 
				});
			},
			searchCar(){
				if (!this.car.startTime) {
					tl.toast('请选择出发/用车时间')
					return
				}
				if(this.car.travelType == '2'){
					this.car.isThrough = '非直达';
					if (!this.car.endTime) {
						tl.toast('请选择到达日期时间')
						return
					}
					if(new Date(this.car.startTime).getTime() > new Date(this.car.endTime).getTime()){
						tl.toast('出发时间不能大于结束时间')
						return
					}
				}else{
					this.car.isThrough = '直达';
				}
				var t= new Date(this.car.startTime).getTime() - (new Date().getTime() + 2*60*60*1000);
				if(t < 0){
					tl.toast('出发/用车时间必须大于2小时')
					return
				}
				if (!this.car.startAddress.CityId) {
					tl.toast('请选择出发地址')
					return
				}
				if (!this.car.endAddress.CityId) {
					tl.toast('请选择达到地址')
					return
				}
				if(this.car.travelType == '1'){
					var startpoint = this.car.startAddress.point.split(',');
					var endpoint = this.car.endAddress.point.split(',');
					this.computedTime(startpoint[0],startpoint[1],endpoint[0],endpoint[1]);
					return
				}
				localStorage.setItem("LddSearch",JSON.stringify(this.car));
				this.$router.push('/bus');
			},
			startAddress(data) {
				this.car.startAddress = data;
				var area = data.province + ',' + data.city + ',' + data.district;
				var data = {
					startAreaName: area,
					endAreaName: area
				}
				getPrantId(data).then(res => {
					if (res.Code == 1) {
						this.car.startAddress.ProvinceId = res.Data.StartAreaId.ProvinceId
						this.car.startAddress.CityId = res.Data.StartAreaId.CityId
						this.car.startAddress.DistrictId = res.Data.StartAreaId.DistrictId
					}
				})
			},
			endAddress(data) {
				this.car.endAddress = data;
				var area = data.province + ',' + data.city + ',' + data.district;
				var data = {
					startAreaName: area,
					endAreaName: area
				}
				getPrantId(data).then(res => {
					if (res.Code == 1) {
						this.car.endAddress.ProvinceId = res.Data.StartAreaId.ProvinceId
						this.car.endAddress.CityId = res.Data.StartAreaId.CityId
						this.car.endAddress.DistrictId = res.Data.StartAreaId.DistrictId
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';
	.banner{
		position: relative;
	}
	.radioGroup{
		position: relative;
		top:2px
	}
	.homeSearch{
		position: absolute;
		top:50%;
		left:50%;
		background: rgba(255,255,255,0.9);
		width: 465px;
		height: 340px;
		z-index: 10;
		box-shadow: @box;
		margin-left: -605px;
		transform: translateY(-55%);
		.homeSearch-slide{
			width: 74px;
			background: @c5;
			color: @cf;
			.iconfont{
				font-size: 24px;
			}
			.item{
				cursor: pointer;
				&.on{
					background:@cf;
					color: @def;
				}
			}
		}
		.el-row{
			margin: 0 20px;
			border-bottom: 1px dashed @cc;
			color: @c6;
			padding: 14px 0;
			
			&:last-child{
				border-bottom:none;
			}
			.mtp{
				margin-top: 10px;
			}
			.mtl{
				margin-left: 4.16667%;
			}
			.search{
				width: 100px;
				margin-top: 29px;
			}
			.title{
				font-size: 14px;
				font-weight: bold;
			}
		}
	}
 .el-carousel__item{
	.bg()
  }
</style>
