<template>
  <el-row :gutter="20" class="fdr">
    <el-col :span="6">
      <el-timeline>
        <el-timeline-item center placement="top">
          <el-card class="c4">
            <h3>欢迎使用统一身份认证后台系统</h3>
          </el-card>
        </el-timeline-item>
        <el-timeline-item placement="top">
          <el-card class="c4">
            <h3 style="margin-bottom: 10px">系统主要功能：</h3>
            <div v-for="item in list">
              <div style="padding: 8px 0">{{ item }}</div>
            </div>
          </el-card>
        </el-timeline-item>

        <el-timeline-item center placement="top">
          <el-link
            style="font-size: 20px"
            type="primary"
            href="https://www.chopinnn.cn"
            target="_blank"
          >
            欢迎前往：hjz的个人博客
          </el-link>
        </el-timeline-item>
      </el-timeline>
      <el-row class="fdr" style="width: 300px; height: 150px">
        <el-col>
          <el-card shadow="hover" class="box-card c1">
            <template #header>
              <h3 class="t1">已登录用户</h3>
            </template>
            <el-progress type="dashboard" :percentage="percentage" status="success">
              <template #default="{ percentage }">
                <span class="percentage-value t1">{{ percentage }}%</span>
              </template>
            </el-progress>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="18">
      <el-container class="fdc" style="margin-top: 10px">
        <!--图表-->
        <div style="display: flex; flex: 1; width: 100%">
          <div id="main"></div>
        </div>
      </el-container>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import dayjs from "dayjs";
import { getUserList } from "@/api/index";

const list = ref([
  "1、数据可视化控制台",
  "2、用户信息查询",
  "3、用户权限编辑",
  "4、注销用户账号",
  "5、强制用户下线",
]);

const xAxisData = ref([
  dayjs().subtract(6, "day").format("M-D"),
  dayjs().subtract(5, "day").format("M-D"),
  dayjs().subtract(4, "day").format("M-D"),
  dayjs().subtract(3, "day").format("M-D"),
  dayjs().subtract(2, "day").format("M-D"),
  dayjs().subtract(1, "day").format("M-D"),
  dayjs().format("M-D"),
]);

const seriesData = ref([2, 5, 9, 18, 13, 5, 16]);

// 总用户数
const total = ref(0);
// 已登录用户数
const loginTotal = ref(0);

const percentage = ref(50);

onMounted(() => {
	getUserList().then((data) => {
    total.value = Number(data.data.msg.length);
	loginTotal.value = Number(data.data.msg.filter((item) => item.state==='1').length);
	percentage.value = ((loginTotal.value / total.value) * 100).toFixed(2);
  });
  initChart();
});

const initChart = () => {
  const chartDom = document.getElementById("main");
  const myChart = echarts.init(chartDom);
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    xAxis: [
      {
        type: "category",
        data: xAxisData.value,
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "访问量",
        axisLabel: {
          formatter: "{value} 次",
        },
      },
    ],
    series: [
      {
        name: "Precipitation",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: seriesData.value,
      },
    ],
  };
  option && myChart.setOption(option);
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";

$success: #67c23a;
$warning: #e6a23c;
$danger: #f56c6c;
$primary: #409eff;
p {
  line-height: 30px;
  font-family: PingFangSC-Regular, "PingFang SC";
  font-weight: 400;
  font-size: 16px;
  color: #333;
}
.box-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 13px;
  height: 10rem;
}
.c1 {
  box-shadow: 3px 3px 10px $success;
}
.c2 {
  box-shadow: 3px 3px 10px;
  box-shadow: 3px 3px 10px $primary;
}
.c3 {
  box-shadow: 3px 3px 10px $warning;
}
.c4 {
  box-shadow: 3px 3px 10px #909399;
}
.c5 {
  box-shadow: 3px 3px 10px $danger;
}
.fdr {
  display: flex;
  flex-direction: row;
}
.fdc {
  display: flex;
  flex-direction: column;
}
.t1 {
  width: 1rem;
  color: $success;
}
.t2 {
  width: 1rem;
  color: $primary;
}
.t3 {
  width: 1rem;
  color: $warning;
}
#main {
  width: 100%;
  min-height: 40rem;
}
</style>
