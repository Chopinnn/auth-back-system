import {
	createRouter,
	createWebHashHistory
} from "vue-router";
import store from "@/store";
import layout from "@/layout";
import permissions from "./modules/permissions";
import system from "./modules/system";
import service from "./modules/service";

// 白名单（不需要登录的界面）
const whiteList = ["/login"];

/**
 * 私有路由表
 */
export const privateRoutes = [
	permissions,
	service,
	system
];

/**
 * 公开路由表
 */
export const publicRoutes = [
	{
		path: "/login",
		component: () => import("@/views/login/index")
	},
	{
		path: "/",
		component: layout,
		redirect: "/home",
		children: [
			{
				path: "/home",
				name: "home",
				component: () => import("@/views/home/index"),
				meta: { title: "首页", icon: "home", affix: true }, // affix=true,tagViews右侧没有关闭按钮
				hidden: false
			},
			{
				path: "/404",
				name: "404",
				component: () => import("@/views/error-page/404")
			}
		]
	},
	{
		path: "/:pathMatch(.*)*",
		name: "404",
		component: () => import("@/views/error-page/404")
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: [...publicRoutes,...privateRoutes]
});

/**
 * 路由前置守卫
 */
router.beforeEach(async(to, from, next) => {
	// 存在 token ，进入主页
	if (store.getters.token) { // 当前存在token，如果此时去登录界面，自动跳转到主页
		next();
	} else {
		// 没有token的情况下，可以进入白名单
		if (whiteList.indexOf(to.path) > -1) {
			next();
		} else { // 如果是需要登录的界面，去登录界面
			next("/login");
		}
	}
});

export default router;