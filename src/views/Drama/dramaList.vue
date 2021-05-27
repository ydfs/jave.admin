<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="page-top">
      <el-select v-model="classify" placeholder="剧本分类">
        <el-option
          v-for="item in dramaOptions"
          :key="item.classify"
          :label="item.label"
          :value="item.classify"
        >
        </el-option>
      </el-select>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column label="序号" width="60">
        <template v-slot="scope">{{
          (currentPage - 1) * page_size + (scope.$index + 1)
        }}</template>
      </el-table-column>
      <el-table-column prop="nickname" label="类型" width="60">
      </el-table-column>
      <el-table-column prop="name" label="剧本名" width="260">
      </el-table-column>
      <el-table-column prop="content" label="简介"> </el-table-column>
      <el-table-column prop="peoples" label="可参与人数" width="90">
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
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Drama from "@/global/service/drama.js";
export default {
  data() {
    return {
      dramaOptions: [],
      classify: "",
      tableData: [],
      currentPage: 1,
      page_size: 10,
      pagination: "",
    };
  },

  created() {
    this.dramaGet();
  },
  methods: {
    dramaGet() {
      Drama.dramaGet({ page: this.currentPage }).then((res) => {
        this.tableData = res.data.list;
        this.pagination = res.data.pagination;
        console.log(res);
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "dramaDetails",
        params: { id: String(row.id) },
      });
    },
    handleDelete(row) {
      Drama.dramaDelete(row.id).then((res) => {
        this.$message.success(res.msg);
        this.dramaGet();
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.dramaGet();
    },
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
