// 日志记录工具 ----------------------------------------------------------------------------------------------------------------------
var osUtils = require('./osUtils.js');

var LogTraceUtils = {
	
	root: function (params) {
		var img = new Image();
		img.src = '/vip/pv/logtrace1.gif?'+params;
	},
	
	/**获取版本信息对应的参数， 用于java 日志打印*/
	getVersionParams: function (version, abtest) {
		var myab = abtest || '0';
		return '&logver=' + version
				+ '&abtest=' + myab 
				+ '&pf='+ osUtils.getPlat()
				+ '&uid='+ PROPERTIES.userinfo.uid
				+ '&duid='+ PROPERTIES.userinfo.MY_DEVICE_UID
				+ '&dvers='+ PROPERTIES.userinfo.ver
				+ '&source='+ PROPERTIES.userinfo.source
				+ '&pid=';//TODO1,
	},
	
	/**记录初始化*/
	doInit: function (version, abtest) {
		var params = 'action=init&'+this.getVersionParams(version, abtest);
		this.root(params);
	},
	
	/**设备信息初始化统计*/
	doDeviceVersionInit: function (version, abtest) {
		var params = 'action=dvcinit&'+this.getVersionParams(version, abtest);
		this.root(params);
	},
	
	/**记录点击*/
	doPayClick: function (version, abtest) {
		var params = 'action=payClick&'+this.getVersionParams(version, abtest);
		this.root(params);
	}
	
}

module.exports = LogTraceUtils;
exports = module.exports;