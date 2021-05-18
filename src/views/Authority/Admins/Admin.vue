<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="manage-box">
      <el-select v-model="value" placeholder="权限过滤">
        <el-option
          v-for="item in roleOptions"
          :key="item.id"
          :value="item.id"
          :label="item.display_name"
        >
        </el-option>
      </el-select>
      <button class="addes" @click="dialogFormVisible = true">
        添加管理员
      </button>
      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" center>
        <el-form :model="form" ref="addAdmin">
          <el-form-item
            prop="phone"
            label="手机号"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '手机号不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              placeholder="请输入手机号"
              maxlength="11"
              v-model="form.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="角色"
            :label-width="formLabelWidth"
            prop="region"
            :rules="[
              { required: true, message: '选择不能为空', trigger: 'blur' },
            ]"
          >
            <el-select
              v-model="form.region"
              multiple
              filterable
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :value="item.id"
                :label="item.display_name"
                >{{ item.display_name }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAdmin">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      class="manage-top"
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column width="60" label="序号">
        <template v-slot="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="user" width="60" label="头像">
        <template v-slot="scope">
          <img :src="scope.row.user.avatar_url" />
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="user.phone" label="手机号"> </el-table-column>
      <el-table-column
        prop="display_name"
        :formatter="getRoleName"
        label="角色"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <span class="separator"></span>
          <el-button
            size="mini"
            style="color: red"
            type="text"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <edit-admin
            :visible.sync="dialogVisible"
            @dialog_close="handleClose"
            @dialog_quit="dialogVisible = false"
            :row="row"
            :roleOptions="roleOptions"
          ></edit-admin>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Role from "@/global/service/role.js";
import EditAdmin from "./EditAdmin.vue";
export default {
  components: { EditAdmin },
  data() {
    return {
      tableData: [],
      roleOptions: [],
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        phone: "",
        region: [],
        type: [],
      },
      formLabelWidth: "120px",
      value: "",
      row: {},
    };
  },
  created() {
    this.managerlist();
    this.getList();
  },
  methods: {
    getRoleName(row) {
      let display_name = [];
      for (let i = 0; i < row.roles.length; i++) {
        display_name.push(row.roles[i].display_name);
      }
      return display_name.join("、");
    },
    getList() {
      Role.getList().then((res) => {
        this.roleOptions = res.data.reverse();
      });
    },
    managerlist() {
      Role.managerlist().then((res) => {
        this.tableData = res.data.list.reverse();
        console.log(res.data.list);
      });
    },
    addAdmin() {
      Role.mobilePhone(this.form.phone).then((res) => {
        Role.managerPost({
          user_id: res.data.list[0].id,
          role_ids: this.form.region,
        }).then((res) => {
          this.dialogFormVisible = false;
          this.$refs.addAdmin.resetFields();
          this.managerlist();
          this.$message.success(res.msg);
        });
      });
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.row = row;
      this.row.rolesIdList = this.row.roles.map((item) => item.id);
      console.log(this.row, row);
    },
    handleClose() {
      this.dialogVisible = false;
      this.managerlist();
    },
    handleSumbit(row) {
      Role.managerPut(row.id).then((res) => {
        console.log(res);
      });
    },
    handleDelete(row) {
      Role.managerDelete(row.id).then((res) => {
        this.$message.success(res.msg);
        this.managerlist();
      });
    },
  },
};
</script>
<style lang="less">
.manage-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-input .el-select__caret {
    height: 38px;
  }
  .el-input__inner {
    height: 35px;
    width: 250px;
  }
  .el-dialog__body {
    display: flex;
    justify-content: center;
    .el-form {
      width: 440px;
    }
  }
}
.addes {
  background: #2bbf1f;
  color: #f0f2f5;
  cursor: pointer;
  border: none;
  outline: none;
  width: 80px;
  height: 30px;
  right: 20px;
  // position: absolute;
  top: 30px;
  border-radius: 3px;
}
.addes:hover {
  background: #31ce1e;
}
.el-table--fit.manage-top {
  margin-top: 10px;
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
.el-dialog--center .el-dialog__body {
  display: grid;
  justify-content: center;
  grid-row-gap: 10px;
  .el-table td div {
    margin-left: 50px;
  }
}
</style>
