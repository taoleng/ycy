<template>
	<div class="nav">
		<div class="w1200 flex">
			<div class="nav-item flex flex-1 flex-align-center flex-pack-center" @click="go('item5')">
				<div class="left">
					<div class="img2"></div>
				</div>
				<div class="right">
					<div class="title">包车模式</div>
					<div class="eng">Chartered car mode</div>
				</div>
			</div>
			<div class="nav-item flex flex-1 flex-align-center flex-pack-center" @click="go('item6')">
				<div class="left">
					<div class="img3"></div>
				</div>
				<div class="right">
					<div class="title">订单步骤</div>
					<div class="eng">Order steps</div>
				</div>
			</div>
			<div class="nav-item flex flex-1 flex-align-center flex-pack-center" @click="go('item7')">
				<div class="left">
					<div class="img1"></div>
				</div>
				<div class="right">
					<div class="title">优选车辆</div>
					<div class="eng">Preferred vehicle</div>
				</div>
			</div>
			<!-- <div class="nav-item flex flex-1 flex-align-center" @click="pop(4)">
				<div class="left">
					<div class="img4"></div>
				</div>
				<div class="right">
					<div class="title">跟车人</div>
					<div class="eng">Car following people</div>
				</div>
			</div>
			<div class="nav-item flex flex-1 flex-align-center" @click="pop(5)">
				<div class="left">
					<div class="img5"></div>
				</div>
				<div class="right">
					<div class="title">包车须知</div>
					<div class="eng">Chartered for Notice</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					'(1)”包租车”，用户选择全部旅游客运企业的车辆进行订单，选择车辆数量多、范围广，填写行程信息，支付定金，提交订单，即可以完成订单。</br>(2)”接机”、”送机”、”高铁送客”、”高铁接客”，是”包租车”的简易模式。</br>(3)”定制包车”，用户选择单个旅游客运企业的车辆进行订单，填写行程信息，支付定金，提交订单；或直接联系客运企业计调员代理包车。</br>(3)”协议包车”，用户与客运企业或平台签订租车协议，通过会员中心直接订单。',
					'第一步，确定出发地、目的地、出发时间、还车时间，查询平台可用车辆情况。</br>第二步，确定座位数、车辆品牌、车龄，选择满足要求的车辆，进行车辆预订。</br>第三步，确认”行程路线”、”跟车人”、”联系电话”、”上车详细地址”，提交订单。</br>第四步，查看”我的订单”，与订单上的司机保持联系。',
					'(1)安全:行程山路较多,或路程较长，为保障更安全，应选择车龄较短的车辆；</br>(2)车辆座位数:乘车人数(含小孩)，必须少于车辆座位数-2(司机、导游)，否则违法；</br>(3)包车方式:全包，含路桥费、燃油费；半包，不含路桥费、燃油费；用户可以自由选择。',
					'(1) 定义:跟车人，是指用户包租车的带团联系人，或导游，方便车队联系；</br>(2) 跟车信息:订单信息列表栏，跟车信息，平台会自动显示订单人姓名和电话；</br>(3) 跟车人变更:需要变更带团人或导游，可以在订单时进行变更，或在订单人会员中心的订单内进行变更。',
					'(1)订单填写:a订单中的“行程路线”，应按日按序填写行程中游玩、办事、住宿等停留地点，否则会造成包车行程公里数计算不正确，须在行程中办理包车订单补单手续；b订单“还车时间”，是指包车返程回到出发地的时间,用户须依此安排返程时间。</br>(2)包车价格组成:由台班费、燃油费、路桥费、车辆品牌、车辆等级、车辆使用年限和淡旺季价格系数等组成，不包括应由租户直接支付的停车费。</br>(3)订单付款：a订金，提交订单须按车辆半个或一个台班费支付定金，订单不成功，订金会自动退回原付款账户；b尾款，行程结束前，应在司机的监督下，通过平台，付清尾款。</br>(4)订单取消：取消订单会产生手续费。订单30分钟内取消，不收违约金；出发时间24小时前取消订单扣定金50%违约金;出发时间24小时以内取消订单扣定金100%违约金。应退款金额，平台在2个工作日内平台自动退回原付款账户。</br>(5)订单补单。客户在行程中调整行程和时间，并增加了行程或时间，且车辆与其他订单时间不冲突，客户跟车管理人员应与司机商定并办理订单补单手续，否则不得调整行程和时间。 </br>(6)包车须知是租车合同的补充约定，请认真阅读租车合同。'
				],
				title:["包车模式","订单步骤","优选车辆","跟车人","包车须知"]
			}
		},
		methods:{
			go(id){
				let routeUrl = this.$router.resolve({
				         path:'/question?id='+id+'&num=2'
				      });
				window.open(routeUrl.href, '_blank');
			},
			// pop(num){
			// 	this.$alert(
			// 	this.list[num-1],
			// 		this.title[num-1], {
			// 			dangerouslyUseHTMLString: true,
			// 			distinguishCancelAndClose: true,
			// 		});
			// }
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';
	.nav{
		height: 80px;
		background: @cf2;
		.nav-item{
			height: 80px;
			border-right: 2px solid @cf;
			color: @c3;
			transition: 0.3s;
			cursor: pointer;
			&:last-child{
				border: none;
			}
			&:hover{
				transform: scale(0.95);
			}
		}
		.left{
			width: 50px;
			height: 50px;
			border: 1px solid #717171;
			border-radius: 50%;
			.bg();
			div{
				width: 26px;
				height: 26px;	
				position: relative;
				top:50%;
				left:50%;
				margin: -13px -13px;
				&.img1{
					background: url(../../../static/img/homeNav/nav1.png);
				}
				&.img2{
					background: url(../../../static/img/homeNav/nav2.png);
				}
				&.img3{
					background: url(../../../static/img/homeNav/nav3.png);
				}
				&.img4{
					background: url(../../../static/img/homeNav/nav4.png);
				}
				&.img5{
					background: url(../../../static/img/homeNav/nav5.png);
				}
			}
			
		}
		.right{
			color: @c6;
			padding-left:15px;
			height: 56px;
			.title{
				font-size: 18px;
				padding-top: 5px;
			}
			.eng{
				font-size: 12px;
				margin-top: 5px;
			}
		}
	}
</style>
