<template>
	<div class="page bgf">
		<div class="invoiceDetail w1200" v-loading="loading">
			<div class="invioce">
				<div class="title">发票信息</div>
				<div class="invioceMain">
					<div class="flex flex-wrap invioceMainTop">
						<div>发票状态：{{info.InvoiceStatusName}}</div>
						<div>申请时间：{{info.ApplyTime | time}}</div>
						<div>发票编号：{{info.InvoiceCode}}</div>
						<div>订单编号：{{info.CharterOrderIdList}}<span class="see" @click="go(info.CharterOrderIdList)">（查看订单）</span></div>
						<div>订单金额：{{info.OrderTotalMoney}} 元</div>
						<div>开票金额：{{info.InvoiceMoney}} 元</div>
					</div>
					<div class="flex invioceMainItem">
						<div class="laber">联系人：</div>
						<div>{{ info.NickName || '---' }}</div>
					</div>
					<div class="flex invioceMainItem">
						<div class="laber">联系电话：</div>
						<div>{{ info.Phone || '---' }}</div>
					</div>
					<div class="flex invioceMainItem">
						<div class="laber">邮寄地址：</div>
						<div>{{ info.PostAddress || '---' }}</div>
					</div>
					<div class="flex invioceMainItem">
						<div class="laber">开具类型：</div>
						<div>{{ info.Phone }}</div>
					</div>
					<div class="flex invioceMainItem">
						<div class="laber">发票类型：</div>
						<div>{{ info.InvoiceTypeName }}</div>
					</div>
					<template v-if="info.InvoiceUserType == 1">
						<div class="flex invioceMainItem">
							<div class="laber">发票抬头：</div>
							<div>{{ info.InvoiceUserTypeName || '---' }}</div>
						</div>
					</template>
					<template v-else>
						<div class="flex invioceMainItem">
							<div class="laber">发票抬头：</div>
							<div>{{ info.CompanyName || '---' }}</div>
						</div>
						<div class="flex invioceMainItem">
							<div class="laber">税务登记证号：</div>
							<div>{{ info.TaxRegCode || '---' }}</div>
						</div>
						<div class="flex invioceMainItem">
							<div class="laber">开户行：</div>
							<div>{{ info.AccountBankName || '---' }}</div>
						</div>
						<div class="flex invioceMainItem">
							<div class="laber">开户账号：</div>
							<div>{{ info.AccountNo || '---' }}</div>
						</div>
						<div class="flex invioceMainItem">
							<div class="laber">经营地址：</div>
							<div>{{ info.Address || '---' }}</div>
						</div>
						<div class="flex invioceMainItem">
							<div class="laber">公司电话：</div>
							<div>{{ info.CompanyTel || '---' }}</div>
						</div>
					</template>
					<div class="flex invioceMainItem">
						<div class="laber">开票时间：</div>
						<div>{{ info.InvoicedTime }}</div>
					</div>
					<div class="flex invioceMainItem" v-if="info.InvoiceUserType == 2">
						<div class="laber">发票图片：</div>
						<div><el-image :preview-src-list="[info.InvoicedImg]" style="width: 100px; height: 100px" :src="info.InvoicedImg" :fit="cover"></el-image></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import {
		getInvoicedInfoDetail
	} from '../../../assets/js/api.js';
	import tl from '../../../assets/tl.js';
	export default {
		data() {
			return {
				info:{},
				id:"",
				loading:true
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.getDetail();
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
			go(id){
				let routeUrl = this.$router.resolve({
				         path:'/user/detail?id='+id,
				      });
				window.open(routeUrl.href, '_blank');
			},
			getDetail(){
				var data = {
					id:this.id
				}
				getInvoicedInfoDetail(data).then(res => {
					this.loading = false;
					if(res.Code == 1){
						this.info = res.Data
					}else{
						tl.toast(res.Msg)
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../../assets/less/common.less';
	.invoiceDetail{
		padding: 15px 0;
		.invioce{
			background: @cf;
			min-height: 580px;
			box-shadow: @box;
		}
		.invioceMain{
			padding: 0 20px;
			font-size: 16px;
			color: @c3;
		}
		.invioceMainTop{
			border-bottom: 1px dashed @c9;
			padding: 15px 0;
			div{
				width: 33.33%;
				height: 30px;
				line-height: 30px;
			}
			.see{
				color: @def;
				cursor: pointer;
			}
		}
		.invioceMainItem{
			padding: 10px 0;
		}
	}
	.el-button {
		margin: 3px 0;
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
</style>
