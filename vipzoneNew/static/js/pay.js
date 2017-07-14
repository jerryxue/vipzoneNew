var osUtils 		= require('./osUtils.js');
var nativeUtils 	= require('./nativeUtils.js');
var utils 			= require('./utils.js');
var LogTraceUtils 	= require('./LogTraceUtils.js');

function isTest() {
    //是否是测试环境
    if (window.location.hostname == 'console.ecom.kuwo.cn' || window.location.hostname == 'testvip.kuwo.cn') {
        return true;
    } else {
        return false;
    }
}
function getHost() {
    if (isTest()) {
        return window.location.protocol + '//' + window.location.hostname;
    } else {
        return location.protocol + '//vip1.kuwo.cn';
    }
}
function getReceiptUrl() {
    var params = utils.getUrlParams();
    var isSandBox = utils.getParamValue(params, 'isSandBox');
    if(!isSandBox){
        isSandBox = PROPERTIES.userinfo.isSandBox || 0;
    }
    if (isTest()) {
        //return 'https://pay.kuwo.cn/pay_GAME/dopay';
        return 'https://pay.kuwo.cn/pay_PING/dopay';
    } else {
        if (isSandBox == 1) {
            return 'https://pay.kuwo.cn/pay_sandbox/dopay';
        } else {
            return 'https://pay.kuwo.cn/pay/dopay';
        }
    }
}
var Pay = {
	/**请求支付*/
	vipTypeId: {'vip_1': 1, 'vip_7': 12},
    pidKey: 'tj_kuwo_music_vip_',
    payCallbackUrl: getHost() + '/vip/pay/callback',

	payOrder: function(vipType, payType, cash, platform){

		var month = '1';
		var price = cash;
		var autoPay = 'no';
		var act = 'OPEN_VIP';
		var way = '';
		var srct = '';
		var serial = '';
		
		var vipJson = '{';
			vipJson += '"vip":';
			vipJson += '[{';
			vipJson += '"cnt":'+month+',';
			vipJson += '"id":"'+Pay.vipTypeId[vipType]+'",';
			vipJson += '"type":"'+vipType+'",';
			vipJson += '"price":"'+price+'"';
			vipJson += '}]';
			vipJson += '}';	
		
		
		var jsonParam = '{';
			jsonParam += '"cash":'+cash+',';
			jsonParam += '"payType":"'+payType+'",';
			jsonParam += '"autoPay":"'+autoPay+'",';
			jsonParam += '"checkCode": "'+serial+'",';
			jsonParam += '"platform":"' + platform + '",';
			jsonParam += '"src":"'+srct+'",';
			jsonParam += '"act":"'+act+'",';//升级 续费 开通
			jsonParam += '"clientAct":"'+way+'",';//试听 下载 播放
			jsonParam += '"uid":"'+PROPERTIES.userinfo.uid+'",';
			jsonParam += '"userName":"NoUse",';
			jsonParam += '"products":';
			jsonParam += vipJson;
			jsonParam += '}';
		
        var urlparams = utils.getUrlParams();
        urlparams += "&device_info=" + PROPERTIES.userinfo.MY_DEVICE_UID + "&source="
        + PROPERTIES.userinfo.source + "&version_name="
        + PROPERTIES.userinfo.ver + '&' +
        LogTraceUtils.getVersionParams('personalizedPop');

		
		var appVersion = 0;
		var channel = 0;
		try{
			appVersion = PROPERTIES.userinfo.source;
			// kwplayer_ar_8.4.1.0_svip021501.apk
            // kwplayer_ip_8.4.5.0_TJ.ipa
			var versionArr = appVersion.split('_');
	        appVersion = versionArr[2].replace(/\./g, '');
	        if(osUtils.isIos()){
				//iOS
            	channel = versionArr[3].replace(/\./g, '').replace('ipa', '');
			}else{
				//andriod
	        	channel = versionArr[3].replace(/\./g, '').replace('apk', '');
			}
            appVersion = parseInt(appVersion, 10);
		}catch(e){
			appVersion = 0;
			channel = 0;
		}

		//走你
        var postJson = {
            'op': 'pay',
            'jsonStr': jsonParam,
            'math': Math.random(),
            'appVersion': appVersion,
            'channel': channel,
            'urlparams': urlparams
        };
		if(PROPERTIES.userinfo.uid && PROPERTIES.userinfo.uid != '0' && PROPERTIES.userinfo.uid != 'null'){
			postJson['uid'] = PROPERTIES.userinfo.uid;
			postJson['sid'] = PROPERTIES.userinfo.sid;
		}else if(PROPERTIES.userinfo.virtualUid){
			postJson['virtualUid'] = PROPERTIES.userinfo.virtualUid;
			postJson['virtualSid'] = PROPERTIES.userinfo.virtualSid;
		}
        
		$.post("/vip/v2/userbase/pay", postJson, function(data){
	        	
         	data = eval("("+data+")");

            if(data.meta.code == "200"){
            	
            	var jsonResult = data.data;
				//appstore支付
				if('112' == payType || '119' == payType ){
                    var receiptUrl = getReceiptUrl();
                    var callBackUrl = Pay.payCallbackUrl;
                    var pId = Pay.pidKey + cash;
                    var jsonstr = '{"action":"pay_type", "type":"' + payType + '", "customId":"' + jsonResult.id + '", "receiptUrl":"' + receiptUrl + '", "callBackUrl":"' + callBackUrl + '", "pId":"' + pId + '", "cash":"' + cash + '", "kwb":"' + cash + '","service":"newvip" }';
                    nativeUtils.callNative(jsonstr);
                    Pay.closeWindow();
					//Main.IosUtils.appStoreApp(data.id,data.url,payType, cash);
				//支付宝/微信客户端支付
				}else{
					
					var service = 'newvip';
					var payTypeD = payType;
					var cashD = jsonResult.credit;
					var customerid = jsonResult.id;
					var userName = '';
					var sessionId = PROPERTIES.userinfo.sid;
					var userId = PROPERTIES.userinfo.uid;
					if(PROPERTIES.userinfo.virtualUid){
						userId = '';
						sessionId = PROPERTIES.userinfo.virtualSid;
					}
					var mburl = jsonResult.url + '?service=' + service + '&payType=' + payTypeD 
									+ '&platform=' + platform + '&cash=' + cashD + '&customerid=' + customerid
									+ '&vipType=' + vipType + '&userName=' + userName + '&sessionId=' + sessionId
									+ '&userId=' + userId+'&type='+osUtils.getPlat();
					if(PROPERTIES.userinfo.virtualUid){
						mburl += ('&virtualUid=' + PROPERTIES.userinfo.virtualUid);
						mburl += ('&virtualSid=' + PROPERTIES.userinfo.virtualSid);
					}
					var callback_url = jsonResult.callBackUrl;
					//$('#id_ip_payCallBackUrl').val(callback_url);
					Pay.callClient(mburl,payTypeD,callback_url,customerid);
				}
	 		}
        })
	},
	//关闭网页容器
	closeWindow: function() {
		setTimeout(function () {
            var action = 'closercmwindow';
            if (osUtils.isIos()) {
                action = 'popupView_remove';
            }
            nativeUtils.callNative('{"action":"' + action + '"}');
        }, 100);
	},
	
	
	/**调用支付客户端*/
	callClient: function(msg,payType,callback_url,customerid) {
		
		var jsonstr='';
		if('102' == payType){
			jsonstr = '{"action":"pay_start_aliclient","pay_aliclient_msginfo":"'+msg+'","callback_url":"'+callback_url+'",';
		}else if ('111'==payType || '123' == payType){
			jsonstr = '{"action":"pay_start_wxclient","pay_wxclient_msginfo":"'+msg+'","callback_url":"'+callback_url+'",';
		}else if('39' == payType) {
			if(osUtils.isAndroid()) callback_url='';//安卓支付宝自动续费出了问题，不能启用回调
			jsonstr = '{"action":"pay_start_aliclient_renewal","pay_aliclient_msginfo":"'+msg+'","callback_url":"'+callback_url+'",';
		}else if('122' == payType) {
			jsonstr = '{"action":"pay_start_wxclient_renewal","pay_wxclient_msginfo":"'+msg+'","callback_url":"'+callback_url+'", "callback_function": "PayInfo.payCallBack",';
		}


		// if ('111'==payType || '123' == payType){
		// 	jsonstr = '{"action":"pay_start_wxclient","pay_wxclient_msginfo":"'+msg+'","callback_url":"'+callback_url+'",';
		// }else if('122' == payType) {
		// 	jsonstr = '{"action":"pay_start_wxclient_renewal","pay_wxclient_msginfo":"'+msg+'","callback_url":"'+callback_url+'", "callback_function": "PayInfo.payCallBack",';
		// }
		if(jsonstr){
			jsonstr += ('"extra":"' + ('&pay_type='+payType+'&customerid='+customerid)+'"}');
		}
		nativeUtils.callNative(jsonstr);
		Pay.closeWindow();
	}
};


module.exports = Pay;
exports = module.exports;
