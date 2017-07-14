// 操作系统	---------------------------------------------------------------------------------------------------------------------------

var osUtils = {
	flag: {
		FLAG_ME_ANDR: false,
		FLAG_ME_IOS: false,
		FLAG_ME_PC: false,
		setIos: function(){
			this.FLAG_ME_IOS = true;
		},
		setAndroid: function(){
			this.FLAG_ME_ANDR = true;	
		},
		setPC: function () {
			this.FLAG_ME_PC = true;
		}
	},
	property:{
		android: 'an',
		ios: 'ios',
		windows: 'win',
		mac: 'mac',
		pc: 'pc'
	},
	getPlat: function(){
		if(this.flag.FLAG_ME_ANDR) return this.property.android;
		if(this.flag.FLAG_ME_IOS) return this.property.ios;
		if(this.flag.FLAG_ME_PC) return this.property.pc;
		
		var plat = navigator.platform.toLowerCase();
		if(plat.indexOf('arm')>=0 || plat.indexOf('linux') >= 0 ){
			return this.property.android;
		}else if(plat.indexOf('win')>=0){
			return this.property.windows;
		}else if(plat.indexOf('mac')>=0){
			return this.property.mac;
		}else if(plat.indexOf('iphone')>=0||plat.indexOf('ipad')>=0||plat.indexOf('ipod')>=0){
			return this.property.ios;
		}
		return plat.substr(0,5);
	},
	isAndroid: function(){
		if(this.flag.FLAG_ME_ANDR) return true;
		else return this.property.android == this.getPlat();
	},
	isIos: function(){
		if(this.flag.FLAG_ME_IOS) return true;
		else return this.property.ios == this.getPlat();
	}
}

module.exports = osUtils;
exports = module.exports;