<template>
	<div class="app-container">
	    <el-autocomplete :suffix-icon="icon" v-model="str" :fetch-suggestions="querySearch" :placeholder="title" style="width: 100%" :trigger-on-focus="false" @select="handleSelect"/>
	 </div>
</template>

<script>
import tl from '../../assets/tl.js'
 export default{
	 props:{
		 title:{
			 typeof:String,
			 default:"请输入地址"
		 },
		 strValue:{
			 typeof:String,
			 default:""
		 },
		 icon:{
			 typeof:String,
			 default:"el-icon-location-outline"
		 }
	 },
	 data(){
		return{
			str:""
		} 
	 },
	 created(){
		 var self = this; 
		if(this.strValue){
			this.str = this.strValue;
		}
		 AMap.service(["AMap.PlaceSearch"], function () {
			try {
				self.placeSearch = new AMap.PlaceSearch({
					citylimit: false,  //是否强制限制在设置的城市内搜索
					pageSize: 30, // 单页显示结果条数
					children: 2, //不展示子节点数据
					pageIndex: 1, //页码
					extensions: 'base', //返回基本地址信息
				})
			} catch (e) {
				console.error(e);
			}
		 });
	 },
	methods:{
		querySearch(queryStr,cb){
			var s= [];
			this.placeSearch.search(queryStr || '', function (status, result) {
				// 查询成功时，result即对应匹配的POI信息
				if (status === 'complete') {
					var list = result.poiList.pois
					list.forEach(item =>{
						var address =  item.cityname + item.adname;
						var point = item.location.lng + "," + item.location.lat
						s.push({
							value: item.name+"-"+address,
							point: point,
							address:address+item.address,
							city:item.cityname,
							province:item.pname,
							district:item.adname,
						})
					})
				    cb(s)
					if(list.length == 0){
						tl.toast('请输入准确地址');
					}
				}
			});
		},
		handleSelect(item){
			item.searchText = this.str;
			this.$emit('getAddress',item)
		}
	} 
 }
</script>
