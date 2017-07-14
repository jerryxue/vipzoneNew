//手机本地方法调用 -----------------------------------------------------------------------------------------------------------------------
var osUtils = require('./osUtils.js');

var nativeUtils={
	/**
	 * 调用本地方法
	 *  
	 * @param {} jsonAdr Required 必须有 
	 * @param {} jsonIos	Optional
	 */
	callNative: function(json){
		
		if(osUtils.isAndroid()){
			window.KuwoInterface.jsCallNative(json);
		}else if (osUtils.isIos()) {
			var data = eval("("+json+")");
			var messagingIframe;    
			messagingIframe = document.createElement('iframe');    
			messagingIframe.style.display = 'none';    
			document.documentElement.appendChild(messagingIframe);
			messagingIframe.src= "kwip://kwplayerhd/"+data.action+"?param="+encodeURIComponent(json);
			
			//window.location.href= "kwip://kwplayerhd/"+data.action+"?param="+encodeURIComponent(json);
		}else{
			try{
				window.KuwoInterface.jsCallNative(json);
			} catch(e){
				var data = eval("("+json+")");
				var messagingIframe;    
				messagingIframe = document.createElement('iframe');    
				messagingIframe.style.display = 'none';    
				document.documentElement.appendChild(messagingIframe);
				messagingIframe.src= "kwip://kwplayerhd/"+data.action+"?param="+encodeURIComponent(json);
			}
		}
	},
	/**
	 * MV操作
	 * 
	 * @param {} mvId
	 * @param {} mvName
	 * @param {} mvQuality
	 * @param {} artist
	 */
	arPlayMV: function(mvId,mvName,mvQuality,artist){
		var libpath = '';
		var jsonstr=   '{"action":"control_playmv","libpath":"'+libpath+'","musiclist":[{"musicrid":"'+mvId+'","name":"'+mvName+'","formats":"'+mvQuality+'","artist":"'+artist+'"}]}';
		var armvquality = mvQuality.replace(/\|/g,";")
		var jsonstrAdr='{"action":"control_playmv","libpath":"'+libpath+'","musiclist":[{"mvid":"'+mvId+'","mvname":"'+mvName+'","mvquality":"'+armvquality+'","artist":"'+artist+'"}]}';
		this.callNative(jsonstrAdr, jsonstr);
	},
	//歌曲操作 type操作类型 musicStr歌曲集合array 单曲[{}],批量[{},{}]
	musicOption: function (type, musicStr) {
		var action = '';
		if (type == 'play') {
			action = 'control_playselect';
		} else if (type == 'download') {
			action = 'control_downloadselect';
		}
		var jsonstr = '{"action":"' + action + '","libpath":"","musiclist":' + musicStr + '}';
		console.log(jsonstr);
		this.callNative(jsonstr);
	},
	/**
	 * 
	 * 歌曲操作
	 * 
	 * @param {} playSelect
	 * @param {} id
	 * @param {} name
	 * @param {} artist
	 * @param {} album
	 * @param {} formats
	 */
	arPlaySONG: function(playSelect,id,name,artist,album,formats){
		var libpath = '';
		var jsonstr='{"action":"'+playSelect+'","libpath":"'+libpath+'","musiclist":[{"musicrid":"'+id+'","name":"'+name+'","formats":"'+formats+'","artist":"'+artist+'","album":"'+album+'"}]}';
		this.callNative(jsonstr);
	},
	tagDefine: function () {
		var jsonstr='{"action":"pay_tag_define", "callback":"tagDefineCallBack"}';
		this.callNative(jsonstr);
	},
	/**调用是否是最新的客户端--同时也是是否支持登录后的回调*/
	supportClientPay: function(){
		var jsonstr = '{"action":"is_compatible_client_pay","callback":"supportCallback"}';
		this.callNative(jsonstr);
	},
	/**显示登陆框*/
	showLoginBox: function () {
		var jsonstr='{"action":"control_login", "callback":"loginsuccess"}';
		if(osUtils.isIos() && !PROPERTIES.loginNew){
			//不支持登陆回调版本的 IOS 要使用此方法来弹出登陆
			jsonstr ='{"action":"to_loginAndRegist"}';
		}
		this.callNative(jsonstr);
	},
	/**
	 * 获取设备信息
	 * 
	 * 回调
	 * feedback_deviceinfo(data) （ios）
	 * feedback_ardeviceinfo(data) (android)
	 */
	getDeviceinfo: function() {
		var jsonstr = '{"action":"control_get_deviceinfo","pagetype":"def"}';
		this.callNative(jsonstr);
	},
	
	/**
	 * 跳转到指定面板
	 * 
	 * @param {} type 要调用的面板类型，
	 * 				<ul>
	 * 					<li>gs: 歌手面板; 
	 * 					<li>zj: 专辑面板; 
	 * 					<li>gd: 歌单面板; 
	 * 					<li>zq: 专区面板; 
	 * 					<li>gm: 我的购买面板; 
	 * 				</ul> 
	 * @param {} id 指定ID 面板的后台配置ID
	 * @param {} title 面板名称
	 */
	gotoPanel: function (type, id, title) {
		if(utils.isEmpty(type)) return;
		var action = '',
			jsonstr = '';
		if(osUtils.isIos()){
			if('gs' == type) action = 'sys_goto_artist';
			else if('zj' == type) action = 'sys_goto_album';
			else if('gd' == type) action = 'sys_goto_songlist';
			else if('zq' == type) action = 'sys_goto_zhuanqu';
			else if('gm' == type) action = 'pay_goto_songs_purchased';
			jsonstr = '{"action":"'+action+'","persistentId":"'+id+'","title":"'+title+'"}';
		}else{
			if ('gs' == type) {
				action = 'goto_artist_page';
				jsonstr = '{"action":"' + action + '","artistid":"' + id + '","artistname":"' + title + '"}';
			} else if ('zj' == type) {
				action = 'goto_album_page';
				jsonstr = '{"action":"' + action + '","albumid":"' + id + '","name":"' + title + '"}';
			} else if ('gd' == type) {
				action = 'goto_playlist_page';
				jsonstr = '{"action":"' + action + '","pid":"' + id + '","name":"' + title + '"}';
			} else if ('zq' == type) {
				action = 'sys_goto_zhuanqu';
				jsonstr = '{"action":"' + action + '","persistentId":"' + id + '","title":"' + title + '"}';
			} else if('gm' == type) {
				action = 'pay_goto_songs_purchased';
				jsonstr = '{"action":"' + action + '","persistentId":"' + id + '","title":"' + title + '"}';
			};
		}
		this.callNative(jsonstr);
	},
    //在app打开一个新的webview
    openUrl: function (url, title, type) {
        if (url.indexOf('?') > -1) {
            url = url + '&t=' + Math.random();
        } else {
            url = url + '?t=' + Math.random();
        }
        var refer = nativeUtils.getKey(url, 'refer');
        if (!refer) {
            url = url + '&refer=' + (nativeUtils.getKey(window.location.href, 'refer') || 0);
        }
        url = url.replace('https://', location.protocol + '//').replace('http://', location.protocol + '//');
        if (location.hostname == 'testvip.kuwo.cn' || location.hostname == 'console.ecom.kuwo.cn') {
            url = url.replace('vip1.kuwo.cn', location.hostname);
        }
        title = nativeUtils.returnSpecialChar(title);
        var jsonstr = '{"action":"control_inapp_url","url":"' + url + '","title":"' + title + '","pagetype":"' + (type || '') + '"}';
		if (navigator.userAgent.indexOf('kuwopage') > -1) {
            this.callNative(jsonstr);
        } else {
        	try{
        		if(((typeof deviceUtils == 'object') && (typeof deviceUtils.ver != 'undefined')) || ((typeof PROPERTIES.device == 'object') && (typeof PROPERTIES.device.MY_VERSION_NAME != 'undefined')) || ((typeof PROPERTIES.userinfo == 'object') && (typeof PROPERTIES.userinfo.ver != 'undefined'))){
					this.callNative(jsonstr);
        			return false;
        		}
        	}catch(e){}
            window.location.href = url;
        }
    },
    //检查特殊字符
	showSpecialChar: function(s) {
	    s = s || '';
	    return s.replace(/&nbsp;/g, ' ').replace(/\&amp;/g, "&").replace(/&apos;/g, '\'').replace(/\&quot;/g, "\"").replace(/\%26apos\%3B/g, "'").replace(/\%26quot\%3B/g, "\"").replace(/\%26amp\%3B/g, "&");
	},
	//替换特殊字符
	returnSpecialChar: function(s) {
	    s = '' + s;
	    return s.replace(/\&amp;/g, "&").replace(/\&nbsp;/g, " ").replace(/\&apos;/g, "'").replace(/\&quot;/g, "\\\"").replace(/\%26apos\%3B/g, "'").replace(/\%26quot\%3B/g, "\\\"").replace(/\%26amp\%3B/g, "&");
	},
    getKey: function(url, key) {
	    //获取某个url字符串中 key的value  比如 xxx.com?a=1&b=2
	    url = url.toString();
	    if (url.indexOf('#') >= 0) {
	        url = url.substring(0, url.indexOf('#'));
	    }
	    var value = '';
	    var begin = url.indexOf(key + '=');
	    if (begin >= 0) {
	        var tmp = url.substring(begin + key.length + 1);
	        var eqIdx = tmp.indexOf('=');
	        var end = 0;
	        if (eqIdx >= 0) {
	            tmp = tmp.substring(0, eqIdx);
	            end = tmp.lastIndexOf('&');
	        } else {
	            end = tmp.length;
	        }
	        if (end >= 0) {
	            try {
	                value = decodeURIComponent(tmp.substring(0, end));
	            } catch (e) {
	                value = tmp.substring(0, end);
	            }
	        } else {
	            try {
	                value = decodeURIComponent(tmp);
	            } catch (e) {
	                value = tmp;
	            }
	        }
	    }
	    return value;
	},
	/**通知服务器支付完成*/
	payFinished: function () {
		var jsonstr = '{"action":"pay_finished","callback":"", "success":"true"}';
		this.callNative(jsonstr);
	},
	/**设置网页容器标题*/
	setPageTitle: function (title) {
		try{
			if(osUtils.isIos()){
				this.callNative('{"action":"set_title","title":"'+title+'"}');
			}else{
				window.KuwoInterface.set_title(title);
			}
		}catch(e){}
	}
	
};//end 

module.exports = nativeUtils;
exports = module.exports;