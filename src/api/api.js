import axios from "@/utils/axios";

/**
 * 登录
 */
export function login(params) {
	return axios({
		url: "/Index/login",
		method: "post",
		data: params
	});
}
/**
 * 获取图形验证码
 */
export function getCode(params) {
	return axios({
		url: "/Index/getCaptchaCode",
		method: "post",
		data: params
	});
}

/**
 * 账号列表
 * @param params
 */
export function getAdmintorList(params) {
	return axios({
		url: "/adminAuth/adminList",
		method: "post",
		data: params
	});
}

/**
 * 角色列表
 * @param params
 */
export function getRoleList(params) {
	return axios({
		url: "/adminAuth/getRoleList",
		method: "post",
		data: params
	});
}