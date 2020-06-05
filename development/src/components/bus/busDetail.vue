<template>
	<div class="bgf">
		<div class="busDetail">
			<div class="busDetail-ts w1200">
				<div class="">锁定车辆后，若在<span>15分钟</span>内未完成订单支付，则取消该订单</div>
			</div>
			<div class="busMain flex flex-pack-justify w1200">
				<div class="left">
					<div class="ydInfo">
						<div class="busTitle">预定信息</div>
						<el-form :model="car" label-width="80px">
							<div class="flex flex-pack-justify">
								<el-form-item label="包车方式" class="flex-1">
									<el-radio-group v-model="car.travelType">
										<el-radio border label="2" class="el-radios">
											<el-tooltip class="item" effect="dark" content="往返指:包去程,也包回程。" placement="bottom">
												<div>往返</div>
											</el-tooltip>
										</el-radio>
										<el-radio border label="1" class="el-radios">
											<el-tooltip class="item" effect="dark" content="单程指:只包去程或只包回程。" placement="bottom">
												<div>单程</div>
											</el-tooltip>
										</el-radio>
									</el-radio-group>
								</el-form-item>
								<!-- <el-form-item label="是否直达" class="flex-1" v-show="car.travelType == 1">
									<el-radio-group v-model="car.isThrough">
										<el-radio border label="直达" class="el-radios"></el-radio>
										<el-radio border label="非直达" class="el-radios"></el-radio>
									</el-radio-group>
								</el-form-item> -->
								<el-form-item label="包车类别" class="flex-1">
									<el-radio-group v-model="car.travelFormType">
										<el-radio border label="0" class="el-radios">
											<el-tooltip class="item" effect="dark" content="全包指:包租车费用含油费、桥费等。" placement="bottom">
												<div>全包</div>
											</el-tooltip>
										</el-radio>
										<el-radio border label="1" class="el-radios">
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
											<!-- <el-input placeholder="请输入内容" readonly suffix-icon="el-icon-location-outline" v-model="car.startAddress.value"></el-input> -->
											<tl-map title="请填写出发地址" :strValue="car.startAddress.value" @getAddress="startAddress"></tl-map>
										</el-form-item>
										<el-form-item label="目的地址" class="flex-1" style="margin-bottom: 0;">
											<!-- <el-input placeholder="请输入内容" readonly suffix-icon="el-icon-location-outline" v-model="car.endAddress.value"></el-input> -->
											<tl-map title="请填写目的地址" :strValue="car.endAddress.value" @getAddress="endAddress"></tl-map>
										</el-form-item>
									</div>
								</div>
							</div>
						</el-form>
					</div>
					<div class="xcInfo" >
						<div class="busTitle">行程信息</div>
						<div class="xcInfo-main">
							<div v-if="hayFlag" class="fixMap">
								<div class="flex flex-pack-justify">
									<tl-map title="请填写途经地" icon="" @getAddress="hayAddress" class="flex-1"></tl-map>
									<el-button plain icon="el-icon-close" type="success" @click="hayFlag = !hayFlag"></el-button>
								</div>
							</div>
							<div class="release">
								<div class="releaseHalfway" v-for="(item,value) in startHalfway" :key="item.point">
									<div class="title flex flex-pack-justify startHalfway">
										<div class="start">出发地</div>
										<div class="flex-1">{{car.startTime | dateDay}}</div>
										<div class="add" @click="selectHalfway(value,'startHalfway')">添加途径地 +</div>
									</div>
									<div class="releaseHalfway-item flex">
										<div class="flex-1">出发地址：{{car.startAddress.value}}</div>
										<div class="flex-1">出发时间：{{car.startTime}}</div>
									</div>
									<div :class="'startHal'+value">
										<div class="releaseHalfway-item" v-for="(oitem,oitemIndex) in item" :key="oitemIndex">
											<div class="flex flex-pack-justify">
												<div>途径地点：{{oitem.value}}</div>
												<div class="flex flex-pack-justify flex-align-center">
													<div class="addA el-icon-plus" @click="selectHalfway(value,'startHalfway',oitemIndex+1)">添加</div>
													<div class="el-icon-delete" @click="removeHalfway(value,'startHalfway',oitemIndex+1)"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 途经地 -->
								<div class="releaseHalfway" v-for="(item,value) in Halfway" :key="item.point">
									<div class="title flex flex-pack-justify midHalfway">
										<div class="halfway">途径地</div>
										<div class="flex-1">{{value}}</div>
										<div class="add" @click="selectHalfway(value,'Halfway')">添加途径地 +</div>
									</div>
									<div :class="'hal'+value">
										<div class="releaseHalfway-item" v-for="(oitem,oitemIndex) in item" :key="oitemIndex">
											<div class="flex flex-pack-justify">
												<div>途径地点：{{oitem.value}}</div>
												<div class="flex flex-pack-justify flex-align-center">
													<div class="addA el-icon-plus" @click="selectHalfway(value,'Halfway',oitemIndex+1)">添加</div>
													<div class="el-icon-delete" @click="removeHalfway(value,'Halfway',oitemIndex+1)"></div>
												</div>
											</div>
										</div>
										<div class="releaseHalfway-item" v-if="!item.length" @click="selectHalfway(value,'Halfway')">
											驻地停留
										</div>
									</div>
								</div>
								<div class="releaseHalfway" v-for="(item,value) in endHalfway" :key="item.point">
									<div class="title flex flex-pack-justify endHalfway">
										<div class="end">还车地</div>
										<div class="flex-1">{{car.endTime | dateDay}}</div>
										<div class="add" @click="selectHalfway(value,'endHalfway')">添加途径地 +</div>
									</div>
									<div :class="'endHal'+value">
										<div class="releaseHalfway-item" v-for="(oitem,oitemIndex) in item" :key="oitemIndex">
											<div class="flex flex-pack-justify">
												<div>途径地点：{{oitem.value}}</div>
												<div class="flex flex-pack-justify flex-align-center">
													<div class="addA el-icon-plus" @click="selectHalfway(value,'endHalfway',oitemIndex+1)">添加</div>
													<div class="el-icon-delete" @click="removeHalfway(value,'endHalfway',oitemIndex+1)"></div>
												</div>
											</div>
										</div>
									</div>
									<div class="releaseHalfway-item flex" v-if="car.travelType==2">
										<div class="flex-1">返程目的地：{{car.startAddress.value}}</div>
										<div class="flex-1">返程达到时间：{{car.endTime}}</div>
									</div>
									<div class="releaseHalfway-item flex" v-else>
										<div class="flex-1">返程目的地：{{car.endAddress.value}}</div>
										<div class="flex-1" >预计达到时间：{{car.endTime}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="gcInfo">
						<div class="busTitle">跟车信息</div>
						<el-form ref="form" :model="userInfo" label-width="80px">
							<el-form-item label="联系人">
								<el-input v-model="userInfo.Name" placeholder="请填写联系人"></el-input>
							</el-form-item>
							<el-form-item label="联系电话">
								<el-input v-model="userInfo.Mobile" placeholder="请填写联系电话"></el-input>
							</el-form-item>
							<el-form-item label="备注信息">
								<el-input v-model="userInfo.Remarks" placeholder="请填写备注(选填)"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div class="syInfo">
						<div class="busTitle">索要发票</div>
						<div class="syInfo-text"><span>*</span> 需开具发票请在该订单完成后，至个人中心-发票管理-申请发票填写发票信息</div>
					</div>
					<div class="htInfo" :class="{'ts':tsFlag}">
						<div class="busTitle flex flex-pack-justify">
							<div>合同签订</div>
							<div><span class="red">*</span>在您预定由逸出游电子商务有限公司为您提供的品牌包车产品前，请您仔细阅读本合同条款。</div>
						</div>
						<div class="htInfo-text">
							<el-checkbox v-model="checked">我愿意接受</el-checkbox><span class="ht" @click="drawer = true">《旅游车辆租赁合同》</span>
						</div>
						<el-drawer title="旅游车辆租赁合同" :visible.sync="drawer" direction="ltr" :with-header="false" size="40%">
							<div class="drawer" v-html="drawerHtml"></div>
						</el-drawer>
					</div>
					<div class="busBtm" v-loading="priceFlag">
						<div class="busTitle flex flex-pack-justify flex-align-center ">
							<div>支付信息</div>
							<div class="totalMoney">包车总金额<span>￥{{chartered.PredictTotalPrice}}</span></div>
							<div class="money">需支付包车定金<span>￥{{chartered.PredictPrice}}</span></div>
							<el-button type="danger" @click="submit" :loading="submitFlag">支付定金预定车辆</el-button>
						</div>
					</div>
				</div>
				<div class="right" ref="nav">
					<div :class="{'fixed':fixed}">
						<div class="carInfo">
							<div class="busTitle">车辆信息</div>
							<el-collapse class="el-collapse_detail" v-model="activeName" accordion>
								<el-collapse-item :title="carInfo.title" name="1">
									<el-carousel trigger="click" height="150px" >
									  <el-carousel-item v-for="(item,index) in carInfo.carimg" :key="index">
										  <div class="img" :style="'background: url('+item+');'" @click="onPreview"></div>
									  </el-carousel-item>
									</el-carousel>
									<el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="carInfo.carimg" />
									<el-row>
										<el-col :span="8">车队联系人</el-col>
										<el-col :span="14">{{carInfo.contact}} {{carInfo.iphone}}</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">客运企业</el-col>
										<el-col :span="14">{{carInfo.enterpriseName}} {{carInfo.servicePhone}}</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="fyInfo" v-loading="priceFlag">
							<div class="busTitle">费用明细</div>
							<div class="fyInfo-mod">
								<div class="flex flex-pack-justify" v-if="car.travelType == 1">
									<div>预计总时间</div>
									<div>{{t | fixed}}小时</div>
								</div>
								<div class="flex flex-pack-justify">
									<div>预计总里程</div>
									<div>{{chartered.Kilometre}}公里</div>
								</div>
								<div class="flex flex-pack-justify">
									<div>(含车辆驻地到行程出发的距离)</div>
								</div>
								<div class="flex flex-end moneyTitle">
									<div class="flex-1">
										<div class="total">包车总金额</div>
										<div class="zf">需支付包车定金</div>
									</div>
									<div class="flex-1">
										<div class="money">￥{{chartered.PredictTotalPrice}}</div>
										<div class="oldMoney">￥{{chartered.PredictPrice}}</div>
									</div>
								</div>
								<div class="flex flex-pack-center">
									<el-button type="danger" @click="submit" :loading="submitFlag">支付定金预定车辆</el-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		orderByPrice,
		orderContract,
		orderSubmit,
		OrderModify,
		getPrantId,
		removelockCars
	} from '../../assets/js/api.js';
	import tlMap from '../../common/map/map.vue';
	import tl from '../../assets/tl.js';
	import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
	var driving;
	export default {
		components: {
			tlMap,ElImageViewer
		},
		data() {
			return {
				fixed:false,
				hayFlag: false,
				car: { //行程信息
					travelType: "", //包车方式   单程1，往返2
					travelFormType: "", //包车类别  全包0，半包1
					travelPurpose: "旅游包车", //包车用途
					isThrough: "非直达", //是否直达   直达true 非直达false
					startTime: "", //出发日期
					startAddress: {}, //出发地址
					endTime: "", //还车日期
					endAddress: {} //还车地址
				},
				carInfo: {}, //车辆信息
				userInfo: {}, //用户信息
				changeNum: 0,
				activeName: '1',
				Halfway: {}, //出发地途经地
				startHalfway: {}, //途经地
				endHalfway: {}, //目的地途经地
				buyId: "", //购物车ID
				//车辆计价
				chartered: {
					Kilometre: 0,
					PredictTotalPrice: 0,
					PredictPrice: 0,
					StrDate: 0
				},
				checked: false,
				drawer: false,
				drawerHtml: "",
				tsFlag: false,
				priceFlag: false,
				submitFlag: false,
				firstComputedPrice: false,
				showViewer: false,
				leaveFlag:true,
				t:""
			}
		},
		filters: {
			dateDay: function(t) {
				return new Date(t).format('yyyy-MM-dd')
			},
			fixed(t){
				return Number(t?t:0).toFixed(2)
			}
		},
		metaInfo: {
			title: '车辆详情', // set a title
		},
		watch: {
			'car.endTime'() {
				if (!this.firstComputedPrice) {
					return
				}
				this.computedHalfway(this.car.startTime, this.car.endTime);
				this.modify();
			},
			'car.startTime'() {
				var self = this;
				if (!this.firstComputedPrice) {
					return
				}
				if(this.car.travelType == 1){
					var startpoint = this.car.startAddress.point.split(',');
					var endpoint = this.car.endAddress.point.split(',');
					this.computedTime(startpoint[0],startpoint[1],endpoint[0],endpoint[1],res=>{
						self.car.endTime = res;
						self.computedHalfway(self.car.startTime, self.car.endTime);
						self.modify();
					});
				}else{
					this.computedHalfway(this.car.startTime, this.car.endTime);
					this.modify();
				}
				
			},
			'car.travelType'(old) {
				var self = this;
				if (!this.firstComputedPrice) {
					return
				}
				if(old == 1){
					var startpoint = this.car.startAddress.point.split(',');
					var endpoint = this.car.endAddress.point.split(',');
					this.computedTime(startpoint[0],startpoint[1],endpoint[0],endpoint[1],res=>{
						self.car.endTime = res;
						self.computedHalfway(self.car.startTime, self.car.endTime);
						this.t = ((new Date(this.car.endTime) - new Date(this.car.startTime)) / 1000 / 60 / 60).toFixed(2);
						self.modify();
					});
				}else{
					this.computedHalfway(this.car.startTime, this.car.endTime);
					this.modify();
				}
				
			},
			'car.travelFormType'() {
				if (!this.firstComputedPrice) {
					return
				}
				this.modify();
			},
		},
		created() {
			//获取合同条款
			this.getOrderContract();
			//获取跟车信息
			this.userInfo = JSON.parse(localStorage.getItem('LddUserInfo')) || {
				Name: "",
				Mobile: "",
				Remarks: ""
			};
			// 购物车ID
			this.buyId = this.$route.query.id;
			if (!this.buyId) {
				this.$router.go(-1)
			};
			//车辆信息与行程信息
			var info = JSON.parse(localStorage.getItem('LddCarInfo'));
			console.log(info);
			this.carInfo = info.CarInfo;
			this.carInfo.title = info.CarInfo.seat + '座 ' + info.CarInfo.brand + ' ' + info.CarInfo.year + ' ' + info.CarInfo.level;
			//行程信息
			this.car = {
				travelType: info.TravelType, //包车方式   单程1，往返2
				travelFormType: info.TravelFormType, //包车类别  全包0，半包1
				isThrough: info.IsThrough ? '直达' : '非直达', //是否直达   直达true 非直达false
				startTime: info.StartTime, //出发日期
				startAddress: info.StartCarAddress, //出发地址
				endTime: info.EndTime, //还车日期
				endAddress: info.EndCarAddress //还车地址
			}
			//先渲染保存的价格
			this.chartered = {
				Kilometre: info.CarInfo.Kilometre,
				PredictTotalPrice: info.CarInfo.PredictTotalPrice,
				PredictPrice: info.CarInfo.PredictPrice,
				StrDate: info.CarInfo.StrDate
			}
			//计算行程天数
			this.computedHalfway(this.car.startTime, this.car.endTime);
			//获取车辆价格
			this.computedPrice();
			
			
			this.t = (new Date(this.car.endTime) - new Date(this.car.startTime)) / 1000 / 60 / 60;
		},
		methods: {
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
			onPreview() {
			     this.showViewer = true
			    },
			    // 关闭查看器
			    closeViewer() {
			     this.showViewer = false
			    },
			modify() {
				var data = {
					"Id": this.buyId,
					"StartProvinceName": this.car.startAddress.province,
					"StartCityName": this.car.startAddress.city,
					"StartDistrictName": this.car.startAddress.district,
					"StartAddress": this.car.startAddress.address,
					"EndProvinceName": this.car.endAddress.province,
					"EndCityName": this.car.endAddress.city,
					"EndDistrictName": this.car.endAddress.district,
					"EndAddress": this.car.endAddress.address,
					"StartTime": this.car.startTime,
					"EndTime": this.car.endTime,
					"TravelType": this.car.travelType,
					"IsThrough": this.car.isThrough == '直达' ? true : false,
					"StartLonLat": this.car.startAddress.point,
					"EndLonLat": this.car.endAddress.point,
					"TravelFormType": this.car.travelFormType
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
				this.priceFlag = true;
				OrderModify(data).then(res => {
					if (res.Code == 1) {
						this.computedPrice();
					}
				})
			},
			//选择途经地
			selectHalfway(val, type, index) {
				this.hayFlag = true;
				localStorage.setItem('mapKey', val);
				localStorage.setItem('mapType', type);
				localStorage.setItem('mapIndex', index);
			},
			//删除途经地
			removeHalfway(val, type, index) {
				this[type][val].splice(index - 1, 1);
				this.computedPrice();
			},
			//选择途经地
			hayAddress(item) {
				var type = localStorage.getItem('mapType');
				var val = localStorage.getItem('mapKey');
				var index = localStorage.getItem('mapIndex');
				if (index == 'undefined') {
					this[type][val].splice(0, 0, item)
				} else {
					this[type][val].splice(index, 0, item)
				}
				this.hayFlag = false;
				this.computedPrice();
				localStorage.removeItem('mapKey');
				localStorage.removeItem('mapType');
				localStorage.removeItem('mapIndex');
			},
			//获取途经地数组
			hayList() {
				var carRoutesList = [].concat(
					tl.getRouteInfo(this.startHalfway),
					tl.getRouteInfo(this.Halfway),
					tl.getRouteInfo(this.endHalfway)
				);
				var list = [];
				carRoutesList.forEach((item) => {
					list.push({
						"Leave": item.time,
						"Arrival": item.time,
						"LonLat": item.point,
						"Address": item.value,
						"CityName": item.city,
						"ProvinceName": item.province,
						"DistrictName": item.district,
					})
				})
				return list
			},
			//提交订单
			submit() {
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
				
				var CarRoutesList = this.hayList();
				var carRoutesFlag = false;
				if(this.car.travelType == 2){
					CarRoutesList.forEach(item => {
						if(item.DistrictName == this.car.endAddress.district){
							carRoutesFlag = true;
						}
					})
					if(!carRoutesFlag){
						tl.toast({
							message: '请添加【'+this.car.endAddress.province+' '+this.car.endAddress.city+' '+this.car.endAddress.district+'】的途经地'
						})
						return
					}
				}
				if(!this.userInfo.Name){
					tl.toast('请填写联系人')
					return
				}
				if(!this.userInfo.Mobile){
					tl.toast('请填写联系电话')
					return
				}
				if(!tl.isPhone(this.userInfo.Mobile)){
					tl.toast('请填写正确的联系电话')
					return
				}
				if (!this.checked) {
					tl.toast({
						type: 'info',
						message: '请您勾选已阅读《旅游车辆租赁合同》'
					})
					this.tsFlag = true;
					setTimeout(() => {
						this.tsFlag = false;
					}, 1000);
					document.documentElement.scrollTop = document.body.scrollTop = 10000;
					return
				}
				var preordainOrder = {
					"PreordainOrderId": this.buyId,
					"CarRoutesList": CarRoutesList
				};
				var orderContact = {
					"MemGuideUserId": null,
					"Contect": this.userInfo.Name,
					"Phone": this.userInfo.Mobile,
					"AcceptTime": this.car.startTime,
					"AcceptPosition": this.car.startAddress.value,
					"Remark": this.userInfo.Remarks
				};
				var data = {
					"PreordainOrder": preordainOrder,
					"NeedInvoice": false,
					"Invoice": null,
					"OrderContact": orderContact
				};
				this.submitFlag = true;
				orderSubmit(data).then(res => {
					this.submitFlag = false;
					if (res.Code == 1) {
						tl.toast({
							type: "info",
							message: "订单提交成功，立即前往支付"
						})
						this.leaveFlag = false;
						setTimeout(() => {
							var carInfo = {
								startTime: this.car.startTime,
								info: this.carInfo,
								money: this.chartered.PredictPrice,
								startAddress: this.car.startAddress.value,
								endAddress: this.car.endAddress.value
							}
							localStorage.setItem("LddPayInfo", JSON.stringify(carInfo))
							this.$router.push({
								path: 'pay?id=' + encodeURIComponent(res.Data.split(",")[0]) + "&m=" + this.chartered.PredictPrice +
									"&bt=1&ot=1"
							})
						}, 1000)
					} else {
						tl.toast(res.Msg);
						setTimeout(() => {
							this.$router.go(-1)
						}, 2500)
					}
				})
			},
			//获取合同
			getOrderContract() {
				orderContract({
					Type: 0
				}).then(res => {
					if (res.Code == 1) {
						this.drawerHtml = res.Data;
					} else {
						tl.toast({
							type: 'info',
							message: res.Msg
						})
					}
				})
			},
			//计算订车价格
			computedPrice() {
				this.priceFlag = true;
				var data = {
					PreordainOrderId: this.buyId,
					CarRoutesList: this.hayList()
				}
				orderByPrice(data).then(res => {
					this.priceFlag = false;
					if (res.Code == 1) {
						if (!this.firstComputedPrice) {
							this.firstComputedPrice = true;
						}
						this.chartered = {
							Kilometre: res.Data.Kilometre,
							PredictTotalPrice: res.Data.PredictTotalPrice,
							PredictPrice: res.Data.PredictPrice,
							StrDate: res.Data.StrDate
						}
					}
				})
			},
			//计算中间的天数
			computedHalfway(start, end) {
				this.startHalfway = {};
				// this.Halfway = {};
				this.endHalfway = {};
				var s = new Date(start);
				var e = new Date(end);
				var info = this.car.endAddress;
				this.$set(this.startHalfway, s.format("yyyy-MM-dd"), []);
				if(this.car.travelType == 2){
					this.$set(this.startHalfway, s.format("yyyy-MM-dd"), [{
						value: info.value,
						point: info.point,
						address: info.address,
						city: info.city,
						province: info.province,
						district: info.district
					}]);
				}
				this.$set(this.endHalfway, s.format("yyyy-MM-dd"), []);
				var day = 60 * 24 * 60 * 1000
				var num = Math.floor((e.getTime() - s.getTime()) / day);
				var list = {}
				for (var i = 0; i < num; i++) {
					if (!(i == 0 || i == num)) {
						var time = new Date(s.getTime() + i * day).format("yyyy-MM-dd");
						list[time] = []
					}
				}
				this.Halfway = list;
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
						this.car.startAddress.ProvinceId = res.Data.StartAreaId.ProvinceId;
						this.car.startAddress.CityId = res.Data.StartAreaId.CityId;
						this.car.startAddress.DistrictId = res.Data.StartAreaId.DistrictId;
						this.modify();
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
						if(this.car.travelType == 2){
							this.computedHalfway(this.car.startTime, this.car.endTime);
						}
						this.modify();
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
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.navTop = this.$refs.nav.offsetTop - 70
			});
			window.addEventListener('scroll', this.windowScroll);
		},
		destroyed(){
			if(this.leaveFlag){
				removelockCars();
			}
		}
	}
</script>

<style scope lang="less">
	@import '../../assets/less/common.less';

	.el-tooltip {
		display: inline-block;
	}

	.el-radios {
		margin-right: 0;
	}

	.el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 200px;
	}

	.el-collapse_detail {
		padding: 0 10px;
	}

	.el-image {
		width: 100%;
	}

	.el-drawer {
		overflow: auto;

		.drawer {
			padding: 0 20px;
			overflow: auto;
			font-size: 20px;
		}
	}

	.fixMap {
		position: fixed;
		width: 500px;
		top: 50%;
		left: 50%;
		margin-left: -350px;
		z-index: 10;
		background: @cf;
		box-shadow: @box;
	}

	.busDetail {
		padding: 15px 0;

		.busTitle {
			height: 40px;
			line-height: 40px;
			border-bottom: 1px solid @cd;
			position: relative;
			padding: 0 20px;
			font-size: 14px;

			.red {
				color: @red ;
			}

			&:after {
				content: "";
				position: absolute;
				width: 4px;
				height: 30px;
				background: @def;
				top: 50%;
				margin-top: -15px;
				left: 0;
			}
		}

		.busDetail-ts {
			padding: 20px 0;
			font-size: 14px;
			color: @c3;
			background: @cf;
			box-shadow: @box;
			text-indent: 20px;
			margin-bottom: 15px;
		}

		.busBtm {
			background: @cf;
			box-shadow: @box;

			.busTitle {
				height: 60px;

				.totalMoney {
					span {
						color: @money;
						font-weight: bold;
					}
				}

				.money {
					span {
						color: @red;
						font-weight: bold;
					}
				}
			}
		}

		.busMain {

			.left,
			.right {
				font-size: 14px;
				color: @c3;
			}
			.fixed {
				position: fixed;
				width: 265px;
				background: @cf;
				top: 70px;
				box-shadow: @box;
			}
			.left {
				width: 76.8333333333%;

			}

			.right {
				width: 22.333333%;
			}

			.ydInfo,
			.carInfo,
			.xcInfo,
			.gcInfo,
			.syInfo,
			.htInfo,
			.fyInfo {
				background: @cf;
				box-shadow: @box;
				margin-bottom: 10px;
			}

			.carInfo {
				.img {
					height: 150px;
					.bg()
				}
			}

			.ydInfo {
				background: @cf;

				.el-form {
					padding: 20px 15px;
				}
			}

			.gcInfo {
				.el-form {
					padding: 20px 20px 20px 0;

					.el-form-item {
						margin-bottom: 10px;

						&:last-child {
							margin-bottom: 0;
						}
					}
				}
			}

			.xcInfo {
				.xcInfo-main {
					// padding: 0 20px;
					line-height: 40px;
				}
			}

			.syInfo {
				.syInfo-text {
					font-size: 14px;
					color: @c3;
					padding: 20px;

					span {
						color: @red;
					}
				}
			}

			.htInfo {
				.htInfo-text {
					font-size: 14px;
					color: @c3;
					padding: 20px;

					.ht {
						color: @def;
						cursor: pointer;
						font-weight: bold;
					}
				}

			}

			.fyInfo {
				.fyInfo-mod {
					padding: 10px;
					line-height: 30px;

					.moneyTitle {
						text-align: right;

						.total {
							color: @c3;
							font-weight: bold;
						}

						.money {
							color: @money;
							font-size: 16px;
							font-weight: bold;
						}

						.oldMoney {
							color: @red;
						}
					}

					.el-button {
						margin-top: 10px;
					}
				}
			}
		}
	}

	.release .release-item {
		border-bottom: 1px solid #dddddd;
	}

	.release .release-item:last-child {
		border-bottom-color: transparent;
	}

	.release .release-item .title {
		height: 30px;
		line-height: 30px;
		font-size: 13px;
		color: #333;
	}

	.releaseHalfway {
		background: #fff;
		border-radius: 2px;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
		color: #333;
		font-size: 13px;
	}

	.releaseHalfway .title {
		padding: 0 20px;
		height: 40px;
		line-height: 40px;

		&.startHalfway {
			background: #eeffed;
		}

		&.midHalfway {
			background: #ffedd5;
		}

		&.endHalfway {
			background: #e4e4e4;
		}
	}

	.releaseHalfway .title .add {
		color: #ff6600;
		cursor: pointer;
	}

	.releaseHalfway .title .start,
	.releaseHalfway .title .halfway,
	.releaseHalfway .title .end,
	.releaseHalfway .title .baoche {
		font-size: 15px;
		margin-right: 15px;
	}

	.releaseHalfway .title .start {
		color: #009999;
	}

	.releaseHalfway .title .halfway {
		color: #666;
	}

	.releaseHalfway .title .end {
		color: #ff6600;
	}

	.releaseHalfway .title .baoche {
		color: #ff0066;
	}

	.releaseHalfway .releaseHalfway-item {
		padding: 5px 20px;
		border-top: 1px solid #ddd;
	}

	.releaseHalfway .releaseHalfway-item:last-child {
		border-bottom-color: transparent;
	}

	.releaseHalfway .releaseHalfway-item .halfway-item {
		height: 40px;
		line-height: 40px;
		border-top: 1px solid #ddd;
	}

	.releaseHalfway .releaseHalfway-item .halfway-item span {
		color: #ff0099;
	}

	.releaseHalfway .releaseHalfway-item .addA {
		margin-right: 20px;
		cursor: pointer;
	}

	.releaseHalfway .releaseHalfway-item .el-icon-delete {
		cursor: pointer;
	}

	.releaseHalfway .releaseHalfway-item .halfway-item:first-child {
		border-top-color: transparent;
	}
</style>
