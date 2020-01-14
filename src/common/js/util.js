var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding (s, len) {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) { s = '0' + s; }
  return s;
};

export default {
  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y': return padding(date.getFullYear(), $0.length);
          case 'M': return padding(date.getMonth() + 1, $0.length);
          case 'd': return padding(date.getDate(), $0.length);
          case 'w': return date.getDay() + 1;
          case 'h': return padding(date.getHours(), $0.length);
          case 'm': return padding(date.getMinutes(), $0.length);
          case 's': return padding(date.getSeconds(), $0.length);
        }
      });
    },
    getNowFormatDate: function () {
      var date = new Date();
      var seperator1 = "/";
      var seperator2 = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      var seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate + ' '
        + hour + seperator2 + min + seperator2 + seconds;
      return currentdate;
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y': _date.setFullYear(_int); break;
            case 'M': _date.setMonth(_int - 1); break;
            case 'd': _date.setDate(_int); break;
            case 'h': _date.setHours(_int); break;
            case 'm': _date.setMinutes(_int); break;
            case 's': _date.setSeconds(_int); break;
          }
        }
        return _date;
      }
      return null;
    },
    dateString: function (time) {
      time = time.substring(0, 10) + " " + time.substring(11, 19);
      return time;
    },
    changeData: function (Content) {
      for (let i = 0; i < Content.length; i++) {
        //创建时间
        if (Content[i].createTime != null) {
          Content[i].createTime = this.dateString(Content[i].createTime);
        }
        //修改时间
        if (Content[i].updateTime != null) {
          Content[i].updateTime = this.dateString(Content[i].updateTime);
        }
        //订单收货时间
        if (Content[i].confirmTime != null) {
          Content[i].confirmTime = this.dateString(Content[i].confirmTime);
        }
        //订单支付时间
        if (Content[i].payTime != null) {
          Content[i].payTime = this.dateString(Content[i].payTime);
        }
        //订单发货时间
        if (Content[i].deliverTime != null) {
          Content[i].deliverTime = this.dateString(Content[i].deliverTime);
        }
        //首页7日时间
        if (Content[i].date != null) {
          Content[i].date = this.dateString(Content[i].date).substr(5, 5);
        }
      }
      return Content;
    },
    mobile: function (rule, value, callback) {
      if (/^1[34578]\d{9}$/.test(value) == false) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    },
    changeImagePath: function (Content) {
      if (Content[0].avatar != null) {
        Content.map(item => {
          item.imagePath = item.avatar

        })
      }
      return Content
    }
  },
};
