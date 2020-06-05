<template>
	<div class="order">
		<div class="title">已结算订单查询</div>
		<el-form :inline="true" :model="search" class="demo-form-inline">
			<el-form-item label="订单时间">
				<el-date-picker style="width: 250px;" v-model="search.time" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
				 start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
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
			<el-form-item label="关键字">
				<el-input style="width: 170px;" v-model="search.key" placeholder="客企名\员工名称\行程"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="loading" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="orderTable" v-loading="loading">
			<div class="result flex flex-pack-justify">
				<div>结果汇总：未开票 <span class="red">{{info.total}}</span> 条，金额 <span class="red"> {{info.TotalMoney}}</span> 元，已选择<span class="red"> {{info.num}}</span> 条，金额 <span class="red">{{info.DebtMoney}}</span> 元</div>
				<div>
					<el-button type="warning" plain @click="open">申请开票</el-button>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column type="selection" width="45"></el-table-column>
				<el-table-column label="订单号" width="180" align="center" tooltip-effect="dark">
					<template slot-scope="scope">
						<div>{{scope.row.ID}}</div>
					</template>
				</el-table-column>
				<el-table-column label="行程" width="140" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.StartPositionCityName}} → {{scope.row.EndPostionCityName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="客运企业" width="165" align="center">
					<template slot-scope="scope">
						<div class="oneline" :title="scope.row.EnterpriseName">{{scope.row.EnterpriseName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="发票状态	" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.InvoiceStatusName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="订单金额" width="90" align="center">
					<template slot-scope="scope">
						<div class="orderStatus">{{scope.row.TotalMoney - scope.row.RefundMoney}} 元</div>
					</template>
				</el-table-column>
				<el-table-column label="订单时间" width="150" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.InsertTime | time}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="90" align="center">
					<template slot-scope="scope">
						<div @click="go(scope.row)" class="orderStatus" style="cursor: pointer;">订单详情</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-if="TotalCount > pageSize" :page-size="pageSize" @current-change="change" background layout="prev, pager, next" :total="TotalCount"></el-pagination>
		</div>
		<el-dialog title="申请发票" :visible.sync="dialogFlag">
			<el-table max-height="350" :data="idList" style="width: 100%" tooltip-effect="dark" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column label="订单编号" align="center" tooltip-effect="dark">
					<template slot-scope="scope">
						<div>{{scope.row.ID}}</div>
					</template>
				</el-table-column>
				<el-table-column label="订单金额(元)"  align="center">
					<template slot-scope="scope">
						<div class="orderStatus">{{scope.row.TotalMoney - scope.row.RefundMoney}}</div>
					</template>
				</el-table-column>
				<el-table-column label="订单完成时间" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.InsertTime | time}}</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="flex flex-pack-justify dialogBtm">
				<div>合计数据：<span>{{idList.length}}条</span></div>
				<div>订单总额：<span>{{info.DebtMoney}}元</span></div>
				<div style="text-align: center;">
					<el-button type="warning" @click="sqfp">申请发票</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getInvoicedOrderList,getInvoiceBaseList,orderInvoicing
	} from '../../../assets/js/api.js';
	import tl from '../../../assets/tl.js';
	export default {
		data() {
			return {
				dialogFlag:false,
				options: [
					{
					    value: '',
					    label: '请选择'
					}, 
					{
				        value: '0',
				        label: '未申请'
					}, 
					{
						value: '1',
						label: '已申请'
					}],
				value: '',
				search: {
					value: "",
					time: [],
					key: ""
				},
				userStorage:{},
				pageIndex: 1,
				TotalCount: 0,
				pageSize: 8,
				tableData: [],
				info: {
					total: 0,
					TotalMoney: 0,
					DebtMoney: 0,
					num:0,
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
			go(row){
				var id = row.ID;
				let routeUrl = this.$router.resolve({
				         path:'/user/detail?id='+id,
				      });
				window.open(routeUrl.href, '_blank');
			},
			sqfp(){
				var user = JSON.parse(localStorage.getItem("LddUserInfo"));
				var CharterOrderIdList=[];
				this.idList.forEach(item =>{
					CharterOrderIdList.push(item.ID)
				})
				var data = {
					CharterOrderIdList:CharterOrderIdList.join(","),
					MemUserID:this.userStorage.ID,
					NickName:this.userStorage.NickName,
					InvoicedMan:this.userStorage.NickName,
					Contect:user.Name,
					Phone:user.Mobile,
					InvoiceUserType:this.userStorage.InvoiceUserType,
				}
				orderInvoicing(data).then(res => {
					if(res.Code == 1){
						tl.toast({
							type:'success',
							message:'申请成功'
						});
						this.idList.forEach(item =>{
							item.InvoiceStatusName = "已申请";
						})
						this.dialogFlag = false;
					}else{
						tl.toast(res.Msg)
					}
				})
			},
			open(){
				if(!this.idList.length){
					tl.toast("请选择操作的订单号");
					return
				}
				var first = this.idList[0];
				var firstFlag = false;
				for (var i = 0;i<this.idList.length;i++) {
					var item = this.idList[i];
					if(item.F_company != first.F_company){
						tl.toast("多笔订单必须同一家客运企业！");
						firstFlag = true;
						break
					}
					if(item.InvoiceStatusName == '已申请'){
						tl.toast("订单号:"+item.ID+"已申请,不能重复操作。");
						firstFlag = true;
						break
					}
				}
				if(firstFlag){
					return
				}
				this.dialogFlag = true;
				var data = {
					invoiceUserType:1
				}
				getInvoiceBaseList(data).then(res =>{
					if(res.Code == 1 && res.Data.length){
						this.userStorage = res.Data[0];
						console.log(this.userStorage);
					}else{
						tl.toast({
							type:'info',
							message:'请到发票管理 → 发票抬头信息 →新增发票抬头信息!'
						})
					}
				})
				
			},
			handleSelectionChange(e){
				var money = 0;
				var list = [];
				e.forEach(item =>{
					money+=(item.TotalMoney - item.RefundMoney);
					list.push(item)
				})
				this.info.DebtMoney = money;
				this.info.num = list.length;
				this.idList = list;
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
					StartTime: "",
					EndTime: "",
					Key: this.search.key,
					InvoiceStatus:this.search.value
				}
				if (this.search.time.length) {
					data.StartTime = this.search.time[0];
					data.EndTime = this.search.time[1];
				}
				this.loading = true;

				getInvoicedOrderList(data).then(res => {
					this.loading = false;
					console.log(res);
					if (res.Code == 1) {
						this.info.total = res.DataExpand.Count;
						this.info.TotalMoney = res.DataExpand.TotalMoney ? res.DataExpand.TotalMoney : 0;
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
