// 工具 ---------------------------------------------------------------------------------------------------------------------------------

var utils = {
	/**
	 * 空字符串声明
	 * 
	 * 非全局声明变量的“全局变量”  以 "_" 开头
	 * 
	 * @type String
	 */
	_emptyString:'',
	/**
	 * 判断字符串是否空
	 * @param {} str
	 * @return true or false
	 */
	isEmpty: function(str){
		return !str || str.length <= 0;
	},
	/**
	 * 判断字符串非空
	 * @param {} str
	 * @return true or false
	 */
	isNotEmpty: function(str){
		return !this.isEmpty(str);
	},
	/**
	 * 加载JS
	 * 
	 * @param {} filename
	 */
	loadJs: function(filename){
		var fileref = document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src",filename);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	},
	/**
	 * 记录日志
	 * @param {} loginfo  '/xxx'
	 */
	logTrace: function(loginfo) {
		var img = new Image();
		img.src = PROPERTIES.projectname + '/pv/mobile'+loginfo+'.jpg'; 
	},
	/**
	 * 截取字符串 包含中文处理
	 * (串,长度,增加...) 
	 * @param {} str
	 * @param {} len
	 * @param {} hasDot
	 * @return {}
	 */
	subString: function (str, len, hasDot) {  
		if(this.isEmpty(str)){
			return '';
		}
	    var newLength = 0;  
	    var newStr = "";  
	    var chineseRegex = /[^\x00-\xff]/g;  
	    var singleChar = "";  
	    var strLength = str.replace(chineseRegex,"**").length;  
	    for(var i = 0;i < strLength;i++) {  
	        singleChar = str.charAt(i).toString();  
	        if(singleChar.match(chineseRegex) != null) {  
	            newLength += 2;  
	        } else { newLength++;  }
	        if(newLength > len) { break;}  
	        newStr += singleChar;  
	    }  
	    if(hasDot && strLength > len) {  
	        newStr += "...";  
	    }  
	    return newStr;  
	},
	/**
	 * 处理数字显示问题，缺少的位数以 “0” 填充
	 * 
	 * @param {} str 要补全的数字
	 * @param {} wantLength 理想的位数 （大于str的长度时有效）
	 */
	numberMerge: function(str, wantLength){
		if(this.isEmpty(str)){
			str = '0';
		}
		if(this.isNotEmpty(wantLength)){
			var length = str.length;
			var sub = wantLength - length;  
			if(sub > 0){
				var zeros=this._emptyString;
				for(var i=0; i<sub; i++){
					zeros += '0';
				}
				str = zeros+str;
			}
		}
		return str;
	},
	/**格式化日期 为'yyyy/MM/dd HH:mm:ss'格式*/
	formatDate: function(date){
		
		var year = date. getFullYear();
		var month = date. getMonth()+1;
		var day = date. getDate();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		
		month = month<10 ? '0'+month : month;
		day = day<10 ? '0'+day : day;
		hour = hour<10 ? '0'+hour: hour;
		min = min<10 ? '0'+min: min;
		sec = sec<10 ? '0'+sec: sec;
		
		var dataStr = year+'/'+month+'/'+day+' '+hour+':'+min+':'+sec;
		return dataStr;
	},
	/**获取url“?”后面的部分*/
	getUrlParams: function(){
		var url = location.href;
		var params = '';
		
		if(url && url.length > 0){
			var index = url.indexOf('?');
			if(-1 != index){
				params = url.substr(index+1, url.length)
			}
		}
		
		return params;
	},
	/**截取 ‘a=b&c=d’ ... 形式的 key对应的value值*/
	getParamValue: function(urlparam, name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
		var r = urlparam.match(reg);
		if (r!=null) return unescape(r[2]); return null;
	},
	/**解析json**/
	parseJSON: function (str){
		return eval('(' + str + ')');
	},
	/**json字符串中非法 有引号相关的 转换成可以正常解析的json字符串**/
	validateJSONStr: function (data, replaceCharacter){
		try {
			var json = eval("(" + data + ")");
		} catch (e) {
			try {
				var dataArray = data.split("");
				var dataArrayLength = dataArray.length;
				for (var i = 0; i < dataArrayLength; i++) {
					if (dataArray[i] == ':' && dataArray[i + 1] == '"') {
						for (var j = i + 2; j < dataArrayLength; j++) {
							if (dataArray[j] == '"') {
								if (dataArray[j + 1] != ',' && dataArray[j + 1] != '}') {
									dataArray[j] = replaceCharacter || '\\\"';
								} else if (dataArray[j + 1] == ',' || dataArray[j + 1] == '}') {
									break;
								}
							}
						}
					}
				}
				data = dataArray.join('');
			} catch (e) {
			}
		}
		return data;
	}
};

module.exports = utils;
exports = module.exports;