<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="page-top">
      <el-select v-model="value" placeholder="剧本分类">
        <el-option
          v-for="item in dramaOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="date" label="序号" width="60"> </el-table-column>
      <el-table-column prop="nickname" label="类型" width="60">
      </el-table-column>
      <el-table-column prop="name" label="剧本名" width="260">
      </el-table-column>
      <el-table-column prop="address" label="简介"> </el-table-column>
      <el-table-column prop="number" label="可参与人数" width="90">
      </el-table-column>
      <el-table-column label="操作" width="100">
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
import Drama from "@/global/service/drama.js";
export default {
  data() {
    return {
      dramaOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      value: "",
      tableData: [{}],
    };
  },
  created() {
    this.dramaGet();
    // this.dramaPost();
  },
  methods: {
    dramaGet() {
      Drama.dramaGet().then((res) => {
        console.log(res);
      });
    },
    // dramaPost() {
    //   Drama.dramaPost().then((res) => {
    //     console.log(res);
    //   });
    // },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete() {},
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
