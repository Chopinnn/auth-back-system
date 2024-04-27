<template>
	<div class="navbar">
		<!--菜单栏伸缩组件-->
		<hamburger class="hamburger-container" />
		<!--面包屑组件-->
		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu">
			<!--全屏组件-->
			<screenfull class="right-menu-item hover-effect" />
			<!-- 登录账号信息 -->
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<el-image
						class="avatar"
						:src="$store.getters.userInfo.avatar"
					></el-image>
					<div>{{$store.getters.userInfo.admin_nick_name}}</div>
					<CaretBottom style=" margin-left: 4px;width: 1em; height: 1em;" />
				</div>
				<template #dropdown>
					<el-dropdown-menu class="user-dropdown">
						<router-link to="/">
							<el-dropdown-item> 首页</el-dropdown-item>
						</router-link>
						<el-dropdown-item @click="logout">
							退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    float: right;
    align-items: center;
    padding-right: 16px;
    :deep(.right-menu-item){
      display: inline-block;
      padding: 0 18px 0 0;
      vertical-align: text-bottom;
      font-size: 24px;
      color: #5a5e66;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    :deep(.avatar-container){
      cursor: pointer;
      .avatar-wrapper {
        display: flex;
        position: relative;
        align-items: center;
        margin-top: 5px;
        height: 50px;
        line-height: 50px;

      }
    }
  }
  .hamburger-container {
    float: left;
    height: 100%;
    cursor: pointer;
    line-height: 46px;
    // hover 动画
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  :deep(.avatar){
    margin-right: 5px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
}
</style>

<script setup>
import { CaretBottom } from "@element-plus/icons";
import { useStore } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
import Screenfull from "@/components/Screenfull";

const store = useStore();

const logout = () => {
	store.dispatch("user/logout");
};
</script>