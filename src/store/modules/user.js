import { login } from "@/api/api";
import { setItem, getItem, removeAllItem } from "@/utils/storage";
import { TOKEN, USERINFO } from "@/constant";
import { setTimeStamp } from "@/utils/auth";
import router from "@/router";

export default {
	namespaced: true,
	state: () => ({
		token: getItem(TOKEN) || "",
		userInfo: getItem(USERINFO) || {},
	}),
	mutations: {
		setToken(state, token) {
			state.token = token;
			setItem(TOKEN, token);
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			setItem(USERINFO, userInfo);
		},
	},
	actions: {
		login(context, userInfo) {
			const { username, password, captcha_code, code_key } = userInfo;
			return new Promise((resolve, reject) => {
				login({
					username,
					password,
					captcha_code,
					code_key
				})
					.then(data => {
						this.commit("user/setToken", data.obj.sys_token);
						this.commit("user/setUserInfo", data.obj);
						// 保存登录时间
						setTimeStamp();
						resolve();
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		logout() {
			// resetRouter();
			this.commit("user/setToken", "");
			this.commit("user/setUserInfo", {});
			this.commit("app/removeTagsView", {
				type: "all"
			});
			removeAllItem();
			router.push("/login");
		}
	}
};