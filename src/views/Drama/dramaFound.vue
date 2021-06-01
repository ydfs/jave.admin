<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="drama-type">
      <el-select
        v-model="dramaContent.category_id"
        @change="handleChange"
        placeholder="剧本类型"
      >
        <el-option
          v-for="item in dramaOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
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
            <quill-editor
              style="width: 77%"
              v-model="dramaContent.content"
              ref="myQuillEditor"
              :options="editorOption"
            ></quill-editor>
          </el-form-item>
        </el-form>
      </div>
      <div class="head-sculpture">
        上传封面图:
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="AvatarUpload"
        >
          <img
            v-if="dramaContent.cover_url"
            :src="dramaContent.cover_url"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div v-show="loading" class="el-loading-mask"></div>
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
          <quill-editor
            v-model="dramaContent.dm"
            ref="myQuillEditor"
            :options="editorOption"
            @focus="onEditorFocus($event)"
            @blur="onEditorBlur($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </el-form-item>
        <el-form-item
          label="复盘内容"
          prop="replay"
          :rules="[{ required: true, message: '复盘内容不能为空' }]"
        >
          <quill-editor
            v-model="dramaContent.replay"
            ref="myQuillEditor"
            :options="editorOption"
            @focus="onEditorFocus($event)"
            @blur="onEditorBlur($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </el-form-item>
        <el-form-item
          label="下载地址"
          prop="name"
          :rules="[{ required: true, message: '地址不能为空' }]"
        >
          <el-input
            class="input"
            type="name"
            placeholder="请输入地址"
            v-model="dramaContent.resource_url"
            autocomplete="off"
          ></el-input>
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
    <div class="roles-title">
      <p class="title">角色框架</p>
    </div>
    <div class="role-box">
      <div class="role" v-for="item in rolesList" :key="item.name">
        <img />
        <p class="role-name">{{ item.name }}</p>
        <p class="role-content">{{ item.content }}</p>
      </div>
    </div>
    <div class="add-role">
      <el-button class="add-button" type="success" @click="addRole"
        >添加角色</el-button
      >
      <div class="roles">
        <el-form
          :model="roles"
          ref="roles"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="角色名称"
            prop="name"
            :rules="[
              { required: true, message: '名称不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              class="input"
              placeholder="请输入角色名字"
              v-model="roles.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="角色介绍"
            prop="content"
            :rules="[{ required: true, message: '名称不能为空' }]"
          >
            <quill-editor
              v-model="roles.content"
              ref="myQuillEditor"
              :options="editorOption"
            ></quill-editor>
          </el-form-item>
        </el-form>
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
  </div>
</template>

<script>
import Drama from "@/global/service/drama.js";
import qiniuService from "@/global/service/qiniu.js";
import { quillEditor } from "vue-quill-editor";
const uploadConfig = {
  name: "image_url",
  size: 500, // 图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg", // 可选 可上传的图片格式
};
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"],
];
const handlers = {
  image: function () {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", uploadConfig.accept);
    fileInput.classList.add("ql-image");
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (uploadConfig.size && file.size >= uploadConfig.size * 1024) {
        fileInput.value = "";
        return;
      }
      qiniuService
        .start({ file }, () => {})
        .then((res) => {
          let length = this.quill.getSelection(true).index;
          this.quill.insertEmbed(length, "image", res.imageUrl);
          this.quill.setSelection(length + 1);
        });
    });
    fileInput.click();
  },
};
export default {
  components: {
    quillEditor,
  },
  computed: {
    //当前富文本实例
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  data() {
    return {
      dramaOptions: [],
      classify: "", //分类
      dramaContent: {},
      imageUrl: "",
      uploadLimit: 500,
      loading: false,
      status: "",
      url: "",
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: handlers,
          },
        },
      },
      roles: {},
      rolesList: [],
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
      this.categoryGet();
    }
    this.categoryGet();
  },
  methods: {
    // 富文本编辑器 失去焦点事件
    onEditorBlur() {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus() {},
    // 富文本编辑器 内容改变事件
    onEditorChange() {},

    dramaDetails() {
      Drama.dramaDetails(this.id).then((res) => {
        if (res.data) this.dramaContent = res.data;
        if (res.data.roles) this.rolesList = JSON.parse(res.data.roles);
        this.dramaContent.status = String(this.dramaContent.status);
      });
    },
    categoryGet() {
      Drama.categoryGet().then((res) => {
        this.dramaOptions = res.data;
      });
    },
    handleChange() {
      console.log(this.classify);
    },
    AvatarUpload(files) {
      const file = files.file;
      this.loading = true;
      qiniuService
        .start({ file }, () => {})
        .then((res) => {
          this.url = res.key;
          this.dramaContent.cover_url = res.imageUrl;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    beforeAvatarUpload(file) {
      if (!file || !this.validateSize(file)) {
        file.srcElement.value = "";
        return;
      }
    },
    // 验证大小
    validateSize(file) {
      const size = this.uploadLimit * 1024 * 1024;
      const fileName = file.name;
      const suffix = fileName.split(".").pop();
      const imageRegex = /(png|jpg|jpeg)/;
      if (file.size > size || !imageRegex.test(suffix)) {
        this.$message.error(
          `请上传不大于 ${this.uploadLimit}MB 且格式为png、jpg、jpeg的图片`
        );
        return false;
      }
      return true;
    },

    sumbitEdit() {
      this.$refs["dramaContent"].validate((valid) => {
        if (valid) {
          Drama.dramaPost({
            category_id: this.dramaContent.category_id,
            name: this.dramaContent.name,
            peoples: this.dramaContent.peoples,
            content: this.dramaContent.content,
            dm: this.dramaContent.dm,
            replay: this.dramaContent.replay,
            status: this.dramaContent.status,
            roles: this.rolesList,
            cover_url: this.dramaContent.cover_url,
            resource_url: this.dramaContent.resource_url,
          }).then((res) => {
            this.$message.success(res.msg);
            this.$router.push({ name: "List" });
          });
        }
      });
    },
    sumbitKeep() {
      this.$refs["dramaContent"].validate((valid) => {
        if (valid) {
          Drama.dramaEdit(this.id, {
            category_id: this.dramaContent.category_id,
            name: this.dramaContent.name,
            peoples: this.dramaContent.peoples,
            content: this.dramaContent.content,
            dm: this.dramaContent.dm,
            replay: this.dramaContent.replay,
            status: this.dramaContent.status,
            roles: this.rolesList,
            cover_url: this.dramaContent.cover_url,
            resource_url: this.dramaContent.resource_url,
          }).then((res) => {
            this.$message.success(res.msg);
            this.$router.push({ name: "List" });
          });
        }
      });
    },
    addRole() {
      this.$refs["roles"].validate((valid) => {
        if (valid) {
          this.rolesList.push({ ...this.roles });
          this.roles = {};
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
    padding: 20px 30px 20px 0;
    border-bottom: 8px solid #f0f2f5;
  }
  .roles-title {
    display: flex;
    justify-content: center;
    position: relative;
    margin: 10px 0 16px 0;
    text-align: center;
    .title {
      z-index: 1;
      display: flex;
      justify-content: center;
      background-color: white;
      width: 95px;
    }
  }
  .roles-title:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    top: 50%;
    background-color: #dcdfe6;
    left: 0%;
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
    height: 200px;
    display: block;
  }
  .add-role {
    background-color: white;
    padding: 20px 20px 20px 20px;
    .add-button {
      margin-left: 2%;
    }
  }
  .roles {
    margin-top: 30px;
  }
  .role-box {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    background-color: white;
    padding: 20px 20px 20px 20px;
    border-bottom: 8px solid #f0f2f5;
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
