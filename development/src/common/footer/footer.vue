<template>
	<div class="footer flex flex-pack-justify flex-v" v-cloak>
		<div class="footer-main w1200 flex flex-pack-justify">
			<div class="left flex">
				<dl class="dl">
					<dt>关于</dt>
					<dd><router-link to="/about/0">关于我们</router-link></dd>
					<dd><router-link to="/about/1">联系我们</router-link></dd>
					<dd><router-link to="/about/2">加入我们</router-link></dd>
				</dl>
				<dl class="dl">
					<dt>条款</dt>
					<dd><router-link to="/about/3">用户协议</router-link></dd>
				</dl>
				<dl class="dl">
					<dt>帮助</dt>
					<dd><router-link to="/about/4">客服中心</router-link></dd>
					<dd><router-link to="/question">常见问题</router-link></dd>
				</dl>
			</div>
			<div class="right">
				<div class="code">
					<img src="../../../static/img/homeFix/homeFixCode.jpg" class="img">
					<div class="text">扫一扫，关注微信</div>
				</div>
			</div>
		</div>
		<div class="footer-copy w1200">
			推荐使用CHROME浏览器  |  Copyright ©2015-2017 <a style="color: #fff;" href="http://www.beian.miit.gov.cn/" target="_blank">鄂ICP备16015769号-2</a> <a href="http://www.gsxt.gov.cn/%7B90073F31F761CEBC1B159503A41272B4BAA7C067F1EC5A566EF83E302D9E6E60E0FD4B477FE98EFC39FF8D482FAFC85EBC785050A1B1A29D8DA58CB3A397EA870C8B0C8B0C610C870004830483048304833983F4D5A2180DC1A112CE5EF94F2F6DED2B8C14101435B2137406C3A4B9D97EE6E265E265E265-1562233176412%7D" target="_blank"><img src="../../../static/img/china.png"></a> 版权所有 武汉车联天下科技有限公司
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				url: 'http://beian.miit.gov.cn/publish/query/indexFirst.action'
			}
		},
		methods:{
			toRescue() {
				window.location.href = this.url;
			  },
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';
	.footer{
		height: 400px;
		background: @c3;
		box-shadow: 0 0 10px rgba(0,0,0,0.6);
		.footer-main{
			padding-top: 60px;
			.right{
				.code{
					width: 150px;
					margin-right: 30px;
					.text{
						font-size: 14px;
						color: @cf;
						text-align: center;
						display: block;
						height: 30px;
						line-height: 30px;
						padding-top: 5px;
					}
					.img{
						width: 150px;
						height: 150px;
						display: block;
					}
				}
			}
		}
		.dl{
			margin-right: 150px;
			dt{
				font-size:14px;
				color: @cf;
				padding-bottom: 16px;
			}
			dd{
				font-size: 14px;
				line-height: 30px;
				a{
					color: @cf;
				}
			}
		}
		.footer-copy{
			font-size: 14px;
			color: @cf;
			text-align: center;
			padding: 40px 0 60px;
			border-top: 1px dashed @cd;
		}
	}
</style>
