<template>
	<div class="page bgf">
		<div class="user">
			<div class="w1200">
				<div class="userNav">
					<el-collapse v-model="activeName" accordion class="collapse">
						<el-collapse-item name="1">
							<template slot="title"><i class="iconfont icon-dingdanguanli"></i>订单管理</template>
							<router-link to="/user">综合订单查询</router-link>
					    </el-collapse-item>
						<el-collapse-item name="2">
							<template slot="title"><i class="iconfont icon-zhangdan"></i>协议账单</template>
							<router-link to="/user/protocolBill/flow">支出流水查询</router-link>
							<router-link to="/user/protocolBill/unsettle">未结算订单查询</router-link>
							<router-link to="/user/protocolBill/settle">已结算订单查询</router-link>
						</el-collapse-item>
						<!-- <el-collapse-item name="3">
							<template slot="title"><i class="iconfont icon-lvyoubaochedingdan"></i>包车对账</template>
							<router-link to="/user/busBill/index">包车对账列表</router-link>
							<router-link to="/user/busBill/unconfirm">订单待确认列表</router-link>
							<router-link to="/user/busBill/confirm">订单已确认列表</router-link>
						</el-collapse-item> -->
						<el-collapse-item name="4">
							<template slot="title"><i class="iconfont icon-fapiao"></i>发票管理</template>
							<router-link to="/user/invoiceMange/uninvoice">未开票订单</router-link>
							<router-link to="/user/invoiceMange/invoice">已开票订单</router-link>
							<router-link to="/user/invoiceMange/title">发票抬头信息</router-link>
						</el-collapse-item>
						<el-collapse-item name="5">
							<template slot="title"><i class="iconfont icon-qianyue"></i>签约管理</template>
							<router-link to="/user/signMangge/signList">签约列表</router-link>
						</el-collapse-item>
						<el-collapse-item name="6">
							<template slot="title"><i class="iconfont icon-gerenzhongxin"></i>个人中心</template>
							<router-link to="/user/userCenter/repair">修改密码</router-link>
						</el-collapse-item>
					</el-collapse>
				</div>
				<div class="main">
					<router-view/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		metaInfo: {
		    title: '个人中心', // set a title
		},
		data(){
			return{
				activeName: '1'
			}
		},
		created() {
			var route = this.$route.name;
			switch(route){
				case "user":
					this.activeName = "1";
					break;
				case "protocolBill":
					this.activeName = "2";
					break;
				case "busBill":
					this.activeName = "3";
					break;
				case "invoiceMange":
					this.activeName = "4";
					break;
				case "busBill":
					this.activeName = "1";
					break;
				case "signMangge":
					this.activeName = "5";
					break;
				case "userCenter":
					this.activeName = "6";
					break;
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';
	.user{
		padding: 15px 0;
		font-size: 0;
	}
	.main{
		display: inline-block;
		vertical-align: top;
		width: 980px;
		background: @cf;
		margin-left: 20px;
		font-size: 14px;
		box-shadow: @box;
		min-height: 600px;
	}
	.userNav{
		width: 200px;
		display: inline-block;		
		vertical-align: top;
	}
	.collapse{
		width: 200px;
		position: fixed;
		box-shadow: @box;
		.el-collapse{
			padding: 0;
			box-shadow: @box;
		}
		.el-collapse-item__header{
			font-size: 16px;
		}
		.iconfont{
			margin: 0 10px 0 15px;
		}
		.el-collapse-item__content{
			a{
				display: block;
				text-align: right;
				margin:0 20px;
				height: 40px;
				line-height: 40px;
				border-bottom: 1px dashed @cc;
				&:last-child{
					border: none;
				}
			}
		}
	}
</style>
