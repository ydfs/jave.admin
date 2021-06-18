<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="drama-top">
      <el-select
        v-model="category_id"
        @change="handleChange"
        placeholder="剧本分类"
        ><el-option label="全部" value=""></el-option>
        <el-option
          v-for="item in dramaOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button type="success" @click="creatingDrama">创建剧本</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column label="序号" width="60">
        <template v-slot="scope">{{
          (currentPage - 1) * page_size + (scope.$index + 1)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="category_id"
        :formatter="formatter"
        label="类型"
        width="60"
      >
      </el-table-column>
      <el-table-column prop="name" label="剧本名" width="260">
      </el-table-column>
      <el-table-column prop="content" label="简介" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column prop="peoples" label="可参与人数" width="90">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)"
            >详情</el-button
          >
          <span class="separator"></span>
          <el-button
            size="mini"
            style="color: #ff0000"
            type="text"
            @click="deletet(scope.row.id)"
            >删除</el-button
          >
          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDelete()"
                >确 定</el-button
              >
            </span>
          </el-dialog>
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
      category_id: "",
      tableData: [],
      currentPage: 1,
      page_size: 10,
      pagination: "",
      dialogVisible: false,
      deleteId: 0,
    };
  },

  created() {
    this.dramaGet();
  },
  methods: {
    formatter(row) {
      return this.dramaOptions.find((data) => data.id == row.category_id)
        ? this.dramaOptions.find((data) => data.id == row.category_id).name
        : "";
    },
    dramaGet() {
      Drama.dramaGet({ page: this.currentPage }).then((res) => {
        this.tableData = res.data.list;
        this.pagination = res.data.pagination;
      });
      Drama.categoryGet().then((res) => {
        this.dramaOptions = res.data;
      });
    },
    handleChange() {
      this.currentPage = 1;
      if (this.category_id == "") {
        this.dramaGet();
      } else {
        Drama.dramaGet({ category_id: this.category_id }).then((res) => {
          this.tableData = res.data.list;
          this.pagination = res.data.pagination;
        });
      }
    },
    handleEdit(row) {
      this.$router.push({
        name: "dramaDetails",
        params: { id: String(row.id) },
      });
    },
    deletet(deleteId) {
      this.dialogVisible = true;
      this.deleteId = deleteId;
    },
    handleDelete() {
      Drama.dramaDelete(this.deleteId).then((res) => {
        this.$message.success(res.msg);
        this.dialogVisible = false;
        this.dramaGet();
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.dramaGet();
    },
    creatingDrama() {
      this.$router.push({ name: "found" });
    },
  },
};
</script>

<style lang="less">
.drama-top {
  display: flex;
  justify-content: space-between;
  .dramaSearch {
    width: 200px;
  }
}
</style>
