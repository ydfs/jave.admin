<template>
  <div class="page-content-container">
    <!-- <div :disabled="true" v-if="this.id"> -->
    <bread-crumb></bread-crumb>
    <div class="drama-type">
      <el-select v-model="value" placeholder="剧本类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="drama-box">
      <div class="drama-content">
        <el-form
          :model="dramaContent"
          ref="dramaContent"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="剧本名称"
            prop="name"
            :rules="[{ required: true, message: '名称不能为空' }]"
          >
            <el-input
              class="input"
              type="name"
              placeholder="请输入剧本的名称"
              v-model="dramaContent.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="剧本人数"
            prop="peoples"
            :rules="[{ required: true, message: '人数不能为空' }]"
          >
            <el-input
              class="input"
              placeholder="请输入剧本人数"
              maxlength="5"
              v-model="dramaContent.peoples"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="剧本内容"
            prop="content"
            :rules="[{ required: true, message: '剧本内容不能为空' }]"
          >
            <el-input
              class="input"
              type="textarea"
              :rows="6"
              placeholder="请输入剧本的内容"
              v-model="dramaContent.content"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="head-sculpture">
        上传封面图:
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div class="drama-box">
      <el-form
        :model="dramaContent"
        ref="dramaContent"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="主持人内容"
          prop="dm"
          :rules="[{ required: true, message: '主持人内容不能为空' }]"
        >
          <el-input
            class="host-box"
            type="textarea"
            :rows="6"
            placeholder="请输入主持人的内容"
            v-model="dramaContent.dm"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="复盘内容"
          prop="replay"
          :rules="[{ required: true, message: '复盘内容不能为空' }]"
        >
          <el-input
            class="host-box"
            type="textarea"
            :rows="6"
            placeholder="请输入复盘的内容"
            v-model="dramaContent.replay"
          >
          </el-input>
        </el-form-item>
        <el-radio
          style="margin-left: 30px"
          v-model="dramaContent.status"
          label="0"
          >上线</el-radio
        >
        <el-radio v-model="dramaContent.status" label="1">下线</el-radio>
      </el-form>
    </div>
    <div class="role-box" :model="dramaContent">
      <p>角色介绍</p>
      <div class="roles">
        <div class="role">
          <img />
          <p class="role-name">名字</p>
          <p class="role-content">介绍</p>
        </div>
      </div>
      <div style="display: flex; justify-content: center; margin-top: 20px">
        <el-button
          v-if="!id"
          class="role-add"
          type="success"
          @click="sumbitEdit"
          >添加</el-button
        >
        <el-button v-else class="role-add" type="success" @click="sumbitKeep"
          >保存</el-button
        >
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Drama from "@/global/service/drama.js";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      value: "",
      dramaContent: {},
      imageUrl: "",
      status: "",
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  created() {
    if (this.id) {
      this.dramaDetails();
    }
  },
  methods: {
    dramaDetails() {
      Drama.dramaDetails(this.id).then((res) => {
        this.dramaContent = res.data;
        this.dramaContent.status = String(this.dramaContent.status);
        console.log(res);
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    sumbitEdit() {
      this.$refs["dramaContent"].validate((valid) => {
        if (valid) {
          Drama.dramaPost({
            name: this.dramaContent.name,
            peoples: this.dramaContent.peoples,
            content: this.dramaContent.content,
            dm: this.dramaContent.dm,
            replay: this.dramaContent.replay,
            status: this.dramaContent.status,
          }).then((res) => {
            this.$message.success(res.msg);
          });
        }
      });
    },
    sumbitKeep() {
      this.$refs["dramaContent"].validate((valid) => {
        if (valid) {
          Drama.dramaEdit(this.id, {
            name: this.dramaContent.name,
            peoples: this.dramaContent.peoples,
            content: this.dramaContent.content,
            dm: this.dramaContent.dm,
            replay: this.dramaContent.replay,
            status: this.dramaContent.status,
          }).then((res) => {
            this.$message.success(res.msg);
            this.$router.push({ name: "List" });
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
.page-content-container {
  .drama-type {
    margin-bottom: 22px;
  }
  .input {
    width: 400px;
  }
  .drama-box {
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 20px 20px 20px 0;
    border-bottom: 8px solid #f0f2f5;
    .drama-content {
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .host-box {
    width: 800px;
  }
  .role-box {
    background-color: white;
    padding: 20px 20px 20px 20px;
    .roles {
      display: grid;
      grid-template-columns: repeat(4, 25%);
    }
    .role {
      display: grid;
      justify-content: center;
      width: 210px;
      height: 220px;
      background-color: #ded7ca;
      padding: 20px 0 20px 0;
      margin: 20px 20px 10px 0px;
      .role-name {
        text-align: center;
      }
      .role-content {
        width: 190px;
        font-size: 13px;
        text-align: center;
      }
    }
    .role-add {
      text-align: center;
    }
  }
}
</style>
