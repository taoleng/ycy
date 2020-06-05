<template>
	<div class="order">
		<div class="title">订单待确认列表</div>
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
			<div class="result"><span class="res"> 行程完工后，五个工作日内请完成确认，若未及时确认，视为已确认</span></div>
			<el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column type="expand" width="30">
					<template slot-scope="scope">
						<el-form label-position="left" class="demo-table-expand flex flex-wrap">
							<div class="item w1">
								<div class="item-in"><span>包租车：</span>{{scope.row.TravelTypeName}} {{scope.row.TravelFormTypeName}}</div>
								<div class="item-in"><span>员工：</span>{{scope.row.MemUserName}}</div>
							</div>
							<div class="item w2">
								<div class="item-in"><span>出发时间：</span>{{scope.row.StartTime | time}}</div>
								<div class="item-in"><span>达到时间：</span>{{scope.row.EndTime | time}}</div>
							</div>
							<div class="item flex-1">
								<div class="item-in"><span>已付款：</span><b class="orderStatus">{{scope.row.PayMoney}}</b> 元</div>
								<div class="item-in"><span>下欠款：</span><b class="orderStatus">{{scope.row.DebtMoney}}</b> 元</div>
							</div>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="订单号" width="200" align="center" tooltip-effect="dark">
					<template slot-scope="scope">
						<router-link :to="'/user/detail?id='+scope.row.CharterOrderId" target="_blank">{{scope.row.CharterOrderId}}</router-link>
					</template>
				</el-table-column>
				<el-table-column label="车辆信息" width="90" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.CarNo}}</div>
					</template>
				</el-table-column>
				<el-table-column label="行程信息" width="150" align="center">
					<template slot-scope="scope">
						<div class="oneline" :title="scope.row.StartPositionCityName + '→' + scope.row.EndPostionCityName">{{scope.row.StartPositionCityName}}
							→ {{scope.row.EndPostionCityName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="订单金额" width="90" align="center">
					<template slot-scope="scope">
						<div class="orderStatus">{{scope.row.TotalMoney}} 元</div>
					</template>
				</el-table-column>
				<el-table-column label="对账信息" width="160" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.ReconciliationDetails">
							<div class="flex"><span style="width: 80px;">确认金额:</span><span class="flex-1 oneline">{{scope.row.ReconciliationDetails.UserMoney}} 元</span></div>
							<div class="flex"><span style="width: 80px;">对账差额:</span><span class="flex-1 oneline">{{scope.row.ReconciliationDetails.Difference}} 元</span></div>
						</div>
						<div v-else>
							-
						</div>
					</template>
				</el-table-column>
				<el-table-column label="退回原因" width="140" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.ReconciliationDetails">
							<div>{{scope.row.ReconciliationDetails.Reason}}</div>
						</div>
						<div v-else>
							-
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" width="80" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" v-if="!!scope.row.DispatcherConfirmation" @click="cureSubmit(scope.row.ID,scope.row.DebtMoney,scope.$index)">确认</el-button>
						<el-button size="mini" type="info" plain disabled v-else>确认</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-if="TotalCount > 8" :page-size="pageSize" @current-change="change" background layout="prev, pager, next"
			 :total="TotalCount"></el-pagination>
		</div>
		<el-dialog title="订单金额确认" :visible.sync="dialogFormVisible">
		  <el-form :model="order">
			<el-form-item label="下欠金额" :label-width="formLabelWidth">
			  <el-input v-model="order.betMoney" disabled></el-input>
			</el-form-item>
			<el-form-item label="确认金额" :label-width="formLabelWidth">
			  <el-input v-model="order.crueMoney" placeholder="请填写确认金额"></el-input>
			</el-form-item>
			<el-form-item label="差额备注" :label-width="formLabelWidth" style="margin-bottom: 0;">
			  <el-input v-model="order.remark" type="textarea" placeholder="请填写差额备注"></el-input>
			</el-form-item>
			<el-form-item :label-width="formLabelWidth"><span style="color: #e5004f;">如无订单差额，则无需添加差额备注。</span></el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			  <el-button type="primary" @click="orderSubmit" v-loading="submitFlag">确 定</el-button>
			  <el-button @click="dialogFormVisible = false">取 消</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		unconfirmedOrderList,
		addConfirmedInfo
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
				dialogFormVisible:false,
				loading: true,
				submitFlag:false,
				order:{
					id:"",
					betMoney:"",
					crueMoney:"",
					remark:""
				},
				formLabelWidth: '120px'
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
			orderSubmit(){
				var self = this.order;
				var data = {
					OrderId: self.id,
					UserMoney: self.crueMoney,
					Remark: self.remark
				}
				if(!self.crueMoney){
					tl.toast({
						type:"info",
						message:"请填写确认金额"
					})
					return
				}
				if(data.UserMoney != self.betMoney && self.remark == ''){
					tl.toast({
						type:"info",
						message:"下欠金额与确认金额存在差异，必须输入差额备注"
					})
					return
				}
				this.submitFlag = true;
				addConfirmedInfo(data).then(res => {
					this.submitFlag = false;
					if(res.Code == 1){
						tl.toast({
							type:'success',
							message:'操作成功'
						})
						this.dialogFormVisible = !this.dialogFormVisible;
						this.tableData[self.index].DispatcherConfirmation = false;
					}else{
						tl.toast(red.Msg)
					}
				})
			},
			cureSubmit(id,money,index){
				this.order.betMoney = money;
				this.order.crueMoney = money;
				this.order.id = id;
				this.order.index = index;
				this.dialogFormVisible = !this.dialogFormVisible;
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
					ID: this.search.id,
					InsertStartTime: "",
					InsertEndTime: "",
					Key: this.search.key
				}
				if (this.search.time.length) {
					data.InsertStartTime = this.search.time[0];
					data.InsertEndTime = this.search.time[1];
				}
				this.loading = true
				unconfirmedOrderList(data).then(res => {
					this.loading = false
					if (res.Code == 1) {
						console.log(res);
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
