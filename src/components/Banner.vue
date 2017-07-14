<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="banner in listImg" @click="bannerClick(banner)">
            	<img v-bind:src="banner.pic | pic" width="100%" @error="errorImg(this, 1)"/>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
	import '../../static/css/swiper.min.css'
    import Swiper from 'swiper'
	import Url from '../common/url'
	import Config from '../common/config'
	import Utils from '../common/utils'
	import nativeUtils from '../common/nativeUtils'
	
    export default {
        props: ['listImg'],
        methods: {
        	errorImg (obj, type) {
        		obj.src = Config.defaultImg(type)
        	},
        	bannerClick (banner) {
			    if (banner.source == 8 || banner.source == 12 || banner.source == 13) {
			        //歌单 / 专辑
			        let type = 'gd';
			        if (banner.source == 13) {
			            //专辑
			            type = 'zj';
			        }
			        nativeUtils.gotoPanel(type, banner.sourceId, banner.title, Utils.joinPsrc([Config.staticData(title), Config.staticData(recommend), '焦点图', banner.title]), {'pay': banner.pay});
			    } else {
			        //链接
			        nativeUtils.openUrl(banner.sourceId, banner.title);
			    }
        	}
        },
        mounted() {
            // console.log('mounted', this)
            let swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
			    observer:true,//修改swiper自己或子元素时，自动初始化swiper
			    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                loop: true,
                speed: 600,
            	autoplay: 5000,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
        }
    }
</script>

<style lang="less">
    .swiper-container {
        width: 100%;
        height: 10rem;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet {
            width:0.6rem;
            height: 0.6rem;
            display: inline-block;
            background: rgba(255,255,255,0.5);
            opacity: 1;
        }
        .swiper-pagination-bullet-active {
        	background: #fff;
        }
    }
    .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    	bottom: 10px;
    	left: initial;
		right: 1rem;
		width: auto;
    }
</style>