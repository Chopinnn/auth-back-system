import variables from "@/styles/variables.module.scss";

const getters = {

	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	cssVar: state => variables,
	sidebarOpened: state => state.app.sidebarOpened,
	tagsViewList: state => state.app.tagsViewList,
};
export default getters;