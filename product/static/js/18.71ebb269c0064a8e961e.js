webpackJsonp([18],{lOKS:function(t,e){},mcWf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gwNS"),r=a("+zM7"),l={data:function(){return{search:{id:"",time:[],key:""},pageIndex:1,TotalCount:0,pageSize:8,tableData:[],dialogFormVisible:!1,dialogForm:!0,loading:!0,submitFlag:!1,formID:"",form:{driver:"1",driverList:[],driverOK:[],driverNO:[],driverDesc:"",car:"1",carList:[],carOK:[],carNO:[],carDesc:""},formLabelWidth:"120px"}},created:function(){this.getList()},filters:{time:function(t){return"string"==typeof t?t.substr(0,16):t}},methods:{AddAppraiseInfo:function(t){this.formID=t,this.getAppraiseItem(),this.dialogFormVisible=!this.dialogFormVisible},orderSubmit:function(){var t=this,e=this.form,a=[],l={CarOrderId:this.formID,AppraiseObject:2,AppraiseStatus:e.driver,AppraiseContents:e.driverList.join(","),Remark:e.driverDesc},s={CarOrderId:this.formID,AppraiseObject:3,AppraiseStatus:e.car,AppraiseContents:e.carList.join(","),Remark:e.carDesc};a.push(l,s),this.submitFlag=!0,Object(i.i)(a).then(function(e){t.submitFlag=!1,t.dialogFormVisible=!t.dialogFormVisible,1==e.Code?r.a.toast({type:"success",message:"评价成功"}):r.a.toast({type:"info",message:e.Msg})})},change:function(t){this.pageIndex=t,this.getList()},getList:function(){var t=this,e={PageIndex:this.pageIndex,PageSize:this.pageSize,ID:this.search.id,InsertStartTime:"",InsertEndTime:"",Key:this.search.key};this.search.time.length&&(e.InsertStartTime=this.search.time[0],e.InsertEndTime=this.search.time[1]),this.loading=!0,Object(i.o)(e).then(function(e){t.loading=!1,1==e.Code&&(console.log(e),t.TotalCount=e.TotalCount,t.tableData=e.Data)})},onSubmit:function(){this.pageIndex=1,this.getList()},getAppraiseItem:function(){var t=this,e=this.form;e.carOK.length||(this.dialogForm=!0,Object(i.r)().then(function(a){setTimeout(function(e){return t.dialogForm=!1},500);var i=a.filter(function(t){return 2==t.Obj}),r=a.filter(function(t){return 3==t.Obj});e.carList=e.carOK=r.filter(function(t){return 1==t.Val})[0].ChildItem,e.carNO=r.filter(function(t){return 2==t.Val})[0].ChildItem,e.driverList=e.dirverOK=i.filter(function(t){return 1==t.Val})[0].ChildItem,e.dirverNO=i.filter(function(t){return 2==t.Val})[0].ChildItem}))}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order"},[a("div",{staticClass:"title"},[t._v("订单已确认列表")]),t._v(" "),a("el-form",{staticClass:"demo-form-inline",staticStyle:{"border-bottom":"none"},attrs:{inline:!0,model:t.search}},[a("el-form-item",{attrs:{label:"订单编号"}},[a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"订单编号"},model:{value:t.search.id,callback:function(e){t.$set(t.search,"id",e)},expression:"search.id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"下单时间"}},[a("el-date-picker",{staticStyle:{width:"250px"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"daterange","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["00:00:00","23:59:59"]},model:{value:t.search.time,callback:function(e){t.$set(t.search,"time",e)},expression:"search.time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"关键字"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"客企名\\员工名称\\行程"},model:{value:t.search.key,callback:function(e){t.$set(t.search,"key",e)},expression:"search.key"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.onSubmit}},[t._v("查询")])],1)],1),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"orderTable"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"header-cell-style":{background:"#eef1f6",color:"#606266"}}},[a("el-table-column",{attrs:{type:"expand",width:"30"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand flex flex-wrap",attrs:{"label-position":"left"}},[a("div",{staticClass:"item w1"},[a("div",{staticClass:"item-in"},[a("span",[t._v("包租车：")]),t._v(t._s(e.row.TravelTypeName)+" "+t._s(e.row.TravelFormTypeName))]),t._v(" "),a("div",{staticClass:"item-in"},[a("span",[t._v("员工：")]),t._v(t._s(e.row.MemUserName))])]),t._v(" "),a("div",{staticClass:"item w2"},[a("div",{staticClass:"item-in"},[a("span",[t._v("出发时间：")]),t._v(t._s(t._f("time")(e.row.StartTime)))]),t._v(" "),a("div",{staticClass:"item-in"},[a("span",[t._v("达到时间：")]),t._v(t._s(t._f("time")(e.row.EndTime)))])]),t._v(" "),a("div",{staticClass:"item flex-1"},[a("div",{staticClass:"item-in"},[a("span",[t._v("已付款：")]),a("b",{staticClass:"orderStatus"},[t._v(t._s(e.row.PayMoney))]),t._v(" 元")]),t._v(" "),a("div",{staticClass:"item-in"},[a("span",[t._v("下欠款：")]),a("b",{staticClass:"orderStatus"},[t._v(t._s(e.row.DebtMoney))]),t._v(" 元")])])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"订单号",width:"200",align:"center","tooltip-effect":"dark"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:"/user/detail?id="+e.row.CharterOrderId,target:"_blank"}},[t._v(t._s(e.row.CharterOrderId))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"车辆信息",width:"90",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.CarNo))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"行程信息",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"oneline",attrs:{title:e.row.StartPositionCityName+"→"+e.row.EndPostionCityName}},[t._v(t._s(e.row.StartPositionCityName)+"\n\t\t\t\t\t\t→ "+t._s(e.row.EndPostionCityName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"订单金额",width:"90",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"orderStatus"},[t._v(t._s(e.row.TotalMoney)+" 元")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"对账信息",width:"160",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.ReconciliationDetails?a("div",[a("div",{staticClass:"flex"},[a("span",{staticStyle:{width:"80px"}},[t._v("确认金额:")]),a("span",{staticClass:"flex-1 oneline"},[t._v(t._s(e.row.ReconciliationDetails.UserMoney)+"\n\t\t\t\t\t\t\t\t元")])]),t._v(" "),a("div",{staticClass:"flex"},[a("span",{staticStyle:{width:"80px"}},[t._v("对账差额:")]),a("span",{staticClass:"flex-1 oneline"},[t._v(t._s(e.row.ReconciliationDetails.Difference)+"\n\t\t\t\t\t\t\t\t元")])])]):a("div",[t._v("-")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"差额备注",width:"140",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.ReconciliationDetails?a("div",[a("div",[t._v(t._s(e.row.ReconciliationDetails.Remark))])]):a("div",[t._v("\n\t\t\t\t\t\t-\n\t\t\t\t\t")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"80",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.IsAppraise?a("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("已评价")]):a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.AddAppraiseInfo(e.row.ID)}}},[t._v("评价")])]}}])})],1),t._v(" "),t.TotalCount>8?a("el-pagination",{attrs:{"page-size":t.pageSize,background:"",layout:"prev, pager, next",total:t.TotalCount},on:{"current-change":t.change}}):t._e()],1),t._v(" "),a("el-dialog",{attrs:{title:"订单评价",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.dialogForm,expression:"dialogForm"}],ref:"form",attrs:{model:t.form,"label-width":t.formLabelWidth}},[a("el-form-item",{attrs:{label:"司机满意度"}},[a("el-radio-group",{model:{value:t.form.driver,callback:function(e){t.$set(t.form,"driver",e)},expression:"form.driver"}},[a("el-radio",{attrs:{label:"1"}},[t._v("满意")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("不满意")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"评价选项"}},[a("el-checkbox-group",{model:{value:t.form.driverList,callback:function(e){t.$set(t.form,"driverList",e)},expression:"form.driverList"}},[1==t.form.driver?t._l(t.form.dirverOK,function(e,i){return a("el-checkbox",{key:i,attrs:{label:e,name:"dirverOK"}},[t._v(t._s(e))])}):t._l(t.form.dirverNO,function(e,i){return a("el-checkbox",{key:i,attrs:{label:e,name:"dirverNO"}},[t._v(t._s(e))])})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"评价描述"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请填写对司机描述信息"},model:{value:t.form.driverDesc,callback:function(e){t.$set(t.form,"driverDesc",e)},expression:"form.driverDesc"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"车辆满意度"}},[a("el-radio-group",{model:{value:t.form.car,callback:function(e){t.$set(t.form,"car",e)},expression:"form.car"}},[a("el-radio",{attrs:{label:"1"}},[t._v("满意")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("不满意")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"评价选项"}},[a("el-checkbox-group",{model:{value:t.form.carList,callback:function(e){t.$set(t.form,"carList",e)},expression:"form.carList"}},[1==t.form.car?t._l(t.form.carOK,function(e,i){return a("el-checkbox",{key:i,attrs:{label:e,name:"carOK"}},[t._v(t._s(e))])}):t._l(t.form.carNO,function(e,i){return a("el-checkbox",{key:i,attrs:{label:e,name:"carNO"}},[t._v(t._s(e))])})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"评价描述"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请填写对车辆描述信息"},model:{value:t.form.carDesc,callback:function(e){t.$set(t.form,"carDesc",e)},expression:"form.carDesc"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.submitFlag,expression:"submitFlag"}],attrs:{type:"primary"},on:{click:t.orderSubmit}},[t._v("确 定")]),t._v(" "),a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(l,s,!1,function(t){a("lOKS")},"data-v-5be92af4",null);e.default=o.exports}});
//# sourceMappingURL=18.71ebb269c0064a8e961e.js.map