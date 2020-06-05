<template>
	<div class="order">
		<div class="title">综合订单查询</div>
		<el-form :inline="true" :model="search" class="demo-form-inline">
			<el-form-item label="订单编号">
				<el-input style="width: 180px;" v-model="search.user" placeholder="订单编号"></el-input>
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
			<div class="result">结果汇总：当前数据 <span class="res">{{info.total}}</span> 条，订单总金额 <span class="res">{{info.toatlMoney}}</span>
				元，下欠款总金额 <span class="res">{{info.betmoney}}</span>
				元</div>
			<el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
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
								<div class="item-in"><span>结算状态：</span><b class="orderStatus">{{scope.row.SettleType | settleType}}</b></div>
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
				<el-table-column align="center">
					<template slot-scope="scope">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link">操作</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item :command="beforeHandleCommand(scope.row,'b')" v-if="(scope.row.OrderStatus == 3 || scope.row.OrderStatus == 4) &&(scope.row.BalanceMoney > 0 && scope.row.BillType == 0) ">支付下欠款</el-dropdown-item>
								<el-dropdown-item :command="beforeHandleCommand(scope.row,'c')" v-if="scope.row.OrderStatus == 1 &&  scope.row.EarnestMoney > 0">支付定金</el-dropdown-item>
								<el-dropdown-item :command="beforeHandleCommand(scope.row,'d')" v-if="scope.row.OrderStatus == 1 || scope.row.OrderStatus == 2 || scope.row.OrderStatus == 6">取消订单</el-dropdown-item>
								<el-dropdown-item :command="beforeHandleCommand(scope.row,'a')" @click="handleEdit(scope.$index, scope.row)">查看详情</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<!-- <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
						<el-button size="mini" type="warning" plain @click="handleDelete(scope.$index, scope.row)" v-if="(scope.row.OrderStatus == 3 || scope.row.OrderStatus == 4) &&(scope.row.BalanceMoney > 0 && item.BillType == 0) ">支付下欠款</el-button>
						<el-button size="mini" type="warning" plain @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.OrderStatus == 1 &&  scope.row.EarnestMoney > 0">支付定金</el-button>
						<el-button size="mini" plain @click="cancelOrder(scope.row)" v-if="scope.row.OrderStatus == 1 || scope.row.OrderStatus == 2 || scope.row.OrderStatus == 6">取消订单</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-if="TotalCount > 8" :page-size="pageSize" @current-change="change" background layout="prev, pager, next" :total="TotalCount"></el-pagination>
		</div>

	</div>
</template>

<script>
	import {
		getAllOrderList,
		oneself,
		orderCancel
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
				pageSize:8,
				tableData: [],
				info: {
					total: 0,
					toatlMoney: 0,
					betmoney: 0
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
			orderStatus(num) {
				return tl.orderStatus(num)
			},
			settleType(num) {
				return tl.settleType(num)
			}
		},
		methods: {
			beforeHandleCommand(row,command){
				return {
					'row': row,
					'command':command
				}
			},
			handleCommand(command) {
				switch (command.command) {
					case "a"://查看详情
						this.handleEdit(command.row);
						break;
					case "b"://支付下欠款
						this.payDep(command.row,2);
						break;
					case "c"://支付定金
						this.payDep(command.row,1);
						break;
					case "d"://取消订单
						this.cancelOrder(command.row);
						break;
				}
			},
			handleEdit(row) {
				var id = row.ID;
				let routeUrl = this.$router.resolve({
				         path:'/user/detail?id='+id,
				      });
				window.open(routeUrl.href, '_blank');
				
			},
			payDep(row,num){
				var money = num == 1 ? row.EarnestMoney : row.BalanceMoney;
				var carInfo = {
					startTime: row.StartTime,
					money: money,
					startAddress: row.StartPositionAddress,
					endAddress: row.EndPostionAddress
				}
				localStorage.setItem("LddPayInfo", JSON.stringify(carInfo))
				this.$router.push({
					path: 'pay?id=' + encodeURIComponent(row.IdName)+"&m="+money+"&bt="+row.BusinessType+"&ot="+num
				})
			},
			cancelOrder(item) {
				this.$confirm('您确定要取消该订单吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var onselfData = {orderId: item.ID};
					var data = {Id: item.ID,Remark: null};
					const loading = this.$loading({
						lock: true,
						text: '正在取消订单，请稍等...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					oneself(onselfData).then(res => {
						if (res.Code == 1) {
							orderCancel(data).then(re => {
								loading.close();
								if (re.Code == 1) {
									item.OrderStatus = 5;
								} else {
									tl.toast(res.Msg)
								}
							})
						} else {
							loading.close();
							tl.toast(res.Msg)
						}
					})
				}).catch(r =>{})
			},
			change(val){
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
				this.loading = true
				getAllOrderList(data).then(res => {
					this.loading = false
					if (res.Code == 1) {
						this.info = {
							total: res.TotalCount,
							toatlMoney: res.DataExpand.TotalMoney,
							betmoney: res.DataExpand.DebtMoney,
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

	// .el-table, .el-table__expanded-cell{
	// 	background-color: #f2f3f5!important;
	// }
</style>
