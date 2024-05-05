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
      const data = {
        status: {
          error_code: 0,
          error_msg: "success",
        },
        obj: {
          sys_token: "d33a7fdf547d2a086a96f4d38253cbc9",
          admin_nick_name: "何多多",
          admin_id: "1",
          avatar:
            "https://typora-1314223527.cos.ap-chongqing.myqcloud.com/cartoon.webp",
        },
      };
      this.commit("user/setToken", data.obj.sys_token);
      this.commit("user/setUserInfo", data.obj);
      // 保存登录时间
      setTimeStamp();
    },
    logout() {
      // resetRouter();
      this.commit("user/setToken", "");
      this.commit("user/setUserInfo", {});
      this.commit("app/removeTagsView", {
        type: "all",
      });
      removeAllItem();
      router.push("/login");
    },
  },
};
