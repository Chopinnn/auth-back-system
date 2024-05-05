// 真实数据的接口
import axios from "@/utils/axios";

/**
 * 用户列表
 * @param params
 */
export function getUserList(params) {
	return axios({
		url: "/query/userList",
		method: "get",
		data: {params}
	});
}

// 强制指定用户退出
export function forceLogout(params) {
	return axios({
		url: "/query/forceLogout",
		method: "get",
		data: {params}
	});
}

// 删除用户
export function deleteUser(params) {
	return axios({
		url: "/query/deleteUser",
		method: "post",
		data: {params}
	});
}