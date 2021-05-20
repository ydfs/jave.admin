<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="page-top">
      <div class="block">
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-input
        placeholder="昵称"
        prefix-icon="el-icon-search"
        maxlength="14"
        v-model="inputName"
      >
      </el-input>
      <el-input
        placeholder="手机号"
        prefix-icon="el-icon-search"
        maxlength="14"
        v-model="inputphone"
      >
      </el-input>
      <el-row>
        <el-button type="success" plain @click="query">查询</el-button>
        <el-button type="danger" plain @click="reset">重置</el-button>
      </el-row>
    </div>
    <el-button style="margin-top: 25px" plain @click="add"
      >添加新用户</el-button
    >

    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="introduction" label="介绍"> </el-table-column>
      <el-table-column prop="gender" v-slot="scope" label="性别" width="60">
        <span v-if="scope.row.gender == 0">未知</span>
        <span v-else-if="scope.row.gender == 1">男</span>
        <span v-else>女</span>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="created_at" label="创建时间" v-slot="scope">
        {{ new Date(scope.row.created_at).toLocaleString() }}
      </el-table-column>
      <el-table-column prop="address" label="操作" width="60">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            style="color: #67696d"
            @click="handleDetails(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        background
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Users from "@/global/service/users.js";
export default {
  data() {
    return {
      value: "",
      tableData: [],
      inputphone: "",
      inputName: "",
      currentPage: 1,
      pagination: "",
      loading: false,
    };
  },
  created() {
    this.usersGet();
  },
  methods: {
    usersGet() {
      Users.usersGet({
        page: this.currentPage,
        phone: this.inputphone,
        nickname: this.inputName,
      }).then((res) => {
        this.tableData = res.data.list;
        this.pagination = res.data.pagination;
        console.log(res);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.usersGet();
    },
    handleDetails(row) {
      this.$router.push({ name: "details", params: { id: String(row.id) } });
    },
    query() {
      this.usersGet();
    },
    reset() {
      this.value = null;
      this.inputphone = null;
      this.inputName = null;
      this.usersGet();
    },
    add() {
      this.$router.push({ name: "newlyadd" });
      // this.$emit(disabled);
    },
  },
};
</script>

<style lang="less">
.page-top {
  display: flex;
  grid-column-gap: 10px;
  .el-input {
    width: 180px;
  }
}
.el-input {
  width: 180px;
}
</style>
