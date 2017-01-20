var right=[false,false,false,false,false,false];
function check_name(name){
	if(name[0].match(/\d/)){
	//	alert("name_head false");
	
		return "用户名要以字母开头";
	}
	else if(!name.match(/[a-zA-Z0-9]|_/)){
	//	alert("name false");
		return "用户名应只包含下划线和字母";

	}else{
		if(name.length<6||name.length>16){
			return "用户名6~18位";
		}
	}
	right[0]=true;
	return "";
}
function check_password(pass){
	if(pass.length<6||pass.length>12){
		return "密码应为6~12位";
	}else if(!pass.match(/[a-zA-Z0-9]|_|-/)){
		return "密码应该只包含大小写字母、中划线、下划线";
	}
	right[4]=true;
	return "";
}
function check_check(check,pass){
	if(check==pass){
		right[5]=true;
		return "";
	}else {
		return "密码设置不一致";
	}
	
}
function check_id(id){
	if(id.length!=8){
//		alert("id false");
		return "id长度应为8位";
	}else if(id[0].match(/0/)){
//			alert("id begins with 0");
			return "id号不能以0开头";
		}else if(!id.match(/\d{8}/)){
//			alert("must be numbers");
			return "ID必须是数字";
		}
	right[1]=true;
	return "";
}
function check_phone(tel){
	if(tel.length!=11){
//		alert("tel number should be eleven");
		return "电话号码应该为11位";
	}else if(tel[0].match(/0/)){
//		alert("tel shouldnt begin with 0");
		return "电话号码不得已0开头";
	}else if(!tel.match(/\d{11}/)){
		return "电话号码必须是数字";
	}
	right[2]=true;
	return "";
}
function check_email(email){
		if(!email[0].match(/[a-zA-Z]/)){
	//		alert("email should begin with char");
			right[3]=false;
			return "邮箱格式错误";
		}else if(!((/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/).exec(email))){
	//		alert("email 格式不对");
			right[3]=false;
			return "邮箱格式错误";
		}
		right[3]=true;
		return "";
}

window.onload=function(){
	$("#username").focusout(function(){
		if(this.value!=""){
			var message;
			message=check_name(this.value);
			console.log(message);
			changeclass(this,$("#name_mess"),message);
		}
		
	})
	$("#password").focusout(function(){
		if(this.value!=""){
			var message=check_password(this.value);
			console.log(message);
			changeclass(this,$("#pass_mess"),message);
		}
	})
	$("#pass_check").focusout(function(){
		if(this.value!=""){
			var message=check_check(this.value,$("#password").val());
			console.log(message);
			changeclass(this,$("#check_mess"),message);
		}
	})
	$("#id").focusout(function(){
		if(this.value!=""){
			var message=check_id(this.value);
			console.log(message);
			changeclass(this,$("#id_mess"),message);
		}
		
	})

	$("#phone").focusout(function(){
		if(this.value!=""){
			var message=check_phone(this.value);
			changeclass(this,$("#phone_mess"),message);
		}
	
	})

	$("#email").focusout(function(){
		if(this.value!=""){
			var message=check_email(this.value);
			changeclass(this,$("#email_mess"),message);
		}
		
	})
}
function f(){
	
	console.log("in ok");
	var ok=true;
		for(var i=0;i<6;i++){
			if(right[i]==false){
				alert("格式错误");
				console.log(i);
				return false;
			}
		}
	return true;
}
function changeclass(dom,mess,m){
		if(m!=""){
			$(mess).addClass("message_show").removeClass("message").text(m);
			}else{
				$(mess).removeClass("message_show").addClass("message").text(m);
			}
		if(m==""){
			$(dom).removeClass("original").addClass("green");
		}else{
			$(dom).removeClass("green").addClass("original");
		}
}