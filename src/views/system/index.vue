<template>
	<div class="container">
		666
	</div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

onMounted(() => {
	// ElMessage("您的权限不足，请联系管理员", "info");
	ElMessage.warning("您的权限不足，请联系管理员");
	router.push("/");
})

</script>