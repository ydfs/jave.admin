<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="page-top">
      <el-input
        class="queryInput"
        v-model="inputName"
        placeholder="昵称模糊搜索"
      ></el-input>
      <el-button type="success" plain @click="query">查询</el-button>
      <el-button class="reset" type="danger" plain @click="reset"
        >重置</el-button
      >
      <el-button
        class="add-button"
        type="success"
        @click="dialogFormVisible = true"
        >添加vip用户</el-button
      >
      <el-dialog title="添加vip用户" :visible.sync="dialogFormVisible">
        <el-form ref="clear" :model="UserDetails">
          <el-form-item
            label="用户"
            :label-width="formLabelWidth"
            prop="phone"
            :rules="[
              { required: true, message: '手机号不能为空', trigger: 'blur' },
            ]"
          >
            <el-autocomplete
              v-model="UserDetails.phone"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              :trigger-on-focus="false"
              placeholder="请输入手机号"
              style="width: 350px"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.nickname }}</div>
                <span class="phone">{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item
            label="vip套餐"
            :label-width="formLabelWidth"
            prop="vip_sku_id"
            :rules="[
              { required: true, message: '选择不能为空', trigger: 'blur' },
            ]"
          >
            <el-select v-model="UserDetails.vip_sku_id" placeholder="请选择">
              <el-option
                v-for="item in vipOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                {{ item.name }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input-number
              v-model="UserDetails.number"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            prop="remark"
            label="备注"
            :label-width="formLabelWidth"
          >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              style="width: 300px"
              v-model="UserDetails.remark"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="memberAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="60"> </el-table-column>
      <el-table-column prop="date" label="头像" width="60">
        <template v-slot="scope">
          <img :src="scope.row.user.avatar_url" />
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" v-slot="scoped">{{
        scoped.row.user.nickname
      }}</el-table-column>
      <el-table-column prop="phone" label="手机" v-slot="scoped">{{
        scoped.row.user.phone
      }}</el-table-column>
      <el-table-column
        prop="name"
        label="vip套餐"
        width="120"
        v-slot="scoped"
        >{{ scoped.row.sku.name }}</el-table-column
      >
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column prop="start_at" label="创建时间"> </el-table-column>
      <el-table-column prop="expired_at" label="结束时间"> </el-table-column>
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
import Users from "@/global/service/users.js";
export default {
  data() {
    return {
      tableData: [],
      UserDetails: {
        phone: "",
        vip_sku_id: "",
        number: 1,
        remark: "",
        user_id: "",
      },
      inputName: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      textarea: "",
      vipOptions: [],
      allUsers: [],
      currentPage: 1,
      pagination: "",
    };
  },
  created() {
    this.vipGet();
    this.vipType();
  },
  mounted() {
    this.loadAll();
  },
  methods: {
    vipGet() {
      Users.vipGet({ page: this.currentPage, name: this.inputName }).then(
        (res) => {
          this.tableData = res.data.list;
          this.pagination = res.data.pagination;
        }
      );
    },
    vipType() {
      Users.vipType().then((res) => {
        this.vipOptions = res.data;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.vipGet();
    },
    query() {
      this.vipGet();
    },
    reset() {
      this.inputName = null;
      this.vipGet();
    },
    memberAdd() {
      Users.vipRecharge({
        user_id: this.UserDetails.user_id,
        vip_sku_id: this.UserDetails.vip_sku_id,
        number: this.UserDetails.number,
        remark: this.UserDetails.remark,
      }).then((res) => {
        this.$message.success(res.msg);
        this.$refs.clear.resetFields();
        this.vipGet();
      });
      this.dialogFormVisible = false;
    },
    loadAll() {
      Users.usersGet({}).then((res) => {
        let total = res.data.pagination.total;
        Users.usersGet({ page_size: total }).then((res) => {
          this.allUsers = res.data.list;
        });
      });
    },
    querySearchAsync(queryString, cb) {
      var allUsers = this.allUsers;
      var results = queryString
        ? allUsers.filter(this.createStateFilter(queryString))
        : allUsers;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return state.phone.indexOf(queryString) === 0;
      };
    },
    handleSelect(item) {
      this.UserDetails.phone = item.phone;
      this.UserDetails.user_id = item.id;
    },
  },
};
</script>

<style lang="less">
.page-top {
  .el-button.reset {
    margin: 0;
    color: #606266;
    background: #ffffff;
    border-color: #dcdfe6;
  }
  .add-button {
    position: absolute;
    right: 20px;
  }
  .el-dialog {
    width: 570px;
  }
  .queryInput {
    width: 180px;
  }
  // .el-autocomplete-suggestion li {
  //   display: flex;
  //   justify-content: space-between;
  // }
  .el-input-number__increase {
    right: -69px;
  }
}
</style>
