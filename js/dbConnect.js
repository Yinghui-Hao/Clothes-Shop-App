//copyright by lanxyou  lanxyou[at]gmail.com
var lanxDB=function(dbname){
    var db=openDatabase(dbname,'1.0.0',dbname,5*1024*1024);//5M数据库
    return{
        //返回数据库名
        getDBName:function(){
            return dbname;
        },
        //初始化数据库，如果需要则创建表
        init:function(tableName,colums){
            this.switchTable(tableName);
            colums.length>0?this.createTable(colums):'';
            return this;
        },
        //创建表，colums:[name:字段名,type:字段类型]
        createTable:function(colums){
            var sql="CREATE TABLE IF NOT EXISTS " + this._table ;
            var t;
            if (colums instanceof Array && colums.length>0){
                t=[];
                for (var i in colums){
                    t.push(colums[i].name+' '+colums[i].type);
                }
                t=t.join(', ');
            }else if(typeof colums=="object"){
                t+=colums.name+' '+colums.type;
            }
            sql=sql+" ("+t+")";
            var that=this;
            db.transaction(function (t) { 
                t.executeSql(sql) ;
            })
        },
        //切换表
        switchTable:function(tableName){
            this._table=tableName;
            return this;
        },
        //插入数据并执行回调函数，支持批量插入
        //data为Array类型，每一组值均为Object类型，每一个Obejct的属性应为表的字段名，对应要保存的值
        insertData:function(data,callback){
            var that=this;
            var sql="INSERT INTO "+this._table;
            if (data instanceof Array && data.length>0){
                var cols=[],qs=[];
                for (var i in data[0]){
                    cols.push(i);
                    qs.push('?');
                }
                sql+=" ("+cols.join(',')+") Values ("+qs.join(',')+")";
            }else{
                return false;
            }
            var p=[],
                d=data,
                pLenth=0,
                r=[];
            for (var i=0,dLength=d.length;i<dLength;i++){
                var k=[];
                for (var j in d[i]){
                    k.push(d[i][j]);
                }
                p.push(k);
            }
            var queue=function(b,result){
                if (result){
                    r.push(result.insertId ||result.rowsAffected);
                }
                if (p.length>0){
                    db.transaction(function (t) { 
                        t.executeSql(sql,p.shift(),queue,that.onfail);
                    })
                }else{
                    if (callback){
                        callback.call(this,r);
                    }
                }
            }
            queue();
        },
        _where:'',
        //where语句，支持自写和以对象属性值对的形式
        where:function(where){
            if (typeof where==='object'){
                var j=this.toArray(where);
                this._where=j.join(' and ');
            }else if (typeof where==='string'){
                this._where=where;
            }
            return this;
        },
        //更新数据，data为属性值对形式
        updateData:function(data,callback){
            var that=this;
            var sql="Update "+this._table;
            data=this.toArray(data).join(',');
            sql+=" Set "+data+" where "+this._where;
            this.doQuery(sql,callback);
        },
        //根据条件保存数据，如果存在则更新，不存在则插入数据
        saveData:function(data,callback){
            var sql="Select * from "+this._table+" where "+this._where;
            var that=this;
            this.doQuery(sql,function(r){
                if (r.length>0){
                    that.updateData(data,callback);
                }else{
                    that.insertData([data],callback);
                }
            });
        },
        //获取数据
        getData:function(callback){
            var that=this;
            var sql="Select * from "+that._table;
            that._where.length>0?sql+=" where "+that._where:"";
            that.doQuery(sql,callback);
        },
        //查询，内部方法
        doQuery:function(sql,callback){
            var that=this;
            var a=[];
            var bb=function(b,result){
                if (result.rows.length){
                    for (var i=0;i<result.rows.length;i++){
                        a.push(result.rows.item(i));
                    }
                }else{
                    a.push(result.rowsAffected);
                }
                if (callback){
                    callback.call(that,a);
                }
            }
            db.transaction(function (t) { 
                t.executeSql(sql,[],bb,that.onfail) ;
            })
        },
        //根据条件删除数据
        deleteData:function(callback){
            var that=this;
            var sql="delete from "+that._table;
            that._where.length>0?sql+=" where "+that._where:'';
            that.doQuery(sql,callback);
        },
        //删除表
        dropTable:function(){
            var sql="DROP TABLE IF EXISTS "+this._table;
            this.doQuery(sql);
        },
        _error:'',
        onfail:function(t,e){
            this._error=e.message;
            console.log('----sqlite:'+e.message);
        },
        toArray:function(obj){
            var t=[];
            obj=obj || {};
            if (obj){
                for (var i in obj){
                    t.push(i+"='"+obj[i]+"'");
                }
            }
            return t;
        }
    }
}
 
/*
examples:
var db=new lanxDB('testDB');
db.init('channel_list',[{name:'id',type:'integer primary key autoincrement'},{name:'name',type:'text'},{name:'link',type:'text'},{name:'cover',type:'text'},{name:'updatetime',type:'integer'},{name:'orders',type:'integer'}]);

db.switchTable('channel_list').insertData([{name:'aa',link:'ss',updatetime:new Date().getTime()},{name:'bb',link:'kk',updatetime:new Date().getTime()}]);

db.where({name:'aa'}).getData(function(result){
    console.log(result);//result为Array
});
db.where({name:'aa'}).deleteData(function(result){
    console.log(result[0]);//删除条数
});
db.where({name:'bb'}).saveData({link:'jj'},function(result){
    console.log(result);//影响条数
})



jsdown.cloopen.com:8899/56001/8aaf07085bd180c4015be6eef43d078d/2016-12-20/11-10/1482203456351322517.mp4

https://jsdown.cloopen.com:8899/56002/8aaf07085bd180c4015be6eef43d078d/2016-12-20/11-38/1482205091883273208.mp4
/var/mobile/Containers/Data/Application/CD0B3BB3-1290-4F3D-AFF7-818E453DC66C/Documents/Pandora/apps/HBuilder/doc/audio/Recorder_002.amr

[LOG] : path = _doc/audio/Recorder_002.amr
[LOG] : e = {"type":"loadend","bubbles":false,"cancelBubble":false,"cancelable":false,"lengthComputable":false,"loaded":0,"total":0,"target":{"fileName":"/var/mobile/Containers/Data/Application/CD0B3BB3-1290-4F3D-AFF7-818E453DC66C/Documents/Pandora/apps/HBuilder/doc/audio/Recorder_002.amr","readyState":2,"result":"data:audio/amr;base64,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","error":null,"onloadstart":null,"onprogress":null,"onload":null,"onabort":null,"onerror":null}}
[LOG] : mime = audio/amr
[LOG] : u8arr = 35,33,65,77,82,10,60,145,23,22,190,102,121,225,224,1,231,175,240,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,72,119,36,150,102,121,225,224,1,231,186,240,0,0,0,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,85,0,136,182,102,121,225,224,1,231,207,240,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,72,249,31,150,102,121,225,224,1,231,138,240,0,0,0,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,84,253,31,182,102,121,225,224,1,231,207,240,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,6,69,170,75,203,97,239,249,96,59,125,248,105,111,196,143,127,149,89,2,193,60,101,255,78,109,149,186,92,137,192,60,32,95,154,139,169,16,37,8,116,10,168,56,126,177,188,14,103,247,140,116,130,203,172,17,242,131,140,195,72,40,80,60,48,75,161,81,87,66,0,193,245,60,44,245,103,189,122,216,181,255,33,168,254,215,230,53,232,183,49,12,51,103,128,60,216,93,121,66,223,128,1,161,243,126,35,164,26,50,215,204,67,106,26,116,29,209,111,241,220,55,104,106,143,173,192,60,40,75,123,237,244,180,13,129,225,105,140,191,143,243,62,54,1,215,187,157,229,137,218,89,136,221,106,165,221,14,160,60,40,98,46,73,194,130,158,1,232,239,2,95,198,134,9,251,11,30,17,35,179,70,107,165,134,109,234,42,195,92,192,60,30,65,123,137,129,139,22,33,250,128,36,194,54,20,202,57,235,167,38,209,35,143,32,1,237,89,59,217,175,228,208,60,52,83,117,79,170,49,0,225,243,57,2,164,221,247,49,224,110,17,8,74,114,109,67,2,154,115,249,140,169,30,160,60,216,83,99,148,24,60,4,161,228,124,164,205,102,111,112,30,198,139,59,95,208,193,27,119,250,38,231,134,245,254,176,60,40,98,25,136,77,54,18,225,243,43,146,230,59,184,255,222,62,180,157,73,96,104,175,119,134,157,45,87,111,207,16,60,50,85,109,68,133,240,14,129,251,14,203,193,101,61,169,100,174,225,86,173,220,11,231,20,177,121,190,166,11,228,192,60,38,83,131,142,163,156,8,33,225,201,157,174,68,250,149,21,51,227,12,26,35,22,212,150,104,215,232,184,210,58,80,60,14,84,87,78,153,220,20,161,248,251,44,91,128,0,140,6,212,9,234,233,252,123,101,198,137,64,87,12,162,36,128,60,72,99,164,74,65,30,67,225,245,242,171,37,50,131,93,127,248,249,208,187,255,209,43,209,191,120,39,156,168,32,0,60,26,77,122,129,134,66,129,225,188,105,220,47,57,253,37,14,89,221,27,69,41,169,163,143,76,57,18,67,35,102,128,60,38,83,122,89,134,9,23,129,240,247,149,111,151,178,134,108,239,185,1,32,97,179,255,104,41,162,67,143,162,144,128,60,40,85,123,78,186,14,20,33,246,35,60,84,148,16,92,1,42,16,142,205,60,58,78,96,197,150,80,37,124,194,176,60,68,83,113,236,162,156,24,97,228,104,132,63,194,164,232,28,11,35,232,50,120,72,49,15,111,44,121,243,10,118,64,60,18,60,36,77,194,162,31,1,246,69,171,2,49,30,102,82,142,237,107,177,94,240,142,19,3,151,247,227,140,79,48,60,50,98,45,71,239,14,33,193,233,200,76,195,67,238,200,204,102,226,199,107,153,14,157,216,240,11,181,187,75,190,192,60,40,76,109,239,205,52,52,161,244,243,171,70,190,151,208,121,41,138,77,224,13,133,169,233,197,251,104,253,126,226,208,60,30,76,45,39,194,86,11,129,244,107,68,52,9,197,81,181,151,30,142,103,148,246,42,44,66,235,12,155,132,1,208,60,116,99,96,237,196,248,2,225,247,146,27,170,144,120,114,117,163,218,66,255,194,128,252,62,199,137,148,80,252,179,144,60,22,83,122,35,174,48,131,1,234,213,171,210,193,122,108,119,92,105,48,3,43,236,20,93,169,149,139,124,32,132,160,60,32,83,121,81,130,160,59,225,229,59,155,221,78,240,187,227,195,196,54,102,88,182,17,88,147,49,21,140,236,108,224,60,26,84,44,66,253,44,9,97,233,211,108,43,143,253,67,21,185,150,12,18,113,157,34,17,226,237,181,235,65,78,208,60,52,99,129,75,145,4,18,193,235,126,195,168,96,191,130,244,197,42,68,63,80,179,40,184,195,120,141,1,227,208,0,60,28,67,117,37,211,30,169,193,230,117,187,110,74,148,123,68,214,43,53,251,228,200,65,129,56,215,147,15,5,193,112,60,48,86,45,235,3,24,131,1,229,159,5,173,235,82,5,89,146,152,234,247,196,78,100,112,224,195,126,162,13,201,48,60,66,92,103,33,221,222,16,193,237,133,172,124,66,49,75,33,61,111,37,132,57,92,69,250,193,22,66,44,82,238,224,60,20,65,118,66,253,52,23,33,247,34,228,72,16,67,133,117,163,118,252,46,252,56,40,64,88,66,129,17,250,189,112,60,60,93,156,237,63,64,65,65,239,163,140,216,139,30,156,252,127,181,80,198,43,138,170,121,141,176,25,105,49,201,144,60,22,74,87,65,25,180,161,161,236,213,203,17,27,145,183,92,213,120,255,162,78,147,38,41,26,107,45,154,14,124,224,60,52,82,41,81,129,157,12,33,243,172,5,182,154,99,187,91,223,249,59,240,118,36,60,15,205,158,206,234,87,212,144,60,14,82,44,139,186,222,12,165,57,37,172,133,229,67,187,8,135,17,2,80,135,142,197,204,100,35,195,83,143,44,240,60,40,83,118,123,10,72,145,161,235,171,67,58,43,148,28,78,75,157,28,249,151,68,21,242,7,234,10,64,36,53,192,60,40,82,31,233,132,24,56,65,247,129,139,240,88,226,246,87,50,208,230,13,111,226,167,217,214,26,158,143,37,147,160,60,32,85,122,59,128,44,18,193,245,241,82,133,53,184,218,235,98,133,80,208,81,205,92,37,242,117,145,100,66,64,112,60,40,87,116,77,31,96,1,161,233,46,203,171,74,72,225,116,169,98,131,172,203,125,96,34,245,38,16,31,248,114,176,60,22,85,123,77,212,226,29,161,215,172,68,79,44,28,63,52,89,205,133,163,114,148,250,163,8,182,2,210,155,1,240,60,26,83,113,72,215,84,82,129,235,140,172,122,98,123,7,40,164,13,13,27,237,145,1,82,212,158,184,116,182,120,96,60,52,99,131,73,132,80,80,193,247,225,172,240,105,132,158,9,212,80,143,6,90,70,187,135,195,121,44,154,141,221,0,60,216,77,161,140,154,84,112,1,243,6,209,83,23,105,97,165,249,136,193,42,192,187,152,135,82,197,70,189,116,96,80,60,216,83,154,27,169,218,3,193,232,128,91,235,77,35,81,105,158,169,172,166,15,237,43,143,186,48,149,15,185,38,0,60,46,92,87,138,6,112,12,33,251,53,163,202,214,6,128,20,120,74,99,236,29,179,247,205,31,249,167,41,107,164,144,60,32,69,127,72,135,32,71,97,246,119,250,226,13,225,90,3,179,79,195,241,187,147,183,146,62,88,156,136,231,213,16,60,76,104,47,147,149,254,41,65,231,40,129,36,10,220,54,55,137,108,190,162,57,126,0,188,84,185,78,89,250,242,240,60,28,75,95,82,174,154,3,65,235,152,203,72,184,191,214,105,197,37,214,6,47,96,187,134,129,145,70,61,99,179,224,60,66,99,122,67,138,48,17,225,245,220,163,37,124,81,232,94,249,219,175,121,247,100,112,36,211,242,28,244,129,156,80,60,242,91,127,85,199,78,26,193,250,167,196,48,63,234,77,56,163,228,158,240,190,11,128,89,16,207,92,36,109,139,224,60,224,89,122,151,246,176,168,129,236,148,28,237,64,103,67,45,118,203,62,15,188,12,35,16,165,63,213,1,252,223,240,60,218,83,119,87,174,152,3,131,192,206,109,58,185,196,198,33,52,181,19,22,230,187,140,235,207,203,37,80,171,139,208,60,48,82,93,144,149,148,1,161,229,62,28,63,65,7,92,28,181,42,121,226,36,69,35,213,56,90,168,108,154,106,192,60,68,83,131,21,196,224,2,129,228,208,83,207,39,192,146,99,248,26,245,78,61,46,97,32,107,98,38,242,29,82,128,60,36,85,123,236,136,168,6,129,246,119,12,197,18,75,83,21,139,86,132,112,196,128,228,58,137,230,128,171,217,144,224,60,216,82,44,77,103,230,1,225,230,75,116,220,105,66,130,149,42,65,235,65,28,211,198,5,154,88,142,255,93,20,0,60,48,99,113,177,19,30,5,163,208,156,181,134,41,100,168,95,40,0,61,166,59,132,253,49,201,136,174,199,237,166,192


 path = _doc/audio/1479383189036.amr 
 e = {"type":"loadend","bubbles":false,"cancelBubble":false,"cancelable":false,"lengthComputable":false,"loaded":0,"total":0,"target":{"fileName":"/storage/emulated/0/Android/data/io.dcloud.HBuilder/.HBuilder/apps/HBuilder/doc/audio/1479383189036.amr","readyState":2,"result":"data:audio/amr;base64,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","error":null,"onloadstart":null,"onprogress":null,"onload":null,"onabort":null,"onerror":null}} at chat3.html:904
 mime = audio/amr
 u8arr = [object Uint8Array]

path = _doc/audio/1479380669747.amr
path = _doc/audio/Recorder_005.wav



[LOG] : 进入选择图片路径 path = file:///var/mobile/Containers/Data/Application/CD0B3BB3-1290-4F3D-AFF7-818E453DC66C/Documents/Pandora/apps/HBuilder/doc/IMG_0077.JPG
[LOG] : path = file:///var/mobile/Containers/Data/Application/CD0B3BB3-1290-4F3D-AFF7-818E453DC66C/Documents/Pandora/apps/HBuilder/doc/1479694861741.JPG
[LOG] : newPath = file:///var/mobile/Containers/Data/Application/CD0B3BB3-1290-4F3D-AFF7-818E453DC66C/Documents/Pandora/apps/HBuilder/doc/1479694861741.JPG
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

[LOG] : fileBlob = {}
[LOG] : size ---> 2662
[LOG] : type ---> audio/amr
[LOG] : slice ---> function slice() {
    [native code]
}


_doc/1480922464931.mp4

 path = _doc/1480925664771.mp4
错误码： 170001; 错误描述：param file is too large.


1920*1080,1440*1080,1280*720,800*450,720*480,640*480,352*288,320*240,176*144


_doc/1480927984990.mp4



_doc/1480928099191.mp4
 _doc/1480928219259.mp4
 
 
 
https://imapp.yuntongxun.com:8889/56002/8aaf07085bd180c4015be6eef43d078d/2016-12-27/11-34/1482809676141712766.amr

接收到的IOS所发
https://imapp.yuntongxun.com:8889/56002/8aaf07085bd180c4015be6eef43d078d/2016-12-28/10-22/1482891732819679064.amr

接受到的安卓所发
https://imapp.yuntongxun.com:8889/56001/8aaf07085bd180c4015be6eef43d078d/2016-12-28/10-33/1482892388200283657.amr



https://imapp.yuntongxun.com:8889/56002/8aaf07085bd180c4015be6eef43d078d/2016-12-28/11-21/1482895275391542394.amr
https://imapp.yuntongxun.com:8889/56002/8aaf07085bd180c4015be6eef43d078d/2016-12-28/11-30/1482895828183725876.amr

* 
* * * * */