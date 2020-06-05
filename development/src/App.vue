<template>
	<div id="app">
		<tl-head v-if="isRouterHead"></tl-head>
		<router-view/>
		<tl-footer></tl-footer>
		<transition name="slide">
		    <a v-show="fadeFlag" href="#app" class="el-backtop" style="right: 40px; bottom: 40px;font-size: 14px;">Top</a>
		</transition>
	</div>
</template>

<script>
	import tlHead from './common/head/head';
	import tlFooter from './common/footer/footer';
	export default{
		components:{ tlHead,tlFooter },
		data(){
			return{
				isRouterHead:true,
				fadeFlag:false
			}
		},
		provide () {
			return {
			  reload: this.reload
			}
	    },
		
		methods: {
		    reload () {
				this.isRouterHead = false
				this.$nextTick(function () {
					this.isRouterHead = true
				})
		    },
			windowScroll() {
				// 滚动条距离页面顶部的距离
				// 以下写法原生兼容
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (scrollTop > 200) {
					this.fadeFlag = true
				} else {
					this.fadeFlag = false
				}
			}
			
		},
		mounted(){
			window.addEventListener('scroll', this.windowScroll);
		}
	}
</script>

<style lang="less">
@import './assets/less/common.less';
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
::-webkit-scrollbar-thumb {
	background-color: rgba(144,147,153,.5);
	border-radius: 3px;
}
.el-pagination{
	text-align: center;
	margin-top: 25px;
	margin-bottom: 25px;
}
.el-image-viewer__wrapper{
	.el-image-viewer__close{
		z-index: 200;
		right: 50%;
		margin-right: -20px;
	
	}
	.el-image-viewer__mask{
		opacity: 0.75;
	}
}

.el-picker-panel {
	.el-input__inner {
		color: red !important;
	}
}
.el-icon-circle-close{
	color: @cf!important;
}
.el-input__icon.el-range__close-icon{
	color: @c3!important;
}
.el-carousel__arrow{
	background-color:rgba(31,45,61,.51)!important
}
.el-carousel__arrow:hover{
	background-color:rgba(31,45,61,.71)!important
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner,.el-radio__input.is-checked .el-radio__inner{
	background: @def!important; 
	border-color: @def!important;
}
.el-radio__inner:hover{
	border: 1px solid @def!important; 
}
.el-radio__input.is-checked+.el-radio__label{
	color: @def!important;
}
.el-radio.is-bordered.is-checked{
	border-color: @def!important;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
	color: @c3!important;
}
.el-input__inner:focus,.el-textarea__inner:focus{
	border-color: @def!important;
}
.el-drawer__wrapper{
	.el-drawer__body{
		overflow: auto;
	}
}
#app{
	padding-top: 70px;
}
.el-scrollbar__bar{
	z-index: 2020;
}
.collapse{
	.el-collapse-item__header{
		font-size: 15px;
		position: relative;
		&.is-active{
			font-weight: bold;
			.iconfont{
				font-weight: normal;
			}
			&:focus,&:hover,&:active{
				font-weight: bold;
				color: @def;
			}
			border-bottom: 1px dashed @def;
			color: @def;
			&:after{
				content: "";
				position: absolute;
				width: 3px;
				background: @def;
				height: 50%;
				top: 25%;
				left: 0;
			}
		}
	}
	.el-collapse-item{
		&.is-active{
			background:#ebf5ec;
			color: @def;
		}	
		.el-collapse-item__wrap{
			.el-collapse-item__content{
				padding-bottom: 0px;
				background: #eef7ee;
			}
		}
	}
}
.ts {
	animation: fade 0.2s infinite;

	@keyframes fade {
		50% {
			box-shadow: 0 0 10px rgba(245, 108, 108, 0.9)
		}
	}
}
</style>
