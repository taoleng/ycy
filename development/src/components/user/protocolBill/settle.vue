<template>
	<div class="order">
		<div class="title">已结算订单查询</div>
		<el-form :inline="true" :model="search" class="demo-form-inline">
			<el-form-item label="订单编号">
				<el-input style="width: 180px;" v-model="search.id" placeholder="订单编号"></el-input>
			</el-form-item>
			<el-form-item label="下单时间">
				<el-date-picker style="width: 250px;" v-model="search.time" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
				 start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="关键字">
				<el-input style="width: 170px;" v-model="search.key" placeholder="客企名\员工名称\行程"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="loading" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="orderTable" v-loading="loading">
			<div class="result flex flex-pack-justify">
				<div>结果汇总：当前数据 <span class="red">{{info.total}}</span> 条，订单总金额 <span class="red">{{info.TotalMoney}}</span> 元</div>
			</div>
			<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column type="expand" width="30">
						<template slot-scope="scope">
							<el-form label-position="left" class="demo-table-expand flex flex-wrap">
								<div class="item w1">
									<div class="item-in"><span>包租车：</span>{{scope.row.TravelTypeName}} {{scope.row.TravelFormTypeName}}</div>
									<div class="item-in"><span>下单人：</span>{{scope.row.NickName}}</div>
								</div>
								<div class="item w2">
									<div class="item-in"><span>出发时间：</span>{{scope.row.StartTime | time}}</div>
									<div class="item-in"><span>达到时间：</span>{{scope.row.EndTime | time}}</div>
								</div>
								<div class="item flex-1">
									<div class="item-in"><span>客企名称：</span>{{scope.row.EnterpriseName}}</div>
								</div>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column label="订单号" width="200" align="center" tooltip-effect="dark">
						<template slot-scope="scope">
							<div>{{scope.row.ID}}</div>
						</template>
					</el-table-column>
					<el-table-column label="下单时间" width="150" align="center">
						<template slot-scope="scope">
							<div>{{scope.row.InsertTime | time}}</div>
						</template>
					</el-table-column>
					<el-table-column label="行程信息" width="150" align="center">
						<template slot-scope="scope">
							<div>{{scope.row.StartPositionCityName}} → {{scope.row.EndPostionCityName}}</div>
						</template>
					</el-table-column>
					<el-table-column label="包车金额" width="110" align="center">
						<template slot-scope="scope">
							<div>{{scope.row.TotalMoney}} 元</div>
						</template>
					</el-table-column>
					<el-table-column label="定金金额" width="110" align="center">
						<template slot-scope="scope">
							<div>{{scope.row.EarnestMoney}} 元</div>
						</template>
					</el-table-column>
					<el-table-column label="订单状态" width="90" align="center">
						<template slot-scope="scope">
							<div class="orderStatus">{{scope.row.OrderStatus | orderStatus}}</div>
						</template>
					</el-table-column>
					<el-table-column label="结算状态" width="90" align="center">
						<template slot-scope="scope">
							<div class="orderStatus">{{scope.row.SettleType | settleType}}</div>
						</template>
					</el-table-column>
				</el-table>
			<el-pagination v-if="TotalCount > 5" :page-size="pageSize" @current-change="change" background layout="prev, pager, next" :total="TotalCount"></el-pagination>
		</div>

	</div>
</template>

<script>
	import {
		getSettledOrderList,
	} from '../../../assets/js/api.js';
	import tl from '../../../assets/tl.js';
	export default {
		data() {
			return {
				search: {
					id: "",
					time: [],
					key: ""
				},
				pageIndex: 1,
				TotalCount: 0,
				pageSize: 5,
				tableData: [],
				info: {
					total: 0,
					TotalMoney: 0,
					DebtMoney: 0,
					payMoney: 0
				},
				loading: true,
				idList:[]
			}
		},
		created() {
			this.getList();
		},
		filters: {
			time(str) {
				if (typeof str == 'string') {
					return str.substr(0, 16)
				}
				return str
			},
			orderStatus(num) {
				return tl.orderStatus(num)
			},
			settleType(num) {
				return tl.settleType(num)
			}
		},
		methods: {
			change(val) {
				this.pageIndex = val;
				this.getList()
			},
			//获取列表
			getList() {
				var data = {
					PageIndex: this.pageIndex,
					PageSize: this.pageSize,
					ID: this.search.id,
					StartTime: "",
					EndTime: "",
					Key: this.search.key
				}
				if (this.search.time.length) {
					data.StartTime = this.search.time[0];
					data.EndTime = this.search.time[1];
				}
				this.loading = true;

				getSettledOrderList(data).then(res => {
					this.loading = false;
					if (res.Code == 1) {
						this.info.total = res.TotalCount;
						this.info.TotalMoney = res.DataExpand.TotalMoney ? res.DataExpand.TotalMoney : 0;
						this.info.DebtMoney = res.DataExpand.DebtMoney ? res.DataExpand.DebtMoney : 0;
						this.TotalCount = res.TotalCount;
						this.tableData = res.Data;
					}
				})
			},
			onSubmit() {
				this.pageIndex = 1;
				this.getList();
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../../assets/less/common.less';

	.el-button {
		margin: 3px 0;
	}

	.order {
		.orderStatus {
			color: #E6A23C;
		}

		.money {
			color: @red;
		}

		.el-dropdown-link {
			cursor: pointer;
			color: @red;
		}

		.result {
			font-size: 16px;
			height: 60px;
			line-height: 60px;
			color: #606266;

			span {
				color: @red;
			}
		}

		.orderTable {
			padding: 0 20px;
		}

		.demo-table-expand {
			.item-in {
				font-size: 14px;
				padding: 5px 0;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				width: 33.33%;
				span {
					color: #606266;
					font-weight: bold;
				}
			}
		}
	}

	.title {
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		color: @c3;
		font-weight: bold;
		border-bottom: 1px solid @cd;
		padding: 0 20px;
	}

	.demo-form-inline {
		padding: 15px 20px;
		border-bottom: 1px solid @cd;

		.el-form-item {
			margin-bottom: 0;
		}
	}
</style>
