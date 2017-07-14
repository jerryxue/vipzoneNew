const _baseHttp = 'http://vip1.kuwo.cn',
      _baseUrl = _baseHttp + '/vip/v2/vipzone';
export default {
  getBanner () {  //焦点图
    return _baseUrl + '?op=fp';
  },
  getSingerList (type, curPage, count) {
    return _baseUrl + '?op=mm&type='+type+'&curPage='+curPage+'&count='+count;
  },
  getSong (id) {
    return _baseUrl + '?type=url&id=' + id;
  },
  getPlayListDetail (id) {
    return _baseUrl + '?type=playlist&id=' + id;
  },
  getMv (id) {
    return _baseUrl + '?type=mv&id=' + id;
  },
  search (words) {
    return _baseUrl + '?type=search&s=' + words;
  }
};

var urlData = {
    //焦点图 banner fp
    recommend: {
        op: 'xbr',
        curPage: 1,
        count: 6
    },//酷我独家
    exclusive: {
        op: 'mxbr',
        curPage: 1,
        count: 20,
        totalPage: 0
    },//明星专题更多
    downloadTop: {
        op: 'sdr',
        curPage: 1,
        count: 3
    },//下载top
    nowMonthPK: {
        op: 'mpdr',
        userId: ''
    },//排行榜歌曲总计
    rankingSong: {
        op: 'plr',
        colId: 1,
        curPage: 1,
        count: 3
    },//排行榜歌曲总计
    rankingAllSong: {
        op: 'plr',
        colId: 2,
        curPage: 1,
        count: 3
    },//排行榜歌曲当日
    rankingSinger: {
        op: 'plr',
        colId: 5,
        curPage: 1,
        count: 3
    },//排行榜歌手当日
    rankingAllSinger: {
        op: 'plr',
        colId: 6,
        curPage: 1,
        count: 3
    },//排行榜歌手总计
    rankingAlbum: {
        op: 'plr',
        colId: 3,
        curPage: 1,
        count: 3
    },//排行榜专辑当日
    rankingAllAlbum: {
        op: 'plr',
        colId: 4,
        curPage: 1,
        count: 3
    },//排行榜专辑总计
    digitalAlbumDay: {
        op: 'plr',
        colId: 11,
        curPage: 1,
        count: 3,
        totalPage: 0
        //time: new Date().getTime()
    },//数字专辑每日畅销榜
    digitalAlbumWeek: {
        op: 'plr',
        colId: 12,
        curPage: 1,
        count: 3,
        totalPage: 0
        //time: new Date().getTime()
    },//数字专辑每周畅销榜
    digitalAlbumAll: {
        op: 'plr',
        colId: 13,
        curPage: 1,
        count: 3,
        totalPage: 0
        //time: new Date().getTime()
    },//数字专辑累计畅销榜
    newTop: {
        op: 'nsr',
        curPage: 1,
        count: 3
    },//最新top
    guesslike: {
        op: 'tbd',
        userId: '',
        did: '',
        curPage: 1,
        count: 3
    },//猜你喜欢
    downloadSinger: {
        op: 'tbds',
        userId: '',
        did: '',
        curPage: 1,
        count: 4
    },//推荐歌手
    bestSellingAlbum: {
        op: 'bsa',
        curPage: 1,
        count: 4
    },//畅销专辑
    essenceSongs: {
        op: 'ess',
        curPage: 1,
        count: 6
    },//精华歌单
    essenceSongsMore: {
        op: 'mess',
        curPage: 1,
        count: 20,
        totalPage: 0
    },//精华歌单
    ost: {
        op: 'ofs',
        curPage: 1,
        count: 3
    },//影视原声
    monthlyZone: {
        op: 'mm',
        type: 'hot',
        curPage: 1,
        count: 20,
        totalPage: 0
    },//包月专区
    monthlyScreenLanguage: {
        op: 'ilbrc',
        regCategory: ''
    },//筛选歌手语种
    monthlyScreenWords: {
        op: 'sbrcai',
        regCategory: '',
        initial: '',
        type: 'hot',
        curPage: 1,
        count: 20,
        totalPage: 0
    },//筛选歌手字母
    monthlyDownloadNum: {
        op: 'gvdn'
    },//包月专区下载次数
    onDemandAlbum: {
        op: 'pa',
        type: 'new',
        curPage: 1,
        count: 20,
        totalPage: 0
    },//点播专辑
    albumList: {
        op: 'sa'
    },//歌手付费专辑列表
    albumMusicList: {
        op: 'asi'
    },//专辑歌曲列表
    singerAlbumList: {
        op: 'sc'
    }//酷我精选集
};