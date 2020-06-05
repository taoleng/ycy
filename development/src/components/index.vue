<template>
	<div class="page">
		<!--S banner -->
		<tl-banner></tl-banner>
		<!--E banner -->
		
		<!--S 包车攻略 包车模式 服务咨询 -->
		<tl-nav></tl-nav>
		<!--E 包车攻略 包车模式 服务咨询 -->
		
		<!--S 热门车型 -->
		<tl-hot-bus></tl-hot-bus>
		<!--E 热门车型 -->
		
		<!--S 包车攻略 -->
		<tl-bus-raides></tl-bus-raides>
		<!--E 包车攻略 -->
	</div>
	
</template>

<script>
	import tlBanner from '../common/home/banner';
	import tlNav from '../common/home/nav';
	import tlBusRaides from '../common/home/busRaides';
	import tlHotBus from '../common/home/hotBus';
	export default{
		components:{ tlBanner,tlNav,tlBusRaides,tlHotBus },
		metaInfo: {
		    title: '逸出游包车平台', // set a title
		    meta: [{                 // set meta
		        name: 'description',
		        content: '逸出游包车平台，是中国第一个实现全域旅游客运车辆数据互联互通的旅游包车订单平台，可以满足不同城市旅游客运公司运营的个性化需求，特别为包车包车用户提供了精、准、快的便捷服务。'
		    },{                 // set meta
		        name: 'keywords',
		        content: '逸出游包车平台 包租车 定制包车 特价包车。'
		    }
			],
		}
	}
</script>

<style>
	
	
</style>
