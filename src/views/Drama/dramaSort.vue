<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div>sort</div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="date" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="剧本名" width="260">
      </el-table-column>
      <el-table-column prop="address" label="简介"> </el-table-column>
      <el-table-column prop="date" label="可参与人数" width="90">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import Drama from "@/global/service/drama.js";
export default {
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style lang="less"></style>
