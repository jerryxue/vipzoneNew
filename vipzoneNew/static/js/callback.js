var utils = require("./utils.js");
var LogTraceUtils 	= require('./LogTraceUtils.js');

var callback = {
	init: function(){

		window["PROPERTIES"] = {
			userinfo: {}	//用户信息
		};

		//用户信息回调
		window["getuesrinfo"] = function (data){
			try{
				data = utils.validateJSONStr(data);
			}catch(e){}
			if(!data || '' == data){
				Main.showMsg('您还未登录，请登录！');
				return;
			}
			
			var data = eval("("+data+")");
		}

		//苹果设备信息回调
		window["feedback_deviceinfo"] = function (data){
			var uf = eval('('+data+')');
			if(uf) {
				PROPERTIES.userinfo.uid= uf["userid"];
				PROPERTIES.userinfo.MY_DEVICE_UID= uf["uid"];
				PROPERTIES.userinfo.uname= uf["uname"];
				PROPERTIES.userinfo.sid= uf["usersid"] ? uf["usersid"] : '';
				PROPERTIES.userinfo.source= uf["src"];
				PROPERTIES.userinfo.ver= uf["ver"];
				PROPERTIES.userinfo.supportSuper = uf["supportSuper"];
				if (uf.isSandBox) {
					PROPERTIES.userinfo.isSandBox = uf.isSandBox || 0;
				}
				if (uf.supportHideMiniController) {
					PROPERTIES.userinfo.supportHideMiniController = uf.supportHideMiniController || 0;
				}
			}
			
    		LogTraceUtils.doDeviceVersionInit('personalizedPop');
		}

		//安卓设备信息回调
		window["feedback_ardeviceinfo"] = function (data){
			try{
				data = utils.validateJSONStr(data);
			}catch(e){}
			var uf = eval('('+data+')');
			if(uf) {
				PROPERTIES.userinfo.uid= uf["uid"];
				PROPERTIES.userinfo.MY_DEVICE_UID= uf["device_uid"];
				PROPERTIES.userinfo.uname= uf["uname"];
				PROPERTIES.userinfo.sid= uf["sid"];
				PROPERTIES.userinfo.source= uf["source"];
				PROPERTIES.userinfo.ver= uf["version_name"];
				PROPERTIES.userinfo.supportSuper = uf["supportSuper"];
				if (uf.supportHideMiniController) {
					PROPERTIES.userinfo.supportHideMiniController = uf.supportHideMiniController || 0;
				}
			}


	        var userId = uf['uid'];
	        if(!userId || userId == '0' || userId == '' || userId == 'null'){
	            var virtualUid = uf['temporary_uid'];
	            var virtualSid = uf['temporary_sid'];
	            if(virtualUid && virtualUid != '-1' && virtualUid != -1){
	                PROPERTIES.userinfo.virtualUid = virtualUid;
	                PROPERTIES.userinfo.virtualSid = virtualSid;
	                return;
	            }
	            retry++;
	            if(retry > 3){
	                return;
	            }
	            nativeUtils.callNative('{"action":"get_temporary_userinfo","callback":"feedback_ardeviceinfo"}');
	        }
			
    		LogTraceUtils.doDeviceVersionInit('personalizedPop');
		}


		window["loginsuccess"] = function (data){
			PROPERTIES.userinfo.doRefresh = false;
			if('1' == data) location.reload();
		}

		window["supportCallback"] = function (data){
			if('1' == data){
				PROPERTIES.loginNew = true;
			}
		}
	}
}

module.exports = callback;
exports = module.exports;