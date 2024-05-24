<template>
	<el-dialog
		title="编辑角色权限"
		:model-value="modelValue"
		width="30%"
		align-center
		draggable
		@close="closed"
	>
		<el-radio-group v-model="currentUserRole">
			<el-radio
				v-for="item in allRoleList"
				:key="item"
				:label="item"
			>{{ item==='super'?'超级用户':'普通用户' }}</el-radio>
		</el-radio-group>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closed">取消</el-button>
				<el-button type="primary" @click="onConfirm">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<style lang="scss" scoped></style>

<script setup>
import { defineProps, defineEmits, ref, watch} from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	userRole: {
		type: String,
		required: true
	}
});

const emits = defineEmits(["update:modelValue", "updateRole"]);

// 当前用户角色
const currentUserRole = ref('normal');

// 所有角色
const allRoleList = ref([]);

watch(
	[() => props.username, () => props.userRole],
	([newUsername, newUserRole],[oldUsername, oldUserRole]) => {
		if (newUsername) {
			allRoleList.value = ['super','normal'];
		}
		if (newUserRole) {
			currentUserRole.value = newUserRole;
		}
	}
);


const onConfirm = async() => {
	emits("updateRole", currentUserRole.value);
	closed();
};
const closed = () => {
	emits("update:modelValue", false);
};
</script>