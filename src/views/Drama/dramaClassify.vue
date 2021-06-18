<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <button class="add" @click="dialogFormVisible = true">添加类型</button>
    <el-dialog
      title="剧本类型"
      @close="dialogClose"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="category" ref="category">
        <el-form-item label="类型名称" :label-width="formLabelWidth">
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!id" type="primary" @click="categoryAdd"
          >添 加</el-button
        >
        <el-button v-else type="primary" @click="categoryKeep">保存</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">{{
          (currentPage - 1) * page_size + (scope.$index + 1)
        }}</template>
      </el-table-column>
      <el-table-column prop="name" label="类型名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)"
            >详情</el-button
          >
          <span class="separator"></span>
          <el-button
            size="mini"
            style="color: #ff0000"
            type="text"
            slot="reference"
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
  </div>
</template>

<script>
import Category from "@/global/service/drama.js";
export default {
  data() {
    return {
      tableData: [],
      page_size: 20,
      currentPage: 1,
      dialogFormVisible: false,
      category: {
        name: "",
        type: [],
      },
      formLabelWidth: "120px",
      id: "",
      dialogVisible: false,
      deleteId: 0,
    };
  },
  created() {
    this.categoryGet();
    if (this.id) {
      this.categoryDetail();
    }
  },
  methods: {
    categoryGet() {
      Category.categoryGet().then((res) => {
        this.tableData = res.data;
      });
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.id = row.id;
      this.category.name = row.name;
    },
    dialogClose() {
      this.category.name = "";
      this.id = "";
    },
    deletet(deleteId) {
      this.deleteId = deleteId;
      this.dialogVisible = true;
    },
    handleDelete() {
      Category.categoryDelete(this.deleteId).then((res) => {
        this.$message.success(res.msg);
        this.dialogVisible = false;
        this.categoryGet();
      });
    },
    categoryAdd() {
      this.$refs["category"].validate((valid) => {
        if (valid) {
          Category.categoryPost({
            name: this.category.name,
          }).then((res) => {
            this.$message.success(res.msg);
            this.dialogFormVisible = false;
            this.categoryGet();
          });
        }
      });
    },
    categoryKeep() {
      this.$refs["category"].validate((valid) => {
        if (valid) {
          Category.categoryPut(this.id, {
            name: this.category.name,
          }).then((res) => {
            this.$message.success(res.msg);
            this.dialogFormVisible = false;
            this.categoryGet();
          });
        }
      });
    },
    categoryDetail() {
      Category.categoryDetail(this.id).then((res) => {
        this.category = res.data;
      });
    },
  },
};
</script>

<style lang="less">
.page-content-container {
  .el-dialog {
    width: 500px;
    min-width: 450px;
    .el-dialog__body {
      .el-input__inner {
        width: 250px;
      }
    }
  }
}
</style>
