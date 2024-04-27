import Layout from "@/layout";

export default {
	path: "/service",
	component: Layout,
	redirect: "/service/serviceA",
	alwaysShow: true,
	name: "service",
	meta: {
		title: "服务管理",
		icon: "article-ranking"
	},
	children: [
		{
			path: "/service/serviceA",
			component: () => import("@/views/service/serviceA.vue"),
			name: "serviceA",
			meta: { title: "serviceA", icon: "star" }
		},
		{
			path: "/service/serviceB",
			component: () => import("@/views/service/serviceB.vue"),
			name: "serviceB",
			meta: { title: "serviceB", icon: "star" }
		},
		{
			path: "/service/serviceC",
			component: () => import("@/views/service/serviceC.vue"),
			name: "serviceC",
			meta: { title: "serviceC", icon: "star" }
		}
	]
}