document.addEventListener( "plusready",  function(){

		// 声明的JS“扩展插件别名”
	    var _BARCODE = 'plugintest',B = window.plus.bridge;
	    var plugintest ={
			// 声明异步返回方法
	  
	        PluginTestFunctionArrayArgu : function (Argus, successCallback, errorCallback ){
	            var success = typeof successCallback !== 'function' ? null : function(args) 
		            {
		                successCallback(args);
		            },
	            	fail = typeof errorCallback !== 'function' ? null : function(code) 
		            {
		                errorCallback(code);
		            };
		            callbackID = B.callbackId(success, fail);
		            return B.exec(_BARCODE, "PluginTestFunctionArrayArgu", [callbackID, Argus]);
	        },
                          
            // 声明同步返回方法
            PluginTestFunctionStartRecord : function (Argus,successCallback, errorCallback )
                {
                          var success = typeof successCallback !== 'function' ? null : function(args)
                          {
                          successCallback(args);
                          },
                          fail = typeof errorCallback !== 'function' ? null : function(code)
                          {
                          errorCallback(code);
                          };
                          callbackID = B.callbackId(success, fail);
                          return B.exec(_BARCODE, "PluginTestFunctionStartRecord", [callbackID, Argus]);
                },
                          
            PluginTestFunctionStopRecord : function (Argus1)
            {
            return B.execSync(_BARCODE, "PluginTestFunctionStopRecord", [Argus1]);
            }
	    };
		    window.plus.plugintest = plugintest;
	}, true );
