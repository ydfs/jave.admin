<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="page-top">
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-select
        v-model="value"
        filterable
        remote
        reserve-keyword
        icon="el-icon-search"
        placeholder="昵称/真实姓名"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-row>
        <el-button type="success" plain>查询</el-button>
        <el-button type="danger" plain>重置</el-button>
      </el-row>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="name" label="真实姓名"> </el-table-column>
      <el-table-column prop="gender" label="性别" width="60"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="date" label="创建时间"> </el-table-column>
      <el-table-column prop="address" label="操作" width="60">
        <template>
          <el-button
            size="mini"
            type="text"
            style="color: #67696d"
            @click="handleDetails"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        background
        layout="total, prev, pager, next, jumper"
        :total="1000"
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
      value1: "",
      tableData: [],
      currentPage: 1,
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [],
    };
  },
  created() {
    Users.usersGet().then((res) => {
      this.tableData = res.data.list.reverse();
      console.log(res);
    });
  },
  mounted() {
    this.list = this.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleDetails() {
      // this.$router.push({ name: "details", params: { id: String(row.id) } });
      this.$router.push({ name: "details" });
    },
  },
};
</script>

<style lang="less">
.page-top {
  display: flex;
  grid-column-gap: 10px;
}
</style>
