webpackJsonp([4],{"4MJK":function(t,e){},"9Uc6":function(t,e){},L7MR:function(t,e){},Sg3H:function(t,e){},dAjm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=a("mvHQ"),n=a.n(i),r=a("Rzgu"),c=a("+zM7"),l=a("gwNS"),o={data:function(){return{num:0,cityId:"",loading:!0,bannerList:[],searchBtnFlag:!1,car:{travelType:"2",travelFormType:"0",travelPurpose:"旅游包车",isThrough:"非直达",startTime:"",startAddress:{},endTime:"",endAddress:{},region:""},airport:[],train:[]}},components:{tlMap:r.a},created:function(){var t=JSON.parse(localStorage.getItem("LddCity"))||{};localStorage.removeItem("LddCarInfo"),localStorage.removeItem("LddPayInfo"),localStorage.removeItem("LddSearch"),t.Name&&(this.cityId=t.ID),this.banner(),this.getLocation()},methods:{go:function(t){0==this.$refs.carousel.activeIndex&&this.$router.push("/banner")},addressInfo:function(t){return{value:t.CityName+"-"+t.DefaultAddress,point:t.DefaultLonLat,address:t.DefaultAddress,city:t.CityName,province:t.ProvinceName,district:"",searchText:t.CityName+"-"+t.DefaultAddress,ProvinceId:t.ProvinceID,CityId:t.CityID,DistrictId:""}},selectChange:function(t){var e={};1==this.num?(e=this.airport[t],this.car.startAddress=this.addressInfo(e)):2==this.num?(e=this.airport[t],this.car.endAddress=this.addressInfo(e)):3==this.num?(e=this.train[t],this.car.startAddress=this.addressInfo(e)):4==this.num&&(e=this.train[t],this.car.endAddress=this.addressInfo(e))},changeMod:function(t){this.num=t,this.car.region="",this.car.startTime="",this.car.endTime="",this.car.startAddress={},this.car.endAddress={},0==t?(this.car.travelType="2",this.car.isThrough="非直达"):(this.car.travelType="1",this.car.isThrough="直达")},getLocation:function(){var t=this,e={cityId:this.cityId,type:""},a=[],s=[];Object(l.u)(e).then(function(e){1==e.Code&&(e.Data.forEach(function(t){1==t.LocationType?s.push(t):a.push(t)}),t.airport=a,t.train=s)})},banner:function(){var t=this,e={CityId:this.cityId,BusinessType:1};Object(l.E)(e).then(function(e){t.loading=!1,1==e.Code&&(t.bannerList=e.Data)})},computedTime:function(t,e,a,i,r){var c=this;s||(s=new AMap.Driving),this.searchBtnFlag=!0,s.search(new AMap.LngLat(t,e),new AMap.LngLat(a,i),function(t,e){if("complete"===t){var a=1e3*e.routes[0].time*2+new Date(c.car.startTime).getTime()+18e5;c.car.endTime=new Date(a).format("yyyy-MM-dd hh:mm:ss"),c.searchBtnFlag=!1,localStorage.setItem("LddSearch",n()(c.car)),c.$router.push("/bus")}})},searchCar:function(){if(this.car.startTime){if("2"==this.car.travelType){if(this.car.isThrough="非直达",!this.car.endTime)return void c.a.toast("请选择到达日期时间");if(new Date(this.car.startTime).getTime()>new Date(this.car.endTime).getTime())return void c.a.toast("出发时间不能大于结束时间")}else this.car.isThrough="直达";if(new Date(this.car.startTime).getTime()-((new Date).getTime()+72e5)<0)c.a.toast("出发/用车时间必须大于2小时");else if(this.car.startAddress.CityId)if(this.car.endAddress.CityId)if("1"!=this.car.travelType)localStorage.setItem("LddSearch",n()(this.car)),this.$router.push("/bus");else{var t=this.car.startAddress.point.split(","),e=this.car.endAddress.point.split(",");this.computedTime(t[0],t[1],e[0],e[1])}else c.a.toast("请选择达到地址");else c.a.toast("请选择出发地址")}else c.a.toast("请选择出发/用车时间")},startAddress:function(t){var e=this;this.car.startAddress=t;var a=t.province+","+t.city+","+t.district;t={startAreaName:a,endAreaName:a};Object(l.A)(t).then(function(t){1==t.Code&&(e.car.startAddress.ProvinceId=t.Data.StartAreaId.ProvinceId,e.car.startAddress.CityId=t.Data.StartAreaId.CityId,e.car.startAddress.DistrictId=t.Data.StartAreaId.DistrictId)})},endAddress:function(t){var e=this;this.car.endAddress=t;var a=t.province+","+t.city+","+t.district;t={startAreaName:a,endAreaName:a};Object(l.A)(t).then(function(t){1==t.Code&&(e.car.endAddress.ProvinceId=t.Data.StartAreaId.ProvinceId,e.car.endAddress.CityId=t.Data.StartAreaId.CityId,e.car.endAddress.DistrictId=t.Data.StartAreaId.DistrictId)})}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"banner"},[a("el-carousel",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"carousel",attrs:{height:"460px",trigger:"click"},nativeOn:{click:function(e){return t.go(e)}}},[a("el-carousel-item",{staticStyle:{background:"url(../../../static/img/homeBanner/home-banner1.jpg)"}}),t._v(" "),a("el-carousel-item",{staticStyle:{background:"url(../../../static/img/homeBanner/home-banner2.jpg)"}}),t._v(" "),t._l(t.bannerList,function(t,e){return a("el-carousel-item",{key:e,style:"background:url("+t.ImageUrl+")"})})],2),t._v(" "),a("div",{staticClass:"homeSearch flex"},[a("div",{staticClass:"homeSearch-slide flex flex-v"},[a("div",{staticClass:"item flex-1 flex-align-center flex-pack-center flex flex-v",class:{on:0==t.num},on:{click:function(e){return t.changeMod(0)}}},[t._m(0),t._v(" "),a("div",[t._v("包租车")])]),t._v(" "),a("div",{staticClass:"item flex-1 flex-align-center flex-pack-center flex flex-v",class:{on:1==t.num},on:{click:function(e){return t.changeMod(1)}}},[t._m(1),t._v(" "),a("div",[t._v("接机")])]),t._v(" "),a("div",{staticClass:"item flex-1 flex-align-center flex-pack-center flex flex-v",class:{on:2==t.num},on:{click:function(e){return t.changeMod(2)}}},[t._m(2),t._v(" "),a("div",[t._v("送机")])]),t._v(" "),a("div",{staticClass:"item flex-1 flex-align-center flex-pack-center flex flex-v",class:{on:3==t.num},on:{click:function(e){return t.changeMod(3)}}},[t._m(3),t._v(" "),a("div",[t._v("高铁接客")])]),t._v(" "),a("div",{staticClass:"item flex-1 flex-align-center flex-pack-center flex flex-v",class:{on:4==t.num},on:{click:function(e){return t.changeMod(4)}}},[t._m(4),t._v(" "),a("div",[t._v("高铁送客")])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==t.num,expression:"num==0"}],staticClass:"homeSearch-main flex-1"},[a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("包车方式")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-radio-group",{staticClass:"radioGroup",model:{value:t.car.travelType,callback:function(e){t.$set(t.car,"travelType",e)},expression:"car.travelType"}},[a("el-radio",{attrs:{label:"1"}},[t._v("单程")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("往返")])],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("包车时间")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-col",{attrs:{span:24}},[a("el-date-picker",{staticClass:"red",staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"请选择出发时间"},model:{value:t.car.startTime,callback:function(e){t.$set(t.car,"startTime",e)},expression:"car.startTime"}})],1),t._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:2==t.car.travelType,expression:"car.travelType == 2"}],staticClass:"mtp",attrs:{span:24}},[a("el-date-picker",{staticClass:"red",staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"请选择还车时间"},model:{value:t.car.endTime,callback:function(e){t.$set(t.car,"endTime",e)},expression:"car.endTime"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("包车线路")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("tl-map",{attrs:{title:"请填写出发地址"},on:{getAddress:t.startAddress}}),t._v(" "),a("tl-map",{staticClass:"mtp",attrs:{title:"请填写还车地址"},on:{getAddress:t.endAddress}}),t._v(" "),a("div",{staticClass:"mtp flex flex-end"},[a("el-button",{attrs:{type:"warning",plain:"",loading:t.searchBtnFlag},on:{click:t.searchCar}},[t._v("查询车辆")])],1)],1)],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.num,expression:"num==1"}],staticClass:"homeSearch-main flex-1"},[a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("机场")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-select",{attrs:{placeholder:"请选择机场"},on:{change:t.selectChange},model:{value:t.car.region,callback:function(e){t.$set(t.car,"region",e)},expression:"car.region"}},t._l(t.airport,function(t,e){return a("el-option",{key:e,attrs:{label:t.LocationName,value:e}})}),1)],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("送达地点")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("tl-map",{attrs:{title:"必填,可从异地城市出发"},on:{getAddress:t.endAddress}})],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("用车时间")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-col",{attrs:{span:24}},[a("el-date-picker",{staticClass:"red",staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"请选择用车时间"},model:{value:t.car.startTime,callback:function(e){t.$set(t.car,"startTime",e)},expression:"car.startTime"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"mtp flex flex-end"},[a("el-button",{staticClass:"search",attrs:{type:"warning",plain:"",loading:t.searchBtnFlag},on:{click:t.searchCar}},[t._v("搜索")])],1)])],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==t.num,expression:"num==2"}],staticClass:"homeSearch-main flex-1"},[a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("机场")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-select",{attrs:{placeholder:"请选择机场"},on:{change:t.selectChange},model:{value:t.car.region,callback:function(e){t.$set(t.car,"region",e)},expression:"car.region"}},t._l(t.airport,function(t,e){return a("el-option",{key:e,attrs:{label:t.LocationName,value:e}})}),1)],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("出发地点")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("tl-map",{attrs:{title:"必填,可从异地城市出发"},on:{getAddress:t.startAddress}})],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("用车时间")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-col",{attrs:{span:24}},[a("el-date-picker",{staticClass:"red",staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"请选择用车时间"},model:{value:t.car.startTime,callback:function(e){t.$set(t.car,"startTime",e)},expression:"car.startTime"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"mtp flex flex-end"},[a("el-button",{staticClass:"search",attrs:{type:"warning",plain:"",loading:t.searchBtnFlag},on:{click:t.searchCar}},[t._v("搜索")])],1)])],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:3==t.num,expression:"num==3"}],staticClass:"homeSearch-main flex-1"},[a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("火车站")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-select",{attrs:{placeholder:"请选择火车站"},on:{change:t.selectChange},model:{value:t.car.region,callback:function(e){t.$set(t.car,"region",e)},expression:"car.region"}},t._l(t.train,function(t,e){return a("el-option",{key:e,attrs:{label:t.LocationName,value:e}})}),1)],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("送达地点")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("tl-map",{attrs:{title:"必填,可送达周边城市"},on:{getAddress:t.endAddress}})],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("用车时间")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-col",{attrs:{span:24}},[a("el-date-picker",{staticClass:"red",staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"请选择用车时间"},model:{value:t.car.startTime,callback:function(e){t.$set(t.car,"startTime",e)},expression:"car.startTime"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"mtp flex flex-end"},[a("el-button",{staticClass:"search",attrs:{type:"warning",plain:"",loading:t.searchBtnFlag},on:{click:t.searchCar}},[t._v("搜索")])],1)])],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:4==t.num,expression:"num==4"}],staticClass:"homeSearch-main flex-1"},[a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("火车站")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-select",{attrs:{placeholder:"请选择火车站"},on:{change:t.selectChange},model:{value:t.car.region,callback:function(e){t.$set(t.car,"region",e)},expression:"car.region"}},t._l(t.train,function(t,e){return a("el-option",{key:e,attrs:{label:t.LocationName,value:e}})}),1)],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("出发地点")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("tl-map",{attrs:{title:"必填,可送达周边城市"},on:{getAddress:t.startAddress}})],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-col",{staticClass:"title",attrs:{span:5}},[t._v("用车时间")]),t._v(" "),a("el-col",{attrs:{span:19}},[a("el-col",{attrs:{span:24}},[a("el-date-picker",{staticClass:"red",staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"请选择用车时间"},model:{value:t.car.startTime,callback:function(e){t.$set(t.car,"startTime",e)},expression:"car.startTime"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"mtp flex flex-end"},[a("el-button",{staticClass:"search",attrs:{type:"warning",plain:"",loading:t.searchBtnFlag},on:{click:t.searchCar}},[t._v("搜索")])],1)])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-Bus"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-jiejix"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-songjix"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-AK-JTgaotiex"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-AK-JTgaotiebeifenx"})])}]};var v={data:function(){return{list:["(1)”包租车”，用户选择全部旅游客运企业的车辆进行订单，选择车辆数量多、范围广，填写行程信息，支付定金，提交订单，即可以完成订单。</br>(2)”接机”、”送机”、”高铁送客”、”高铁接客”，是”包租车”的简易模式。</br>(3)”定制包车”，用户选择单个旅游客运企业的车辆进行订单，填写行程信息，支付定金，提交订单；或直接联系客运企业计调员代理包车。</br>(3)”协议包车”，用户与客运企业或平台签订租车协议，通过会员中心直接订单。","第一步，确定出发地、目的地、出发时间、还车时间，查询平台可用车辆情况。</br>第二步，确定座位数、车辆品牌、车龄，选择满足要求的车辆，进行车辆预订。</br>第三步，确认”行程路线”、”跟车人”、”联系电话”、”上车详细地址”，提交订单。</br>第四步，查看”我的订单”，与订单上的司机保持联系。","(1)安全:行程山路较多,或路程较长，为保障更安全，应选择车龄较短的车辆；</br>(2)车辆座位数:乘车人数(含小孩)，必须少于车辆座位数-2(司机、导游)，否则违法；</br>(3)包车方式:全包，含路桥费、燃油费；半包，不含路桥费、燃油费；用户可以自由选择。","(1) 定义:跟车人，是指用户包租车的带团联系人，或导游，方便车队联系；</br>(2) 跟车信息:订单信息列表栏，跟车信息，平台会自动显示订单人姓名和电话；</br>(3) 跟车人变更:需要变更带团人或导游，可以在订单时进行变更，或在订单人会员中心的订单内进行变更。","(1)订单填写:a订单中的“行程路线”，应按日按序填写行程中游玩、办事、住宿等停留地点，否则会造成包车行程公里数计算不正确，须在行程中办理包车订单补单手续；b订单“还车时间”，是指包车返程回到出发地的时间,用户须依此安排返程时间。</br>(2)包车价格组成:由台班费、燃油费、路桥费、车辆品牌、车辆等级、车辆使用年限和淡旺季价格系数等组成，不包括应由租户直接支付的停车费。</br>(3)订单付款：a订金，提交订单须按车辆半个或一个台班费支付定金，订单不成功，订金会自动退回原付款账户；b尾款，行程结束前，应在司机的监督下，通过平台，付清尾款。</br>(4)订单取消：取消订单会产生手续费。订单30分钟内取消，不收违约金；出发时间24小时前取消订单扣定金50%违约金;出发时间24小时以内取消订单扣定金100%违约金。应退款金额，平台在2个工作日内平台自动退回原付款账户。</br>(5)订单补单。客户在行程中调整行程和时间，并增加了行程或时间，且车辆与其他订单时间不冲突，客户跟车管理人员应与司机商定并办理订单补单手续，否则不得调整行程和时间。 </br>(6)包车须知是租车合同的补充约定，请认真阅读租车合同。"],title:["包车模式","订单步骤","优选车辆","跟车人","包车须知"]}},methods:{go:function(t){var e=this.$router.resolve({path:"/question?id="+t+"&num=2"});window.open(e.href,"_blank")}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nav"},[a("div",{staticClass:"w1200 flex"},[a("div",{staticClass:"nav-item flex flex-1 flex-align-center flex-pack-center",on:{click:function(e){return t.go("item5")}}},[t._m(0),t._v(" "),t._m(1)]),t._v(" "),a("div",{staticClass:"nav-item flex flex-1 flex-align-center flex-pack-center",on:{click:function(e){return t.go("item6")}}},[t._m(2),t._v(" "),t._m(3)]),t._v(" "),a("div",{staticClass:"nav-item flex flex-1 flex-align-center flex-pack-center",on:{click:function(e){return t.go("item7")}}},[t._m(4),t._v(" "),t._m(5)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"left"},[e("div",{staticClass:"img2"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right"},[e("div",{staticClass:"title"},[this._v("包车模式")]),this._v(" "),e("div",{staticClass:"eng"},[this._v("Chartered car mode")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"left"},[e("div",{staticClass:"img3"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right"},[e("div",{staticClass:"title"},[this._v("订单步骤")]),this._v(" "),e("div",{staticClass:"eng"},[this._v("Order steps")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"left"},[e("div",{staticClass:"img1"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right"},[e("div",{staticClass:"title"},[this._v("优选车辆")]),this._v(" "),e("div",{staticClass:"eng"},[this._v("Preferred vehicle")])])}]};var m={data:function(){return{onNum:0,nextList:[],prevList:[]}},created:function(){},methods:{go:function(t){var e=this.$router.resolve({path:"/question?id="+t+"&num=2"});window.open(e.href,"_blank")},nextQuestion:function(){var t=this;Object(l.G)().then(function(e){t.prevloading=!1,1==e.Code&&e.Data.length>6&&(t.nextList=e.Data.splice(0,6))})},prveQuestion:function(){var t=this;Object(l.H)().then(function(e){t.nextloading=!1,1==e.Code&&(t.prevList=e.Data[0].BacNoticeList)})}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"busRaides"},[a("div",{staticClass:"w1200"},[a("div",{staticClass:"busRaides-title"},[t._v("包车攻略")]),t._v(" "),a("div",{staticClass:"busRaides-main flex flex-pack-justify"},[a("div",{staticClass:"accordion flex"},[a("div",{staticClass:"accordion-item img1",class:0==t.onNum?"on":"",on:{mouseover:function(e){t.onNum=0}}},[a("div",{staticClass:"accordion-title",on:{click:function(e){return t.go("item0")}}},[t._v("跟车人怎样填写更改")])]),t._v(" "),a("div",{staticClass:"accordion-item img2",class:1==t.onNum?"on":"",on:{mouseover:function(e){t.onNum=1}}},[a("div",{staticClass:"accordion-title",on:{click:function(e){return t.go("item1")}}},[t._v("行程中需要增加行程或时间怎样处理")])]),t._v(" "),a("div",{staticClass:"accordion-item img3",class:2==t.onNum?"on":"",on:{mouseover:function(e){t.onNum=2}}},[a("div",{staticClass:"accordion-title",on:{click:function(e){return t.go("item2")}}},[t._v("行程路线怎样填写")])]),t._v(" "),a("div",{staticClass:"accordion-item img4",class:3==t.onNum?"on":"",on:{mouseover:function(e){t.onNum=3}}},[a("div",{staticClass:"accordion-title",on:{click:function(e){return t.go("item3")}}},[t._v("取消订单需要注意什么")])]),t._v(" "),a("div",{staticClass:"accordion-item img5",class:4==t.onNum?"on":"",on:{mouseover:function(e){t.onNum=4}}},[a("div",{staticClass:"accordion-title",on:{click:function(e){return t.go("item4")}}},[t._v("一个订单订多个车辆怎样取消？怎样结账")])]),t._v(" "),a("div",{staticClass:"accordion-item img6",class:5==t.onNum?"on":"",on:{mouseover:function(e){t.onNum=5}}},[a("div",{staticClass:"accordion-title",on:{click:function(e){return t.go("item5")}}},[t._v("怎样选择包车模式")])])]),t._v(" "),a("div",{staticClass:"question flex-1"},[a("div",{staticClass:"title"},[t._v("包车常见问题")]),t._v(" "),a("div",{staticClass:"info"},[a("div",{staticClass:"infoGo",on:{click:function(e){return t.go("item0")}}},[t._v("跟车人怎样填写更改")]),t._v(" "),a("div",{staticClass:"infoGo",on:{click:function(e){return t.go("item1")}}},[t._v("行程中需要增加行程或时间怎样处理")]),t._v(" "),a("div",{staticClass:"infoGo",on:{click:function(e){return t.go("item2")}}},[t._v("行程路线怎样填写")]),t._v(" "),a("div",{staticClass:"infoGo",on:{click:function(e){return t.go("item3")}}},[t._v("取消订单需要注意什么")]),t._v(" "),a("div",{staticClass:"infoGo",on:{click:function(e){return t.go("item4")}}},[t._v("一个订单订多个车辆怎样取消？怎样结账")]),t._v(" "),a("div",{staticClass:"infoGo",on:{click:function(e){return t.go("item5")}}},[t._v("怎样选择包车模式")])]),t._v(" "),t._m(0)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"spr flex flex-wrap"},[e("div",{staticClass:"item"},[this._v("订单取消")]),this._v(" "),e("div",{staticClass:"item red"},[this._v("GPS导航")]),this._v(" "),e("div",{staticClass:"item"},[this._v("领队")]),this._v(" "),e("div",{staticClass:"item red"},[this._v("服务评价")])])}]};var f={data:function(){return{loading:!0,city:JSON.parse(localStorage.getItem("LddCity"))||{},typeList:[],carList:[],typeNum:0,typeId:"",pageIndex:1,pageCount:1,prevFlag:!1,nextFlag:!1,searchInput:""}},created:function(){this.getCar()},methods:{go:function(t){this.$router.push("/bus?enterpriseId="+t)},pop:function(t){var e="";t.forEach(function(t){e+="<div>"+t.UserName+" "+t.UserPhone+"</div>"}),this.$alert(e,"计调人员",{dangerouslyUseHTMLString:!0})},search:function(){this.pageIndex=1,this.getCar()},getCar:function(){var t=this,e={pageIndex:this.pageIndex,pageSize:6,enterpriseName:this.searchInput,address:this.city.Name};this.loading=!0,Object(l.m)(e).then(function(e){1==e.Code&&(e.Data.forEach(function(t){t.flag=!1}),t.carList=e.Data,t.loading=!1,t.pageCount=e.PageCount,t.prevFlag=1!=t.pageIndex,t.nextFlag=t.pageIndex!=t.pageCount)})},changeType:function(t,e){this.pageIndex=1,this.typeNum!=e&&(this.typeId=t,this.typeNum=e,this.getCar())},prev:function(){this.pageIndex>1&&(this.pageIndex--,this.getCar())},next:function(){this.pageIndex<this.pageCount&&(this.pageIndex++,this.getCar())}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hotBus"},[a("div",{staticClass:"w1200"},[a("div",{staticClass:"hotBus-title flex flex-pack-justify",staticStyle:{"align-items":"flex-end"}},[a("div",{staticClass:"title"},[t._v("客运企业")]),t._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入企业名称"},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.search},slot:"append"})],1)],1),t._v(" "),a("div",{staticClass:"hotMain flex"},[a("div",{staticClass:"banner"}),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"slideWrap flex-1"},[a("div",{staticClass:"slide flex flex-wrap"},t._l(t.carList,function(e,s){return a("div",{key:s,staticClass:"slide-item",on:{mouseleave:function(t){e.flag=!1},mouseover:function(t){e.flag=!0}}},[a("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.Image,expression:"item.Image",arg:"background-image"}],staticClass:"img"}),t._v(" "),a("div",{staticClass:"flex flex-pack-justify flex-align-center info"},[a("div",{staticClass:"set"},[t._v(t._s(e.Name))]),t._v(" "),a("div",{staticClass:"el-icon-arrow-right"})]),t._v(" "),a("transition",{attrs:{name:"fade"}},[e.flag?a("div",{staticClass:"slide-bg"},[a("div",{staticClass:"slide-bgEn"},[t._v(t._s(e.Name))]),t._v(" "),a("div",{staticClass:"flex flex-pack-justify slide-jd"},[a("div",[t._v("计调人员：")]),t._v(" "),a("div",{staticClass:"flex-1"},t._l(e.Conetect,function(e,s){return s<3?a("div",[t._v(t._s(e.UserName)+" "+t._s(e.UserPhone))]):t._e()}),0)]),t._v(" "),a("div",{staticClass:"btn"},[e.Conetect.length>2?a("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(a){return t.pop(e.Conetect)}}},[t._v("全部计调")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"success",size:"small"},on:{click:function(a){return t.go(e.ID)}}},[t._v("查询车辆")])],1)]):t._e()])],1)}),0),t._v(" "),t.prevFlag?a("div",{staticClass:"pagechange prev flex flex-align-center flex-pack-center",on:{click:t.prev}},[a("i",{staticClass:"el-icon-arrow-left"})]):t._e(),t._v(" "),t.nextFlag?a("div",{staticClass:"pagechange next flex flex-align-center flex-pack-center",on:{click:t.next}},[a("i",{staticClass:"el-icon-arrow-right"})]):t._e()])])])])},staticRenderFns:[]};var g={components:{tlBanner:a("VU/8")(o,d,!1,function(t){a("oa9I")},"data-v-0e13a2a0",null).exports,tlNav:a("VU/8")(v,u,!1,function(t){a("L7MR")},"data-v-2c8e2226",null).exports,tlBusRaides:a("VU/8")(m,h,!1,function(t){a("9Uc6")},"data-v-765b0b35",null).exports,tlHotBus:a("VU/8")(f,p,!1,function(t){a("4MJK")},"data-v-2d8ba9bf",null).exports},metaInfo:{title:"逸出游包车平台",meta:[{name:"description",content:"逸出游包车平台，是中国第一个实现全域旅游客运车辆数据互联互通的旅游包车订单平台，可以满足不同城市旅游客运公司运营的个性化需求，特别为包车包车用户提供了精、准、快的便捷服务。"},{name:"keywords",content:"逸出游包车平台 包租车 定制包车 特价包车。"}]}},_={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page"},[e("tl-banner"),this._v(" "),e("tl-nav"),this._v(" "),e("tl-hot-bus"),this._v(" "),e("tl-bus-raides")],1)},staticRenderFns:[]};var C=a("VU/8")(g,_,!1,function(t){a("Sg3H")},null,null);e.default=C.exports},oa9I:function(t,e){}});
//# sourceMappingURL=4.8bd40cf98d112e3baac2.js.map