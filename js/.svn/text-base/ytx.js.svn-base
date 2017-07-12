document.write('<script src="js/dbConnect.js"><\/script>');//引入本地数据库操作的js

var appid = "8aaf070856b669b10156ba76ee7505da";

//初始化云通讯
function YTXinit()
{
	var resp = RL_YTX.init(appid); 
}

//格式化时间戳
function getTimeStamp()
{
	var now = new Date();
	var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? "" + (now.getMonth() + 1) : "0" + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());
	
	return timestamp;
}

function simpleLoginYTX()
{
	var wt = plus.nativeUI.showWaiting("",{});
	var UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
	var timestamp = getTimeStamp();
	var appToken = '5d7cedbd6bd04a65d8f76fa049a415b1';//开发token
	var sig = hex_md5(appid + UserInfo.userName + timestamp + appToken);
	var loginBuilder = new RL_YTX.LoginBuilder();
	loginBuilder.setType(1);
	loginBuilder.setUserName(UserInfo.userName);
	loginBuilder.setSig(sig);
	loginBuilder.setTimestamp(timestamp);
	
	RL_YTX.login(loginBuilder,
	function(obj)
	{
		plus.nativeUI.closeWaiting();//关闭其他等待框
		RL_YTX.onMsgReceiveListener(function(obj)
		{
			//判断是群消息（此处群消息包含群组消息和会议消息），还是好友消息
			var isGroupMsg = ("g" == obj.msgReceiver.substr(0, 1));//判断群消息标示
			
			if(isGroupMsg && obj.msgType!=12)
			{
				var db = openDatabase('MSG_DATABASE','1.0.0','MSG_DATABASE',5*1024*1024);
				var sql = "select * from GROUP_MSG_INFO where times = '" + obj.msgDateCreated + "'";
				db.transaction(function (tx) 
				{
					tx.executeSql(sql, [],
					function(tx, result)
					{
						if(result.rows.length == 0)
						{
							db = new lanxDB('MSG_DATABASE');
							
							//如果为文字消息
							var msgType = obj.msgType;
							if(1 == msgType || 0 == msgType)
							{
								//插入数据库
								db.switchTable('GROUP_MSG_INFO').insertData([
																			{
																				ytxGroupId : obj.msgReceiver,
																				sender : obj.msgSender,
																				type : "2",
																				msg : obj.msgContent,
																				times : obj.msgDateCreated,
																				msgtype : obj.msgType + "",
																				status : "2"
																			}]);
							}
							else if(4 == msgType)
							{
								//如果为图片消息
								db.switchTable('GROUP_MSG_INFO').insertData([
																			{
																				ytxGroupId : obj.msgReceiver,
																				sender : obj.msgSender,
																				type : "2",
																				msg : obj.msgFileUrl,
																				times : obj.msgDateCreated,
																				msgtype : obj.msgType + "",
																				status : "2"
																			}]);
							}
							else if(2 == msgType)
							{
								//如果为语音消息
								db.switchTable('GROUP_MSG_INFO').insertData([
																			{
																				ytxGroupId : obj.msgReceiver,
																				sender : obj.msgSender,
																				type : "2",
																				msg : obj.msgFileUrl,
																				times : obj.msgDateCreated,
																				msgtype : obj.msgType + "",
																				status : "2"
																			}]);
							}
						}
					}, null);
				});
			}
			else if(!isGroupMsg && obj.msgType!=12)
			{
				var db = openDatabase('MSG_DATABASE','1.0.0','MSG_DATABASE',5*1024*1024);
				var sql = "select * from IM_MSG_INFO where times = '" + obj.msgDateCreated + "'";
				db.transaction(function (tx) 
				{
					tx.executeSql(sql, [],
					function(tx, result)
					{
						if(result.rows.length == 0)
						{
							//如果为文字消息
							var msgType = obj.msgType;
							if(1 == msgType || 0 == msgType)
							{
								//插入数据库
								db = new lanxDB('MSG_DATABASE');
								db.switchTable('IM_MSG_INFO').insertData([
																	{
																		friendUserName : obj.msgSender,
																		type : "2",
																		msg : obj.msgContent,
																		times : obj.msgDateCreated,
																		msgtype : obj.msgType + "",
																		status : "2"
																	}]);
							}
							else if(4 == msgType)
							{
								//如果为图片消息
								var url = obj.msgFileUrl;
											
								//插入数据库
								db = new lanxDB('MSG_DATABASE');
								db.switchTable('IM_MSG_INFO').insertData([
																	{
																		friendUserName : obj.msgSender,
																		type : "2",
																		msg : url,
																		times : obj.msgDateCreated,
																		msgtype : obj.msgType + "",
																		status : "2"
																	}]);
							}
							else if(2 == msgType)
							{
								//如果为语音消息
								var url = obj.msgFileUrl;
											
								//插入数据库
								db = new lanxDB('MSG_DATABASE');
								db.switchTable('IM_MSG_INFO').insertData([
																	{
																		friendUserName : obj.msgSender,
																		type : "2",
																		msg : url,
																		times : obj.msgDateCreated,
																		msgtype : obj.msgType + "",
																		status : "2"
																	}]);
							}
						}
					}, null);
				});
			}
		});
	},
	function(obj)
	{
		console.log("登录云通讯失败 ---> " + JSON.stringify(obj));
		plus.nativeUI.closeWaiting();//关闭其他等待框
	});
}

function YTXLogout()
{
	RL_YTX.logout(
	function()
	{
		console.log("退出成功处理");
	}, 
	function(obj)
	{
		console.log("退出失败处理");
	});
}

//根据云通讯群id获取群信息
function GetGroupInfoByYTXGroupId(ytxGroupId)
{
	AjaxSend(serverLogin + "GetGroupInfoByYTX",{ytxID : ytxGroupId},
	function(result)
	{
		console.log("根据云通讯id获取群组信息结果 = " + JSON.stringify(result));
		//将获取到的结果返回
		return result.data;
   	},
   	function(err)
   	{
   		JSON.stringify(err);
   		return null;
   	});
}
