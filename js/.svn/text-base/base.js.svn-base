//var ServerHost="http://192.168.7.104:8045";
//var ServerHost="http://192.168.7.50:8002";
//var ServerHost="http://192.168.1.106:8002";
//var ServerHost="http://139.129.209.44:8888";
//var ServerHost="http://192.168.7.11:8002";
//var ServerHost="http://192.168.1.143:8010";
//var ServerHost="http://192.168.1.143:8010";
var ServerHost="http://114.215.94.84:8120";

var serverSubmit = ServerHost + '/tools/personal_ajax.ashx?action=';
var serverLogin = ServerHost + '/tools/login_ajax.ashx?action=';
var serverExam = ServerHost + '/tools/exam_ajax.ashx?action=';
var appAlertTitle="智慧政工";

//用户信息
var UserInfo= {
		id:'',
		userName:'',
		password:'',
		groupId:'',
		avatar:'',
		nickname:''
	};
UserInfo = localStorage.getItem("UserInfo");
if(UserInfo!=null&&UserInfo!=''){
	UserInfo = JSON.parse(UserInfo);
}


//考试信息
var ExamInfo= {
		examId:"",
		startTime:"",
		endTime:"",
		num:"",
		questions:{}
	};
if(ExamInfo!=null&&ExamInfo!=''){
	ExamInfo = localStorage.getItem("ExamInfo");
}

//ExamInfo = JSON.parse(ExamInfo);

//聊天信息
var CharLog = {
	userId:"",
	sendTime:"",
	content:"",
	type:""
}
//详情里的图文编辑
function replaceImg(elementId){
			var len = document.getElementById(elementId).getElementsByTagName("img").length;
				    		var imgObj = null;
				    		var imgHead = null;
							if(len >0){
								imgObj = document.getElementById(elementId).getElementsByTagName("img");
								for(var i = 0; i < len; i++){
									imgObj[i].style.width = "80%";
									imgObj[i].style.height = "35%";
									imgHead = imgObj[i].src.split(":")[0];
									if(imgHead == "file"){
										//对相对路径的图片添加域名
										var str=imgObj[i].src.split("/")[3];
										var str1 = imgObj[i].src.replace(str,"$").split("$")[1];
										str2 = ServerHost+"/"+str+"/"+str1;
										imgObj[i].src = str2;
									}else{
										//网络图片路径直接显示
									}
								}
							}

		}

function AjaxSend(url,data,success,error)
{
	mui.ajax(url,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:success,
			//error:function(err){mui.toast("连接超时，请重试！")}
			error:error
	});
}

//同步ajax
function asyncAjaxSend(url,data,success,error)
{
	mui.ajax(url,{
			data:data,
			async:false,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:success,
			error:error
	});
}

function isNull00(data)
{
	return (data == "" || data == undefined || data == null) ? 0 : data; 
}
//更新用户信息
function updateUserInfo()
{
	AjaxSend(serverLogin + "GetUserInfoById",{userId:UserInfo.id},function(result){
		if (result.data)
		{
			var data =result.data; 
			UserInfo={
					id:result.data["id"].toString(),
					userName:data["user_name"],
					password:data["password"],
					groupId:data["group_id"].toString(),
					avatar:ServerHost + data["avatar"].toString(),
					nickname:data["nick_name"].toString()
				}
		}
			
	})
}
