<template>
  <el-dialog :title="title"
             :lock-scroll="false"
             :visible.sync="formVisible"
             :close-on-click-modal="false"
             width="60%"
             :before-close="formClose">
    <el-form :model="dataForm"
             :label-width="labelWidth"
             :rules="dataFormRules"
             ref="dataForm">
      <el-form-item v-for="(item, index) in formConfig"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
        <!--单选框-->
        <el-radio-group v-if="item.type === 'radio'"
                        v-model="dataForm[item.prop]">
          <el-radio :disabled="item.disabled"
                    class="radio"
                    v-for="(options,index) in item.path"
                    :key="index"
                    :label="options.description">{{ options.description }}</el-radio>
        </el-radio-group>

        <el-table :data="dataForm.orderItemList"
                  style="width: 100%"
                  v-else-if="item.type === 'table'">
          <el-table-column prop="commodityName"
                           label="商品名"> </el-table-column>
          <el-table-column prop="commoditySpecs"
                           label="商品规格"> </el-table-column>
          <el-table-column prop="commodityPrice"
                           label="商品价格"> </el-table-column>
          <el-table-column prop="commodityNum"
                           label="商品数量"> </el-table-column>
        </el-table>
        <!--地址选择-->
        <!-- <area-select type="text"
                     v-else-if="item.type === 'areaSelect'"
                     :level="2"
                     v-model="dataForm[item.prop]"
                     :data="pcaa"></area-select> -->
        <!--开关-->
        <el-switch v-else-if="item.type === 'switch'"
                   :disabled="item.disabled"
                   v-model="dataForm[item.prop]"
                   active-color="#13ce66"
                   inactive-color="#ff4949"></el-switch>
        <!--批量上传图片-->
        <el-upload v-else-if="item.type === 'uploadImgBatch'"
                   :action="uploadData.uploadImg"
                   :limit="5"
                   :data="uploadData"
                   ref='batchUpload'
                   v-model="dataForm[item.prop]"
                   :file-list="dataForm[item.prop]"
                   :on-error="handleErr"
                   :on-remove="handleRemove"
                   style="display: block;"
                   :on-success='handleSuccessBatch'
                   multiple
                   accept=".jpg,.jpeg,.png,.gif"
                   list-type="picture-card"
                   :class="batchClass"
                   :before-upload="beforeUpload">
          <i class="el-icon-plus"></i>
          <div slot="tip"
               class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,轮播图最多只能上传5张图片</div>
        </el-upload>
        <!--单张上传图片-->
        <el-upload v-else-if="item.type === 'uploadImg'"
                   :action="uploadData.uploadImg"
                   :data="uploadData"
                   ref='upload'
                   :show-file-list="false"
                   v-model="dataForm[item.prop]"
                   list-type="picture-card"
                   :on-remove="handleRemove"
                   :on-error="handleErr"
                   :on-success='handleSuccess'
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
        <!--各种上传-->
        <el-upload v-else-if="item.type === 'uploadFile'"
                   :file-list="dataForm[item.prop]"
                   class="upload-demo"
                   drag
                   :action="uploadFile"
                   :limit="1"
                   :on-remove="uploadRemove"
                   :on-error="uploadErr"
                   :on-success="uploadSuccess"
                   :data="uploadFileData">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <!--下拉框-->
        <el-select v-else-if="item.type === 'select'"
                   v-model="dataForm[item.prop]"
                   clearable
                   filterable
                   :disabled="item.disabled"
                   :placeholder="item.placeholder"
                   @change="handleAccount($event)">
          <el-option v-for="(option,index) in
                      item.prop === 'roleId' ? item.path :
                      item.prop === 'ruleId' ? item.path :
                      item.prop === 'projectId' ? item.path :
                      item.prop === 'systemId' ? item.path :
                      item.prop === 'supplierId' ? item.path :
                      ''"
                     :key="index"
                     :label="option.name"
                     :value="option.id"></el-option>
        </el-select>
        <!--新下拉框-->
        <el-select v-else-if="item.type === 'newSelect'"
                   v-model="dataForm[item.prop]"
                   clearable
                   filterable
                   :disabled="item.disabled"
                   :placeholder="item.placeholder"
                   @change="handleAccount($event,item.prop)">
          <el-option v-for="(option,index) in selectData[item.prop]"
                     :key="index"
                     :label="option.name?option.name:option.loginName?option.loginName:option.classifyName"
                     :value="option.id"></el-option>
        </el-select>

        <!-- 级联面板 -->
        <el-cascader-panel v-else-if="item.type === 'cascaderPanel'"
                           v-model="dataForm[item.prop]"
                           :options="selectData[item.prop]"
                           :props="{ checkStrictly: true,emitPath:false,expandTrigger: 'hover',value:'id',label:'classifyName',children:'children' }" />
        <!--下拉框-->
        <el-select v-else-if="item.type === 'selectSpecifications'"
                   v-model="dataForm[item.prop]"
                   :disabled="item.disabled"
                   multiple
                   :placeholder="item.placeholder"
                   @change="handleAccount($event)">
          <el-option v-for="(option,index) in item.prop"
                     :key="index"
                     :label="option.name"
                     :value="option.id"></el-option>
        </el-select>
        <!--时间选择框-->
        <el-date-picker v-else-if="item.type === 'date'"
                        :disabled="item.disabled"
                        v-model="dataForm[item.prop]"
                        type="datetime"
                        placeholder="选择日期时间"></el-date-picker>
        <el-slider v-else-if="item.type === 'slider'"
                   ref="slider"
                   v-model="dataForm[item.prop]"
                   :label="item.label"
                   :min="item.min"
                   :step="item.step"
                   :max="item.max"
                   :show-stops="item.stops"
                   :show-input="item.showInput">
        </el-slider>
        <el-checkbox-group v-else-if="item.type === 'checkbox'"
                           ref="checkbox"
                           v-model="dataForm[item.prop]">
          <el-checkbox v-for="option in selectData[item.prop]"
                       :label="option.id"
                       :key="option.id">{{option.name?option.name:option.title?option.title:option.labelName?option.specsName:option.specsName+option.price+"元"}}</el-checkbox>
        </el-checkbox-group>
        <!--editor编辑框-->
        <!-- <editor v-else-if="item.type === 'editor'"
                class="tinymce"
                v-model="dataForm[item.prop]"
                :init="editorInit" /> -->
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
                         :min="0"
                         :max="maxNum"></el-input-number>
        <!--规格-->
        <div v-else-if="item.type === 'specs'"
             class="specs">
          <el-select v-model="value"
                     placeholder="规格属性">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-card class="box-card specsBox">
            <div class="spacsTitle"
                 v-if="value==1">颜色</div>
            <el-input size="medium"
                      v-if="value==1"
                      placeholder="请输入颜色"
                      label="颜色"
                      v-model="colorData">
            </el-input>
            <div class="spacsTitle">{{value==0?"重量&包装：":value==1?"尺寸：":"型号："}}</div>
            <div class="editSpacsList">
              <el-input size="medium"
                        placeholder="请输入规格名称"
                        label="名称"
                        maxlength="10"
                        show-word-limit
                        v-model="nameData">
              </el-input>&nbsp－&nbsp
              <el-input size="medium"
                        placeholder="请输入库存"
                        v-model="stockData">
              </el-input>&nbsp－&nbsp
              </el-input>

              <el-button type="primary"
                         class="add"
                         size="small"
                         @click="addSpecs">添加</el-button>
            </div>
            <div class="spacsTitle">当前规格：</div>
            <el-checkbox-group v-model="dataForm[item.prop]">
              <div v-for="(item,index) in specsAllList==''?dataForm[item.prop]:specsAllList">
                <el-checkbox :label="specsAllList[index]">{{(item.color?item.color+'':'')+item.specsName+"  库存:"+ item.stock}}</el-checkbox>
                <el-button type="text"
                           class="littleMarginLeft"
                           @click="removeSpece(index)">删除</el-button>
              </div>
            </el-checkbox-group>
          </el-card>
        </div>
        <!--权限选择-->
        <div v-else-if="item.type==='selectList1'">
          <el-checkbox-group v-model="dataForm[item.prop]">
            <el-checkbox v-for="(option,index) in selectData[item.prop]"
                         :key="index"
                         :label="option.id">{{option.menuName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <!--文字-->
        <el-input v-else
                  :type="item.type"
                  :minlength="item.minlength"
                  :maxlength="item.maxlength"
                  v-model="dataForm[item.prop]"
                  clearable
                  :disabled="item.dChange && dataForm.type === 2 ? true : item.disabled"
                  :placeholder="item.placeholder"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer"
         v-if="title !== '详情'">
      <el-button @click.native="formClose">取消</el-button>
      <el-button type="primary"
                 @click.native="formSubmit"
                 :loading="submitLoading">提交</el-button>
    </div>
    <div slot="footer"
         class="dialog-footer"
         v-else>
      <el-button @click.native="formClose">返回</el-button>
    </div>
  </el-dialog>
</template>
<script>
import mixin from "../utils/mixin";
// import {
//   baseUrl,
//   uploadImg,
//   uploadFile,
//   customizeUpload
// } from "../api/api";
// import {
//   pca,
//   pcaa
// } from "area-data";

// import Editor from "@tinymce/tinymce-vue";
// import 'tinymce/themes/mobile/theme'
export default {
  components: {
    //Editor
  },
  mixins: [],
  props: [
    "title",
    "labelWidth",
    "dataForm",
    "dataFormRules",
    "formConfig",
    "enabled",
    "formVisible",
    "submitLoading",
    "selectData",
    "selectData2",
    "maxNum",
    "uploadFileData",
    "itemContent",
    "itemConfig",
  ],
  data () {
    return {
      role: [],
      // editorInit: {
      //   selector: '.tinymce', //容器，可使用css选择器
      //   height: 300,
      //   //选中时出现的快捷工具，与插件有依赖关系
      //   quickbars_selection_toolbar: 'bold italic forecolor | link blockquote quickimage',
      //   language: 'zh_CN',
      //   language_url: 'https://shop.dyqxss.com/admin/static/tinymce4.7.5/zh_CN.js',
      //   skin_url: 'https://shop.dyqxss.com/admin/static/tinymce4.7.5/skins/lightgray',
      //   convert_urls: false,
      //   file_picker_types: 'media',
      //   plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
      //   menubar: "insert",
      //   toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
      //   file_picker_callback: function (callback, value, meta) {
      //     console.log("进入上传视频")
      //     if (meta.filetype == 'media') {
      //       let input = document.createElement('input');//创建一个隐藏的input
      //       input.setAttribute('type', 'file');
      //       let that = this;
      //       input.onchange = function () {
      //         let file = this.files[0];//选取第一个文件
      //         const formData = new FormData()
      //         formData.append('file', file)
      //         formData.set('uploadName', 'file')
      //         formData.set('baseUrl', baseUrl)
      //         customizeUpload(formData).then(res => {
      //           callback(res.data.url, { title: file.name })
      //         }).catch((res) => {
      //           callback(res.data.url, { title: file.name })
      //         })
      //       }
      //       //触发点击
      //       input.click();
      //     }
      //   },
      //   images_upload_handler: function (blobInfo, success, failure) {
      //     const formData = new FormData()
      //     formData.append('file', blobInfo.blob())
      //     formData.set('uploadName', 'file')
      //     formData.set('baseUrl', baseUrl)
      //     customizeUpload(formData).then(res => {
      //       console.log("res12321", res);
      //       success(res.data.url);
      //     }).catch(() => {
      //       failure('上传失败，请重新上传')
      //     })
      //   },
      //   branding: false
      // },
      fileList: [],
      coverImagePath: "",
      dialogVisible: false,
      uploadData: {
        // uploadImg,
        // baseUrl,
        uploadName: "file",
      },
      //pcaa,
      // uploadUrl: uploadImg,
      uploadFile: '',
      batchClass: "batchUpload",
      options: [{
        value: '0',
        label: '食品',
      }, {
        value: '1',
        label: '服装',
      }, {
        value: '2',
        label: '其它',
      }],
      specsAllList: [],
      checkList: [],
      colorData: "",
      nameData: "",
      priceData: "",
      memberPriceData: "",
      holderPriceData: "",
      stockData: "",
      value: ''
    };
  },
  methods: {
    //添加规格
    addSpecs () {
      var that = this;
      that.value != 1 ? that.colorData = '' : that.colorData;
      this.specsAllList.push({        specsName: that.nameData, price: that.priceData,
        memberPrice: that.memberPriceData, stock: that.stockData, color: that.colorData, holderPrice: that.holderPriceData
        , specsType: that.value == '' ? '0' : that.value      })
      console.log("数组--》", this.specsAllList);
    },
    //移除规格
    removeSpece (index) {
      this.specsAllList.splice(index, 1);
    },
    //权限菜单选择
    checkAll (index) {

    },
    //规格选择
    checkRequired (index) {

    },
    handleRemove (file, fileList) {
      console.log("开始handleRemove")
      this.dataForm.batchImagePath = fileList;
      console.log("结束handleRemove")
    },
    beforeUpload (file) {
      console.log("file.type-->", file.type)
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
      // let cssIndex = this.dataForm.batchImagePath.length + 1;
      // this.batchClass = "batchUpload" + cssIndex;
      return true;
    },
    handleSuccessBatch (response) {

      console.log("this.dataForm.batchImagePath->", this.dataForm.batchImagePath);
      let index = this.dataForm.batchImagePath.length;
      let ulChild = this.$refs.batchUpload[0].$children[0];
      console.log("ulChild->", ulChild);
      let liChild = ulChild.$children[0].children[index];
      liChild.elm.style.display = "none";
      this.batchClass = "batchUpload";
      console.log("this.dataForm======>", this.dataForm)
      console.log("response->", response);
      this.dataForm.batchImagePath.push({ url: response.data.url });
      console.log("this.dataForm.batchImagePath==========>", this.dataForm.batchImagePath)

    },
    formClose () {
      this.$emit("formClose");
      this.$refs["dataForm"].resetFields();
      this.specsAllList = [];
    },
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
    handleAccount (val) {
      this.$emit("handleAccount", val);
    },
    handleChange (val) {
      this.$emit("handleChange", val);
    },
    handleSuccess (response, prop) {
      this.dataForm.imagePath = response.data.url;
      this.dataForm.coverImagePath = response.data.url;
      console.log("response.data.url", response);
    },
    handleErr () {
      this.$message({
        message: "上传失败",
        type: "error"
      });
    },
    uploadRemove (file, fileList) {
      this.dataForm.fileList = [];
    },
    uploadErr () {
      this.$message({
        message: "上传失败",
        type: "error"
      });
    },
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
    // tinymce.init({});
  }
};
</script>

<style lang="scss">
// @import "vue-area-linkage/dist/index.css";
// @import "../style/dataFormStyle.scss";

.area-select .area-selected-trigger {
  line-height: 16px;
}

.area-selected-trigger {
  color: #aaa;
}

.area-select-wrap .area-select {
  margin-left: 5px !important;
}

.apply .area-select.medium {
  width: 125px;
}

$classes: (1, 2, 3, 4, 5);

@for $i from 1 through length($classes) {
  $item: nth($classes, $i);
  .batchUpload#{$item} {
    ul {
      li:nth-child(n + #{$item}) {
        display: none;
      }
    }
  }
}
</style>
