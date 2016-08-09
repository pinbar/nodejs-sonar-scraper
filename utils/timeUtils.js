module.exports = {
    getTime: function getTime(){
        var date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },
    getDate: function getDate(){
        var date = new Date();
        var month = date.getMonth() + 1;
        return date.getFullYear() + "." + month + "." + date.getDate();
    },
};