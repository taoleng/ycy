<template>
	<div class="order">
		<div class="title">已开票订单</div>
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
				<el-input style="width: 170px;" v-model="search.key" placeholder="客企名"></el-input>
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
				<el-table-column label="订单号" width="190" align="center" tooltip-effect="dark">
					<template slot-scope="scope">
						<div>{{scope.row.CharterOrderIdList}}</div>
					</template>
				</el-table-column>
				<el-table-column label="开具类型" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.InvoiceUserTypeName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="发票类型" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.InvoiceTypeName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="开票金额" width="95" align="center">
					<template slot-scope="scope">
						<div class="orderStatus">{{scope.row.InvoiceMoney}} 元</div>
					</template>
				</el-table-column>
				<el-table-column label="申请时间" width="150" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.InvoicedTime | time}}</div>
					</template>
				</el-table-column>
				<el-table-column label="客运企业" width="150" align="center">
					<template slot-scope="scope">
						<div class="oneline" :title="scope.row.EnterpriseName">{{scope.row.EnterpriseName ? scope.row.EnterpriseName : '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="发票状态" width="80" align="center">
					<template slot-scope="scope">
						<div class="orderStatus">{{scope.row.InvoiceStatusName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="110" align="center">
					<template slot-scope="scope">
						<div class="orderStatus cur" @click="goDetail(scope.row.ID)">查看发票</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-if="TotalCount > pageSize" :page-size="pageSize" @current-change="change" background layout="prev, pager, next" :total="TotalCount"></el-pagination>
		</div>

	</div>
</template>

<script>
	import {
		getInvoicedDetailInfoList
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
				pageSize: 8,
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
			}
		},
		methods: {
			goDetail(id){
				let routeUrl = this.$router.resolve({
				         path:'/user/invoiceDetail?id='+id,
				      });
				window.open(routeUrl.href, '_blank');
			},
			change(val) {
				this.pageIndex = val;
				this.getList()
			},
			//获取列表
			getList() {
				var data = {
					PageIndex: this.pageIndex,
					PageSize: this.pageSize,
					CharterOrderId: this.search.id,
					InsertTimeStart: "",
					InsertTimeEnd: "",
					EnterpriseName: this.search.key
				}
				if (this.search.time.length) {
					data.InsertTimeStart = this.search.time[0];
					data.InsertTimeEnd = this.search.time[1];
				}
				this.loading = true;

				getInvoicedDetailInfoList(data).then(res => {
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
		.cur{
			cursor: pointer;
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
