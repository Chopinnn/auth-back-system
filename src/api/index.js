// 真实数据的接口
import axios from "@/utils/axios";


// 条件获取用户列表
export function getUserListByCondition(params) {
	return axios({
		url: "/query/userListByCondition",
		method: "post",
		data: {params}
	});
}

// 获取用户列表
export function getUserList(params) {
	return axios({
		url: "/query/userList",
		method: "post",
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

// 修改用户角色权限
export function modifyRole(params) {
	return axios({
		url: "/query/modifyRole",
		method: "post",
		data: {params}
	});
}