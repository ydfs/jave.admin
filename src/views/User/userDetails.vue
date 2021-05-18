<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="userDetails">
      <div class="page-top">
        <p class="details">用户详情</p>
        <el-button type="text" @click="handleEdit">编辑</el-button>
      </div>
      <div class="details-box">
        <el-form label-width="100px">
          <el-form-item label="ID：" prop="id"> </el-form-item>
        </el-form>
        <el-form label-width="100px">
          <el-form-item
            label="昵称："
            prop="nickname"
            :rules="[{ required: true, message: '昵称不能为空' }]"
            ><el-input
              placeholder="请输入内容"
              v-model="input"
              :disabled="true"
              style="width: 20%"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="100px">
          <el-form-item
            label="真实姓名："
            prop="name"
            :rules="[{ required: true, message: '姓名不能为空' }]"
            ><el-input
              placeholder="请输入内容"
              v-model="input"
              :disabled="true"
              style="width: 20%"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="100px">
          <el-form-item label="性别：" prop="gender">
            <el-radio disabled v-model="radio" label="选中且禁用"
              >未知</el-radio
            >
            <el-radio disabled v-model="radio" label="禁用">男</el-radio>
            <el-radio disabled v-model="radio" label="禁用">女</el-radio>
          </el-form-item>
        </el-form>
        <el-form label-width="100px">
          <el-form-item label="手机号：" prop="phone"> </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      radio: "选中且禁用",
      disabled: false,
    };
  },
  methods: {
    handleEdit() {},
  },
};
</script>

<style lang="less">
.userDetails {
  background-color: white;
  border-radius: 3px;
  .page-top {
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px 0 20px;
    border-bottom: 1px solid #f0f2f5;
    .details {
      font-size: 18px;
      color: #66c529;
    }
  }
  .el-input__inner {
    height: 30px;
  }
  .details-box {
    padding: 20px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
