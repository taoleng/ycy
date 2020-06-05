<template>
	<div class="login">
		<div class="login-box unlogin">
			<div class="login-nav flex flex-pack-justify">
				<div class="login-item flex-1">找回密码</div>
				<router-link to="./login" class="login-item login-to">直接登录</router-link>
			</div>
			<div class="login-input">
				<el-input placeholder="请输入手机号" v-model="iphone" class="input">
					<el-button slot="prepend" icon="el-icon-mobile-phone"></el-button>
				</el-input>
				<el-input placeholder="请输入验证码" v-model="code" class="input">
					<el-button slot="prepend" icon="el-icon-document-checked"></el-button>
					<el-button slot="append" class="code" :class="{'sendCode':codeFlag}" @click="send">{{!codeFlag ? codeText : '剩余'+codeNum+'s'}}</el-button>
				</el-input>
				<el-input placeholder="请输入密码" v-model="pwd" show-password class="input">
					<el-button slot="prepend" icon="el-icon-lock"></el-button>
				</el-input>
				<el-input placeholder="请确认输入密码" v-model="repwd" show-password class="input">
					<el-button slot="prepend" icon="el-icon-lock"></el-button>
				</el-input>
				<div class="check text">
					<el-checkbox v-model="checked">我愿意接受</el-checkbox><a href="">《用户协议》</a>
				</div>
				 <el-button type="primary" class="submit" :loading="btnLoading" @click="submit">提交</el-button>
				 <div class="go">
					 已有账号？<router-link to="./login" class="register">直接登录</router-link>
				 </div>
			</div>
		</div>
	</div>
</template>

<script >
	import tl from '../../assets/tl.js'
	import {
		ForgetCode,
		ForgetLogin
	} from '../../assets/js/api.js'
  export default {
    data() {
      return {
        iphone: '',
		pwd:'',
		code:'',
		repwd:'',
		checked: false,
		btnLoading: false,
		codeFlag: false,
		codeNum: 60,
		codeText: '发送验证'
      };
    },
	metaInfo: {
	    title: '找回密码', // set a title
	},
    methods: {
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
      		ForgetCode({
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
	  submit(){
		  var self = this;
		  if (!self.iphone) {
		  	tl.toast('请输入手机号');
		  	return
		  }
		  if (!tl.isPhone(self.iphone)) {
		  	tl.toast('请输入有效手机号');
		  	return
		  }
		  if (!self.code) {
		  	tl.toast('请输入验证码');
		  	return
		  }
		  if (!self.pwd) {
		  	tl.toast('请输入密码');
		  	return
		  }
		  if (!self.repwd) {
		  	tl.toast('请再次输入密码');
		  	return
		  }
		  if (self.repwd != self.pwd) {
		  	tl.toast('两次密码不一样');
		  	return
		  }
		  if (!self.checked) {
		  	tl.toast('请同意接受用户协议');
		  	return
		  }
		  var data = {
		  	"Mobile": self.iphone,
		  	"UserType": 0,
		  	"Code": self.code,
		  	"PassWord": self.pwd,
		  }
		  self.btnLoading = true
		  ForgetLogin(data).then(res=>{
		  	if(res.Code == 1){
		  		tl.toast({
		  			message:'密码设置成功，正在前往登录',
		  			type:'success'
		  		})
				setTimeout(()=>{
					this.$router.push('/login')
				},1500)
		  	}else{
				self.btnLoading = false;
		  		tl.toast(res.Msg)
		  	}
		  })
	  }
    }
  };
</script>

<style lang="less">
	@import '../../assets/less/login.less';
</style>
