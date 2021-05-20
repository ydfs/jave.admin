<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="userDetails">
      <div v-if="this.id" class="page-top">
        <p class="details" v-if="this.id">用户详情</p>
        <el-button type="text" v-if="disabled" @click="handleEdit"
          >编辑</el-button
        >
        <el-button type="text" v-else @click="handlePreserve">保存</el-button>
      </div>
      <div v-else class="page-top">
        <p class="details">新增用户信息</p>
        <el-button type="text" @click="newlyPreserve">保存</el-button>
      </div>
      <div class="details-box">
        <el-form :model="UserDetails" ref="saveInformation" label-width="100px">
          <el-form-item v-if="this.id" label="ID：" prop="id"
            >{{ UserDetails.id }}
          </el-form-item>
          <el-form-item
            label="昵称："
            prop="nickname"
            :rules="[{ required: true, message: '昵称不能为空' }]"
            ><el-input
              placeholder="请输入昵称"
              v-model="UserDetails.nickname"
              :disabled="disabled"
              style="width: 20%"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="介绍：" prop="introduction"
            ><el-input
              type="textarea"
              :rows="2"
              placeholder="请输入介绍"
              v-model="UserDetails.introduction"
              :disabled="disabled"
              style="width: 30%"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-radio
              :disabled="disabled"
              v-model="UserDetails.gender"
              label="0"
              >未知</el-radio
            >
            <el-radio
              :disabled="disabled"
              v-model="UserDetails.gender"
              label="1"
              >男</el-radio
            >
            <el-radio
              :disabled="disabled"
              v-model="UserDetails.gender"
              label="2"
              >女</el-radio
            >
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <spanv v-if="this.id">{{ UserDetails.phone }}</spanv>
            <span v-else
              ><el-input
                placeholder="请输入手机号"
                v-model="UserDetails.phone"
                prop="phone"
                :rules="[{ required: true, message: '手机号不能为空' }]"
                maxlength="11"
                style="width: 20%"
              ></el-input
            ></span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Users from "@/global/service/users.js";
export default {
  data() {
    return {
      input: "",
      disabled: true,
      UserDetails: {},
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  created() {
    if (this.id) {
      this.usersIdGet();
    } else {
      this.disabled = false;
    }
  },
  methods: {
    usersIdGet() {
      Users.usersIdGet(this.id).then((res) => {
        this.UserDetails = res.data;
        this.UserDetails.gender = String(this.UserDetails.gender);
        console.log(res);
      });
    },
    handleEdit() {
      this.disabled = false;
    },
    handlePreserve() {
      this.$refs["saveInformation"].validate((valid) => {
        if (valid) {
          Users.usersIdPut(this.id, {
            nickname: this.UserDetails.nickname,
            introduction: this.UserDetails.introduction,
            gender: this.UserDetails.gender,
          }).then((res) => {
            this.$router.push({ name: "Users" });
            this.$message.success(res.msg);
          });
        }
      });
    },
    newlyPreserve() {
      Users.usersPost({
        nickname: this.UserDetails.nickname,
        introduction: this.UserDetails.introduction,
        gender: this.UserDetails.gender,
        phone: this.UserDetails.phone,
      }).then((res) => {
        this.$router.push({ name: "Users" });
        this.$message.success(res.msg);
      });
    },
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
  .el-form-item__error {
    display: contents;
  }
  .el-form {
    display: grid;
    grid-row-gap: 15px;
  }
}
</style>
