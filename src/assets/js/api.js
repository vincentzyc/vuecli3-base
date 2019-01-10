export default {
	env() {
		if (process.env.NODE_ENV === "development" || window.location.href.includes('192.168')) return "development";
		if (window.location.href.includes('test-mgr')) return 'test';
		return 'production'
	},
	baseUrl() {
		if (this.env() === "development") return "http://192.168.xxx.xxx:xxx/";
		if (this.env() === 'test') return "http://test.xxx.com/";
		return "http://xxx.com/";
	}
};