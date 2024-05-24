<template>
  <div class="home-box">
    <!-- 查询 -->
    <!-- <el-form v-show="showSearch" :inline="true" :model="searchForm">
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
          @click="handleSearch"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form> -->

    <right-toolbar
      v-model:showSearch="showSearch"
      :have-import="false"
      :haveAdd="false"
      :haveOut="false"
      @queryTable="handleGetUserListByCondition"
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
              <el-tag type="danger" v-if="row.role==='super'">超级用户</el-tag>
              <el-tag type="success" v-else>普通用户</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="电话号码" width="150" header-align="center" align="center">
          <template #default="{ row }">
            <span>{{ row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="登录状态" width="180" header-align="center" align="center">
          <template #default="{ row }">
            <el-tag type="info" v-if="row.state==='0'">未登录</el-tag>
            <el-tag type="success" v-else>已登录</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="最近登录时间"
          width="180"
		  header-align="center" align="center"
        >
		  <template #default="{ row }">
			<span>{{ dayjs(Number(row.time)).format('YYYY-MM-DD HH:mm:ss') }}</span>
		  </template>
	</el-table-column>

        <el-table-column prop="address" label="操作" min-width="280" header-align="center" align="center">
          <template #default="{ row }">
            <el-button type="success" size="small" @click="onShowClick(row)">
              查看
            </el-button>
            <el-button type="info" size="small" @click="onShowRoleClick(row)">
              权限编辑
            </el-button>
            <el-button type="danger" size="small" @click="ondeleteUser(row)">
              删除用户
            </el-button>
            <el-button type="warning" size="small" @click="onLogout(row)"> 强制下线 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页组件-->
      <pagination
        v-show="total > 0"
        v-model:page="searchForm.page"
        v-model:limit="searchForm.pageSize"
        :total="total"
        @pagination="handlePagination"
      />
    </el-card>

    <!--角色详情组件-->
    <roles-dialog
      v-model="roleDialogVisible"
      :username="selectUsername"
      :userRole="selectUserRole"
      @updateRole="handleupdateRole"
    >
    </roles-dialog>
  </div>
</template>

<script setup>
import RolesDialog from "./roles.vue";

import { ref, onMounted, watch } from "vue";
import { getUserList,getUserListByCondition,forceLogout,deleteUser,modifyRole } from "@/api/index";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import dayjs from "dayjs";

const router = useRouter();

const showSearch = ref(true);

// 查询参数
const searchForm = ref({
  username: "",
  phone: "",
  state: "",
  page: 1,
  pageSize: 4,
});

// 表格数据
const tableData = ref([]);

// 用户总数
const total = ref(0);

const loading = ref(false);

// 角色权限编辑相关
const selectUsername = ref("");
const selectUserRole = ref("");
const roleDialogVisible = ref(false);

onMounted(() => {
  getUserList().then((data) => {
    total.value = Number(data.data.msg.length);
  });
  handleGetUserListByCondition();
});

// 获取用户列表
const handleGetUserListByCondition = async () => {
  loading.value = true;
  await getUserListByCondition(searchForm.value)
    .then((data) => {
      tableData.value = data.data.msg;
      loading.value = false;
      console.log("用户数据", data);
    })
    .catch((err) => {
      loading.value = false;
    });
};

// 查看
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
    await handleGetUserListByCondition();
  });
};

// 强制下线用户
const onLogout = (row) => {
  ElMessageBox.confirm("确定要强制下线" + row.username + "吗", {
    type: "warning",
  }).then(async () => {
    await forceLogout(row.token);
    loading.value = true;
    setTimeout(() => {
      ElMessage.success("强制下线成功");
      loading.value = false;
      handleGetUserListByCondition();
    }, 1000);
  });
};

// 角色权限编辑
const onShowRoleClick = (row) => {
  selectUsername.value = row.username;
  selectUserRole.value = row.role;
  roleDialogVisible.value = true;
};
// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, (val) => {
  if (!val) selectUsername.value = "";
});

// 更新角色权限
const handleupdateRole =(role)=>{
  modifyRole({username:selectUsername.value,role}).then(()=>{
    ElMessage.success("角色权限更新成功");
    handleGetUserListByCondition();
  });
}

// 分页
const handlePagination = (paload) => {
  let { page,limit } = paload;
  searchForm.value.page = page;
  searchForm.value.pageSize = limit;
  handleGetUserListByCondition();
};

// 查询
const handleSearch = () => {
  console.log(searchForm.value);
  console.log(tableData.value);
  searchForm.value.page = 1;
  handleGetUserListByCondition();
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
