import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
	// mode:'history',
	routes: [{
			path: '*',
			redirect: '/',
		},
		{
			path: '/',
			name: 'home',
			cls: 'home',
			component: resolve => require(['@/components/index'], resolve)
		},
		{
			path: '/banner',
			name: 'banner',
			component: resolve => require(['@/components/banner/banner'], resolve)
		},
		{
			path: '/login', //登录
			name: 'login',
			component: resolve => require(['@/components/login/login'], resolve)
		},
		{
			path: '/forget', //找回密码
			name: 'forget',
			component: resolve => require(['@/components/login/forget'], resolve)
		},
		{
			path: '/register', //注册
			name: 'register',
			component: resolve => require(['@/components/login/register'], resolve)
		},
		{
			path: '/bus', //包租车
			name: 'bus',
			cls: 'bus',
			component: resolve => require(['@/components/bus/bus'], resolve)
		},
		{
			path: '/busDetail', //包租车详情
			name: 'busDetail',
			component: resolve => require(['@/components/bus/busDetail'], resolve)
		},
		{
			path: '/enterprise', //定制包车
			name: 'enterprise',
			cls: 'enterprise',
			component: resolve => require(['@/components/enterprise/enterprise'], resolve)
		},
		{
			path: '/about/:num', //关于我们
			name: 'about',
			cls: 'about',
			component: resolve => require(['@/components/about/about'], resolve)
		},
		{
			path: '/question', //常见问题
			name: 'question',
			component: resolve => require(['@/components/about/question'], resolve)
		},
		{
			path: '/pay', //付款
			name: 'pay',
			component: resolve => require(['@/components/pay/pay'], resolve)
		},
		{
			path: '/payGateWay', //付款
			name: 'payGateWay',
			component: resolve => require(['@/components/pay/payGateWay'], resolve)
		},
		{
			path: '/user/detail',
			name: 'orderDetail',
			component: resolve => require(['@/components/user/orderMange/detail'], resolve)
		},
		{
			path: '/user/invoiceDetail',
			name: 'orderDetail',
			component: resolve => require(['@/components/user/invoiceMange/detail'], resolve)
		},
		{
			path: '/user', //我的订单
			name: 'user',
			component: resolve => require(['@/components/user/user'], resolve),
			children: [{
					path: '/user',
					name: 'user',
					component: resolve => require(['@/components/user/orderMange/order'], resolve)
				},

				{
					path: '/user/userCenter/repair',
					name: 'userCenter',
					component: resolve => require(['@/components/user/userCenter/repair'], resolve)
				},
				{
					path: '/user/signMangge/signList',
					name: 'signMangge',
					component: resolve => require(['@/components/user/signMangge/signList'], resolve)
				},
				{
					path: '/user/busBill/index',
					name: 'busBill',
					component: resolve => require(['@/components/user/busBill/index'], resolve)
				},
				{
					path: '/user/busBill/confirm',
					name: 'busBill',
					component: resolve => require(['@/components/user/busBill/confirm'], resolve)
				},
				{
					path: '/user/busBill/unconfirm',
					name: 'busBill',
					component: resolve => require(['@/components/user/busBill/unconfirm'], resolve)
				},
				{
					path: '/user/protocolBill/flow',
					name: 'protocolBill',
					component: resolve => require(['@/components/user/protocolBill/flow'], resolve)
				},
				{
					path: '/user/protocolBill/settle',
					name: 'protocolBill',
					component: resolve => require(['@/components/user/protocolBill/settle'], resolve)
				},
				{
					path: '/user/protocolBill/unsettle',
					name: 'protocolBill',
					component: resolve => require(['@/components/user/protocolBill/unsettle'], resolve)
				},
				{
					path: '/user/invoiceMange/title',
					name: 'invoiceMange',
					component: resolve => require(['@/components/user/invoiceMange/title'], resolve)
				},
				{
					path: '/user/invoiceMange/invoice',
					name: 'invoiceMange',
					component: resolve => require(['@/components/user/invoiceMange/invoice'], resolve)
				},
				{
					path: '/user/invoiceMange/uninvoice',
					name: 'invoiceMange',
					component: resolve => require(['@/components/user/invoiceMange/uninvoice'], resolve)
				}
			]
		}
	]
})
