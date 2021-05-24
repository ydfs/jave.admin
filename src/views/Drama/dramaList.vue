<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="page-top">
      <el-input
        class="dramaSearch"
        v-model="inputDrama"
        placeholder="剧本搜索"
      ></el-input>
      <el-button type="success" plain @click="query">查询</el-button>
      <el-button class="reset" type="danger" plain @click="reset"
        >重置</el-button
      >
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="date" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="剧本名" width="260">
      </el-table-column>
      <el-table-column prop="address" label="简介"> </el-table-column>
      <el-table-column prop="date" label="可参与人数" width="90">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)"
            >详情</el-button
          >
          <span class="separator"></span>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import Drama from "@/global/service/drama.js";
export default {
  data() {
    return {
      tableData: [{}],
      inputDrama: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete() {},
    query() {},
    reset() {},
  },
};
</script>

<style lang="less">
.page-top {
  .dramaSearch {
    width: 200px;
  }
}
</style>
