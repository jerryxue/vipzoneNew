export default {
	defaultImg (type) {
	    let imgUrl = ''
	    if (type === 1) { // banner图
	        imgUrl = location.protocol + '//image.kuwo.cn/newvip/vipzone/v1/error_banner.png';
	    } else if (type === 2) { // 专辑
	        imgUrl = location.protocol + '//image.kuwo.cn/newvip/vipzone/v1/error_ost.png';
	    } else { // 通用（方形）
	        imgUrl = location.protocol + '//image.kuwo.cn/newvip/vipzone/v1/error_common.png';
	    }
	    return imgUrl
	},
	staticData (type) {
		let data = {
		    title: '音乐包专区',
		    recommend: '推荐',
		    ranking: '排行榜',
		    monthly: '歌手',
		    album: '专辑',
		    artistAlbum: '歌手专辑',
		    guesslike: '猜你喜欢',
		    peopleInit: 'ABtest大家都在下',
		    downloadSinger: '推荐歌手',
		    exclusive: '明星专题',
		    downloadTop: '大家都在下',
		    newTop: '最新音乐',
		    bestSellingAlbum: '畅销专辑',
		    essenceSongs: '精华歌单',
		    ost: '影视原声',
		    vipguide: '会员中心',
		    rankingSong: '今日畅销歌曲',
		    rankingAllSong: '累计畅销歌曲',
		    rankingSinger: '今日畅销歌手',
		    rankingAllSinger: '累计畅销歌手',
		    rankingAlbum: '今日畅销专辑',
		    rankingAllAlbum: '累计畅销专辑',
		    digitalAlbumDay: '每日畅销榜',
		    digitalAlbumWeek: '每周畅销榜',
		    digitalAlbumAll: '累计畅销榜',
		    singerAlbumList: '酷我精选集',
		    monthlyScreenBtn: '筛选',
		    monthlyScreenWords: ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '其他'],
		    monthlyScreenLanguage: [
		        {name: '全部', value: '0'},
		        {name: '华语', value: '1'},
		        {name: '韩日', value: '4'},
		        {name: '欧美', value: '7'},
		        {name: '其他', value: '10'}
		    ],
		    monthlyType: {
		        new: '最新',
		        hot: '最热'
		    },
		    albumType: {
		        new: '最新',
		        hot: '最热'
		    },
		    tips: {
		        downloadTop: '选取前一天下载量最高的音乐包歌曲，每天更新',
		        newTop: '选取近7天新加入音乐包的歌曲，每天更新<br>已按热度排序，热度由播放量、购买量综合计算',
		        guesslike: '根据你的听歌行为生成，每天12:00更新',
		        downloadSinger: '根据你的听歌行为生成，每天12:00更新',
		        rankingSong: '选取今日下载榜单前100首歌曲，每天更新',
		        rankingAllSong: '选取累计下载榜单前100首歌曲，每天更新',
		        rankingSinger: '选取今日下载榜单前100名歌手，每天更新',
		        rankingAllSinger: '选取累计下载榜单前100名歌手，每天更新',
		        rankingAlbum: '选取今日下载榜单前100首专辑，每天更新',
		        rankingAllAlbum: '选取累计下载榜单前100首专辑，每天更新',
		        bestSellingAlbum: '选取前一天下载量最高的音乐包专辑，每天更新',
		        ost: '选取前一天下载量最高的音乐包原声，每天更新',
		        digitalAlbumDay: '今日专辑排行榜：<br>酷我音乐数字专辑畅销榜分日、周、累计三大维度，实时、全面、客观、公正展示数字专辑的销售情况及歌曲受粉丝欢迎程度。<br>更新时间：每天10点后实时更新<br>统计对象：所有酷我音乐在售数字专辑<br>统计算法：比较专辑每日新增销售额，按照增幅比例大小依次排列（每日10点至24点，实时展示销售排名，可以为偶像打榜夺冠哦）',
		        digitalAlbumWeek: '周专辑排行榜：<br>酷我音乐数字专辑畅销榜分日、周、累计三大维度，实时、全面、客观、公正展示数字专辑的销售情况及歌曲受粉丝欢迎程度。<br>更新时间：每天22点后更新一次<br>统计对象：所有酷我音乐在售数字专辑<br>统计算法：比较专辑每周（周一00:00至周日23:59）新增销售额，按照增幅比例大小依次排列',
		        digitalAlbumAll: '累计专辑排行榜：<br>酷我音乐数字专辑畅销榜分日、周、累计三大维度，实时、全面、客观、公正展示数字专辑的销售情况及歌曲受粉丝欢迎程度。<br>更新时间：实时更新<br>统计对象：所有酷我音乐在售及售卖过的数字专辑<br>排名数量：专辑前20名<br>统计算法：比较专辑累计销售额从大到小依次排列',
		        tipsRules: '榜单规则'
		    },
		    refer: {
		        0: '会员专区',
		        1: '会员专区',
		        2: '数字音乐商城',
		        3: '会员中心',
		        4: '我的付费',
		        5: '音乐包开通成功',
		        6: '官方通知消息'
		    }
		}
		return data[type]
	},
	logData (type) {
		let data = {
		    src: {
		        recommend: 1,
		        monthlyZone: 2,
		        onDemandAlbum: 3,
		        artistAlbumList: 4,
		        ranking: 5
		    },
		    pos: {
		        banner: 1,
		        exclusive: 2,
		        downloadTop: 3,
		        newTop: 4,
		        bestSellingAlbum: 5,
		        essenceSongs: 6,
		        ost: 7,
		        openVIP: 8,
		        feedback: 9,
		        guesslike: 10,
		        downloadSinger: 11,
		        peopleInit: 12,
		        gotorenew: 13,
		        gotorenew7: 14,
		        rankingSong: 1,
		        rankingAllSong: 2,
		        rankingAlbum: 3,
		        rankingAllAlbum: 4,
		        rankingSinger: 5,
		        rankingAllSinger: 6,
		        digitalAlbumDay: 7,
		        digitalAlbumWeek: 8,
		        digitalAlbumAll: 9,
		        hot: 'hot',
		        new: 'new'
		    },
		    action: {
		        init: 'init',
		        dvcinit: 'dvcinit',
		        tagChange: 'tagChange',
		        guessInit: 'guessInit',
		        peopleInit: 'peopleInit',
		        downloadSingerInit: 'downloadSingerInit',
		        play: 'play',
		        playAll: 'playAll',
		        download: 'download',
		        downloadAll: 'downloadAll',
		        more: 'more',
		        go: 'go'
		    }
		}
		return data[type]
	}
}