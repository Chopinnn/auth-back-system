<template>
  <div class="user-info-container">
    <el-card>
      <div id="userInfoBox" class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">用户信息</h2>

        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户ID">{{
              userInfo.username
            }}</el-descriptions-item>
            <el-descriptions-item label="性别"> 男 </el-descriptions-item>
            <el-descriptions-item label="民族"> 汉族 </el-descriptions-item>
            <el-descriptions-item label="手机号">
              {{ userInfo.phone }}
            </el-descriptions-item>
            <el-descriptions-item label="居住地">重庆市</el-descriptions-item>
            <el-descriptions-item label="最近登录时间">{{
              dayjs(Number(userInfo.time)).format("YYYY-MM-DD HH:mm:ss")
            }}</el-descriptions-item>
            <el-descriptions-item label="登录状态" :span="2">
              <el-tag type="danger" v-if="userInfo.state === '0'"
                >未登录</el-tag
              >
              <el-tag type="success" v-else>已登录</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址" :span="2">
              重庆市
            </el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image class="avatar" src="https://typora-1314223527.cos.ap-chongqing.myqcloud.com/cartoon.webp"></el-image>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  margin: 0 auto;
  width: 1024px;
  .title {
    margin-bottom: 18px;
    text-align: center;
  }
  .header {
    display: flex;
    :deep(.el-descriptions) {
      flex-grow: 1;
    }
    .avatar {
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
      width: 187px;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import dayjs from "dayjs";

const route = useRoute();

// 用户信息
const userInfo = ref({});

watch(
  () => route.query,
  (val) => {
    if (val) {
      userInfo.value = route.query;
      console.log("watch= ", route.query);
    }
  },
  {
    immediate: true,
  }
);
</script>
<script>
export default {
  name: "account-detail",
};
</script>
