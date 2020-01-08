/**
 * 邮箱
 * @param {*} string
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} string
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} string
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} string
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证
 * @param {*} string
 */
export function isId (s) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s)
}

/**
 * 是否是图片类型
 * @param {*} type
 */
export function isImg (type) {
  if (type !== 'image/jpg' && type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/gif') {
    this.$message.error('只支持jpg、png、gif格式的图片！')
    return false
  }
  return true
}

/**
 * 是否是视频类型['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb']
 * @param {*} type
 */
export function isVideo (type) {
  if (type !== 'video/mp4' && type !== 'video/ogg' && type !== 'video/flv' && type !== 'video/avi' && type !== 'video/wmv' && type !== 'video/rmvb') {
    this.$message.error('只支持mp4、ogg、flv、avi、wmv、rmvb格式的视频！')
    return false
  }
  return true
}

/**
 * 是否是压缩包类型
 * @param {*} type
 */
export function isZip (type) {
  if (type !== 'application/zip') {
    this.$message.error('只支持zip格式的图片！')
    return false
  }
  return true
}

/**
 * 是否是文档类型['application/msword'、'application/pdf']
 * @param {*} type
 */
export function isDoc (type) {
  if (type !== 'application/zip' && type !== 'application/pdf') {
    this.$message.error('只支持doc、docx、pdf格式的文档！')
    return false
  }
  return true
}