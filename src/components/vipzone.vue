<template id="vipContent" v-cloak>
  <div ref="vipzoneWrapper">
    <!-- 轮播图 -->
    <app-banner :listImg="listImg"></app-banner>
    <div class="ylb_dqb">
      <div class="tqim" @click="href('/rankSongList.html')"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg1.jpg" width="100%"><img class="tqpim" src="//image.kuwo.cn/newvip/vipzone/v2/dq.png"></div>
      <div class="tqim" @click="href('/rankEssenceSongs.html')"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg2.jpg" width="100%"><img class="tqpim" src="//image.kuwo.cn/newvip/vipzone/v2/gd.png"></div>
      <div class="tqim" @click="href('/rankAblumList.html')"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg3.jpg" width="100%"><img class="tqpim" src="//image.kuwo.cn/newvip/vipzone/v2/zj.png"></div>
    </div>
    <div class="ylb_zxian">
      <div class=" tang"><img class="tiaxna" v-for="singer in singerList" v-bind:src="singer.pic | pic" @error="errorImg(this)"></div>
      <p class="ylb_ptext">音乐包专享音乐包专享<img class="ylb_rjta" src="//image.kuwo.cn/newvip/vipzone/v2/rjta.png"></p>
    </div>
    <div class="ylb_fegd">
      <div class=" langd">
        <p class="lbiti">付费歌单</p>
        <p class="lbitian">童年</p>
        <p class="lbitian">童年童年</p>
        <p class="lbitian">童年童</p>
      </div>
      <p class="ylb_ptext">更多<img class="ylb_rjta" src="//image.kuwo.cn/newvip/vipzone/v2/rjta.png"></p>
    </div>
    <div class="ylb_fegdtu">
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
      </div>
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
      </div>
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
      </div>
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
      </div>
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
      </div>
    </div>
    <div class="ylb_fegd">
      <div class=" langd">
        <p class="lbiti">数字专辑</p>
      </div>
      <p class="ylb_ptext">更多<img class="ylb_rjta" src="//image.kuwo.cn/newvip/vipzone/v2/rjta.png"></p>
    </div>
    <div class="ylb_fegdtu">
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpae">付费歌单付费歌单付费付费歌单付费歌单付费歌</p>
        <p class="ylb_fegptaer">付费歌单付费歌单付费付费歌单付费歌单付费歌</p>
      </div>
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpae">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
        <p class="ylb_fegptaer">付费歌单付费歌单付费付费歌单付费歌单付费歌</p>
      </div>
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpae">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
        <p class="ylb_fegptaer">付费歌单付费歌单付费付费歌单付费歌单付费歌</p>
      </div>
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpae">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
        <p class="ylb_fegptaer">付费歌单付费歌单付费付费歌单付费歌单付费歌</p>
      </div>
      <div class=" ylb_fegdtuan"> <img src="//image.kuwo.cn/newvip/vipzone/v2/gantx.jpg" width="100%">
        <p class="ylb_fegpae">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p>
        <p class="ylb_fegptaer">付费歌单付费歌单付费付费歌单付费歌单付费歌</p>
      </div>
    </div>
    <div class="ylb_fegd">
      <div class=" langd">
        <p class="lbiti">猜你喜欢</p>
      </div>
    </div>
    <div class="ylb_dadb">
      <div class="tqim"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg1.jpg" width="100%"><p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p></div>
      <div class="tqim"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg2.jpg" width="100%"><p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p></div>
      <div class="tqim"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg3.jpg" width="100%"><p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p></div>
    </div>
    <div class="ylb_dadb">
      <div class="tqim"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg1.jpg" width="100%"><p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p></div>
      <div class="tqim"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg2.jpg" width="100%"><p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p></div>
      <div class="tqim"><img src="//image.kuwo.cn/newvip/vipzone/v2/dqimg3.jpg" width="100%"><p class="ylb_fegpta">付费歌单付费歌单付费付费歌单付费歌单付费歌单歌单</p></div>
    </div>
  </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'
import Banner from '../components/Banner'

import Url from '../common/url'
import Config from '../common/config'
import Utils from '../common/utils'
import nativeUtils from '../common/nativeUtils'

export default {
  name: 'hello',
  data () {
    return {
      listImg: [],
      singerList: []
    }
  },
  components: {
      'app-banner': Banner
  },
  methods: {
    _initScroll() {
      if (!this.vipzoneScroll) {
        this.vipzoneScroll = new BScroll(this.$refs.vipzoneWrapper, {
          click: true
        });
      } else {
        this.vipzoneScroll.refresh();
      }
    },
    errorImg (obj, type) {
      obj.src = Config.defaultImg(type)
    },
    href (val) {
      console.log('router href' + val);
      this.$router.push({ path: val });
    },
    initBanner() {
      this.$http.get(Url.getBanner())
        .then((res) => {
          let oJson = res.data
          this.listImg = oJson.data
          this.$nextTick(() => {
            this._initScroll();
          });
        })
        .catch(function(err){
          console.log(err);
        });
    },
    initSingerList() {
      this.$http.get(Url.getSingerList('hot', 1, 6))
        .then((res) => {
          let oJson = res.data,
              singerList = oJson.data.datas
          singerList.map(function(v, i, e){
              v.pic = Utils.getPic(v.pic, 'artist', 55, 150);//有个别返回的55*55的
              v.pic = Utils.getPic(v.pic, 'artist', 120, 150);
          })
          this.singerList = singerList
          this.$nextTick(() => {
            this._initScroll();
          });
        })
        .catch(function(err){
          console.log(err);
        });
    },
    init() {
      this.initBanner() //加载轮播图
      this.initSingerList() //加载首页歌手
    }
  },
  created() {
      console.log('vipzone init')
      this.init()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>