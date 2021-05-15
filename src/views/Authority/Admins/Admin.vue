<template>
  <div class="page-content-container">
    <bread-crumb></bread-crumb>
    <div class="manage-box">
      <el-select v-model="value" placeholder="权限过滤">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <button class="addes">添加管理员</button>
    </div>
    <el-table
      class="manage-top"
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="date" width="60" label="序号"> </el-table-column>
      <el-table-column prop="headPortrait" width="60" label="头像">
      </el-table-column>
      <el-table-column prop="name" label="昵称"> </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号"> </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <span class="separator"></span>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "1",
          name: "王小虎",
          phoneNumber: "13569869898",
          role: "实战营管理",
          headPortrait: "",
        },
        {
          date: "2",
          name: "王小虎",
          phoneNumber: "13569869898",
          role: "实战营管理",
        },
        {
          date: "3",
          name: "王小虎",
          phoneNumber: "13569869898",
          role: "实战营管理",
        },
        {
          date: "4",
          name: "王小虎",
          phoneNumber: "13569869898",
          role: "实战营管理",
        },
      ],
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
    };
  },
  methods: {
    // handleEdit(index, row) {
    // },
    // handleDelete(index, row) {
    // },
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
</style>
