/*
 * @Description: 表单规则校验类
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-08 09:40:35
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-08 09:56:19
 */

export default {
  /**
   * @description: 手机号校验
   * @param {type} 
   * @return: 
   */
  mobile: function (rule, value, callback) {
    if (/^1[34578]\d{9}$/.test(value) == false) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  },
  /**
   * @description: 汉字校验
   * @param {type} 
   * @return: 
   */
  chineseFont: function (rule, value, callback) {
    if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
      callback(new Error("请输入正确的汉字"));
    } else {
      callback();
    }
  },
  /**
   * @description: 正整数校验
   * @param {type} 
   * @return: 
   */
  positiveInteger: function (rule, value, callback) {
    if (/^[0-9]+$/.test(value) == false) {
      callback(new Error("请输入正确的正整数"));
    } else {
      callback();
    }
  },
  /**
   * @description:正数校验 
   * @param {type} 
   * @return: 
   */
  positiveNumber: function (rule, value, callback) {
    if (/^([1-9]+(\.\d+)?|0\.\d+)$/.test(value) == false) {
      callback(new Error("请输入正确的正数"));
    } else {
      callback();
    }
  },
  /**
   * @description: 地址校验
   * @param {type} 
   * @return: 
   */
  address: function (rule, value, callback) {
    if (/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(value) == false) {
      callback(new Error("请输入正确的地址"));
    } else {
      callback();
    }
  },
  /**
   * @description:密码校验 
   * @param {type} 
   * @return: 
   */
  password: function (rule, value, callback) {
    if (/^(\w){6,20}$/.test(value) == false) {
      callback(new Error("只能输入字母、数字、下划线"));
    } else {
      callback();
    }
  },
  /**
   * @description:邮箱校验 
   * @param {type} 
   * @return: 
   */
  email: function (rule, value, callback) {
    if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value) == false) {
      callback(new Error("输入正确的邮箱格式"));
    } else {
      callback();
    }
  },
};
