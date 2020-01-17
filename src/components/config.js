
import { upload } from '../api/api'
export const editor = {
  selector: '.tinymce', //容器，可使用css选择器
  object_resizing: false,
  end_container_on_empty_block: true,
  powerpaste_word_import: 'clean',
  code_dialog_height: 450,
  code_dialog_width: 1000,
  advlist_bullet_styles: 'square',
  advlist_number_styles: 'default',
  default_link_target: '_blank',
  link_title: false,
  nonbreaking_force_tab: true,
  height: 300,
  quickbars_selection_toolbar: 'bold italic forecolor | link blockquote quickimage',//选中时出现的快捷工具，与插件有依赖关系
  language: 'zh_CN',
  language_url: '/tinymce/langs/zh_CN.js',
  skin_url: '/tinymce/skins/lightgray',
  convert_urls: false,
  file_picker_types: 'media',
  plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
  menubar: "insert",
  toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
  //上传图片
  file_picker_callback: function (callback, value, meta) {
    if (meta.filetype == 'media') {
      let input = document.createElement('input');//创建一个隐藏的input
      input.setAttribute('type', 'file');
      let that = this;
      input.onchange = function () {
        let file = this.files[0];//选取第一个文件
        const formData = new FormData()
        formData.append('file', file)
        formData.set('uploadName', 'file')
        formData.set('baseUrl', upload.baseUrl)
        customizeUpload(formData).then(res => {
          callback(res.data.url, { title: file.name })
        }).catch((res) => {
          callback(res.data.url, { title: file.name })
        })
      }
      //触发点击
      input.click();
    }
  },
  //上传文件
  images_upload_handler: function (blobInfo, success, failure) {
    const formData = new FormData()
    formData.append('file', blobInfo.blob())
    formData.set('uploadName', 'file')
    formData.set('baseUrl', upload.baseUrl)
    upload.customizeUpload(formData).then(res => {
      console.log("res12321", res);
      success(res.data.url);
    }).catch(() => {
      failure('上传失败，请重新上传')
    })
  },
  branding: false
}
