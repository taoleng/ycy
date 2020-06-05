<template>
	<div class="page">
		<div style="font-size: 20px;text-align: center;padding-top: 150px;">逸出游正在为您前往支付，请稍等。。。</div>
		<div v-html="payGateWay" style="display: none;">{{payGateWay}}</div>
	</div>
     
</template>


<script>
	export default {
		name: 'payGateWay',
		data(){
			return {
				payGateWay:''
			}
		} ,
		mounted () {
			let form = this.$route.query.htmlData;
			this.payGateWay = form
			this.$nextTick(()=> {
				document.getElementById('alipaysubmit').submit()
			})
		}
	}
</script>
