import Layout from "@/layout";

export default {
	path: "/user",
	component: Layout,
	redirect: "/user/index",
	alwaysShow: true, // will always show the root menu
	children: [
		{
			path: "/user/index",
			component: () => import("@/views/user/index.vue"),
			name: "user",
			meta: { title: "用户管理", icon: "personnel" }
		},
		{
			path: "/account/detail",
			name: "accountDetail",
			component: () => import("@/views/user/detail.vue"),
			meta: { title: "用户详情" },
			hidden: true // true不显示在侧边栏
		}

	]
};