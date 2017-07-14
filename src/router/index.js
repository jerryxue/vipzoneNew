import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Vipzone from '../components/vipzone'
import rankSongList from '../components/rankSongList'
import rankEssenceSongs from '../components/rankEssenceSongs'
import rankAblumList from '../components/rankAblumList'

Vue.use(Router)

export default new Router({
  mode: 'history',		// 更改为history模式
  // base: '/vip/added/vipzoneNew',
  routes: [
    {
		path: '/index.html',
		name: 'Vipzone',
		component: Vipzone
    },
    {
		path: '/rankSongList.html',
		name: 'rankSongList',
		component: rankSongList
    },
    {
		path: '/rankEssenceSongs.html',
		name: 'rankEssenceSongs',
		component: rankEssenceSongs
    },
    {
		path: '/rankAblumList.html',
		name: 'rankAblumList',
		component: rankAblumList
    },
    { 
		path: '*', 
		redirect: '/index.html' 
    }
  ]
})

