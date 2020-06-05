import {post,get,jsonp} from './http.js'
//短信请求
const Code = async (data) => post('/api/SysSms/PhoneShortcut',data || {});
//短信登录
const CodeLogin = async (data) => post('/api/Login/MemUserLoginByMsg',data || {});
//账号密码登录
const Login = async (data) => post('/api/Login/MemUserLoginByName',data || {});
//找回密码
const ForgetLogin = async (data) => post('/api/MemUser/ForgetUserRegister',data || {});
//找回密码短信
const ForgetCode = async (data) => get('/api/MemUser/ForgetUserCode',data || {});
//注册账号
const Register = async (data) => post('/api/MemUser/RegisterUser',data || {});
//注册账号
const RegisterCode = async (data) => get('/api/MemUser/RegisterUserSendMsg',data || {});
//首页获取城市信息
const getCity = async (data) => get('/api/BacSys/GetCityByCityName',data || {});
//首页获取城市信息
const getCityNew = async (data) => get('/api/BacSys/GetCityByCityNameNew',data || {});
//首页获取banner
const homeBanner = async (data) => post('/api/BacCityPlatform/GetHomePageCityImage',data || {});
//首页通过品牌ID，类型ID获取车辆列表
const homeCar = async (data) => get('/api/BacSys/GetCarListByTypeId',data || {});
//首页获取品牌ID，类型ID,车辆ID
// const homeCarTitle = async (data) => get('/api/BacSys/GetBacSys',data || {});
const homeCarTitle = async (data) => get('/api/BacSys/GetBacSysNames',data || {});
//首页左问题
const homeNextQuestion = async (data) => get('/api/BacSys/GetBacNoticeList',data || {});
//首页右问题
const homePrevQuestion = async (data) => get('/api/BacSys/GetBacNoticeTypeList',data || {});
//bus第一次加载列表数据
const busFirst = async (data) => get('/api/RentCharter/GetCarListByCity',data || {});
//bus获取客运企业
const busCompany = async (data) => get('/api/BacEnterprise/GetEnterpriseByCity',data || {});
//bus获取客运企业
const busPriceList = async (data,page,size) => post('/api/RentCharter/GetCarInfoByCharter?pageIndex='+page+'&pageSize='+size,data || {});
//bus获取客运企业
const busHomeList = async (data,page,size) => get('/api/BacEnterprise/GetEnterpriseByLonLat',data || {});
//获取机场
const getCommonlyLocation = async (data) => get('/api/CommonlyLocation/GetCommonlyLocation',data || {});
//getPrantId//获取省市ID
const getPrantId = async (data) => get('/api/BacSys/GeAreaId',data || {});
//isServiceable//判断车辆是否被预订
const isServiceable = async (data,carId) => post('/api/RentCharter/IsServiceable?carId='+carId,data || {});
//lockCars锁定车辆，并存入缓存
const lockCars = async (data) => post('/api/RentCharter/LockCars',data || {});
//lockCars锁定车辆，并存入缓存
const removelockCars = async (data) => post('/api/RentCharterOrder/RemoveBacPreordainOrder',data || {});
//查看预定车辆详情
const findLockCars = async (data) => post('/api/RentCharter/GetCarsById',data || {});
//车辆计价
const orderByPrice = async (data) => post('/api/RentCharterOrder/PreordainOrderByPrice',data || {});
//修改购物车
const OrderModify = async (data) => post('/api/RentCharterOrder/PreordainOrderModify',data || {});
//合同条款
const orderContract = async (data) => get('/api/CommonOrder/GeBacContract',data || {});
//提交订单
const orderSubmit = async (data) => post('/api/RentCharterOrder/AddOrder',data || {});
//订单支付状态
const payStatus = async (data) => post('/api/BacPay/GetPcOrderPayStatus',data || {});
//微信支付
const wxPay = async (data) => post('/api/BacPay/GetCharterPcWeiXinPayInfoNew',data || {});
//支付宝支付
const baoPay = async (data) => post('/api/BacPay/GetCharterPcAliPayInfo',data || {});
//综合订单查询
const getAllOrderList = async (data) => post('/api/CommonOrder/GetAllOrderList',data || {});
//取消订单
const orderCancel = async (data) => post('/api/RentCharterOrder/CancelOrderByRentCharter',data || {});
//判断是否为本人操作
const oneself = async (data) => post('/api/CommonOrder/GetCurrentIdentityIsCancelOrder',data || {},true);
//判断是否为本人操作
const orderFlow = async (data) => post('/api/OrderBalanceList/GetOrderBalanceList',data || {},true);
//判断是否为本人操作
const updateUserPassWord = async (data) => post('/api/MemUser/UpdateUserPassWord',data || {},true);
//获取订单详情
const getOrderDetails = async (data) => get('/api/RentCharterOrder/GetOrderDetails',data || {},true);
//获取订单详情
const getCarOrderList = async (data) => get('/api/BacCarOrder/GetCarOrderListByCharterOrderId',data || {},true);
//获取未结算订单
const getUnSettleOrderList = async (data) => post('/api/SettleOrder/GetUnSettleOrderList',data || {},true);
//未结算订单结算
const settleOrder = async (data) => get('/api/SettleOrder/SettleOrder?code='+data,{},true);
//获取结算订单
const getSettledOrderList = async (data) => post('/api/SettleOrder/GetSettledOrderList',data || {},true);
//发票查询
const getInvoicedOrderList = async (data) => post('/api/InvoiceManage/GetInvoicedOrderList',data || {},true);
//传入用户ID获取发票抬头列表
const getInvoiceBaseList = async (data) => get('/api/InvoiceManage/GetInvoiceBaseList',data || {},true);
//申请开票
const orderInvoicing = async (data) => post('/api/InvoiceManage/OrderInvoicing',data || {},true);
//开票列表
const getInvoicedDetailInfoList = async (data) => post('/api/InvoiceManage/GetInvoicedDetailInfoList',data || {},true);
//发票相信
const getInvoicedInfoDetail = async (data) => get('/api/InvoiceManage/GetInvoicedInfoDetail' ,data || {},true);
//发票相信
const saveOperateInvoiceBase = async (data) => post('/api/InvoiceManage/SaveOperateInvoiceBase' ,data || {},true);
//发票相信
const delOperateInvoiceBase = async (data) => post('/api/InvoiceManage/DelOperateInvoiceBase' ,data || {},true);
//发票相信
const signatureList = async (data) => post('/api/BacEnterprise/SignatureList?pageIndex='+data.PageIndex+'&pageSize='+data.PageSize+'&searchKey='+data.searchKey , {},true);
// 获取包车对账批次列表
const getReconciliationBatch = async (data) => post('/api/ReconciliationBatch/GetReconciliationBatch', data|| {},true);
// 客户对账待确认列表
const unconfirmedOrderList = async (data) => post('/api/ReconciliationDetail/UnconfirmedOrderList', data || {});
// 客户对账已确认列表
const confirmedOrderList = async (data) => post('/api/ReconciliationDetail/ConfirmedOrderList', data || {});
// 客户提交确认对账信息
const addConfirmedInfo = async (data) => post('/api/ReconciliationDetail/AddConfirmedInfo', data || {},true);
// 司机车辆评价Item
const getAppraiseItem = async (data) => get('/api/BacAppraise/GetAppraiseItem?groupName=appraiseItem_enterprises', data || {});
//  用户添加对客企的评价信息
const addAppraise = async (data) => post('/api/BacAppraise/AddAppraise', data || {},true);
// 获取订单的评价信息
const getOrderAppraise = async (data) => get('/api/BacAppraise/GetOrderAppraise', data || {});

export{
	Code,
	CodeLogin,
	Login,
	ForgetLogin,
	Register,
	ForgetCode,
	RegisterCode,
	getCity,
	getCityNew,
	homeBanner,
	homeCarTitle,
	homeCar,
	homeNextQuestion,
	homePrevQuestion,
	busFirst,
	getCommonlyLocation,
	busCompany,
	busPriceList,
	busHomeList,
	getPrantId,
	isServiceable,
	lockCars,
	findLockCars,
	orderByPrice,
	OrderModify,
	orderContract,
	orderSubmit,
	payStatus,
	wxPay,
	baoPay,
	getAllOrderList,
	orderCancel,
	oneself,
	orderFlow,
	updateUserPassWord,
	getOrderDetails,
	getCarOrderList,
	getUnSettleOrderList,
	settleOrder,
	getSettledOrderList,
	getInvoicedOrderList,
	getInvoiceBaseList,
	orderInvoicing,
	getInvoicedDetailInfoList,
	getInvoicedInfoDetail,
	saveOperateInvoiceBase,
	delOperateInvoiceBase,
	signatureList,
	removelockCars,
	getReconciliationBatch,
	unconfirmedOrderList,
	addConfirmedInfo,
	confirmedOrderList,
	getAppraiseItem,
	addAppraise,
	getOrderAppraise
}