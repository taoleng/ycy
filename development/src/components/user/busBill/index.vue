<template>
	<div class="order">
		<div class="title">包车对账列表</div>
		<el-form :inline="true" :model="search" class="demo-form-inline" style="border-bottom: 0;">
			<el-form-item label="客企名称">
				<el-input style="width: 180px;" v-model="search.id" placeholder="客企名称查询"></el-input>
			</el-form-item>
			<el-form-item label="发票状态">
				<el-select v-model="search.value" placeholder="请选择" style="width: 180px;">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="loading" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="orderTable" v-loading="loading">
			<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column label="对账批次号" width="120" align="center" tooltip-effect="dark">
					<template slot-scope="scope">
						<div>{{scope.row.BatchId}}</div>
					</template>
				</el-table-column>
				<el-table-column label="客企名称" width="160" align="center">
					<template slot-scope="scope">
						<div class="oneline" :title="scope.row.EnterpriseName">{{scope.row.EnterpriseName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="联系人" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.EnterpriseOperator}}</div>
					</template>
				</el-table-column>
				<el-table-column label="联系电话" width="120" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.EnterprisePhone}}</div>
					</template>
				</el-table-column>
				<el-table-column label="对账状态" width="90" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.ReconciliationStatus | status}}</div>
					</template>
				</el-table-column>
				<el-table-column label="发起时间" width="140" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.BatchStartTime | time}}</div>
					</template>
				</el-table-column>
				<el-table-column label="对账时间段" width="140" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.StartTime  | time}} -</div>
						<div>{{scope.row.EndTime  | time}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="90" align="center">
					<template slot-scope="scope">
						<div style="color: #409EFF;" @click="goDetail(scope.row.ID)">对账详细</div>
						<div style="opacity: 0;">-</div>
						<div style="color: #67c23a;" @click="goDetail(scope.row.ID)">对账差额</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-if="TotalCount > pageSize" :page-size="pageSize" @current-change="change" background layout="prev, pager, next" :total="TotalCount"></el-pagination>
		</div>

	</div>
</template>

<script>
	import {
		getReconciliationBatch
	} from '../../../assets/js/api.js';
	import tl from '../../../assets/tl.js';
	export default {
		data() {
			return {
				search: {
					id: "",
					value: ""
				},
				pageIndex: 1,
				TotalCount: 0,
				pageSize: 5,
				tableData: [],
				options: [
					{
					    value: '',
					    label: '请选择'
					}, 
					{
				        value: '0',
				        label: '待确认'
					}, 
					{
						value: '1',
						label: '已确认'
				}],
				loading: true
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
			status(num){
				return num == 0 ? '对帐中' : (num == 1 ? '客户已对账' : '客企已对账')
			}
		},
		methods: {
			goDetail(id){
				alert('敬请期待')
				return
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
					EnterpriseName: this.search.id,
					Status: this.search.value
				}
				
				this.loading = true;
				getReconciliationBatch(data).then(res => {
					this.loading = false;
					if(res.Code == 1){
						this.tableData = res.Data;
						this.TotalCount = res.TotalCount;
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
