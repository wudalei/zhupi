
<template>
  <el-dialog :title="title"
             :lock-scroll="false"
             :visible.sync="formVisible"
             :close-on-click-modal="true"
             width="800px"
             :before-close="formClose">
    <el-form :model="dataForm"
             :rules="dataFormRules"
             ref="dataForm">
      <el-form-item v-for="(item, index) in formConfig"
                    :label="item.label"
                    label-width="100px"
                    :prop="item.prop"
                    :key="index">

        <!--批量上传图片-->
        <el-upload v-if="item.type === 'uploadImgBatch'"
                   :action="uploadUrl"
                   :data="uploadData"
                   :limit="5"
                   v-model="dataForm[item.prop]"
                   :file-list="imgList"
                   :on-error="handleErr"
                   :on-remove="handleRemove"
                   class="upload-file"
                   :on-exceed="exceed"
                   :on-success='(value)=> handleSuccessBatch(item.prop, value)'
                   multiple
                   accept=".jpg,.jpeg,.png,.gif"
                   list-type="picture-card"
                   :before-upload="beforeUpload">
          <i class="el-icon-plus"></i>
          <div slot="tip"
               class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,轮播图最多只能上传5张图片</div>
        </el-upload>

        <!--单张上传图片-->
        <el-upload v-else-if="item.type === 'uploadImg'"
                   :action="uploadUrl"
                   :data="uploadData"
                   ref='upload'
                   :show-file-list="false"
                   v-model="dataForm[item.prop]"
                   :list-type="dataForm[item.prop]"
                   :on-remove="handleRemove"
                   :on-error="handleErr"
                   :on-success='(value)=>handleSuccess(item.prop, value)'
                   accept=".jpg,.jpeg,.png,.gif">
          <img :src="dataForm[item.prop]"
               v-if="dataForm[item.prop]"
               width="100%"
               style="height:100%">
          <i v-else
             class="el-icon-plus"></i>
          <div slot="tip"
               class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <!--上传文件-->
        <el-upload v-else-if="item.type === 'uploadFile'"
                   :file-list="dataForm[item.prop]"
                   class="upload-demo"
                   drag
                   :action="uploadUrl"
                   :limit="1"
                   :on-remove="uploadRemove"
                   :on-error="handleErr"
                   :on-success="uploadSuccess"
                   :data="uploadFileData">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <!--下拉框-->
        <el-select v-else-if="item.type === 'select'"
                   v-model="dataForm[item.prop]"
                   clearable
                   filterable
                   :disabled="item.disabled"
                   :placeholder="item.placeholder"
                   @change="handleAccount($event,item.prop)">
          <div v-if="selectData">
            <el-option v-for="(option,index) in selectData[item.prop]"
                       :key="index"
                       :label="option[item.key]"
                       :value="option[item.value]"></el-option>
          </div>
        </el-select>

        <!--时段，时间选择框-->
        <el-date-picker v-else-if="item.type === 'datetime'"
                        v-model="dataForm[item.prop]"
                        type="daterange"
                        align="right"
                        unlink-panels
                        :default-time="['00:00:00', '23:59:59']"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"></el-date-picker>

        <!--描述-->
        <el-input v-else-if="item.type === 'textarea'"
                  type="textarea"
                  :rows="3"
                  v-model="dataForm[item.prop]"
                  :placeholder="item.placeholder"
                  clearable></el-input>
        <el-input-number v-else-if="item.type === 'number'"
                         v-model="dataForm[item.prop]"
                         @change="handleChange"
                         :min="0"></el-input-number>

        <!--editor编辑框-->
        <editor v-else-if="item.type === 'editor'"
                class="tinymce"
                v-model="dataForm[item.prop]"
                :init="editorInit" />

        <!--默认普通文本-->
        <el-input v-else
                  :type="item.type"
                  :minlength="item.minlength"
                  :maxlength="item.maxlength"
                  v-model="dataForm[item.prop]"
                  clearable
                  :disabled="dataForm.disabled"
                  :placeholder="item.placeholder"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button v-if="title === '详情'"
                 @click.native="formClose">返回</el-button>
      <el-button v-if="title !== '详情'"
                 @click.native="formClose">取消</el-button>
      <el-button v-if="title !== '详情'"
                 type="primary"
                 @click.native="formSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
//import 'tinymce/themes/mobile/theme';
import { editor } from './config.js'
import { upload } from '../api/api'
export default {
  components: { Editor },
  props: [
    "title",
    "dataForm",
    "dataFormRules",
    "formConfig",
    "formVisible",
    "selectData",
    "uploadFileData",
  ],
  data () {
    return {
      editorInit: editor,       //富文本
      fileList: [],
      uploadUrl: upload.uploadUrl, //上传文件接口
      uploadData: {
        baseUrl: upload.baseUrl, //服务器基础路径
        uploadName: "file",  //上传文件类型
      },
      uploadFile: '',
      imgList: [],
    };
  },
  methods: {
    //表单关闭
    formClose () {
      this.$emit("formClose");
      this.$refs["dataForm"].resetFields();
      this.specsAllList = [];
    },

    //表单提交
    formSubmit () {
      console.log("表单数据-》", this.dataForm);
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          let para = Object.assign({}, this.dataForm);
          this.$emit("formSubmit", para);
          setTimeout(() => {
            if (this.formVisible !== true) {
              this.$refs["dataForm"].resetFields();
              this.specsAllList = [];
            }
          }, 500);
        }
      });
    },

    //下拉框方法导出
    handleAccount (val) {
      this.$emit("handleAccount", val);
    },

    //编辑框方法导出
    handleChange (val) {
      this.$emit("handleChange", val);
    },

    //移除图片
    handleRemove (file, fileList) {
      this.dataForm.batchImagePath = fileList;
    },

    //上传文件拦截
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const idGIF = file.type === 'image/gif';
      const isLt500K = file.size / 1024 / 1024 < 0.5;
      if (!isJPG && !isPNG && !idGIF) {
        this.$message.error('上传图片只能是 jpg/png/gif 格式!');
        return false;
      }
      if (!isLt500K) {
        this.$message.error('上传图片不能超过500K!');
        return false;
      }
      return true;
    },

    //上传文件数量超出
    exceed () {
      this.$message.error('上传图片数量超出啦!');
    },

    //批量上传,参数i代表字段名
    handleSuccessBatch (i, value) {
      this.dataForm[i].push({ url: value.data.url });
    },

    //图片上传成功
    handleSuccess (i, value) {
      this.dataForm[i] = value.data.url;
    },

    //上传失败
    handleErr () {
      this.$message({
        message: "上传失败",
        type: "error"
      });
    },

    //上传文件移除
    uploadRemove (file, fileList) {
      this.dataForm.fileList = [];
    },

    //文件上传成功
    uploadSuccess (response, prop) {
      if (response.errorCode != 0) {
        this.$message({
          message: "上传失败",
          type: "error"
        });
        this.dataForm.fileList = [];
        return;
      }
      this.dataForm.savePath = response.data.url;
      this.dataForm.fileList.push(response.data);
    },
  },
  mounted () {
    tinymce.init({}) //初始化富文本
    // 多图上传绑定值
    this.formConfig.map(res => {
      if (res.type === 'uploadImgBatch') {
        let a = [];
        this.imgList = a.concat(this.dataForm[res.prop]);
      }
    })
  }

};
</script>

