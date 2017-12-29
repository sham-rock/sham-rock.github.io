
/**
 * 
 * author 
 * 该工具类主要是提供一些常用的字符串操作以及寿险相关参数的校验
 * 
 * **/
var StringUtils={
	/**
	 * 判断字符串是否为空
	 * **/
	isNull:function(str){
		if(str == null || typeof str =='undefined'){
			return true;
		}
		return false;
	},
	/**
	 * 判断字符串是否为空字符串
	 * **/
	isEmpty:function(str){
		if(typeof str =='string'){
			if(str.length == 0){
				return true;
			}
			return false;
		}else{
			return false;
		}
		
	},
	/**
	 * 去掉最右边空字符串
	 * **/
	rtrim:function(s){
		if(typeof s != 'string'){
			s = s.toString();
		}
		var _regexp = /^.*\S/;
		var _s = _regexp.exec(s);
		return _s==null?'':_s[0];
	},
	/**
	 * 去掉最左边空字符串
	 * **/
	ltrim:function(s){
		if(typeof s != 'string'){
			s = s.toString();
		}
		var _regexp = /\S.*$/;
		var _s = _regexp.exec(s);
		return _s==null?'':_s[0];
	},
	/**
	 * 去除字符串最左和最右的空格
	 * **/
	trim:function(s){
		if(typeof s != 'string'){
			s = s.toString();
		}
		var _regexp = /\S.*\S/;
		var _s = _regexp.exec(s);
		return _s==null?'':_s[0];
	},
	/**
	 * 判断字符串是否为空
	 * **/
	isEmptyOrNull:function(str){
		var _this = this;
		return _this.isEmpty(str) || _this.isNull(str);
	},
	/**
	 * 去掉最左和最右的空字符后，是否为空；
	 * **/
	isEmptyAfterTrim:function(str){
		var _this = this;
		if(typeof str =='string'){
			str = _this.trim(str);
			if(str == null || str.length == 0){
				return true;
			}
			return false;
		}else{
			return false;
		}
		
	},
	/**
	 * 将第一个oldstr替换成newstr
	 * **/
	replace:function(str,oldstr,newstr){
		var _ret = null;
		_ret = str.replace(oldstr,newstr);
		return _ret ;
		
	},
	/**
	 * 使用正则去替换相应的字符串
	 * **/
	replaceByRegExp:function(str,regexp,newstr){
		var _ret = null;
		
		_ret = str.replace(regexp,newstr);
		return _ret ;
	},
	/**
	 * str是否包含ss
	 * **/
	contains:function(str,ss){
		var _this = this;
		if(!_this.isNull(str)){
			return str.indexOf(ss)>=0;
		}
		return false;
	},
	/**
	 * str 字符串
	 * flag true 汉字算两个，false 汉字算1个。默认true
	 * 
	 * **/
	getLength:function(str,flag){
		var value = str;
		var len = 0;
		if(flag === false){
			return len = str.length;
		}else{
			flag = true;
		}
		for (var i = 0; i < value.length; i++) {
			if (value[i].match(/[^\x00-\xff]/ig) && flag) // 全角
				len += 2;
			else
				len += 1;
		}
		return len;
	},
	/**
	 * 获取字串
	 * eg: str=123456789,startPosition=2,endPosition=4，则返回234
	 * 
	 * **/
	substring:function(str,startPosition,endPosition){
		var _this = this;
		if(!_this.isNull(str)){
			return str.substring(startPosition-1,endPosition);
		}else{
			return null;
		}
	},
	/**
	 * 获取字串
	 * offset 偏移量
	 * eg: str=123456789,startPosition=2,offset=4，则返回2345
	 * 
	 * **/
	substr:function(str,startPosition,offset){
		var _this = this;
		if(!_this.isNull(str)){
			return str.substring(startPosition-1,startPosition+offset-1);
		}else{
			return null;
		}
	},
	
/**##############################--- 寿险业务相关校验 ---##############################**/	
	/**校验手机号码
	 * 
	 * mobile :手机号
	 * flag   :校验脱落手机号码，true校验 false不校验；默认去校验
	 * regexp :手机号的正则表达式，默认是/^(13|14|15|18|17)[0-9]{9}$/
	 * 返回值：_v
	 * _v.msg :错误提示
	 * _v.isValid:验证结果
	 * **/
	validateMobile:function(mobile,flag,regexp){
		var _v={
			msg:null,
			isValid:false
		}
		var _this = this;
		var value = mobile;
		
		if(typeof regexp == 'object' && (regexp) instanceof RegExp){
			
		}else{
			regexp = /^(13|14|15|18|17)[0-9]{9}$/;
		}
		var phonegi = regexp; 
		if(value == "" || value.length == 0 ){
			_v.msg = "请输入手机号码";
			_v.isValid = false;
			return _v;
		}else if(value.length < 11 || value.length >11){
			_v.msg = "手机号码长度不对，请输入正确的手机号码";
			_v.isValid = false;
			return _v;
		}else if(!phonegi.test(value)){
			_v.msg = "请输入正确的手机号码";
			_v.isValid = false;
			return _v;
		}else if((typeof flag == 'undefined' || flag) && !_this.checkDownMobile(value)  ){
			_v.msg = "请输入正确的手机号码";
			_v.isValid = false;
			return _v;
		}
		_v.isValid = true;
		return _v;
	},
	/** 脱落手机号码 **/
	checkDownMobile : function(mobile){
		if( mobile.indexOf("11111")  > 0 ||
			mobile.indexOf("22222")  > 0 ||	
			mobile.indexOf("33333")  > 0 ||
			mobile.indexOf("44444")  > 0 ||
			mobile.indexOf("55555")  > 0 ||
			mobile.indexOf("66666")  > 0 ||
			mobile.indexOf("77777")  > 0 ||
		    mobile.indexOf("88888")  > 0 ||
			mobile.indexOf("99999")  > 0 ||
			mobile.indexOf("00000")  > 0 ||
			mobile.indexOf("012345")  > 0 ||
			mobile.indexOf("123456")  > 0 ||
			mobile.indexOf("234567")  > 0 ||
		    mobile.indexOf("345678")  > 0 ||
		    mobile.indexOf("456789")  > 0 ||
			mobile.indexOf("567890")  > 0 ||
			mobile.indexOf("098765")  > 0 ||
			mobile.indexOf("987654")  > 0 ||
			mobile.indexOf("876543")  > 0 ||
			mobile.indexOf("765432")  > 0 ||
			mobile.indexOf("654321")  > 0 ||
			mobile.indexOf("543210") > 0
			){
			return false;
		  }else{
			  return true;
		  }
	},
	/**通过手机号码，获取相对应的邮箱地址
	 * 
	 * **/
	getEmailByTel : function(telephone) {
		var isChinaMobile = /^1(3[4-9]|47|5[0-27-9]|8[2-478])/; //移动方面最新答复
		var isChinaUnion = /^1(3[0-2]|5[56]|45|8[56])/; //向联通微博确认并未回复
		var isChinaTelcom = /^1([35]3|8[019])/; //1349号段 电信方面没给出答复，视作不存在
		var isOtherTelphone  = /^170([059])\\d{7}$/;//其他运营商
		  
	    if(isChinaMobile.test(telephone)) {
	        return telephone + "@139.com";
	    } else if(isChinaUnion.test(telephone)) {
	    	return telephone + "@wo.cn";
	    } else if(isChinaTelcom.test(telephone)) {
	    	return telephone + "@189.cn";
	    } else{
	    	return "telephone@pingan.com.cn";
	    }
	},
	/**校验身份证号码
	 * idcard:身份证号
	 * 
	 * 返回:验证结果 _v
	 * _v.msg 验证错误信息
	 * _v.isValid 是否验证通过
	 * **/
	idCard : function (idcard) {
		var _v = {
			msg:null,
			isValid:false
		};
		var Errors = [
			true,
			"\u8eab\u4efd\u8bc1\u53f7\u7801\u4f4d\u6570\u4e0d\u5bf9!",	//身份证号码位数不对!
			"\u8eab\u4efd\u8bc1\u53f7\u7801\u51fa\u751f\u65e5\u671f\u8d85\u51fa\u8303\u56f4\u6216\u542b\u6709\u975e\u6cd5\u5b57\u7b26!",//身份证号码出生日期超出范围或含有非法字符!
			"\u8eab\u4efd\u8bc1\u53f7\u7801\u6821\u9a8c\u9519\u8bef!",	//身份证号码校验错误!
			"\u8eab\u4efd\u8bc1\u5730\u533a\u975e\u6cd5!"				//身份证地区非法!
		];
		var area = {
			11: "\u5317\u4eac",	12: "\u5929\u6d25",	13: "\u6cb3\u5317",	14: "\u5c71\u897f",	15: "\u5185\u8499\u53e4",	21: "\u8fbd\u5b81",	22: "\u5409\u6797",	23: "\u9ed1\u9f99\u6c5f",
			31: "\u4e0a\u6d77",	32: "\u6c5f\u82cf",	33: "\u6d59\u6c5f",	34: "\u5b89\u5fbd",	35: "\u798f\u5efa",	36: "\u6c5f\u897f",	37: "\u5c71\u4e1c",	41: "\u6cb3\u5357",	42: "\u6e56\u5317",
			43: "\u6e56\u5357",	44: "\u5e7f\u4e1c",	45: "\u5e7f\u897f",	46: "\u6d77\u5357",	50: "\u91cd\u5e86",	51: "\u56db\u5ddd",	52: "\u8d35\u5dde",	53: "\u4e91\u5357",	54: "\u897f\u85cf",	
			61: "\u9655\u897f",	62: "\u7518\u8083",	63: "\u9752\u6d77",	64: "\u5b81\u590f",	65: "\u65b0\u7586",	71: "\u53f0\u6e7e",	81: "\u9999\u6e2f",	82: "\u6fb3\u95e8",	91: "\u56fd\u5916"
		};
		var Y, JYM;
		var S, M;
		var idcard_array = new Array();
		
		if(idcard == ""){//为空
			_v.msg="身份证号不能为空";
			_v.isValid = false;
			return _v;
		}
		if (area[parseInt(idcard.substr(0, 2))] == null) {
			_v.msg = Errors[4];
			_v.isValid = false;
			return _v;
		}
		idcard = idcard.replace(/x/ig,"X");
		idcard_array = idcard.split("");
		switch (idcard.length) {
			case 15://15_DIGITS_ID_TOKEN
				if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/
				} else {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/
				}
				if (ereg.test(idcard)) {
					_v.msg = null;
					_v.isValid = true;
					return _v;
				} else {
					_v.msg = Errors[2];
					_v.isValid = false;
					return _v;
				}
				break;
			case 18:
				if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
				} else {
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
				}
				if (ereg.test(idcard)) {
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);
					if (M == idcard_array[17]) {
						_v.msg = null;
						_v.isValid = true;
						return _v;
					} else {
						_v.msg = Errors[3];
						_v.isValid = false;
						return _v;
					}
				} else {
					_v.msg = Errors[2];
					_v.isValid = false;
					return _v;
				}
				break;
			default:
				_v.msg = Errors[1];
				_v.isValid = false;
				return _v;
				break;
		}
		return _v;
	},
	/**通过身份证号码获取出生年月日，性别信息
	 * 
	 * ID 身份证号码
	 * checkFalg 是否需要在校验ID [必须是boolean类型]
	 * 
	 * 返回：_v
	 * _v.isValid  :验证结果  boolean
	 * _v.msg      :验证信息  string
	 * _v.sex	   :性别     string F  M
	 * _v.year     :出生年	string
	 * _v.month    :出生月	string	
	 * _v.date     :出生日	string
	 * _v.birthday :出生年月日 Date类型
	 * **/
	departID:function(ID,checkFlag){
		var _this = this;
		var _v={
			isValid:false,
			msg:null,
			year:null,
			month:null,
			date:null,
			birthday:null
		}
		if(typeof checkFalg == 'boolean' && checkFlag === true){
			
		}else{
			var ret = _this.idCard(ID);
			if(ret.isValid === false){
				_v.isValid = false;
				_v.msg = ret.msg;
				return _v;
			}
		}
		switch(ID.length){
			case 18:
				birth = ID.substring(6,14);
	 	 		_v.year = birth.substring(0,4);
	 	 		_v.month = birth.substring(4,6);
	 	 		_v.date = birth.substring(6,8);
	 	 		_v.sex = (ID.substring(16,17) % 2) == 0 ? 'F': 'M';
	 	 		_v.birthday = new Date(_v.year,_v.month-1,_v.date);
	 	 		_v.isValid = true;
	 	 		break;
	 	 	case 15://15_DIGITS_ID_TOKEN
	 	 		birth = ID.substring(6,12);
	 	 		_v.year = '19' + birth.substring(0,2);
	 	 		_v.month = birth.substring(2,4);
	 	 		_v.date = birth.substring(4,6);
	 	 		_v.sex = (ID.substring(14,15) % 2) == 0 ? 'F': 'M';
	 	 		_v.birthday = new Date(_v.year,_v.month-1,_v.date);
	 	 		_v.isValid = true;
	 	 		break;
	 	 	default:
		}
	 	return _v;
	},
	/**校验用户名是否符合要求
	 * 
	 * value：要校验的字符串
	 * elem: 对应的元素
	 * name: 对应的提示语
	 * 
	 * 返回:验证结果 _v
	 * _v.ele 元素
	 * _v.msg 验证错误信息
	 * _v.isValid 是否验证通过
	 * 
	 ***/
	nameValidate:function(value,elem,name) {
		var o = $(elem);
		var _v = {
			ele:o,
			msg:null,
			isValid:false
		};
		var _this = this;
		if(!value){
			_v.msg = "请输入"+name+"的姓名";
			_v.isValid = false;
			return _v;
		}
   		var numreg = /[\d\(\)]/g;
        var rs = value.replace(numreg,"");
        var ch = /^([\u4e00-\u9fa5\s])*$/;
        var chflag = ch.test(rs);
        var reg = /^([\u4e00-\u9fa5\s]{1}|[A-Z]{1})+([\u4e00-\u9fa5\s]{0,37}|[• ]{0,37}|[· ]{0,37}|[. ]{0,37}|[． ]{0,37}|[A-Z]{0,37})*$/;
        var len = 0;
        //中文姓名或新疆维吾尔族语姓名中的"•" ,有空格就去除所有空格
        if(chflag || rs.indexOf('•') != -1 || rs.indexOf('·') != -1){
             var chreg=/\s+/g;
             rs = rs.replace(chreg,"");
             //匹配多个连续的"." 
             var defreg = /[\•\·]+/g;
             //替换多个连续的"·"为一个
             rs = rs.replace(defreg,"·")
            //英文姓名或是其他姓名需要将所有的空格替挽成"."
        }else{
              //如果有多个空格，则替换为一个空格
              var enreg=/\s+/g;
              rs = rs.replace(enreg," ");
              //去除因". "空格带来多余"."
              rs = rs.replace(". ",".");
              //去除因" ."空格带来多余"."
              rs = rs.replace(" .",".");
              //匹配多个连续的"." 
              var defreg = /\.+/g;
              //替换多个连续的"."为一个
              rs = rs.replace(defreg,".")
               //替换多个连续的"．"(英文全角点号)为一个 
              rs = rs.replace(/\．+/g,"．")
              //去除英文全角点号的前缀和后缀空格
              rs = rs.replace("． ","．").replace(" ．","．")
        }
        //判断是否包含系统限制内容                       
        $(elem).val(rs);
        if(rs=='不详'||rs=='不祥'||rs=='未知'||rs=='不知道'){
        	_v.msg = "姓名不能包含'不详'、'不祥'、'未知'、'不知道";
			_v.isValid = false;
			return _v;
        	
        }
        if( !reg.test(rs)) {
        	_v.msg = "输入的姓名含有非法字符,请您重新输入";
			_v.isValid = false;
			return _v;
        	
        }
        len = _this.getLength(value);
		if(len > 38 || len < 4) {
		    _v.msg = "姓名长度需为2-19个中文字符,请您重新检查！";
			_v.isValid = false;
			return _v;
		}
		_v.isValid = true;
		return _v;
	},
	/**
	 * value 
	 * 
	 * 返回_v
	 * _v.msg		错误信息
	 * _v.isValid	是否通过验证
	 * 
	 * **/
	addressValidate:function(value) {
    	var _v = {
    		msg:null,
    		isValid:false
    	}
    	var _this = this;
        var reg = new RegExp("^[a-zA-Z 0-9]+$");
        
    	//详细地址长度
        var len = 0;
		
		if(!value){
			_v.msg = "请务必输入详细地址，保单将配送至该地址";
			_v.isValid = false;
			return _v;
		}
		/** 校验详细地址长度*/
        len = _this.getLength(value);
        
        if(len < 8) {
        	_v.msg = "请正确填写详细地址，至少4个汉字长度";
			_v.isValid = false;
			return _v;
		}
        
        if(len > 100) {
        	_v.msg = "详细地址长度超过允许范围，请简写地址调整为50个汉字以内";
			_v.isValid = false;
			return _v;
		}
        
		/** 校验详细地址是否有无效字符*/
        if(reg.test(value)) {
        	_v.msg = "请正确填写详细地址，首位不能是数字或字母";
			_v.isValid = false;
			return _v;
        }
		if(len > 100 || len < 8) {
			_v.msg = "详细地址长度为4-50位汉字,请您重新检查";
			_v.isValid = false;
			return _v;
		}
		return _this.checkSpecialAddress(value);
	},
	/**
	 * value 
	 * 
	 * 返回_v
	 * _v.msg		错误信息
	 * _v.isValid	是否通过验证
	 * 
	 * **/
    checkSpecialAddress : function(address){

    	var _v = {
    		msg:null,
        	isValid:false
    	}
    	var length = address.length;
    	var flag = true;
		for(var i=0; i<length-1; i++){
			var ad2 = address.substring(i,i+2);
			if(ad2 == "喀什" || ad2 == "和田" || ad2 == "克州"){
				flag = false;
				break;
			}
			if(i < (length-7)){
				var ad8 = address.substring(i,i+8);
				if(ad8 == "克孜勒苏柯尔克孜"){
					flag = false;
					break;
				}
			}
		  }
		  if(!flag){
			_v.msg = "此产品新疆喀什、和田、克孜勒苏柯尔克孜自治州（克州）等地区无法进行承保配送，还请谅解";
			_v.isValid = false;
		  }else{
			  _v.isValid = true;
		  }
		  return _v;
    }
}