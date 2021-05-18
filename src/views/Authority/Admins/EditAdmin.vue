<template>
  <div v-if="centerDialogVisible">
    <el-dialog
      title="编辑管理员"
      :visible.sync="centerDialogVisible"
      @close="handleQuit"
      center
    >
      <p>UID: {{ row.user_id }}</p>
      <p>昵称:{{ row.user.nickname }}</p>
      <p>手机号: {{ row.user.phone }}</p>
      <el-form :model="form" ref="addAdmin">
        <el-form-item
          label="角色"
          prop="roleListId"
          :rules="[
            { required: true, message: '选择不能为空', trigger: 'blur' },
          ]"
        >
          <el-select
            v-model="form.roleListId"
            multiple
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSumbit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Role from "@/global/service/role.js";
export default {
  props: {
    row: {
      type: Object,
    },
    visible: {
      type: Boolean,
    },
    roleOptions: {
      type: Array,
    },
  },
  watch: {
    visible: function (newVal) {
      this.centerDialogVisible = newVal;
      if (newVal) {
        this.form.roleListId = this.row.rolesIdList;
      }
    },
  },
  data() {
    return {
      centerDialogVisible: false,
      form: {
        roleListId: [],
      },
    };
  },
  methods: {
    handleSumbit() {
      this.$refs["addAdmin"].validate((valid) => {
        if (valid) {
          Role.managerPut(this.row.id, {
            user_id: this.row.user_id,
            role_ids: this.form.roleListId,
          }).then((res) => {
            this.$message.success(res.msg);
            this.$emit("dialog_close");
          });
        }
      });
    },
    handleQuit() {
      this.$emit("dialog_quit");
    },
  },
};
</script>

<style lang="less">
.el-form-item__content {
  display: flow-root;
}
.el-select {
  width: 240px;
  .el-select__tags {
    min-width: 220px;
  }
}
</style>
