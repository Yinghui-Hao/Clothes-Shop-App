/*
      将时间类型“/Date(1444449034000)/” 转化 年月日时分秒类型
      * */
function ConvertJSONDateToJSDateObject(jsondate) {
	var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
	return date;
}

function ConvertDateToDate(jsondate) {
	var date = new Date(parseInt(jsondate, 10));
	return getTime(date);
}


function getDateTime(date) {
	function checkTime(i) {
		if (i < 10) {
			i = "0" + i
		}
		return i
	}
	var year = date.getFullYear();
	var month = checkTime(date.getMonth() + 1);
	var day = checkTime(date.getDate());
	var hh = checkTime(date.getHours());

	var mm = checkTime(date.getMinutes());
	var ss = checkTime(date.getSeconds());
	return year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
}

function getTime(date) {
	function checkTime(i) {
		if (i < 10) {
			i = "0" + i
		}
		return i
	}
//	var year = date.getFullYear();
//	var month = checkTime(date.getMonth() + 1);
//	var day = checkTime(date.getDate());
	var hh = checkTime(date.getHours());

	var mm = checkTime(date.getMinutes());
	var ss = checkTime(date.getSeconds());
	return hh + ":" + mm;
}

function getDate(date) {
	function checkTime(i) {
		if (i < 10) {
			i = "0" + i
		}
		return i
	}
	var year = date.getFullYear();
	var month = checkTime(date.getMonth() + 1);
	var day = checkTime(date.getDate());

	return year + "-" + month + "-" + day;
}

function getDay(date) {
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hh = date.getHours();
	var mm = date.getMinutes();
	return month + "." + day + " " + hh + ":" + mm;
}

function getmonthday(date) {
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return month + "-" + day;
}