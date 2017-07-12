//表情数组
var emoji = new Array();
emoji[0] = "";
emoji[1] = "微笑";
emoji[2] = "撇嘴";
emoji[3] = "色";
emoji[4] = "发呆";
emoji[5] = "流泪";
emoji[6] = "害羞";
emoji[7] = "闭嘴";
emoji[8] = "睡";
emoji[9] = "大哭";
emoji[10] = "尴尬";
emoji[11] = "发怒";
emoji[12] = "调皮";
emoji[13] = "龇牙";
emoji[14] = "惊讶";
emoji[15] = "难过";
emoji[16] = "冷汗";
emoji[17] = "抓狂";
emoji[18] = "吐";
emoji[19] = "偷笑";
emoji[20] = "白眼";
emoji[21] = "傲慢";
emoji[22] = "饥饿";
emoji[23] = "困";
emoji[24] = "惊恐";
emoji[25] = "流汗";
emoji[27] = "憨笑";
emoji[28] = "悠闲";
emoji[29] = "奋斗";
emoji[30] = "怒骂";
emoji[31] = "疑问";
emoji[32] = "嘘";
emoji[33] = "晕";
emoji[34] = "疯了";
emoji[35] = "衰";
emoji[36] = "敲打";
emoji[37] = "再见";
emoji[38] = "擦汗";
emoji[39] = "抠鼻";
emoji[40] = "糗大了";
emoji[41] = "坏笑";
emoji[42] = "左哼哼";
emoji[43] = "右哼哼";
emoji[44] = "哈欠";
emoji[45] = "鄙视";
emoji[46] = "委屈";
emoji[47] = "快哭了";
emoji[48] = "阴险";
emoji[49] = "亲亲";
emoji[50] = "吓";
emoji[51] = "可怜";
emoji[52] = "拥抱";
emoji[53] = "月亮";
emoji[54] = "太阳";
emoji[55] = "炸弹";
emoji[56] = "骷髅";
emoji[57] = "菜刀";
emoji[58] = "猪头";
emoji[59] = "西瓜";
emoji[60] = "咖啡";
emoji[61] = "饭";
emoji[62] = "爱心";
emoji[63] = "强";
emoji[64] = "弱";
emoji[65] = "握手";
emoji[66] = "胜利";
emoji[67] = "抱拳";
emoji[68] = "勾引";
emoji[69] = "OK";
emoji[70] = "NO";

//根据表情名称，返回表情序号
function getNumByName(emojiName)
{
	//数组循环从下标1开始，因为emoji[0]为空
	for(var i=1;i<emoji.length;i++)
	{
		if(emoji[i] == emojiName)
		{
			return i;
		}
	}
}

//获取输入框焦点
function getCursortPosition (ctrl)
{
    var CaretPos = 0;   
    if (document.selection) 
    {
    	// IE Support
    	ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
    {
    	// Firefox support
    	CaretPos = ctrl.selectionStart;
    }
    return (CaretPos);
}