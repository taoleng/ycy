<template>
	<div class="order">
		<div class="title">支付流水查询</div>
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
			<div class="result">结果汇总：当前数据 <span class="res">{{info.total}}</span> 条，订单总金额 <span class="res">{{info.PayMoney}}</span>
				元，退款金额 <span class="res">{{info.BackMoney}}</span>
				元</div>
			<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column label="支出信息" width="280">
					<template slot-scope="scope">
						<div>{{scope.row.BookKeepingType == 0 ?'支付流水号':'退款流水号'}}：{{scope.row.PaySerial}}</div>
						<div v-if="scope.row.PayTime">{{scope.row.BookKeepingType == 0 ?'支付时间':'退款时间'}}：{{scope.row.PayTime | time}}</div>
					</template>
				</el-table-column>
				<el-table-column label="订单信息" width="300">
					<template slot-scope="scope">
						<div>业务来源：{{scope.row.BusinessType | businessType}} {{scope.row.TravelFormType | travelForm}}</div>
						<div>订单编号：{{scope.row.ID}}</div>
						<div>所属公司：{{scope.row.EnterpriseName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="支付/退款方式" align="center">
					<template slot-scope="scope">
						<div>支付/退款：{{scope.row.BookKeepingType | bookKeepingType}}</div>
						<div>支付类型：{{scope.row.PayType | orderPayType}}</div>
						<div>支付方式： {{scope.row.PayMode | PayMode}}</div>
					</template>
				</el-table-column>
				<el-table-column label="支出/退款金额" align="center">
					<template slot-scope="scope">
						<div><span class="money">{{scope.row.PayMoney}}</span>元</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-if="TotalCount > 5" :page-size="pageSize" @current-change="change" background layout="prev, pager, next" :total="TotalCount"></el-pagination>
		</div>

	</div>
</template>

<script>
	import {
		// getAllOrderList,
		// oneself,
		// orderCancel,
		orderFlow
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
				pageSize:5,
				tableData: [],
				info: {
					total: 0,
					PayMoney: 0,
					BackMoney: 0
				},
				loading: true,
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
			travelForm(num){
				return tl.travelForm(num)
			},
			businessType(num){
				return tl.businessType(num)
			},
			PayMode(num){
				return tl.PayMode(num)
			},
			orderPayType(num) {
				return tl.orderPayType(num)
			},
			bookKeepingType(num) {
				return tl.bookKeepingType(num)
			}
		},
		methods: {
			change(val){
				this.pageIndex = val;
				this.getList()
			},
			//获取列表
			getList() {
				var data = {
					PageIndex: this.pageIndex,
					PageSize: this.pageSize,
					OrderId: this.search.id,
					StartTime: "",
					EndTime: "",
					Key: this.search.key
				}
				if (this.search.time.length) {
					data.StartTime = this.search.time[0];
					data.EndTime = this.search.time[1];
				}
				this.loading = true
				orderFlow(data).then(res => {
					this.loading = false
					if (res.Code == 1) {
						this.info = {
							total: res.TotalCount,
							PayMoney: res.DataExpand.PayMoney ? res.DataExpand.PayMoney : 0,
							BackMoney: res.DataExpand.BackMoney? res.DataExpand.BackMoney : 0,
						}
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
		.money{
			color: @red;
		}
		.el-dropdown-link{
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
			.item {
				font-size: 14px;

				&.w1 {
					width: 250px;
				}

				&.w2 {
					width: 300px;
				}

				.item-in {
					padding: 10px 0;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;

					span {
						color: #606266;
						font-weight: bold;
					}
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
