<template>
	<div class="busDetail">
		<div class="busMain flex flex-pack-justify w1200">
			<div class="left" v-loading="loading">
				<div class="ydInfo">
					<div class="busTitle">预定信息</div>
					<el-form :model="info" label-width="80px">
						<div class="flex flex-pack-justify">
							<el-form-item label="订单状态" class="flex-1">
								{{info.OrderStatus | orderStatus}}
							</el-form-item>
							<el-form-item label="包车方式" class="flex-1">
								<el-radio-group v-model="info.TravelType">
									<el-radio border label="2" v-if="info.TravelType == 2">
										<span>往返</span>
									</el-radio>
									<el-radio border label="1" v-if="info.TravelType == 1">
										<span>单程</span>
									</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="包车类别" class="flex-1">
								<el-radio-group v-model="info.TravelFormType">
									<el-radio border label="0" v-if="info.TravelFormType == 0">
										<span>全包</span>
									</el-radio>
									<el-radio border label="1" v-if="info.TravelFormType == 1">
										<span>半包</span>
									</el-radio>
								</el-radio-group>
							</el-form-item>
						</div>
						<div class="flex flex-pack-justify flex-align-center">
							<div class="flex-1">
								<div class="flex flex-1 flex-pack-justify">
									<el-form-item label="出发时间" class="flex-1" v-if="info.TravelType == 2 || info.IsThrough !=true">
										<el-input readonly suffix-icon="el-icon-time" v-model="info.StartTime"></el-input>
									</el-form-item>
									<el-form-item label="到达时间" class="flex-1">
										<el-input readonly suffix-icon="el-icon-time" v-model="info.EndTime"></el-input>
									</el-form-item>
								</div>
								<div class="flex flex-1 flex-pack-justify">
									<el-form-item label="出发地址" class="flex-1">
										<el-input placeholder="请输入内容" readonly suffix-icon="el-icon-location-outline" v-model="info.StartPositionAddress"></el-input>
									</el-form-item>
									<el-form-item label="目的地址" class="flex-1" style="margin-bottom: 0;">
										<el-input placeholder="请输入内容" readonly suffix-icon="el-icon-location-outline" v-model="info.EndPostionAddress"></el-input>
									</el-form-item>
								</div>
							</div>
						</div>
					</el-form>
				</div>
				<div class="xcInfo">
					<div class="busTitle">行程信息</div>
					<div class="xcInfo-main">
						<div class="release">
							<div class="releaseHalfway">
								<div class="title flex flex-pack-justify startHalfway">
									<div class="halfway">出发地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{info.StartDate}}</div>
								</div>
								<div class="releaseHalfway-item flex">
									<div class="flex-1">出发地址：{{info.StartPositionAddress}}</div>
									<div class="flex-1">出发时间：{{info.StartTime}}</div>
								</div>
								
								<template v-for="item in hay" v-if="item.Arrival == info.StartDate">
									<div class="releaseHalfway-item flex" v-for="o in item.child" v-if="o.AddressMold == 2">
										<div>途径地址：</div>
										<div>{{o.Address}}</div>
									</div>
								</template>
								<template v-for="item in hay" v-if="!(item.Arrival == info.StartDate && item.Arrival == info.EndDate)  && item.child.length">
									<div class="title flex flex-pack-justify midHalfway">途经地 {{item.Arrival}}</div>
									<div class="releaseHalfway-item flex" v-for="o in item.child" v-if="o.AddressMold == 2">
										<div>途径地址：</div>
										<div>{{o.Address}}</div>
									</div>
								</template>
								<template v-for="item in hay" v-if="(item.Arrival == info.EndDate && item.Arrival != info.StartDate) && item.child.length">
									<div class="releaseHalfway-item flex" v-for="o in item.child" v-if="o.AddressMold == 2">
										<div>途径地址：</div>
										<div>{{o.Address}}</div>
									</div>
								</template>
								
								<div class="title flex flex-pack-justify endHalfway">
									<div class="halfway">目的地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{info.EndDate}}</div>
								</div>
								<div class="releaseHalfway-item flex">
									<div class="flex-1">还车地址：{{info.StartPositionAddress}}</div>
									<div class="flex-1">还车时间：{{info.EndTime}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="right" v-loading="loading">
				<div class="carInfo">
					<div class="busTitle">车辆信息</div>
					<el-collapse v-model="activeName" accordion class="el-collapses">
						<el-collapse-item :title="carInfo.title" name="1">
							<div class="img" v-lazy:background-image="carInfo.ExteriorImg"></div>
							<el-row>
								<el-col :span="8">客运企业</el-col>
								<el-col :span="14">{{info.EnterpriseName}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="8">车队联系人</el-col>
								<el-col :span="14">{{carInfo.JdContact}} {{carInfo.JdPhone}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="8">司机信息</el-col>
								<el-col :span="14">{{carInfo.DriverName}} {{carInfo.DriverContect}}</el-col>
							</el-row>
						</el-collapse-item>
					</el-collapse>
				</div>
				<div class="fyInfo">
					<div class="busTitle">费用明细</div>
					<div class="fyInfo-mod">
						<div class="flex flex-pack-justify">
							<div>预计总时间</div>
							<div>{{info.TotalTime}}小时</div>
						</div>
						<div class="flex flex-pack-justify">
							<div>预计总里程</div>
							<div>{{info.Totalkilor}}公里</div>
						</div>
						<div class="flex flex-pack-justify" v-if="info.SupplementMoneyNew > 0">
							<div>补单金额</div>
							<div>{{info.SupplementMoneyNew}}元</div>
						</div>
						<div class="flex flex-pack-justify" v-if="info.OrderStatus == 3 || info.OrderStatus == 4 || info.OrderStatus == 5">
							<div>已收款</div>
							<div>{{info.PayMoney}}元</div>
						</div>
						<div class="flex flex-pack-justify" v-if="info.OrderStatus == 3 || info.OrderStatus == 4">
							<div>下欠款</div>
							<div>{{info.DebtMoney}}元</div>
						</div>
						<template v-if="info.OrderStatus == 5">
							<div class="flex flex-pack-justify">
								<div>违约金</div>
								<div>{{info.PenaltyMoney}}元</div>
							</div>
							<div class="flex flex-pack-justify">
								<div>应退款</div>
								<div>{{info.PayMoney - info.PenaltyMoney}}元</div>
							</div>
							<div class="flex flex-pack-justify">
								<div>已退款</div>
								<div>{{info.RefundMoney}}元</div>
							</div>
						</template>
						<div class="flex flex-end moneyTitle">
							<div class="flex-1">
								<div class="total">包车金额</div>
								<div class="zf">包车定金</div>
							</div>
							<div class="flex-1">
								<div class="money">￥{{info.TotalMoney}}</div>
								<div class="oldMoney">￥{{info.EarnestMoney}}</div>
							</div>
						</div>
						<div class="flex flex-pack-center" >
							<el-button type="danger" v-if="info.OrderStatus==1  && info.EarnestMoney > 0" @click="submit" :loading="submitFlag">支付定金</el-button>
							<el-button type="danger" v-if="(info.OrderStatus==3 || info.OrderStatus==4) && info.DebtMoney > 0 && info.BillType == 0" @click="submit" :loading="submitFlag">支付下欠款</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getOrderDetails,
		getCarOrderList
	} from '../../../assets/js/api.js';
	import tl from '../../../assets/tl.js';

	function arrTrans(arr) {
		var iconsArr = [];
		var result = [];
		arr.forEach(function(item, index) {
			console.log(item);
			if (!iconsArr[item.Date]) {
				iconsArr[item.Date] = 1
				result.push({
					Arrival: item.Date,
					child: []
				})
			}
		});

		for (var b = 0; b < result.length; b++) {
			var bItem = result[b];
			for (var i = 0; i < arr.length; i++) {
				var item = arr[i];
				if (bItem.Arrival == item.Date) {
					bItem.child.push(...item.RouteItem)
				}
			}

		}
		return result;
	}
	export default {
		data() {
			return {
				id: "",
				activeName: "1",
				info: {},
				carInfo: {},
				hay: {},
				loading: true,
				submitFlag:false
			}
		},
		filters:{
			orderStatus(num){
				return tl.orderStatus(num)
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.getDetail();
			this.getCarOrder();
		},
		methods: {
			submit(){
				this.submitFlag = true;
				var carInfo = {
					startTime: this.info.StartTime,
					// info: this.carInfo,
					money: this.info.EarnestMoney,
					startAddress: this.info.StartPositionAddress,
					endAddress: this.info.EndPostionAddress
				}
				
				if(this.info.OrderStatus == 1){
					carInfo.money = this.info.EarnestMoney;
				}else if(this.info.OrderStatus == 3 || this.info.OrderStatus == 4){
					carInfo.money = this.info.DebtMoney;
				}
				
				localStorage.setItem("LddPayInfo", JSON.stringify(carInfo));
				
				if(this.info.OrderStatus == 1){
					this.$router.push({
						path: '/pay?id=' + encodeURIComponent(this.info.IdName) + "&m=" + carInfo.money +
							"&bt="+this.info.BusinessType+"&ot=1"
					})
				}else if(this.info.OrderStatus == 3 || this.info.OrderStatus == 4){
					this.$router.push({
						path: '/pay?id=' + encodeURIComponent(this.info.IdName) + "&m=" + carInfo.money +
							"&bt="+this.info.BusinessType+"&ot=2"
					})
				}
				
				this.submitFlag = false;
			},
			getDetail() {
				var data = {
					id: this.id
				}
				getOrderDetails(data).then(res => {
					if (res.Code == 1) {
						this.info = res.Data;
						this.info.TravelType = this.info.TravelType.toString();
						this.info.TravelFormType = this.info.TravelFormType.toString();
						this.info.StartDate = new Date(this.info.StartTime.replace(/\-/g, '/')).format("yyyy-MM-dd");
						this.info.EndDate = new Date(this.info.EndTime.replace(/\-/g, '/')).format("yyyy-MM-dd");
					} else {
						tl.toast(res.Msg);
					}
				})
			},
			getCarOrder() {
				var data = {
					id: this.id
				}
				getCarOrderList(data).then(res => {
					this.loading = false
					if (res.Code == 1) {
						this.carInfo = res.Data[0];
						this.carInfo.title = res.Data[0].CarNo + " " + res.Data[0].CarSeat + '座|' + res.Data[0].CarBrandName + '|' +
							res.Data[0].CarYearName;
						var a = JSON.parse(this.carInfo.RouteInfo).RouteList;
						
						this.hay = arrTrans(a);
						
						console.log(this.hay);
					} else {
						tl.toast(res.Msg);
					}
				})
			}
		}
	}
</script>


<style scope lang="less">
	@import '../../../assets/less/common.less';

	
	.el-collapses {
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
