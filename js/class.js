//获取class
function getElementsByClassName( parent,tagName, className){ //父级，标签，class名称
	var aEls = parent.getElementsByTagName(tagName)   //父级里面的标签
	var arr = [];
	
	for(var i=0;i<aEls.length;i++){
		var aClassName = aEls[i].className.split(' ');  
		//标签内的class是用空格隔开，所以用空格把class分割成数组，是为了防止因为该标签内的其他class影响
		for(var j=0;j<aClassName.length;j++){
			if(aClassName[j] == className){
				arr.push( aEls[i] );   //找到后扔到arr的数组中；
				break;   //在标签内找到该class后跳出去，开始下一个标签的寻找，是为了防止有重复的class，找到两次
			}
		}
	}
	return arr;   //把数组返回到函数
}

function arrIndexOf(arr,v){      //如果原本标签里面已有该元素则返回i，反之则返回-1；
	for(var i=0;i<arr.length;i++){
		if(arr[i] == v){
			return i;
		}
	}
	return -1;
}

//添加class
function addClass(obj,className){
	if(obj.className == ''){   //如果标签内部没有class
		obj.className = className;
	}else{   //如果标签内部有class
		var arrClassName = obj.className.split(' ');
		var _index = arrIndexOf(arrClassName,className);
		
		if(_index == -1 ){
			obj.className += ' '+className  //如果标签内部没有需要添加的class
		}  
		//如果标签内部有需要添加的class，则不会再添加进去，如果不写这一步，则会添加进去
	}
}

//移除class
function removeClass(obj,className){
	//如果原来有class
	if(obj.className != ''){
		//如果有我们要移除的class
		var arrClassName = obj.className.split(' ');
		var _index = arrIndexOf(arrClassName,className);
		if(_index != -1 ){
			arrClassName.splice(_index,1)  //删除从找到的_index开始数的一个
			obj.className = arrClassName.join(' ');
		}
	}
}