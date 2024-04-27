import moment from "moment";
import store from "@/store";
import {
	VERSION,
	MODEL_TEST_VERSION,
	SERVER_TYPE,
	TEST_URL,
	MO_URL,
	YFB_URL,
	PRO_URL,
	DEV_URL
} from "@/constant";

// 将字符串的字符全部转换为小写字符
export function lowerCase(str) {
	const arr = str.split("");
	let newStr = "";
	// 通过for循环遍历数组
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] >= "A" && arr[i] <= "Z") { newStr += arr[i].toLowerCase(); } else { newStr += arr[i]; }
	}
	return newStr;
}

// 获取当前服务器的请求url
export function switchServerUrl() {
	let server_url = "";
	switch (SERVER_TYPE) {
	case 0:
		server_url = TEST_URL;
		break;
	case 1:
		server_url = MO_URL;
		break;
	case 2:
		server_url = YFB_URL;
		break;
	case 3:
		server_url = PRO_URL;
		break;
	case 4:
		server_url = DEV_URL;
		break;
	}
	return server_url;
}