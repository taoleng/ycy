<template>
	<div class="order">
		<div class="title">发票抬头管理</div>
		<div style="margin: 10px 20px;">
			<el-button type="warning" @click="add">新增发票抬头</el-button>
		</div>
		<div class="orderTable" v-loading="loading">
			<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column label="联系人" width="100" align="center" tooltip-effect="dark">
					<template slot-scope="scope">
						<div>{{scope.row.NickName || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="联系电话" width="80" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.Mobile || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="单位名称" width="100" align="center">
					<template slot-scope="scope">
						<div class="oneline" :title="scope.row.CompanyName">{{scope.row.CompanyName || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="发票类型" width="80" align="center">
					<template slot-scope="scope">
						<div class="orderStatus">{{scope.row.InvoiceUserTypeName || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="纳税人识别号" width="150" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.IinvoiceUserCode || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="开户行" width="80" align="center">
					<template slot-scope="scope">
						<div class="oneline" :title="scope.row.AccountBankName">{{scope.row.AccountBankName || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="开户账号" width="150" align="center">
					<template slot-scope="scope">
						<div class="orderStatus">{{scope.row.AccountNo || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="公司电话" width="120" align="center">
					<template slot-scope="scope">
						<div class="orderStatus cur">{{scope.row.CompanyTel || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="80" align="center">
					<template slot-scope="scope">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link">操作</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item :command="beforeHandleCommand(scope.row,'a',scope.$index)" @click="handleEdit(scope.$index, scope.row)">编辑</el-dropdown-item>
								<el-dropdown-item :command="beforeHandleCommand(scope.row,'b',scope.$index)" @click="handleRemove(scope.$index, scope.row)">删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-if="TotalCount > pageSize" :page-size="pageSize" @current-change="change" background layout="prev, pager, next"
			 :total="TotalCount"></el-pagination>
		</div>
		<div class="v-modal" style="z-index: 99;" v-if="dialogFlag"></div>
		<div class="el-dialog__wrapper" v-if="dialogFlag" style="z-index: 100;">
			<div class="el-dialog" style="margin-top: 15vh;">
				<div class="el-dialog__header">
					<span class="el-dialog__title">申请发票</span>
					<button type="button" class="el-dialog__headerbtn">
						<i class="el-dialog__close el-icon el-icon-close" @click="dialogFlag=false"></i>
					</button>
				</div>
				<el-form class="demo-form-inline" label-width="80px">
					<div class="flex demoItem">
						<el-form-item label="开具类型" class="flex-1" v-if="userInfo.UserType == 0">
							<el-select v-model="formInline.InvoiceUserType" placeholder="请选择开具类型">
								<el-option label="个人" value="个人"></el-option>
								<el-option label="企业" value="企业"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="发票类型" class="flex-1" v-if="userInfo.UserType == 1">
							<el-select v-model="formInline.InvoiceType" placeholder="请选择发票类型">
								<el-option label="普票" value="普票"></el-option>
								<el-option label="专票" value="专票"></el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="flex demoItem">
						<el-form-item label="联系人" class="flex-1">
							<el-input v-model="formInline.NickName" placeholder="请输入联系人"></el-input>
						</el-form-item>
						<el-form-item label="联系电话" class="flex-1">
							<el-input v-model="formInline.Mobile" placeholder="请输入联系电话"></el-input>
						</el-form-item>
					</div>
					<div class="flex demoItem" v-if="userInfo.UserType == 1">
						<el-form-item label="企业名称" class="flex-1">
							<el-input v-model="formInline.CompanyName" placeholder="请输入企业名称"></el-input>
						</el-form-item>
						<el-form-item label="纳税号" class="flex-1">
							<el-input v-model="formInline.IinvoiceUserCode" placeholder="请输入纳税人识别号"></el-input>
						</el-form-item>
					</div>
					<div class="flex demoItem" v-if="userInfo.UserType == 1">
						<el-form-item label="开户银行" class="flex-1">
							<el-input v-model="formInline.AccountBankName" placeholder="请输入开户银行"></el-input>
						</el-form-item>
						<el-form-item label="开户账号" class="flex-1">
							<el-input v-model="formInline.AccountNo" placeholder="请输入开户账号"></el-input>
						</el-form-item>
					</div>
					<div class="flex demoItem" v-if="userInfo.UserType == 1">
						<el-form-item label="注册地址" class="flex-1">
							<tl-map title="请输入注册地址" :strValue="formInline.Address" @getAddress="sAddress"></tl-map>
						</el-form-item>
						<el-form-item label="注册电话" class="flex-1">
							<el-input v-model="formInline.CompanyTel" placeholder="请输入注册电话"></el-input>
						</el-form-item>
					</div>
					<div class="flex demoItem">
						<el-form-item label="收票地址" class="flex-1">
							<tl-map title="请输入收票地址" :strValue="formInline.ReceivingAddress" @getAddress="eAddress"></tl-map>
						</el-form-item>
					</div>
					<div style="text-align: center;">
						<el-button type="warning" style="width: 150px;" @click="save">保存</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getInvoiceBaseList,
		saveOperateInvoiceBase,
		delOperateInvoiceBase
	} from '../../../assets/js/api.js';
	import tl from '../../../assets/tl.js';
	import tlMap from '../../../common/map/map.vue';
	export default {
		components: {
			tlMap
		},
		data() {
			return {
				pageIndex: 1,
				TotalCount: 0,
				pageSize: 8,
				tableData: [],
				loading: true,
				dialogFlag: false,
				formInline: {
					CompanyName: "", //企业名称
					IinvoiceUserCode: "", //纳税人识别号
					AccountBankName: "", //开户行
					AccountNo: "", //开户账号
					Province: "", //注册场所地址
					City: "", //
					Address: "", //
					CompanyTel: "", //固定电话
					NickName: "", //联系人
					Mobile: "", //联系电话
					InvoiceUserType: "", //开具类别 1个人还是2企业
					InvoiceType: "", //发票类别 1普票还是2专票
					ReceivingProvince: "", //
					ReceivingCity: "", //
					ReceivingAddress: "", //
					ID: "" //编辑传值
				},
				userInfo: {}
			}
		},
		created() {
			this.getList();
			this.userInfo = JSON.parse(localStorage.getItem("LddUserInfo"));
			// UserType 1 企业 0 个人
			this.formInline.InvoiceUserType = this.userInfo.UserType == 0 ? '个人' : '企业';
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
			save() {
				var data = this.formInline;
				const loading = this.$loading({
					lock: true,
					text: '正在取消订单，请稍等...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				saveOperateInvoiceBase(data).then(res =>{
					this.dialogFlag = false;
					loading.close();
					if(res.Code == 1){
						tl.toast({
							type:'success',
							message:'操作成功'
						})
						window.location.reload()
					}else{
						tl.toast(res.Msg);
					}
				})
				
				console.log(this.formInline);
				
			},
			add() {
				this.dialogFlag = true;
				this.formInline.CompanyName = "";
				this.formInline.IinvoiceUserCode = "";
				this.formInline.AccountBankName = "";
				this.formInline.AccountNo = "";
				this.formInline.Province = "";
				this.formInline.City = "";
				this.formInline.Address = "";
				this.formInline.CompanyTel = "";
				this.formInline.NickName = this.userInfo.Name;
				this.formInline.Mobile = this.userInfo.Mobile;
				this.formInline.InvoiceUserType = this.userInfo.UserType == 0 ? '个人' : '企业';
				this.formInline.InvoiceType = "";
				this.formInline.ReceivingProvince = "";
				this.formInline.ReceivingCity = "";
				this.formInline.ReceivingAddress = "";
				this.formInline.ID = "";
			},
			sAddress(data) {
				this.formInline.Province = data.province;
				this.formInline.City = data.city;
				this.formInline.Address = data.address;
			},
			eAddress(data) {
				this.formInline.ReceivingProvince = data.province;
				this.formInline.ReceivingCity = data.city;
				this.formInline.ReceivingAddress = data.address;
			},
			beforeHandleCommand(row, command,index) {
				return {
					'row': row,
					'command': command,
					'index':index
				}
			},
			handleCommand(command,row) {
				switch (command.command) {
					case "a": //查看详情
						this.handleEdit(command.row);
						break;
					case "b": //支付下欠款
						this.handleRemove(command.row, command.index);
						break;
				}
			},
			handleEdit(row) {
				this.dialogFlag = true;
				this.formInline = {
					CompanyName: row.CompanyName, //企业名称
					IinvoiceUserCode: row.IinvoiceUserCode, //纳税人识别号
					AccountBankName: row.AccountBankName, //开户行
					AccountNo: row.AccountNo, //开户账号
					Province: row.Province, //注册场所地址
					City: row.City, //
					Address: row.Address, //
					CompanyTel: row.CompanyTel, //固定电话
					NickName: row.NickName, //联系人
					Mobile: row.Mobile, //联系电话
					InvoiceUserType: row.InvoiceUserType == 1 ? '个人' : '企业', //开具类别 1个人还是2企业
					InvoiceType: row.InvoiceType == 1 ? '普票' : '专票', //发票类别 1普票还是2专票
					ReceivingProvince: row.ReceivingProvince, //
					ReceivingCity: row.ReceivingCity, //
					ReceivingAddress: row.ReceivingAddress, //
					ID: row.ID //编辑传值
				}
			},
			handleRemove(item,index) {
				console.log(index);
				this.$confirm('您确定删除此条信息吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var onselfData = {
						ID: item.ID
					};
					const loading = this.$loading({
						lock: true,
						text: '正在删除，请稍等...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					delOperateInvoiceBase(onselfData).then(res => {
						loading.close();
						if (res.Code == 1) {
							this.tableData.splice(index,1)
						} else {
							tl.toast(res.Msg)
						}
					})
				}).catch(r => {})
			},
			//获取列表
			getList() {
				this.loading = true;
				getInvoiceBaseList().then(res => {
					this.loading = false;
					if (res.Code == 1) {
						this.tableData = res.Data;
					}
				})
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

		.cur {
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

		.demoItem {
			margin-bottom: 15px;
		}

		.el-form-item {
			margin-bottom: 0;
		}
	}
</style>
