<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <button class="add" @click="addRole">添加角色</button>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">{{
          (currentPage - 1) * page_size + (scope.$index + 1)
        }}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="display_name" label="展示名称"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
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
import Role from "@/global/service/roleAdmin.js";
export default {
  data() {
    return {
      tableData: [],
      page_size: 20,
      currentPage: 1,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      Role.getList().then((res) => {
        this.tableData = res.data.reverse();
        console.log(res);
      });
    },
    handleEdit(row) {
      this.$router.push({ name: "edit", params: { id: String(row.id) } });
    },
    handleDelete(row) {
      Role.deleteDetail(row.id).then((res) => {
        this.$message.success(res.msg);
        this.getList();
      });
    },
    addRole() {
      this.$router.push({ name: "add" });
    },
  },
};
</script>
<style lang="less">
.add {
  background: #2bbf1f;
  color: #f0f2f5;
  cursor: pointer;
  border: none;
  outline: none;
  width: 80px;
  height: 30px;
  right: 20px;
  position: absolute;
  top: 30px;
  border-radius: 3px;
}
.add:hover {
  background: #31ce1e;
}
.el-table--fit {
  margin-top: 40px;
  .el-button--text:last-child {
    color: red;
  }
  .el-button--text:last-child:hover {
    color: #ee8160;
    border-color: transparent;
    background-color: transparent;
  }
  .separator {
    border-left: 1px solid rgb(160, 154, 154);
    margin: 0 8px 0 8px;
  }
}
</style>
