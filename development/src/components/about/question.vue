<template>
	<div class="question">
		<div class="w1200 questionUs">
			<div class="question-left">
				<div class="question-nav fixed" ref="nav">
					<div class="question-nav-item title"><i class="icon el-icon-question"></i>常见问题</div>
					<a class="question-nav-item right" :class="{'on':num == 0}" @click="change(0)">新手必看</a>
					<a class="question-nav-item right" :class="{'on':num == 1}" @click="change(1)">订单注意</a>
					<a class="question-nav-item right" :class="{'on':num == 2}" @click="change(2)">包车攻略</a>
				</div>
			</div>
			<div class="question-main">
				<div class="box">
					<div class="box-title" id="nav0">新手必看</div>
					<div class="question-box">
						<div class="box-question">一、怎样选择包车模式</div>
						<div class="box-answer">(1)”包租车”，用户可以查询租用当前城市的全部旅游客车，并根据需要，自由选择车辆品牌、车辆座位数、车辆等级、车龄，订单简单便捷。</div>
						<div class="box-answer">(2)”定制包车”，用户包车，或选择熟悉的客运企业的车辆进行订单，或委托客运企业计调员代理订单。</div>
						<div class="box-answer">(3)”发布抢单”，即平台根据客户的用车条件，选择平台全部同品质车辆中最低价作为计价依据，将信息发布至全部客运企业计调，由计调员进行抢单接单。</div>
						<div class="box-answer">(4)”顺风包车”，顺风搭载客户，不需要整车包车，不限人数，自由抢单，价格是常规的65折。</div>
						<div class="box-answer">(5)”特价包车”，特定地域，特定时间，一口报价，价格超低。</div>
						<div class="box-answer">(6)”接机””送机””高铁送客””高铁接客”，是客户订单的简易操作模式。</div>
						<div class="box-answer">(7)”协议包车”，用户与客运企业签订租车折让、挂账等协议，通过贵宾通道直接订单。</div>
						<div class="box-answer">(8)”代理包车”，用户全权委托客运企业订单。</div>
					</div>
					<div class="question-box">
						<div class="box-question">二、一个订单多个车辆怎样取消？怎样结账</div>
						<div class="box-answer">一个订单同时订多个车辆会产生多个分订单，订金一起付，取消订单按分订单取消，结算订单下欠款按分订单进行。</div>
					</div>
					<div class="question-box">
						<div class="box-question">三、取消订单需要注意什么</div>
						<div class="box-answer">订单30分钟内取消，不收违约金；出发时间24小时前取消订单，或订单超30分钟，扣车辆台班费50%违约金;出发时间24小时以内取消订单，扣台班费100%违约金。应退款金额，平台在3个工作日内平台自动退回原付款账户。</div>
					</div>
					<div class="question-box">
						<div class="box-question">四、行程路线怎样怎样填写</div>
						<div class="box-answer">订单中的”行程路线”，应依据旅行过程中吃、住、玩的行驶路线按序填写，否则会造成租车行程公里数计算不正确，须在行程中办理租车订单补单手续。</div>
					</div>
					<div class="question-box">
						<div class="box-question">五、行程中需要增加行程或时间怎样处理</div>
						<div class="box-answer">导游(或跟车联系人)应与司机商量，商定后应在司机的监督下办理订单补单手续。</div>
					</div>
					<div class="question-box">
						<div class="box-question">六、跟车人怎样填写更改</div>
						<div class="box-answer">跟车人是指所包车辆在行程中的带团管理人，或是导游，或是用户带团人。订单中的跟车人及联系电话，是依据客户订单的账号自动生成的，用户需要安排其他人员带团时，须在订单用户会员中心更改跟车人，联系电话。</div>
					</div>
				</div>
				<div class="box">
					<div class="box-title" id="nav1">订单注意</div>
					<div class="question-box">
						<div class="box-question">一、客户包车订单需要注意什么？</div>
						<div class="box-answer">(1)订单填写:a订单中的“行程路线”，应按日按序填写行程中游玩、办事、住宿等停留地点，否则会造成包车行程公里数计算不正确，须在行程中办理包车订单补单手续；b订单“还车时间”，是指包车返程回到出发地的时间,用户须依此安排返程时间。</div>
						<div class="box-answer">(2)包车价格组成:由台班费、燃油费、路桥费、车辆品牌、车辆等级、车辆使用年限和淡旺季价格系数等组成，不包括应由租户直接支付的停车费。</div>
						<div class="box-answer">(3)订单付款：a订金，提交订单须按车辆半个或一个台班费支付定金，订单不成功，订金会自动退回原付款账户；b尾款，行程结束前，应在司机的监督下，通过平台，付清尾款。</div>
						<div class="box-answer">(4)订单取消：取消订单会产生手续费。订单30分钟内取消，不收违约金；出发时间24小时前取消订单，或订单超30分钟，扣车辆台班费50%违约金;出发时间24小时以内取消订单，扣台班费100%违约金。应退款金额，平台在2个工作日内平台自动退回原付款账户。</div>
						<div class="box-answer">(5)订单补单。客户在行程中调整行程和时间，并增加了行程或时间，且车辆与其他订单时间不冲突，客户跟车管理人员应与司机商定并办理订单补单手续，否则不得调整行程和时间。 </div>
						<div class="box-answer">(6)订单下欠款:行程返程前，应在司机的监督下付清全部订单下欠款，以免影响正常的行程；</div>
						<div class="box-answer">(7)包车须知是租车合同的补充约定，请认真阅读租车合同。</div>
					</div>
					<div class="question-box" id="item6">
					    <div class="box-question">二、包租车订单步骤？</div>
					    <div class="box-answer">第一步，确定出发地、目的地、出发时间、还车时间，查询平台可用车辆情况。</div>
					    <div class="box-answer">第二步，确定座位数、车辆品牌、车龄，选择满足要求的车辆，进行车辆预订。</div>
					    <div class="box-answer">第三步，填写旅游”行程路线”、”跟车人”、”联系电话”、”上车详细地址”，提交订单。</div>
					    <div class="box-answer">第四步，查看”我的订单”，与订单上确定的司机保持联系。</div>
					</div>
					<div class="question-box" id="item7">
					    <div class="box-question">三、优选车辆</div>
					    <div class="box-answer">(1)安全:行程山路较多,或路程较长，为保障更安全，应选择车龄较短的车辆；</div>
					    <div class="box-answer">(2)车辆座位数:乘车人数(含小孩)，必须少于车辆座位数-2(司机、导游)，否则违法；</div>
					    <div class="box-answer">(3)包车方式:全包，含路桥费、燃油费；半包，不含路桥费、燃油费；用户可以自由选择。</div>
					</div>
				</div>
				<div class="box">
					<div class="box-title" id="nav2">包车攻略</div>
					<div class="question-box" id="item5">
						<div class="box-question">一、怎样选择包车模式？</div>
						<div class="box-answer">(1)”包租车”，用户可以查询租用当前城市的全部旅游客车，并根据需要，自由选择车辆品牌、车辆座位数、车辆等级、车龄，订单简单便捷。</div>
						<div class="box-answer">(2)”定制包车”，用户包车，或选择熟悉的客运企业的车辆进行订单，或委托客运企业计调员代理订单。</div>
						<div class="box-answer">(3)”发布抢单”，即平台根据客户的用车条件，选择平台全部同品质车辆中最低价作为计价依据，将信息发布至全部客运企业计调，由计调员进行抢单接单。</div>
						<div class="box-answer">(4)”顺风包车”，顺风搭载客户，不需要整车包车，不限人数，自由抢单，价格是常规的65折。</div>
						<div class="box-answer">(5)”特价包车”，特定地域，特定时间，一口报价，价格超低。</div>
						<div class="box-answer">(6)”接机””送机””高铁送客””高铁接客”，是客户订单的简易操作模式。</div>
						<div class="box-answer">(7)”协议包车”，用户与客运企业签订租车折让、挂账等协议，通过贵宾通道直接订单。</div>
						<div class="box-answer">(8)”代理包车”，用户全权委托客运企业订单。</div>
					</div>
					<div class="question-box" id="item4">
					    <div class="box-question">二、一个订单多个车辆怎样取消？怎样结账</div>
					    <div class="box-answer">一个订单同时订多个车辆会产生多个分订单，订金一起付，取消订单按分订单取消，结算订单下欠款按分订单进行。</div>
					</div>
					<div class="question-box" id="item3">
					    <div class="box-question">三、取消订单需要注意什么？</div>
					    <div class="box-answer">订单30分钟内取消，不收违约金；出发时间24小时前取消订单，或订单超30分钟，扣车辆台班费50%违约金;出发时间24小时以内取消订单，扣台班费100%违约金。应退款金额，平台在3个工作日内平台自动退回原付款账户。</div>
					</div>
					<div class="question-box" id="item2">
					    <div class="box-question">四、行程路线怎样填写？</div>
					    <div class="box-answer">订单中的”行程路线”，应依据旅行过程中吃、住、玩的行驶路线按序填写，否则会造成租车行程公里数计算不正确，须在行程中办理租车订单补单手续。</div>
					</div>
					<div class="question-box" id="item1">
					    <div class="box-question">五、行程中需要增加行程或时间怎样处理？</div>
						<div class="box-answer">导游(或跟车联系人)应与司机商量，商定后应在司机的监督下办理订单补单手续。</div>
					</div>
					<div class="question-box" id="item0">
					    <div class="box-question">六、跟车人怎样填写更改？</div>
						<div class="box-answer">跟车人是指所包车辆在行程中的带团管理人，或是导游，或是用户带团人。订单中的跟车人及联系电话，是依据客户订单的账号自动生成的，用户需要安排其他人员带团时，须在订单用户会员中心更改跟车人，联系电话。</div>
					</div>
					<div class="question-box">
					    <div class="box-question">七、跟车人怎样与游客或司机保持联系？</div>
						<div class="box-answer">“逸出游”微信公众号，”会员中心”设有”导游工作室”，用于导游(跟车联系人)接单、联系司机。	联系司机，点开”跟车管理”，然后点开订单，找到司机的电话联系。</div>
					</div>
					<div class="question-box">
					    <div class="box-question">八、怎样指导游客找导游或司机？</div>
						<div class="box-answer">游客上车后，跟车人(导游)应指导游客注册登陆”驴嘟嘟旅游”微信公众号，并进入”会员中心”的”找司机导游”，输入乘座的车牌号码，至行程结束前，游客可以随时找到司机或导游。</div>
					</div>
					<div class="question-box">
					    <div class="box-question">九、”我的订单”规则及操作方法？</div>
						<div class="box-answer">我的订单，主要作用:（1）查询订单信息；（2）财务对账、发票申请、个人信息维护；</div>
					</div>
					<div class="question-box">
					    <div class="box-question">十、订单下欠款什么时间支付？</div>
						<div class="box-answer">订单下欠款和订单补单款，在车辆返程前，用户应交清全部下欠款，以免影响正常的行程。</div>
					</div>
					<div class="question-box">
					    <div class="box-question">十一、怎样办理挂帐打折手续？</div>
						<div class="box-answer">客户需要办理挂账打折手续，既可以与客运企业办理挂账打折手续，只有办理了挂账打折手续才能享受挂账打折优惠。</div>
					</div>
					<div class="question-box">
					    <div class="box-question">十二、客户挂帐到期未付怎样处理？</div>
						<div class="box-answer">客户挂账，按照协议逾期未向平台交清应付租车欠款，客户订单将不能进行订单操作。</div>
					</div>
				</div>
			</div>
			<!-- <div class="question-main" v-loading="loading">
				<div class="box" :id="item.ID" v-for="(item,index) in prevList" :key="index">
					<div class="box-title">{{item.TypeName}}</div>
					<div class="question-box" :id="it.ID" v-for="it in item.BacNoticeList">
						<div class="box-question">{{it.NoticeTitle | matchReg}}</div>
						<div class="box-answer">{{it.NoticeContent | matchReg}}</div>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import {
		homePrevQuestion
	} from '../../assets/js/api.js'
	export default {
		data() {
			return {
				num: 0,
				prevList: [],
				loading: true,
				id: "",
			}
		},
		metaInfo: {
			title: '常见问题', // set a title
		},
		created() {
			this.id = this.$route.query.id;
			// this.prveQuestion();
			if(this.$route.query.num){
				this.num = this.$route.query.num;
			}
			if (this.id) {
				this.$nextTick(() => {
					setTimeout(() => {
						window.location.href = "#" + this.id;
						setTimeout(() => {
							document.documentElement.scrollTop = document.documentElement.scrollTop - 80
						}, 0)
					}, 0)
				})
			}

		},
		// watch: {
		// 	'$route.params.num'(newValue, oldValue) {
		// 		this.change(newValue)
		// 	}
		// },
		filters: {
			matchReg(str) {
				let reg = /<\/?.+?\/?>/g;
				return str.replace(reg, '');
			}
		},
		methods: {
			change(num) {
				this.num = num;
				window.location.href = "#nav" + num;
				setTimeout(() => {
					document.documentElement.scrollTop = document.documentElement.scrollTop - 80
				}, 10)
			},
			prveQuestion() {
				homePrevQuestion().then(res => {
					this.loading = false;
					if (res.Code == 1) {
						res.Data.forEach(item => {
							item.BacNoticeList.reverse()
						})
						this.prevList = res.Data;
						if (this.id) {
							this.$nextTick(() => {
								setTimeout(() => {
									window.location.href = "#" + this.id;
									setTimeout(() => {
										document.documentElement.scrollTop = document.documentElement.scrollTop - 80
									}, 0)
								}, 0)
							})
						}
						
						// if (this.num) {
						// 	this.$nextTick(() => {
						// 		setTimeout(() => {
						// 			this.change(this.num)
						// 		}, 0)
						// 	})
						// }
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/common.less';

	.questionUs {
		position: relative;
		padding: 15px 0;
		font-size: 0;

		.question-left {
			width: 200px;
			display: inline-block;
			font-size: 14px;
			vertical-align: top;
		}

		.question-nav {

			// position: fixed;
			&.fixed {
				position: fixed;
				width: 200px;
				box-shadow: @box;
			}

			width: 100%;
			background: @cf;

			.question-nav-item {
				border-bottom: 1px dashed #ddd;
				display: block;
				background: #fff;
				height: 50px;
				line-height: 50px;
				cursor: pointer;
				padding: 0 25px;
				font-size: 15px;
				position: relative;

				&.title {
					font-size: 16px;
				}

				.icon {
					margin-right: 10px;
				}

				&.right {
					text-align: center;
				}

				&.on {
					border-bottom: 1px dashed @def;
					color: @def;

					&:after {
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
		}

		.question-main {
			vertical-align: top;
			box-shadow: @box;
			width: 900px;
			background: @cf;
			display: inline-block;
			margin-left: 20px;
			padding: 20px 0;
			min-height: 500px;

			.box-title {
				font-size: 20px;
				color: @c3;
				height: 60px;
				border-bottom: 1px solid @cd;
				line-height: 60px;
				background: #fefefe;
				padding: 0 20px;
			}

			.question-box {
				border-bottom: 1px dashed @c3;
				padding: 20px 0;
				margin: 0 20px;

				&:last-child {
					border: none;
				}
			}

			.box-question {
				font-size: 16px;
				color: @def;
				margin-bottom: 10px;
				font-weight: bold;
				text-indent: 1em;
			}

			.box-answer {
				font-size: 16px;
				color: @c6;
				padding: 0 15px;
				text-indent: 2em;
				line-height: 1.6;
				text-align: justify;
			}
		}
	}
</style>
