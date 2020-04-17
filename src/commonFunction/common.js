/* eslint-disable */
export default {
    formatTime: function(val) { //Formatted timestamp
        if (val === undefined) {
            return
        }
        var dataTime = "";
        var data = new Date();
        data.setTime(val * 1000);
        var year = data.getUTCFullYear();
        var month = data.getUTCMonth() + 1;
        var day = data.getUTCDate();
        var hour = data.getUTCHours();
        var minute = data.getUTCMinutes();
        var second = data.getUTCSeconds();
        month < 10 ? (month = "0" + month) : month;
        day < 10 ? (day = "0" + day) : day;
        hour < 10 ? (hour = "0" + hour) : hour;
        minute < 10 ? (minute = "0" + minute) : minute;
        second < 10 ? (second = "0" + second) : second;
        dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return dataTime;
    },
    formatTimeM: function(val) { //Formatted timestamp
        if (val === undefined) {
            return
        }
        var dataTime = "";
        var data = new Date();
        data.setTime(val * 1000);
        var year = data.getUTCFullYear();
        var month = data.getUTCMonth() + 1;
        var day = data.getUTCDate();
        var hour = data.getUTCHours();
        var minute = data.getUTCMinutes();
        var second = data.getUTCSeconds();
        month < 10 ? (month = "0" + month) : month;
        day < 10 ? (day = "0" + day) : day;
        hour < 10 ? (hour = "0" + hour) : hour;
        minute < 10 ? (minute = "0" + minute) : minute;
        second < 10 ? (second = "0" + second) : second;
        dataTime = month + "-" + day + " " + hour + ":" + minute;
        return dataTime;
    },
    formatTimeForIndex(val) {
        if (val === undefined) {
            return
        }
        var dataTime = "";
        var data = new Date();
        data.setTime(val * 1000);
        var year = data.getUTCFullYear();
        var month = data.getUTCMonth() + 1;
        var day = data.getUTCDate();
        var hour = data.getUTCHours();
        var minute = data.getUTCMinutes();
        var second = data.getUTCSeconds();
        month < 10 ? (month = "0" + month) : month;
        day < 10 ? (day = "0" + day) : day;
        hour < 10 ? (hour = "0" + hour) : hour;
        minute < 10 ? (minute = "0" + minute) : minute;
        second < 10 ? (second = "0" + second) : second;
        dataTime = month + "-" + day + " " + hour + ":" + minute
        return dataTime;
    },
    reward: function(val) { //Formatted reward
        // console.log(val,val === undefined)
        if (val === undefined) {
            return
        }
        var m = Math.pow(10, 9);
        var a = parseFloat(val) / m;
        val = convertNum(a);

        function convertNum(amount) {
            var num = 0;
            var result = [];
            amount = new String(amount);
            if ((amount.indexOf('E') != -1) || (amount.indexOf('e') != -1)) {
                (amount.indexOf('E') != -1) ? num = amount.indexOf('E'): num = amount.indexOf('e');
                var decimal = amount.substr(0, num);
                // devide the sentice efficial number
                var decArr = decimal.split('.', 2);
                // total 10 power
                var power = amount.substr(num + 1, amount.length);
                // symbol + -
                var symbol = power.substr(0, 1);
                power = power.substr(1, power.length);
                power = power * 1.0;
                if ('+' == symbol) {
                    // the number of 0 is power - decArr[1]
                    power = power - decArr[1].length;
                    // the return data
                    while (power > 0) {
                        result.unshift(0);
                        power -= 1;
                    }
                    result.unshift(decArr[1] * 1.0);
                    result.unshift(decArr[0] * 1.0);
                } else {
                    result = [0];
                    result.push('.');
                    while (power - 1 > 0) {
                        result.push(0);
                        power -= 1;
                    }
                    result.push(decArr);
                }
                result.join("");
                result = result + '';
                amount = result.replace(/,/g, '');
                return amount;
            } else {
                return a;
            }
        }
        return val;
    },
    ellipsis: function(val) { //Formatted address

        if (!val) return '';
        if (val.length > 30) {
            return val.slice(0, 28) + '...'
        }
        return val
    },
    middleEllipsis: function(val) { //Formatted address

        if (!val) return '';
        if (val.length > 30) {
            return val.slice(0, 8) + '...' + val.slice(-8)
        }
        return val
    },
    middleEllipsisLong: function(val) { //Formatted address

        if (!val) return '';
        if (val.length > 30) {
            return val.slice(0, 8) + '...' + val.slice(-8)
        }
        return val
    },
    status: function(val) {
        if (val == "1") {
            return "Success"
        } else if (val == "0") {
            return "Fail"
        } else {
            return "Confirming"
        }
    },
    getnum: function(val) {
        val = val.toString()
        var size = val.split('.')[0].length
        val = Number(val).toFixed(10 - size)
        return val
    },
    getnum4: function(val) {
        val = val.toString()
        var size = val.split('.')[0].length
        val = Number(val).toFixed(4 - size)
        return val
    },
    endisplay: function(val) {
        val = val.toString()
        var len = val.length
        var qian = val.substr(0, 4)
        var hou = val.substr(len - 4, 4)
        return qian + '***************************************************' + hou
    }
};