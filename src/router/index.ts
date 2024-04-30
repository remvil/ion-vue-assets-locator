import {createRouter, createWebHistory} from "@ionic/vue-router";
import {RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "",
		redirect: "/folder/Inbox",
	},
	{
		path: "/folder/:id",
		component: () => import("../views/FolderPage.vue"),
	},
	{
		path: "/map/:flatId",
		component: () => import("../views/map/MapPage.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
