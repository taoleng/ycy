<template>
	<div class="login">
		<div class="login-box">
			<div class="login-nav flex">
				<div class="login-item flex-1" :class="{'on':tabNum==1}" @click="tabNum=1">快捷登录</div>
				<div class="login-item flex-1" :class="{'on':tabNum==2}" @click="tabNum=2">账号登录</div>
			</div>
			<div class="login-input">
				<el-input placeholder="请输入手机号" v-model="iphone" class="input">
					<el-button slot="prepend" icon="el-icon-mobile-phone"></el-button>
				</el-input>
				<el-input placeholder="请输入验证码" v-model="code" class="input" v-show="tabNum == 1">
					<el-button slot="prepend" icon="el-icon-document-checked"></el-button>
					<el-button slot="append" class="code" :class="{'sendCode':codeFlag}" @click="send">{{!codeFlag ? codeText : '剩余'+codeNum+'s'}}</el-button>
				</el-input>
				<el-input placeholder="请输入密码" v-model="pwd" show-password class="input" v-show="tabNum == 2">
					<el-button slot="prepend" icon="el-icon-lock"></el-button>
				</el-input>
				<el-button type="primary" class="submit" :loading="btnLoading" @click="submit">登录</el-button>
				<div class="text">注册或登录表示您已同意<a href="">《用户协议》</a></div>
				<div class="go">
					<router-link to="./forget" class="forget">忘记密码？</router-link>
					<router-link to="./register" class="register">快速注册</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import tl from '../../assets/tl.js'
	import {
		Code,
		Login,
		CodeLogin
	} from '../../assets/js/api.js'
	export default {
		data() {
			return {
				tabNum: 2,
				iphone: '',
				pwd: '',	
				// iphone: '13871501820',
				// pwd: '123456789',
				code: '',
				btnLoading: false,
				codeFlag: false,
				codeNum: 60,
				codeText: '发送验证'
			};
		},
		created() {
			this.reload();
		},
		inject: ['reload'],
		metaInfo: {
			title: '用户登录', // set a title
		},
		methods: {
			goTo() {
				const redirect = localStorage.getItem("LddBackLink");
				this.reload();
				if (redirect) {
					window.location.href = redirect;
					localStorage.removeItem("LddBackLink");
				} else {
					this.$router.push("/")
				}
			},
			send() {
				var self = this;
				var timer = null;
				if (!self.iphone) {
					tl.toast('请输入手机号');
					return
				}
				if (!tl.isPhone(self.iphone)) {
					tl.toast('请输入有效手机号');
					return
				}
				if (!self.codeFlag) {
					self.codeFlag = true;
					Code({
						Mobile: self.iphone
					}).then(res => {
						console.log(res);
						if (res.Code == 1) {
							timer = setTimeout(lastTime, 1000)
							tl.toast({
								message: '短信发送成功',
								type: 'success'
							});
						} else {
							self.codeFlag = false;
							self.codeNum = 60;
							self.codeText = '发送验证';
							tl.toast(res.Msg);
						}
					})
				}

				function lastTime() {
					self.codeNum--;
					if (self.codeNum <= 0) {
						clearTimeout(timer);
						self.codeFlag = false;
						self.codeNum = 60;
						self.codeText = '再次发送'
					} else {
						timer = setTimeout(lastTime, 1000);
					}
				}
			},
			submit() {
				var self = this;
				if (!self.iphone) {
					tl.toast('请输入手机号');
					return
				}
				if (!tl.isPhone(self.iphone)) {
					tl.toast('请输入有效手机号');
					return
				}
				if (self.tabNum == 1) {
					if (!self.code) {
						tl.toast('请输入验证码');
						return
					}
					var data = {
						Mobile: self.iphone,
						MsgVerifyCode: self.code
					}
					self.btnLoading = true;
					CodeLogin(data).then(res => {
						if (res.Code == 1) {
							self.setUserInfo(res)
							setTimeout(() => {
								this.goTo();
							}, 1500)
							tl.toast({
								message: '登录成功',
								type: 'success'
							});
						} else {
							self.btnLoading = false;
							tl.toast(res.Msg);
						}
					})
				} else {
					if (!self.pwd) {
						tl.toast('请输入密码');
						return
					}
					var data = {
						UserName: self.iphone,
						Password: self.pwd
					}
					self.btnLoading = true;
					Login(data).then(res => {
						if (res.Code == 1) {
							self.setUserInfo(res)
							setTimeout(() => {
								this.goTo();
							}, 1500)
							tl.toast({
								message: '登录成功',
								type: 'success'
							});
						} else {
							self.btnLoading = false;
							tl.toast(res.Msg);
						}
					})
				}
			}
		}
	};
</script>

<style lang="less">
	@import '../../assets/less/login.less';
</style>
