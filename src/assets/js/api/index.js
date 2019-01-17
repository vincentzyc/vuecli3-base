import Vue from "vue";
import apiModule1 from './apiModule1.js';
import apiModule2 from './apiModule2.js';

const vm = new Vue()

const createInterface = arr => {
	let Interface = {};
	arr.forEach(v => {
		Interface[v.name] = param => {
			return new Promise(reslove => {
				Api.axiosPost(v.url, param).then(res => reslove(res))
			})
		}
	});
	return Interface
}

const Api = {
	ApiModule1: createInterface(apiModule1),
	ApiModule2: createInterface(apiModule2),
	env() {
		if (process.env.NODE_ENV === "development" || window.location.href.includes('192.168')) return "development";
		if (window.location.href.includes('test-mgr')) return 'test';
		return 'production'
	},
	baseUrl() {
		if (this.env() === "development") return "http://192.168.xxx.xxx:xxxx/";
		if (this.env() === 'test') return "http://test.xxx.com/";
		return "http://xxx.com/";
	},
	axiosPost(url, data) {
		return new Promise(resolve => {
			vm.$axios.post(url, data).then(res => {
				resolve(res);
			}).catch(error => {
				console.log(error);
			});
		})
	}
}

export default Api