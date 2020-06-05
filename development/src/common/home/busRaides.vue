<template>
	<div class="busRaides">
		<div class="w1200">
			<div class="busRaides-title">包车攻略</div>
			<div class="busRaides-main flex flex-pack-justify">
				<div class="accordion flex">
					<!-- <div class="accordion-item" :class="['img'+(index+1),onNum==index ? 'on' : '']" @mouseover="onNum=index" v-for="(item,index) in nextList" :key="index">
						<div class="accordion-title" @click="go(item.ID)">{{item.NoticeTitle}}</div>
					</div> -->
					
					<div class="accordion-item img1" :class="onNum==0 ? 'on' : ''" @mouseover="onNum=0">
						<div class="accordion-title" @click="go('item0')">跟车人怎样填写更改</div>
					</div>
					<div class="accordion-item img2" :class="onNum==1 ? 'on' : ''" @mouseover="onNum=1">
						<div class="accordion-title" @click="go('item1')">行程中需要增加行程或时间怎样处理</div>
					</div>
					<div class="accordion-item img3" :class="onNum==2 ? 'on' : ''" @mouseover="onNum=2">
						<div class="accordion-title" @click="go('item2')">行程路线怎样填写</div>
					</div>
					<div class="accordion-item img4" :class="onNum==3 ? 'on' : ''" @mouseover="onNum=3">
						<div class="accordion-title" @click="go('item3')">取消订单需要注意什么</div>
					</div>
					<div class="accordion-item img5" :class="onNum==4 ? 'on' : ''" @mouseover="onNum=4">
						<div class="accordion-title" @click="go('item4')">一个订单订多个车辆怎样取消？怎样结账</div>
					</div>
					<div class="accordion-item img6" :class="onNum==5 ? 'on' : ''" @mouseover="onNum=5">
						<div class="accordion-title" @click="go('item5')">怎样选择包车模式</div>
					</div>
					
					<!-- <div v-loading="prevloading" class="flex-1"></div> -->
				</div>
				<div class="question flex-1">
					<div class="title">包车常见问题</div>
					<div class="info">
						<div class="infoGo" @click="go('item0')">跟车人怎样填写更改</div>
						<div class="infoGo" @click="go('item1')">行程中需要增加行程或时间怎样处理</div>
						<div class="infoGo" @click="go('item2')">行程路线怎样填写</div>
						<div class="infoGo" @click="go('item3')">取消订单需要注意什么</div>
						<div class="infoGo" @click="go('item4')">一个订单订多个车辆怎样取消？怎样结账</div>
						<div class="infoGo" @click="go('item5')">怎样选择包车模式</div>
					</div>
					<div class="spr flex flex-wrap">
						<div class="item">订单取消</div>
						<div class="item red">GPS导航</div>
						<div class="item">领队</div>
						<div class="item red">服务评价</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { homePrevQuestion,homeNextQuestion } from '../../assets/js/api.js'
	export default {
	    data() {
	      return {
	        onNum:0,
			nextList:[],
			prevList:[],
	      };
	    },
		created(){
			// this.nextQuestion();
			// this.prveQuestion();
		},
		methods:{
			go(id){
				let routeUrl = this.$router.resolve({
				         path:'/question?id='+id+'&num=2'
				      });
				window.open(routeUrl.href, '_blank');
			},
			nextQuestion(){
				homeNextQuestion().then(res => {
					this.prevloading = false
					if(res.Code == 1){
						if(res.Data.length > 6){
							this.nextList = res.Data.splice(0,6)
						}
					}
				})
			},
			prveQuestion(){
				homePrevQuestion().then(res => {
					this.nextloading = false
					if(res.Code == 1){
						this.prevList = res.Data[0].BacNoticeList
					}
				})
			}
		}
	  }
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';
	.busRaides{
		margin-top: 30px;
		margin-bottom: 50px;
		.busRaides-title{
			font-size: 16px;
			color: #333;
			border-bottom: 1px solid @cc;
			font-weight: bold;
			padding: 10px 0;
			margin-bottom: 10px;
		}
		.accordion{
			width:940px;
			height: 390px;
			overflow: hidden;
			position: relative;
			box-shadow: @box;
		}
		.question{
			box-shadow: @box;
			margin-left: 15px;
			padding: 20px 20px;
			height: 350px;
			.title{
				font-size: 20px;
				font-weight: bold;
				color: @red;
			}
			.info{
				padding: 10px 0;
				font-size: 14px;
				color: @c3;
				line-height: 30px;
				text-align: justify;
				.infoGo{
					cursor: pointer;
					&:hover{
						color: @def;
					}
				}
			}
			.spr{
				.item{
					font-size: 12px;
					padding: 4px 5px;
					border: 1px solid @cb;
					color: @c9;
					margin: 5px 2px;
					&.red{
						color: @red;
						border-color: @red;
					}
				}
			}
		}
		.accordion-item{
			width: 310px;
			height: 390px;
			.bg();
			position: relative;
			width: 126px;
			transition:0.8s;
			&.on{
				transition: 0.2s;
				width: 310px;
				.accordion-title{
					height: 60px;
					
				}
			}
			.accordion-title{
				font-size: 18px;
				color: @cf;
				font-weight: bold;
				padding:0 10px;
				line-height: 30px;
				background: rgba(0,0,0,.5);
				z-index: 10;
				height: 390px;					
				transition: 0.3s;
				cursor: pointer;
			}
			&.img1{
				background: url(../../../static/img/homeAccordion/accordion-img1.jpg);
			}
			&.img2{
				background: url(../../../static/img/homeAccordion/accordion-img2.jpg);
			}
			&.img3{
				background: url(../../../static/img/homeAccordion/accordion-img3.jpg);
			}
			&.img4{
				background: url(../../../static/img/homeAccordion/accordion-img4.jpg);
			}
			&.img5{
				background: url(../../../static/img/homeAccordion/accordion-img5.jpg);
			}
			&.img6{
				background: url(../../../static/img/homeAccordion/accordion-img6.jpg);
			}
		}
	}
</style>
