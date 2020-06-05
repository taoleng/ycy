<template>
	<div class="order">
		<div class="title">修改密码</div>
		<div class="orderRepair">
			<el-form label-position="right" label-width="80px">
				<el-form-item label="用户账号">
					<el-input v-model="iphone" readonly></el-input>
				</el-form-item>
				<el-form-item label="原始密码">
					<el-input v-model="oldpwd" placeholder="请输入原始密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input v-model="newpwd" placeholder="请输入新密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码">
					<el-input v-model="curepwd" placeholder="请确认密码" show-password></el-input>
				</el-form-item>
			</el-form>
			<el-button type="warning" :loading="btnLoading" plain @click="submit">确认修改</el-button>
		</div>

	</div>
</template>

<script>
	import tl from '../../../assets/tl.js';
	import {updateUserPassWord} from '../../../assets/js/api.js';
	export default {
		data() {
			return {
				iphone: "",
				oldpwd: "",
				newpwd: "",
				curepwd: "",
				btnLoading: false
			}
		},
		created(){
			var userInfo = JSON.parse(localStorage.getItem('LddUserInfo')) || {};
			this.iphone = userInfo.Mobile
		},
		methods: {
			submit() {
				if (!this.oldpwd) {
					tl.toast({
						type: "info",
						message: "请填写原始密码"
					})
					return
				}
				if (!this.newpwd) {
					tl.toast({
						type: "info",
						message: "请填写新密码"
					})
					return
				}
				if (!this.curepwd) {
					tl.toast({
						type: "info",
						message: "请填写确认密码"
					})
					return
				}
				if (this.newpwd != this.curepwd) {
					tl.toast('两次密码不一致')
					return
				}
				this.btnLoading = true;
				var data = {
					  "OldPassWord": this.oldpwd,
					  "NewPassWord": this.newpwd,
					  "NewRepetitionPassWord": this.curepwd
				}
				updateUserPassWord(data).then(res => {
					this.btnLoading = false;
					if(res.Code == 1){
						tl.toast({
							type:'success',
							message:'密码修改成功'
						})
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

	.el-button {
		margin: 3px 0;
	}

	.order {
		.orderRepair {
			width: 400px;
			margin: 30px;
			text-align: center;
		}

		.orderStatus {
			color: #E6A23C;
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
