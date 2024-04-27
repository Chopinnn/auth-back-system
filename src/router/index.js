import {
	createRouter,
	createWebHashHistory
} from "vue-router";
import store from "@/store";
import layout from "@/layout";
import user from "./modules/user";
import system from "./modules/system";
import service from "./modules/service";
import { isCheckTimeout } from "@/utils/auth";
import { ElMessage } from "element-plus";

// 白名单（不需要登录的界面）
const whiteList = ["/login"];

/**
 * 私有路由表
 */
export const privateRoutes = [
	user,
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
	// 存在 token ，可以放行
	if (store.getters.token) {
		if (isCheckTimeout()) {
			ElMessage.warning("请重新登录！");
			store.dispatch("user/logout");
			next("/login");
		} else {	// 存在token且未过期
			next();
		}
	} else {
		// 没有token或过期的情况下，可以进入白名单
		if (whiteList.indexOf(to.path) > -1) {
			next();
		} else { // 如果是需要登录的界面，去登录界面
			next("/login");
		}
	}
});

export default router;