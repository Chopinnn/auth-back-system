import Layout from "@/layout";

export default {
	path: "/system",
	component: Layout,
	redirect: "/system/index",
	alwaysShow: true,
	children: [
		{
			path: "/third/index",
			component: () => import("@/views/system/index.vue"),
			name: "system",
			meta: {
				title: "系统设置", icon: "permission"
			}
		}
	]
};