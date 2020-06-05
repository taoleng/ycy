<template>
	<div class="order">
		<div class="title">签约列表</div>
		<el-form :inline="true" :model="search" class="demo-form-inline">
			<el-form-item label="关键字">
				<el-input style="width: 350px;" v-model="search.key" placeholder="客企名\员工名称\行程"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="loading" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="orderTable" v-loading="loading" style="margin-top: 10px;">
			<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column label="客运公司名称" width="180" align="center" tooltip-effect="dark">
					<template slot-scope="scope">
						<div class="oneline" :title="scope.row.EnterpriseName">{{scope.row.EnterpriseName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="挂账类型" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.BillTypeName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="挂账天数" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.BillDay}}</div>
					</template>
				</el-table-column>
				<el-table-column label="挂账最迟天数" width="140" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.BillLastDay}}</div>
					</template>
				</el-table-column>
				<el-table-column label="挂账额度" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.BillLimit}}</div>
					</template>
				</el-table-column>
				<el-table-column label="折扣比例(%)" width="110" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.DiscountRatio}}</div>
					</template>
				</el-table-column>
				<el-table-column label="预付比例(%)" width="110" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.PaymentRatio}}</div>
					</template>
				</el-table-column>
				<el-table-column label="签约状态" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.SignatureStatusName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="签约时间" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.InsertTime | time}}</div>
					</template>
				</el-table-column>
				<!-- <el-table-column label="签约时间" width="90" align="center">
					<template slot-scope="scope">
						<div class="orderStatus" style="cursor: pointer;">查看子账户</div>
					</template>
				</el-table-column> -->
			</el-table>
			<el-pagination v-if="TotalCount > pageSize" :page-size="pageSize" @current-change="change" background layout="prev, pager, next" :total="TotalCount"></el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		signatureList
	} from '../../../assets/js/api.js';
	import tl from '../../../assets/tl.js';
	export default {
		data() {
			return {
				search: {
					value: "",
					time: [],
					key: ""
				},
				TotalCount:0,
				pageIndex: 1,
				pageSize: 8,
				tableData: [],
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
					searchKey: this.search.key,
				}
				this.loading = true;
				signatureList(data).then(res => {
					this.loading = false;
					console.log(res);
					if (res.Code == 1) {
						this.tableData = res.Data;
						this.TotalCount = res.count
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
	.dialogBtm{
		height: 48px;
		line-height: 48px;
		margin: 0 10px;
		font-size: 16px;
		padding-top: 10px;
		color: @c3;
		span{
			color: @red;
		}
	}
	.order {
		.orderStatus {
			color: #E6A23C;
		}
		.oneline{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
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
