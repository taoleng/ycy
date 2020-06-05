<template>
	<div class="bgf" v-loading="full">
		<div class="bus">
			<div class="searchForm w1200" :class="{'ts':borderTs}">
				<el-form :model="car" label-width="80px">
					<div class="flex flex-pack-justify">
						<el-form-item label="包车方式" class="flex-1">
							<el-radio-group v-model="car.travelType">
								<el-radio border label="2">
									<el-tooltip class="item" effect="dark" content="往返指:包去程,也包回程。" placement="bottom">
										<div>往返</div>
									</el-tooltip>
								</el-radio>
								<el-radio border label="1">
									<el-tooltip class="item" effect="dark" content="单程指:只包去程或只包回程。" placement="bottom">
										<div>单程</div>
									</el-tooltip>
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<!-- <el-form-item label="是否直达" class="flex-1" v-show="car.travelType == 1">
							<el-radio-group v-model="car.isThrough">
								<el-radio border label="直达"></el-radio>
								<el-radio border label="非直达"></el-radio>
							</el-radio-group>
						</el-form-item> -->
						<el-form-item label="包车类别" class="flex-1">
							<el-radio-group v-model="car.travelFormType">
								<el-radio border label="0">
									<el-tooltip class="item" effect="dark" content="全包指:包租车费用含油费、桥费等。" placement="bottom">
										<div>全包</div>
									</el-tooltip>
								</el-radio>
								<el-radio border label="1">
									<el-tooltip class="item" effect="dark" content="半包指:包车费用不包含油费、桥费等,由用户据实支付。" placement="bottom">
										<div>半包</div>
									</el-tooltip>
								</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
					<div class="flex flex-pack-justify flex-align-center">
						<div class="flex-1">
							<div class="flex flex-1 flex-pack-justify">
								<el-form-item label="出发时间" class="flex-1">
									<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.startTime" type="datetime"
									 placeholder="请选择出发日期时间" style="width: 100%;"></el-date-picker>
								</el-form-item>
								<el-form-item label="到达时间" class="flex-1" v-if="car.travelType == 2">
									<el-date-picker class="red" value-format="yyyy-MM-dd HH:mm:ss" v-model="car.endTime" type="datetime"
									 placeholder="请选择到达日期时间" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</div>
							<div class="flex flex-1 flex-pack-justify">
								<el-form-item label="出发地址" class="flex-1">
									<tl-map title="请填写出发地址" :strValue="car.startAddress.value" @getAddress="startAddress"></tl-map>
								</el-form-item>
								<el-form-item label="目的地址" class="flex-1" style="margin-bottom: 0;">
									<tl-map title="请填写目的地址" :strValue="car.endAddress.value" @getAddress="endAddress"></tl-map>
								</el-form-item>
							</div>
						</div>
						<div class="searchForm-btn">
							<el-button type="danger" plain icon="el-icon-search" :loading="searchTrue" @click="searchCar(true,true)">搜索车辆</el-button>
						</div>
					</div>
				</el-form>

			</div>
			<div class="searchChange w1200">
				<div class=" flex flex-align-center">
					<div class="searchChange-text">客运企业</div>
					<div class="flex-1">
						<div class="el-b" @click="change('',0,'enterprise')">全部</div>
						<div class="el-b" @click="change(item.ID,index,'enterprise')" :class="{'is-plain':enterpriseId == item.ID}" v-for="(item,index) in enterpriseList"
						 :key="index" v-if="index < 4">{{item.Name}}</div>
						 <el-button @click="drawer = true" type="success" plain>
						   查看更多
						 </el-button>
						 <el-drawer :visible.sync="drawer" :with-header="false">
						   <div class="popDrawer-title">客运企业</div>
						   <div class="popDrawer flex flex-pack-justify flex-wrap">
							   <div class="el-bs" @click="change(item.ID,index,'enterprise')" :title="item.Name" :class="{'is-plain':enterpriseId == item.ID}" v-for="(item,index) in enterpriseList"
							    :key="index">{{item.Name}}</div>
						   </div>
						 </el-drawer>
					</div>
				</div>
			</div>
			<div class="flex busMain flex-pack-justify w1200">
				<div class="nav">
					<div :style="'height: '+navHeight">
						<div v-loading="navLoading" ref="nav" :class="{'fixed':fixed}">
							<div class="mod">
								<div class="title flex flex-pack-justify">
									<div>客座数</div>
									<div style="cursor: pointer;font-size:14px;color:#67c23a" @click="open">包车须知</div>
								</div>
								<div class="flex busItem flex-wrap">
									<div @click="change(item,index,'type')" class="item" :class="{'on':index == typeNum}" v-for="(item,index) in typeList"
									 :key="index">
										<div class="car" :class="'car'+(index+1)"></div>
										<div class="text">{{item}}</div>
									</div>
								</div>
							</div>
							<div class="mod carBrand">
								<div class="title">车辆品牌</div>
								<div class="flex busItem flex-wrap">
									<div @click="change(item,index,'brand')" class="item" :class="{'on':index == brandNum}" v-for="(item,index) in brandList"
									 :key="index">
										<div class="text">{{item}}</div>
									</div>
								</div>
							</div>
							<div class="mod carBrand">
								<div class="title">车辆等级</div>
								<div class="flex busItem flex-wrap">
									<div @click="change(item,index,'level')" class="item" :class="{'on':index == levelNum}" v-for="(item,index) in levelList"
									 :key="index">
										<div class="text">{{item}}</div>
									</div>
								</div>
							</div>
							<div class="mod carBrand">
								<div class="title">车辆年限</div>
								<div class="flex busItem flex-wrap">
									<div @click="change(item,index,'year')" class="item" :class="{'on':index == yearNum}" v-for="(item,index) in yearList"
									 :key="index">
										<div class="text">{{item}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="main">
					<div class="title flex flex-pack-justify">
						<div class="l">搜索结果</div>
						<div class="r">温馨提示：包车费包含台班费、超时费、油耗、路桥、客车等级、使用年限等费用。</div>
					</div>
					<div class="carList">
						<div class="loading" v-loading="loading"></div>
						<template v-if="once">
							<div class="carItem flex flex-pack-justify flex-align-center" v-for="(item,index) in carList" :key="index">
								<!-- <div class="img" v-lazy:background-image="item.ExteriorImg"></div> -->
								<el-image :preview-src-list="[item.ExteriorImg,item.TrimImg]" class="img" :src="item.ExteriorImg" fit="cover"></el-image>
								<div class="info flex-1">
									<div class="info-title">{{item.Seat}}座</div>
									<div class="info-int flex flex-pack-justify flex-wrap">
										<div class="info-int-item">车辆等级：<span class="red">{{item.CarLevelName}}</span></div>
										<div class="info-int-item">车辆品牌：{{item.BrandNames}}</div>
										<div class="info-int-item">座位数：{{item.CarTypes}}</div>
										<div class="info-int-item">车辆年限：{{item.CarYearName}}</div>
										<div class="info-int-item">台班费：<span class="red">{{item.ProfitBase}}</span>元</div>
										<div class="info-int-item">超时费：<span class="red">{{item.TimeCharge}}</span>元/小时</div>
									</div>
								</div>
								<div class="btn">
									<el-button type="danger" plain @click="buy">立即预订</el-button>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="carItem flex flex-pack-justify flex-align-center" v-for="(item,index) in carList" :key="index">
								<!-- <div class="img" v-lazy:background-image="item.ExteriorImg"></div> -->
								<el-image :preview-src-list="[item.ExteriorImg,item.TrimImg]" class="img" :src="item.ExteriorImg" fit="cover"></el-image>
								<div class="info flex-1">
									<div class="info-title flex">
										<div class="width">预计包车费：<span class="red">{{item.PredictTotalPrice}}元</span></div>
										<div><span class="del">{{item.TotalPrice}}元</span></div>
									</div>
									<div class="info-int flex flex-pack-justify flex-wrap">
										<div class="info-int-item">座位数：<span class="red">{{item.Seat}}座</span></div>
										<div class="info-int-item">车辆等级：{{item.Level}}</div>
										<div class="info-int-item">车辆品牌：{{item.Brand}}</div>
										<div class="info-int-item">车辆年限：{{item.Year}}</div>
										<div class="info-int-item">预计包车时长：<span class="red">{{item.StrDate}}小时</span></div>
										<div class="info-int-item">预计包车总里程：<span class="red">{{item.Kilometre}}公里</span></div>
									</div>
								</div>
								<div class="btn">
									<el-button type="danger" plain @click="buy(item)" v-if="!item.IsInCarPlaceholder">立即预订</el-button>
									<el-button type="info" plain disabled v-else>已锁定</el-button>
								</div>
							</div>
						</template>
						<el-button type="success" plain class="more" :loading="loaingTrue" @click="more">{{moreText}}</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		homeCarTitle,
		busFirst,
		busHomeList,
		busPriceList,
		getPrantId,
		isServiceable,
		lockCars
	} from '../../assets/js/api.js';
	import tlMap from '../../common/map/map.vue';
	import tl from '../../assets/tl.js';
	var driving;
	export default {
		components: {
			tlMap
		},
		data() {
			return {
				drawer:false,
				city: JSON.parse(localStorage.getItem('LddCity')),
				navHeight: 0,
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
					endAddress: {} //还车地址
				},
				fixed: false,
				once: true,
				borderTs: false,
				navLoading: false, //测导航，加载提示
				typeList: ["全部","18","33","37","45","53"], //座位数
				typeId: "",
				typeNum: 0,

				levelList: [], //车辆登记
				levelId: "",
				levelNum: 0,

				yearList: [], //年限
				yearId: "",
				yearNum: 0,

				brandList: [], //品牌
				brandId: "",
				brandNum: 0,

				enterpriseList: [], //企业列表ID
				enterpriseId: "",
				enterpriseNum: 0,

				searchTrue: false,
				pageIndex: 1, //车辆列表
				carList: [],
				loaingTrue: false,
				loading: false,
				pageCount: 1,
				moreText: "查看更多车辆",
				full: false,
				firstWatch:false,
			}
		},
		created() {
			var self = this;
			//获取品牌，等级，座位数，年限
			var enterpriseId = this.$route.query.enterpriseId;
			if(enterpriseId){
				this.enterpriseId = enterpriseId;
			}
			this.getCar();
			//获取公司
			this.getCompany();
			var getSaveSearch = JSON.parse(localStorage.getItem("LddSearch"));
			if(getSaveSearch){
				this.car = getSaveSearch;
				this.once = false;
				this.searchCar(true);
				localStorage.removeItem("LddSearch");
				return
			}
			//第一次加载车辆列表数据，不计价
			this.first();
			//设置默认时间
			var data = new Date();
			data.setDate(data.getDate() + 1);
			var selectTime = data.format('yyyy-MM-dd');
			this.car.startTime = selectTime + ' 05:00:00';
			this.car.endTime = selectTime + ' 22:00:00';
			localStorage.removeItem("LddCarInfo");
			
			
		},
		metaInfo: {
			title: '包租车', // set a title
		},
		watch: {
			borderTs(old) {
				if (old) {
					setTimeout(() => {
						this.borderTs = false
					}, 1000)
				}
			},
			'car.travelFormType'(){
				this.watchSearch()
			},
			'car.travelType'(old){
				if(old == 1){
					this.car.isThrough = '直达'
				}else{
					this.car.isThrough = '非直达'
				}
				this.watchSearch()
			},
			'car.startTime'(){
				this.watchSearch()
			},
			'car.endTime'(){
				this.watchSearch()
			},
			'car.startAddress.point'(){
				this.enterpriseId = "";
				this.city.Name = this.car.startAddress.city;
				this.getCompany();
				this.watchSearch()
			},
			'car.endAddress.point'(){
				this.watchSearch()
			}
		},
		methods: {
			watchSearch(){
				if(this.car.startTime && this.car.endTime && this.car.startAddress.point && this.car.endAddress.point && this.firstWatch){
					this.pageIndex = 1;
					this.reset();
					this.searchCar(true);
				}
			},
			buy(item) {
				if (this.once) {
					tl.toast({
						type: "info",
						message: "请输入时间日期，地址，搜索预定车辆"
					})
					document.documentElement.scrollTop = document.body.scrollTop = 0;
					this.borderTs = true;
				} else {
					var data = {
						StartTime: this.car.startTime,
						EndTime: this.car.endTime,
						TravelType: this.car.travelType,
						IsThrough: this.car.isThrough == '直达' ? true : false,
						StartLonLat: this.car.startAddress.point,
						EndLonLat: this.car.endAddress.point,
						TravelFormType: this.car.travelFormType,
						CarId: item.CarId,
					}
					const loading = this.$loading({
						lock: true,
						text: '正在获取信息，请稍等...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					isServiceable(data, item.CarId).then(res => {
						loading.close();
						if (res.Code == 1 && res.Data) {
							if (res.Data) {
								this.$confirm('暂无预定，是否前往预定', '温馨提示', {
									confirmButtonText: '立即前往',
									cancelButtonText: '我再看看',
									type: 'warning',
									center: true
								}).then(() => {
									this.go(item)
								})
							} else {
								tl.toast({
									message: "该车辆已经被预订，请更换车辆",
									type: "info"
								})
							}
						}else{
							tl.toast('该车辆已被预订，请更换车辆')
						}
					})
				}
			},
			go(item) {
				var oitem = {
					predicttotalprice: item.PredictTotalPrice,
					totalprice: item.TotalPrice,
					year: item.Year,
					brand: item.Brand,
					level: item.Level,
					seat: item.Seat,
					carimg: [item.ExteriorImg,item.TrimImg],
					enterpriseName: item.EnterpriseName,
					enterpriseId: item.EnterpriseId,
					contact: item.Contact,
					iphone: item.Phone,
					servicePhone: item.ServicePhone,
					Kilometre: item.Kilometre,
					PredictTotalPrice: item.PredictTotalPrice,
					PredictPrice: item.PredictPrice,
					StrDate:item.StrDate
				}
				var carItem = [{
					"Key": item.CarId,
					"Value": JSON.stringify(oitem)
				}];
				var data = {
					StartTime: this.car.startTime,
					EndTime: this.car.endTime,
					TravelType: this.car.travelType,
					IsThrough: this.car.isThrough == '直达' ? true : false,
					StartLonLat: this.car.startAddress.point,
					EndLonLat: this.car.endAddress.point,
					CarIds: [item.CarId],
					CarItemDicJsons: JSON.stringify(carItem),
					StartAddress: this.car.startAddress.address,
					EndAddress: this.car.endAddress.address,
					TravelFormType: this.car.travelFormType,
					TravelPurpose: this.car.travelPurpose,
					StartProvinceName: this.car.startAddress.province,
					StartCityName: this.car.startAddress.city,
					StartDistrictName: this.car.startAddress.district,
					EndProvinceName: this.car.endAddress.province,
					EndCityName: this.car.endAddress.city,
					EndDistrictName: this.car.endAddress.district,
					StartPositionProvince: this.car.startAddress.ProvinceId,
					StartPositionCity: this.car.startAddress.CityId,
					StartPositionDistrict: this.car.startAddress.DistrictId,
					EndPostionProvince: this.car.endAddress.ProvinceId,
					EndPostionCity: this.car.endAddress.CityId,
					EndPostionDistrict: this.car.endAddress.DistrictId,
					CarInfo: oitem,
					StartCarAddress: this.car.startAddress,
					EndCarAddress: this.car.endAddress
				};
				localStorage.setItem("LddSearch",JSON.stringify(this.car));
				lockCars(data).then(res => {
					if (res.Code == 1) {
						localStorage.setItem("LddCarInfo", JSON.stringify(data))
						this.$router.push('./busDetail?id=' + res.Data)
					} else {
						tl.toast({
							type: 'info',
							message: res.Msg
						})
					}
				})
			},
			computedTime(startlat,startlng,endlat,endlng,fn){
				var self = this;
				if(!driving){
					driving = new AMap.Driving();
				}
				// 根据起终点经纬度规划驾车导航路线
				driving.search(new AMap.LngLat(startlat,startlng), new AMap.LngLat(endlat,endlng), function(status, result) {
				    // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
				    if (status === 'complete') {
						//获取两地之间距离所需要的时间（分钟） 预计单程变 往返时间*2 +30小时休息时间
						var t = (result.routes[0].time * 1000)*2 + new Date(self.car.startTime).getTime() + 30 * 60 * 1000;
						var time = new Date(t).format('yyyy-MM-dd hh:mm:ss');
						fn && fn(time);
				    } 
				});
			},
			searchCar(bool,first) { //带及价格
				var self = this; 
				if(first){
					this.pageIndex = 1;
				}
				if (!this.car.startTime) {
					tl.toast('请选择出发日期时间')
					return
				}
				var t= new Date(this.car.startTime).getTime() - (new Date().getTime() + 2*60*60*1000);
				if(t < 0){
					tl.toast('出发时间必须大于2小时')
					return
				}
				if(this.car.travelType == '2'){
					if (!this.car.endTime) {
						tl.toast('请选择到达日期时间')
						return
					}
					if(new Date(this.car.startTime).getTime() > new Date(this.car.endTime).getTime()){
						tl.toast('出发时间不能大于结束时间')
						return
					}
				}
				if (!this.car.startAddress.point) {
					tl.toast('请选择出发地址')
					return
				}
				if (!this.car.endAddress.point) {
					tl.toast('请选择达到地址')
					return
				}
				var startpoint = this.car.startAddress.point.split(',');
				var endpoint = this.car.endAddress.point.split(',');
				if(this.car.travelType == '1' && bool){
					this.computedTime(startpoint[0],startpoint[1],endpoint[0],endpoint[1],res=>{
						self.car.endTime = res;
					});
					this.searchCarList(bool);
				}else{
					this.computedTime(startpoint[0],startpoint[1],endpoint[0],endpoint[1],res=>{
						if(new Date(self.car.endTime).getTime() < new Date(res).getTime()){
							tl.toast('到达时间不能低于'+res);
							return
						}
						this.searchCarList(bool);
					});
				}
				
			},
			searchCarList(bool){  // 搜索车辆列表
				var data = {
					StartTime: this.car.startTime,
					EndTime: this.car.endTime,
					TravelType: this.car.travelType,
					IsThrough: this.car.isThrough == '直达' ? true : false,
					StartLonLat: this.car.startAddress.point,
					EndLonLat: this.car.endAddress.point,
					StartProviceId: this.car.startAddress.ProvinceId,
					StartCityId: this.car.startAddress.CityId,
					EndProviceId: this.car.endAddress.ProvinceId,
					EndCityId: this.car.endAddress.CityId,
					EnterpriseId: this.enterpriseId,
					TravelFormType: this.car.travelFormType,
					
					CarTypeId: "",
					CarSeat: this.typeId == "全部" ? '' : this.typeId,
					CarBrandId: "",
					CarBrandName: this.brandId == "全部" ? '' : this.brandId,
					CarYearId: "",
					CarYearName: this.yearId == "全部" ? '' : this.yearId,
					CarLevelId: "",
					CarLevelName: this.levelId == "全部" ? '' : this.levelId,
					// PageIndex: this.pageIndex,
					// PageSize: 6
				}
				if (bool) {
					// this.searchTrue = true;
					this.carList = [];
					// this.enterpriseId = "";
				}
				
				this.searchTrue = true;
				this.loading = true;
				busPriceList(data,this.pageIndex,6).then(res => {
					this.firstWatch = true;
					if (this.searchTrue) {
						this.searchTrue = false;
					}
					if (this.loading) {
						this.loading = false;
					}
					if (res.Code == 1) {
						if(this.pageIndex == 1){
							this.carList = [];
						}
						if (this.once) {
							this.carList = [];
							this.once = false;
						}
						this.carList = this.carList.concat(res.Data);
						this.pageCount = res.PageCount;
						if (this.pageIndex < res.PageCount) {
							this.loaingTrue = false;
							this.moreText = '查看更多车辆';
						}
						if (this.pageIndex >= res.PageCount) {
							this.moreText = '暂无更多数据了';
							this.loaingTrue = false;
						}
						
						
						
					}
					// if(res.DataExpand){
					// 	if(res.DataExpand.CityId != this.city.ID){
					// 		this.city.ID = res.DataExpand.CityId;
					// 		this.city.ParentId = res.DataExpand.ProviceId;
					// 		this.navLoading = true;
					// 		this.city.Name = this.car.startAddress.city;
					// 		this.getCompany();
					// 		setTimeout(()=>{
					// 			this.getCar();
					// 		},200)
					// 	}
					// }
					
				})
			},
			getCompany() {
				var data = {
					// provinceId: this.city.ParentId,
					// isConcern: false,
					pageIndex: this.pageIndex,
					pageSize: 100,
					// cityId: this.city.ID,
					address:this.city.Name,
					enterpriseName:""
				}
				busHomeList(data).then(res => {
					if (res.Code == 1) {
						this.enterpriseList = res.Data;
						// if(this.enterpriseId){
						// 	var num = 0;
						// 	res.Data.forEach((item,index) => {
						// 		if(item.ID == this.enterpriseId){
						// 			num = index;
						// 		}
						// 	})
						// 	var a = res.Data.splice(num,1);
						// 	this.enterpriseList = a.concat(res.Data);
						// }else{
						// 	this.enterpriseList = res.Data;
						// }
					}
				})
			},
			getCar() {
				var self = this;
				var data = {
					provinceId:self.city.ParentId,
					cityId: self.city.ID
				}
				homeCarTitle(data).then(res => {
					this.navLoading = false;
					console.log(res);
					if (res.Code == 1) {
						// self.typeList = [{
						// 	CarType: '全部',
						// 	ID: ''
						// }, ...res.Data.carTypeList];
						self.levelList = ['全部', ...res.Data.carLevelList];
						self.yearList = ['全部', ...res.Data.carYearList];
						self.brandList = ['全部', ...res.Data.carBrandList];
						this.$nextTick(() => {
							this.navHeight = tl.getStyle(this.$refs.nav, 'height');
							this.navTop = this.$refs.nav.offsetTop - 70
						})
					}
				})
			},
			change(id, num, type) {
				this[type + 'Id'] = id;
				this[type + 'Num'] = num;
				this.pageIndex = 1;
				this.carList = [];
				this.once ? this.first() : this.searchCar();
				if(type == 'enterprise'){
					// var a = this.enterpriseList.splice(num,1);
					// this.enterpriseList = a.concat(this.enterpriseList);
					this.drawer = false;
				}else{
					document.documentElement.scrollTop = document.body.scrollTop = this.navTop;
				}
			},
			reset(){
				this.typeId = "全部";
				this.typeNum = 0;
				this.brandId = "全部" ;
				this.brandNum = 0;
				this.yearId = "全部" ;
				this.yearNum = 0;
				this.levelId = "全部";
				this.levelNum = 0;
			},
			first(fn) {
				var data = {
					enterpriseId: this.enterpriseId,
					// carTypeId: this.typeId,
					// carBrandId: this.brandId,
					// carYearId: this.yearId,
					// carLevelId: this.levelId,
					CarTypeId: "",
					CarSeat: this.typeId == "全部" ? '' : this.typeId,
					CarBrandId: "",
					CarBrandName: this.brandId == "全部" ? '' : this.brandId,
					CarYearId: "",
					CarYearName: this.yearId == "全部" ? '' : this.yearId,
					CarLevelId: "",
					CarLevelName: this.levelId == "全部" ? '' : this.levelId,
					pageIndex: this.pageIndex,
					pageSize: 6,
					cityId: this.city.ID
				}
				if (this.carList.length < 5) {
					this.loading = true;
				}
				busFirst(data).then(res => {
					if (this.loading) {
						this.loading = false;
					}
					if (res.Code == 1) {
						this.carList = this.carList.concat(res.Data);
						this.pageCount = res.PageCount;
						if (this.pageIndex < res.PageCount) {
							this.loaingTrue = false;
							this.moreText = '查看更多车辆';
						}
						if (this.pageIndex >= res.PageCount) {
							this.moreText = '暂无更多数据了';
							this.loaingTrue = false;
						}
						fn && fn()
					}
				})
			},
			more() {
				if (this.pageIndex < this.pageCount) {
					this.pageIndex++;
					this.loaingTrue = true;
					this.once ? this.first() : this.searchCar();
				}
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
			},
			windowScroll() {
				// 滚动条距离页面顶部的距离
				// 以下写法原生兼容
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (scrollTop > this.navTop) {
					this.fixed = true
				} else {
					this.fixed = false
				}
			},
			open() {
				this.$alert(
					'1、订单中的“行程路线”，应按日按序认真填写行程中游玩、办事、住宿等停留地点，否则会造成包车行程公里数计算不正确，须在行程中办理包车订单补单手续。</br>2、包车价格由台班费、车辆品牌、车辆等级、车辆使用年限和淡旺季价格系数等组成。</br>3、订单不包括的费用：停车费，由包户直接支付。</br>4、订单下欠款的付款:行程返程开始前，应在司机的监督下，通过”驴嘟嘟旅游”公众号，付清下欠款。</br>5、订单“还车时间”，是指包车返程回到出发地驻地的时间；订单”公里数”，是车辆驻地到目的地的路程。</br>6、订单取消：取消订单会产生手续费。订单30分钟内取消，不收违约金,扣银行转账千分之六手续费；出发前72小时取消订单，扣定金10%违约金；出发前72小时至48小时取消订单扣定金20%违约金；出发前48小时至24小时取消订单扣定金20%违约金;出发前24小时以内取消订单扣定金100%违约金；应退款金额，平台在7个日内退回原付款账户。</br>8、包车须知是包车合同的补充约定，请认真阅读包车合同。</br>9、咨询服务热线:400-666-1590',
					'包车须知', {
						dangerouslyUseHTMLString: true,
					});
			}

		},
		mounted() {
			window.addEventListener('scroll', this.windowScroll);
		}
	}
</script>

<style scope lang="less">
	@import '../../assets/less/common.less';

	.el-tooltip {
		display: inline-block;
	}

	

	.red {
		color: @red  !important;
	}

	.bus {
		padding-bottom: 40px;
		padding-top: 15px;

		.searchForm {
			background: @cf;
			box-shadow: @box;
			margin-bottom: 15px;
			padding-top: 22px;
			padding-bottom: 22px;
			.el-form-item {
				margin-bottom: 10px;
			}

			.searchForm-btn {
				margin-left: 20px;
				margin-right: 15px;
				text-align: center;

				.text {
					line-height: 40px;
				}
			}
		}

		.searchChange {
			box-shadow: @box;
			margin-bottom: 15px;
			padding: 10px 0;
			background: @cf;
			box-shadow: @box;

			.searchChange-text {
				font-size: 16px;
				padding: 0 15px;
				color: @c3;
				width: 70px;
			}
			.popDrawer-title{
				font-size: 20px;
				text-align: center;
				padding: 20px 0;
			}
			.popDrawer{
				margin:0 20px;
				
				
				.el-bs{
					width: 48%;
					overflow: hidden;
					text-overflow: ellipsis;
					margin: 5px 0;
					text-align:center;
					padding: 12px 20px;
					box-sizing: border-box;
					font-size: 14px;
					border-radius: 4px;
					border: 1px solid @def;
					white-space: nowrap;
					cursor: pointer;
					color: @def;
					&:hover {
						color: @red;
						border-color: @red;
					}
					
					&.is-plain {
						color: @cf;
						background-color: @def;
						border-color: @def;
					}
				}
			}
			.el-b {
				display: inline-block;
				line-height: 1;
				white-space: nowrap;
				cursor: pointer;
				background: @cf;
				border: 1px solid @def;
				color: @def;
				-webkit-appearance: none;
				text-align: center;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				outline: 0;
				margin: 0;
				-webkit-transition: .1s;
				transition: .1s;
				font-weight: 500;
				padding: 12px 20px;
				font-size: 14px;
				border-radius: 4px;
				margin: 5px;
					
				&:hover {
					color: @red;
					border-color: @red;
				}

				&.is-plain {
					color: @cf;
					background-color: @def;
					border-color: @def;
				}
			}
		}

		.nav {
			width: 265px;
			box-shadow: @box;
			box-sizing: border-box;
			background: @cf;
			min-height: 400px;

			.fixed {
				position: fixed;
				width: 265px;
				background: @cf;
				top: 70px;
				box-shadow: @box;
			}

			.mod {
				border-bottom: 1px solid @ce;

				.busText {
					font-size: 14px;
					color: @c6;
					padding: 0 15px;
					text-align: justify;
					padding-bottom: 20px;
				}

				&.carBrand {
					.item {
						width: 25%;
					}
				}

				.title {
					font-size: 16px;
					color: @c6;
					padding: 0 15px;
					line-height: 42px;

					&.def {
						color: @def;
					}
				}

				.item {
					width: 33.33%;
					text-align: center;
					cursor: pointer;
					padding: 10px 0;

					&.on {
						.text {
							color: @def;
							font-weight: bold;
						}

						.car {
							.loop(@i) when (@i <=11) {
								&.car@{i} {
									background:~"url(../../../static/img/busIcon/cx@{i}-xz.png)";
								}

								.loop(@i+1);
							}

							.loop(1);
						}
					}

					.car {
						width: 64px;
						height: 32px;
						margin: 0 auto;
						.bg();

						.loop(@i) when (@i <=11) {
							&.car@{i} {
								background:~"url(../../../static/img/busIcon/cx@{i}.png)";
							}

							.loop(@i+1);
						}

						.loop(1);
					}
				}

				.text {
					font-size: 12px;
					color: @c9;
				}
			}
		}

		.main {
			width: 76.8333333333%;
			box-shadow: @box;
			background: @cf;

			.more {
				display: block;
				margin: 0 auto;
				margin-top: 30px;
				margin-bottom: 30px;
			}

			.title {
				.l {
					font-size: 16px;
					color: @c6;
				}

				.r {
					font-size: 14px;
					color: @def;
				}

				padding: 0 15px;
				line-height: 42px;
				border-bottom: 1px solid @ce;
			}

			.carList {
				.btn {
					width: 180px;

					.el-button {
						display: block;
						width: 100%;
						margin: 0;
						height: 50px;
						margin-bottom: 10px;

						&:last-child {
							margin-bottom: 0;
						}
					}
				}

				.carItem {
					height: 180px;
					border-bottom: 1px solid @ce;
					padding: 0 20px;

					&:hover {
						background: url(../../../static/img/busIcon/chover_bg.jpg) repeat-x bottom center;
					}
				}

				.img {
					width: 24.946%;
					height: 130px;
					background: @def;
					.bg();
				}

				.info {
					padding: 0 20px;

					.info-title {
						font-size: 18px;
						color: @c3;
						margin-bottom: 10px;
					}

					.width {
						width: 260px;
					}

					.del {
						text-decoration: line-through;
						color: @c9;
						font-size: 14px;
						margin-left: 10px;
					}
				}

				.info-int-item {
					width: 50%;
					line-height: 30px;
					font-size: 14px;
					color: @c6;
				}

				.info-pri {
					font-size: 14px;
					line-height: 30px;
					color: @c6;
				}
			}
		}
	}
</style>
