<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="roleAdd">
      <div class="add-box">
        <p class="title" v-if="!id">角色添加</p>
        <p class="title" v-else>角色编辑</p>
        <button class="adds" @click="sumbitAdd" v-if="!id">+ 添加</button>
        <button class="adds" @click="sumbitEdit" v-else>保存</button>
      </div>
      <el-form
        :model="ValidateForm"
        ref="ValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{ required: true, message: '名称不能为空' }]"
        >
          <el-input
            type="name"
            placeholder="请输入角色的名称"
            maxlength="14"
            v-model="ValidateForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="展示名称"
          prop="display_name"
          :rules="[{ required: true, message: '展示名称不能为空' }]"
        >
          <el-input
            placeholder="请输入角色的展示名称"
            maxlength="14"
            v-model="ValidateForm.display_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
          :rules="[{ required: true, message: '描述不能为空' }]"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入角色的描述"
            v-model="ValidateForm.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="LOA"><p class="loa">功能权限</p></div>
    <div class="roleAdd" v-for="item in permission_groups" :key="item.id">
      <div class="add-box">
        <p class="titles">{{ item.display_name }}</p>
      </div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="item in item.permissions"
          :key="item.id"
          :label="item.id"
          >{{ item.display_name }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import Role from "@/global/service/roleAdmin.js";
export default {
  data() {
    return {
      ValidateForm: {
        name: "",
        display_name: "",
        description: "",
      },
      permission_groups: [],
      checkList: [],
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  created() {
    Role.getAll().then((res) => {
      this.permission_groups = res.data.permission_groups;
    });
    if (this.id) {
      Role.getDetail(this.id).then((res) => {
        this.ValidateForm = res.data;
        console.log(res);
        this.checkList = res.data.permissions; //双向绑定,从res（网页）中得到的数据返回到this.xxx中
      });
    }
  },
  methods: {
    sumbitAdd() {
      this.$refs["ValidateForm"].validate((valid) => {
        if (valid) {
          if (this.checkList.length === 0) {
            this.$message.error("功能权限不能为空");
          } else if (this.id) {
            Role.putDetail({
              name: this.ValidateForm.name,
              display_name: this.ValidateForm.display_name,
              description: this.ValidateForm.description,
              permission_ids: this.checkList,
            });
          } else {
            Role.postRole({
              name: this.ValidateForm.name,
              display_name: this.ValidateForm.display_name,
              description: this.ValidateForm.description,
              permission_ids: this.checkList,
            }).then((res) => {
              this.$router.push({ name: "Roles" });
              this.$message.success(res.msg);
            });
          }
        }
      });
    },
    sumbitEdit() {
      this.$refs["ValidateForm"].validate((valid) => {
        if (valid) {
          if (this.checkList.length === 0) {
            this.$message.error("功能权限不能为空"); //弹出不成功的窗口
          } else {
            Role.putDetail(this.id, {
              name: this.ValidateForm.name,
              display_name: this.ValidateForm.display_name,
              description: this.ValidateForm.description,
              permission_ids: this.checkList,
            }).then((res) => {
              this.$router.push({ name: "Roles" });
              this.$message.success(res.msg); //弹出成功的窗口
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
.roleAdd {
  background-color: white;
  border-radius: 3px;
  .add-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f0f2f5;
    padding: 0 20px 0 20px;
    .title {
      font-size: 18px;
      color: rgb(23, 158, 30);
      padding: 16px 0 16px 0;
    }
    .titles {
      font-size: 18px;
      padding: 16px 0 16px 0;
    }
    .adds {
      background: #2bbf1f;
      color: #f0f2f5;
      cursor: pointer;
      border: none;
      outline: none;
      width: 80px;
      height: 30px;
      right: 20px;
      top: 30px;
      border-radius: 3px;
    }
    .adds:hover {
      background: #31ce1e;
    }
  }
  .el-form {
    padding: 20px 0 30px 0;
    .el-form-item {
      width: 500px;
      .el-input__inner {
        height: 30px;
      }
    }
  }
  .el-checkbox-group {
    padding: 25px 20px 25px 20px;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-row-gap: 6px;
    margin-bottom: 25px;
  }
}
.LOA {
  display: flex;
  justify-content: center;
  position: relative;
  margin: 16px 0 16px 0;
  text-align: center;
  .loa {
    z-index: 1;
    display: flex;
    justify-content: center;
    background-color: white;
    width: 95px;
  }
}
.LOA:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  top: 50%;
  background-color: #dcdfe6;
  left: 0%;
}
</style>
