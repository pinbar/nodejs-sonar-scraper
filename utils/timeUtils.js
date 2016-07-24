module.exports = {
	getTime: function getTime(){
		var date = new Date();
		return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	},
	getDate: function getDate(){
		var date = new Date();
		return date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
	},
};
