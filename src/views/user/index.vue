<template>
  <div class="home-box">
    <el-form v-show="showSearch" :inline="true" :model="searchForm">
      <el-form-item label="用户名" prop="id">
        <el-input
          v-model="searchForm.account"
          placeholder="用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="searchForm.account"
          placeholder="手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="登录状态">
        <el-select v-model="searchForm.role" placeholder="登录状态" clearable>
          <el-option key="1" label="已登录" value="1" />
          <el-option key="2" label="未登录" value="2" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="margin-left: -16px"
          @click="searchEvent"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>

    <right-toolbar
      v-model:showSearch="showSearch"
      :have-import="false"
      :haveAdd="false"
      :haveOut="false"
      @queryTable="handleGetUserList"
    ></right-toolbar>

    <!-- 列表 -->
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        element-loading-text="加载中..."
        border
		class="centered-table"
      >
        <el-table-column prop="index" label="序号" width="80" type="index" header-align="center" align="center">
		</el-table-column>

        <el-table-column prop="account" label="用户名" width="240" header-align="center" align="center">
          <template #default="{ row }">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div>{{ row.username }}</div>
              <el-link
                v-copyText="row.account"
                v-copyText:callback="copyTextSuccess"
                :underline="false"
                :icon="CopyDocument"
                type="warning"
              >
                复制
              </el-link>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="电话号码" width="150" header-align="center" align="center">
          <template #default="{ row }">
            <span>{{ row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="授权/登录状态" width="180" header-align="center" align="center">
          <template #default="{ row }">
            <el-tag type="danger" v-if="row.state==='0'">未登录</el-tag>
            <el-tag type="success" v-else>已登录</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="最近操作时间"
          width="180"
		  header-align="center" align="center"
        >
		  <template #default="{ row }">
			<span>{{ dayjs(Number(row.time)).format('YYYY-MM-DD HH:mm:ss') }}</span>
		  </template>
	</el-table-column>

        <el-table-column prop="address" label="操作" min-width="280" header-align="center" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">
              查看
            </el-button>
            <!-- <el-button type="info" size="small" @click="onShowRoleClick(row)">
              编辑
            </el-button> -->
            <el-button type="danger" size="small" @click="ondeleteUser(row)">
              删除用户
            </el-button>
            <el-button type="danger" size="small" @click="onLogout(row)"> 强制登出 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页组件-->
      <pagination
        v-show="total > 0"
        v-model:page="searchForm.page"
        v-model:limit="searchForm.page_size"
        :total="total"
        @pagination="handleGetUserList"
      />
    </el-card>

    <!--角色详情组件-->
    <roles-dialog
      v-model="roleDialogVisible"
      :user-id="selectUserId"
      @updateRole="handleGetUserList"
    >
    </roles-dialog>
  </div>
</template>

<script setup>
import RolesDialog from "./components/roles.vue";

import { ref, onMounted, watch } from "vue";
import { getUserList,forceLogout,deleteUser } from "@/api/index";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { CopyDocument } from "@element-plus/icons";
import dayjs from "dayjs";

const router = useRouter();

const showSearch = ref(true);

// 查询用户列表的参数
const searchForm = ref({
  username: "xxx",
  phone: "",
  state: "",
  time: "",
  page: 1,
  page_size: 20,
});

const tableData = ref([]);
// 用户总数
const total = ref(0);
const loading = ref(false);

onMounted(() => {
  handleGetUserList();
});

/** 复制代码成功 */
const copyTextSuccess = () => {
  ElMessage.success("复制成功");
};

/**
 * 获取用户列表
 */
const handleGetUserList = async () => {
  loading.value = true;
  await getUserList(searchForm.value)
    .then((data) => {
      tableData.value = data.data.msg;
      total.value = Number(data.data.msg.length);
      loading.value = false;
      console.log("hjz1", data);
    })
    .catch((err) => {
      loading.value = false;
    });
};

/**
 * 查看按钮点击事件
 */
const onShowClick = (row) => {
  router.push({
    path: "/account/detail",
    query: row,
  });
};

// 删除用户
const ondeleteUser = (row) => {
  ElMessageBox.confirm("确定要删除" + row.username + "吗", {
    type: "warning",
  }).then(async () => {
    await deleteUser(row.username) 
    ElMessage.success("删除成功");
    // 重新渲染数据
    await handleGetUserList();
  });
};

// 强制登出用户
const onLogout = (row) => {
  ElMessageBox.confirm("确定要强制登出" + row.username + "吗", {
    type: "warning",
  }).then(async () => {
    await forceLogout(row.username);
    ElMessage.success("强制登出成功");
    // 重新渲染数据
    await handleGetUserList();
  });
};

/**
 * 查看角色
 */
const selectUserId = ref("");
const roleDialogVisible = ref(false);
const onShowRoleClick = (row) => {
  // 真实环境应该获取用户id，但这里mock数据我们直接使用角色名字去匹配
  selectUserId.value = row.role_name;
  roleDialogVisible.value = true;
};

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = "";
});

const searchEvent = () => {
  console.log(searchForm.value);
  console.log(tableData.value);
  searchForm.value.page = 1;
  handleGetUserList();
};
</script>

<script>
export default {
  name: "user-list",
};
</script>

<style lang="scss" scoped>
.home-box {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.el-tag) {
    margin-right: 6px;
  }
  :deep(.avatar) {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
}
</style>
