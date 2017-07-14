var dialogHtml 		= require('!html!../html/dialog.html');
var callback 		= require('./callback.js');
var osUtils 		= require('./osUtils.js');
var nativeUtils 	= require('./nativeUtils.js');
var utils 			= require('./utils.js');
var pay 			= require('./pay.js');
var LogTraceUtils 	= require('./LogTraceUtils.js');

var personalizedPop = {
	props: {
		vipType: 'vip_1',
		price: '8',
		platform: ''
	},
    init: function () {
		callback.init();
        var params  = utils.getUrlParams();
        var rid     = utils.getParamValue(params, 'rid');
        var albumid = utils.getParamValue(params, 'albumid');
        var singerId= utils.getParamValue(params, 'artistid');
        var persistentld= utils.getParamValue(params, 'persistentld');

        $('body').html(dialogHtml);
        this.initPageEvent();
        this.initUserInfo();
		if(osUtils.isIos()){
			//iOS
			personalizedPop.props.platform = 'ios';
		}else{
			//andriod
			personalizedPop.props.platform = 'ar';
		}
        //测试
        // personalizedPop.props.platform = 'ios';
        personalizedPop.initMusicInfo(persistentld);
    },
    initUserInfo: function(){
		if(osUtils.isIos()){
			//iOS
			var jsonstr = '{"action":"pay_getallinfo","callback":["getuesrinfo"]}';
			nativeUtils.callNative(jsonstr);
			nativeUtils.getDeviceinfo();
		}else if(osUtils.isAndroid()){
			//andriod
			var jsonstr = '{"action":"pay_getuesrinfo","callback":"getuesrinfo"}';
			nativeUtils.callNative(jsonstr);
			nativeUtils.getDeviceinfo();
		}else{
			//pc
			PROPERTIES.userinfo.uid= '77347466';
			PROPERTIES.userinfo.uname= 'pc测试';
			PROPERTIES.userinfo.sid= '1768805283';
			PROPERTIES.userinfo.source= 'pc';
			PROPERTIES.userinfo.ver= 'pc';
		}
    },

    initMusicInfo: function (persistentld) {
        if (!persistentld) {
            return;
        }
        $.post('/vip/v2/sysinfo', {
            op: 'gri',
            pid: persistentld,
            resouceType: 'song'
        }, function (data) {
            var json = eval("(" + data + ")");
            if (json.meta.code === 200) {
                var music = json.data;
                music = eval("(" + music + ")");
                if (music && music.abslist && music.abslist.length > 0) {
                    music = music.abslist[0];
                    var name = music.SONGNAME;
                    var artistId = music.ARTISTID;
                    var artist = music.ARTIST;

        			personalizedPop.loadPageData(artistId, personalizedPop.props.platform);
                }
            }
        });
    },
    pageDatachange: function (info) {
    	var productTypeId = '';
	 	var desc = '';
	 	var priceDesc = '';
	 	var pic = '';
        var payType = '';
    	if(info && info.data && typeof info.data == 'object'){
    		productTypeId = info.data.productTypeId;
	 		desc = info.data.desc;
	 		pic = info.data.pic;
            payType = info.data.payType;
            priceDesc = info.data.priceDesc || '';
            try{
                priceDesc = priceDesc && decodeURIComponent(priceDesc) || '';
            }catch(e){console.log(e.message);}

            try{
                priceDesc = priceDesc && decodeURIComponent(priceDesc) || '';
            }catch(e){console.log(e.message);}
    	}else{
    		productTypeId = 1;
	 		desc = '版权方要求不能免费下载，可付费后畅享';
	 		pic = '//image.kuwo.cn/newvip/webpack/personalizedPop/img-default2.png';
    	}
	 	if(productTypeId == 12){
	 		personalizedPop.props.vipType = 'vip_7';
	 		personalizedPop.props.price = osUtils.isIos() ? 18 : 15;
	 		// priceDesc = '限时特惠<span class="color-f3742f">10</span>元，<span class="delete">原价15元</span>';
	 	}else{
	 		personalizedPop.props.vipType = 'vip_1';
	 		personalizedPop.props.price = 8;
	 		// priceDesc = '限时特惠<span class="color-f3742f">8</span>元，<span class="delete">原价8元</span>';
	 	}
        window['imgOnload'] = function(){
            // payType = 102; //测试
            personalizedPop.imgSuccess(payType);
        }
        window['imgOnerror'] = function(obj){
            // payType = 102; //测试
            personalizedPop.photoOnError(obj);
            personalizedPop.imgSuccess(payType);
        }
 		$('.main img').attr("src", pic || '//image.kuwo.cn/newvip/webpack/personalizedPop/img-default2.png');
        $('.main img').attr("onload", "imgOnload();");
        $('.main img').attr("onerror", "imgOnerror(this);");
 		$('#popText').html(desc || '版权方要求不能免费下载，可付费后畅享');
	 	$('#popText2').html(priceDesc);
    },
    photoOnError: function(obj) {
        obj.onerror = null;
        obj.src = '//image.kuwo.cn/newvip/webpack/personalizedPop/img-default2.png';
    },
    imgSuccess: function(payType){
        payType = -1;
        switch(payType){
            case 119: $('.pay[payType="ios"]').show(); break; //iOS
            case 102: $('.pay[payType="zfb"]').show(); break; //支付宝
            case 111: $('.pay[payType="wx"]').show(); break;  //微信
            case -1: $('.pay[payType="default"]').show(); break;  //开通页
            default: 
                if(osUtils.isIos()){
                    //iOS
                    $('.pay[payType="ios"]').show();
                }else{
                    //微信
                    $('.pay[payType="wx"]').show();
                }
        }
        $('.pageContent').show();
    },
    loadPageData: function (singerId, platform) {
   		$.ajax({
	  		url: '/vip/v2/sysinfo?op=gpp&singerId='+singerId+'&platform='+platform,
			dataType: 'json',
			type: 'get',
			success: function(data){
				// var info = {"data":{"singerId":336,"productTypeId":12,"desc":"开通豪华VIP可以播放和下载该歌曲","pic":"http://kwimg3.kuwo.cn/star/upload/14/14/1480326575790_.png"},"ctime":1489477387736,"meta":{"desc":"成功","code":200}}
				var info = data;
			 	personalizedPop.pageDatachange(info);
			},
			error: function(data){
			 	personalizedPop.pageDatachange();
			}
	 	});
	 	
    },
    initPageEvent: function () {
    	//关闭按钮
    	$('.close').on('click', function(){
    		
    	});

    	//支付按钮
    	$('.pay').on('click', function(){
    		var payType = $(this).attr('payType');
    		if(payType == 'wx'){
    			//微信支付
    			payType = '123';
    		}else if(payType == 'zfb'){
                //支付宝支付
                payType = '102';
            }else if(payType == 'ios'){
    			//iOS支付
    			payType = '119';
    		}else if(payType == 'default'){
                try{
                if(personalizedPop.props.vipType == 'vip_7'){
                    //豪华VIP
                    var afterfix = '&fromsrc=personalizedPop';
                    if(osUtils.isIos()){
                        var superUrl = '/vip/added/mobile/v2/appStore/superVip.jsp?1=1' + afterfix;
                        if(PROPERTIES.userinfo.ver){
                            var appVersion = PROPERTIES.userinfo.ver.replace('kwplayer_ip_', '').replace(/\./g, '');
                            var isSandBox = PROPERTIES.userinfo.isSandBox || 0;
                            superUrl += '&appVersion=' + appVersion + '&isSandBox=' + isSandBox;
                        }
                        // location.href = superUrl;
                        nativeUtils.openUrl(location.protocol + '//' + location.hostname + superUrl, '豪华VIP');
                    } else {
                        // location.href = '/vip/added/mobile/v2/andrSuperVip.jsp?1=1' + afterfix;
                        nativeUtils.openUrl(location.protocol + '//' + location.hostname + '/vip/added/mobile/v2/andrSuperVip.jsp?1=1' + afterfix, '豪华VIP');
                    }
                }else{
                    //音乐包
                    var afterfix = '&fromsrc=personalizedPop';
                    var renewVipmUrl = '/vip/added/mobile/v2/andrVip.jsp?1=1';
                    if(osUtils.isIos()){
                        renewVipmUrl = '/vip/added/mobile/v2/iosVip.jsp?1=1';
                        if(PROPERTIES.userinfo.ver){
                            var appVersion = PROPERTIES.userinfo.ver.replace('kwplayer_ip_', '').replace(/\./g, '');
                            var isSandBox = PROPERTIES.userinfo.isSandBox || 0;
                            renewVipmUrl = '/vip/vipPayDispatcher?appVersion=' + appVersion + '&buyTypeForDispatch=2&isSandBox=' + isSandBox;
                        }
                    }
                    renewVipmUrl = renewVipmUrl + afterfix;
                    // window.location.href = renewVipmUrl;
                    nativeUtils.openUrl(location.protocol + '//' + location.hostname + renewVipmUrl, '音乐包');
                }
                }catch(e){alert(e.message);}
                return false;
            }
    		LogTraceUtils.doPayClick('personalizedPop');
    		pay.payOrder(personalizedPop.props.vipType, payType, personalizedPop.props.price, personalizedPop.props.platform);
    	});
    }
};

module.exports = personalizedPop;
exports = module.exports;