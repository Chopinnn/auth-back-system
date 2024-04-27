import axios from "axios";
import store from "@/store";
import { ElMessage } from "element-plus";
import {
	VERSION,
	MODEL_TEST_VERSION,
	SERVER_TYPE,
	AXIOS_TIMEOUT

} from "@/constant";

import { switchServerUrl } from "@/utils/index";

/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(config => {
	return config;
}, error => {
	return Promise.reject(error);
});

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(response => {
	return response;
}, error => {
	return Promise.reject(error);
});

export default function http(options) {
	// 获取不同环境的请求域名
	const server_url = switchServerUrl();
	const method = options.method || "post";
	const url = options.url;
	const data = options.data || {};
	if (!options.url) {
		console.error("url参数缺失");
		return;
	}
	if (store.getters.token) {
		// 将token放入请求头
		data.sys_token = store.getters.token;
	}

	// 构造最终的请求参数
	let opt = {};
	if (method == "get") {
		opt = {
			method,
			baseURL: "",
			url: url.indexOf("//") > -1 ? url : (server_url + url),
			params: data,
			timeout: AXIOS_TIMEOUT
		};
	} else if (method == "post") {
		opt = {
			method,
			baseURL: "",
			url: url.indexOf("//") > -1 ? url : (server_url + url),
			data,
			timeout: AXIOS_TIMEOUT
		};
	}

	return new Promise((resolve, reject) => {
		axios(opt).then(res => {
			resolve(res.data);
		}, err => {
			ElMessage.error(err); // 提示错误信息
			reject(err);
		});
	});
}