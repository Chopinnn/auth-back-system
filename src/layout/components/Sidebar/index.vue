<template>
	<div class="">
		<div class="logo-container">
			<el-avatar
				:size="logoHeight"
				src="https://typora-1314223527.cos.ap-chongqing.myqcloud.com/cartoon.webp"
			/>
			<h1 v-if="$store.getters.sidebarOpened" class="logo-title">
				CAS后台系统
			</h1>
		</div>
		<el-scrollbar>
			<sidebar-menu></sidebar-menu>
		</el-scrollbar>
	</div>
</template>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 22px;
  height: v-bind(logoheight) + "px";
  .logo-title {
    margin-left: 10px;
    line-height: 50px;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    white-space: nowrap;
  }
}
</style>

<script setup>
import SidebarMenu from "./SidebarMenu";
import {} from "vue";

const logoHeight = 32;
</script>