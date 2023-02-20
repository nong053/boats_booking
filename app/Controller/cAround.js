var around_vehiclePicturePath="";

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  if(!d.getTime()) return false; // Invalid date (or this could be epoch)
  return d.toISOString().slice(0,10) === dateString;
}

var validateRePasswordFn = function(){
	var message;
	if($("#passwordTxt").val()!=$("#rePasswordTxt").val()){
		message+="Password Incorrect\n";
		alert(message);
		return false;
	}else{
	return true;	
	}
	
}
var validateFn = function(){
	var message="";

	// emailTxt
	// passwordTxt
	if($("#emailTxt").val()==""){
		message+="Pleae fill E-mail.\n";
	}
	if($("#actionAround").val()=="add"){
		if($("#passwordTxt").val()==""){
			message+="Pleae fill Password.\n";
		}
	}

	if($("#titleTxt").val()==""){
		message+="Pleae fill Title.\n";
	}

	if($("#fristNameTxt").val()==""){
		message+="Pleae fill Frist name.\n";
	}

	if($("#lastNameTxt").val()==""){
		message+="Pleae fill Last name.\n";
	}
	if($("#positionTxt").val()==""){
		message+="Pleae fill Position.\n";
	}

	

	if(message!=""){
		alert(message);
		return false;
	}else{
		return true;
	}

}


/* Example Uses */
//console.log(isValidDate("0000-00-00"));  // false
//console.log(isValidDate("2015-01-40"));  // false
//console.log(isValidDate("2016-11-25"));  // true
//console.log(isValidDate("2016-02-29"));  // true = leap day
//console.log(isValidDate("2013-02-29"));  // false = not leap day

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};

var validateAroundFn=function(){
		var validate="";

		if($("#around_vehicle_txt").val()==""){
	 		validate+="vehicle type not empty. \n";
	 	}
	 	

		
	 	
	 	return validate;
	}
var delAroundFn = function(vehicleTypeID){
	
	$.ajax({
		url:restURL+"/api/public/around_vehicle/"+vehicleTypeID,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				getAroundDataFn();
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}

var clearAroundDataFn = function(){
	
    $("#around_name_txt").val("");
    $("#around_time_txt").val("");
  
	$("#idAround").val("");
	$("#actionAround").val("add");
	
	
}

var findOneAroundDataFn = function(vehicleTypeID){
	$.ajax({
		url:restURL+"/api/public/around_vehicle/"+vehicleTypeID,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);

			$("#around_name_txt").val(data['around_name']);
            $("#around_time_txt").val(data['around_time']);
			$("#actionAround").val("edit");
			$("#idAround").val(data['id']);
			
		}
	});
};
var listAroundDataFn = function(data){
	/*listDataAroundArea*/
	var html="";
	$.each(data,function(index,indexEntry){
		/*
		[{"around_vehicle_id":1,"around_vehicle":"12547","created_date":"2019-04-03 14:39:16",
		"updated_date":"2019-04-03 14:39:16"},{"around_vehicle_id":2,"around_vehicle":"125471",
		"created_date":"2019-04-03 14:41:42","updated_date":"2019-04-03 14:41:42"}
		]
		 */
		     
	

	html+="<div class=\"col-md-4\">";

        html+="<div class=\"box box-widget widget-user-2\">";
          html+="<div class=\"widget-user-header bg-aqua-active\">";
           html+="<div class=\"widget-user-image\">";

                          

              	
              	 //html+="<img class=\"img-circle\"  src=\"imgs/all-car.png\" alt=\"\">";
				 
				 html+=" <i style='font-size:34px;' class='fa fa-ship'></i>";
				 



            html+="</div>";
            html+="<h3 class=\"widget-user-username1\" style='font-size:20px; '>"+indexEntry['around_name']+"</h3>";

          html+="</div>";
          html+="<div class=\"box-footer no-padding\">";
            html+="<ul class=\"nav nav-stacked\">";
              html+="<li style=\"background: #ecf0f5;\"><a href=\"#\">รหัส <span class=\"pull-right badge bg-blue\">CT"+indexEntry['id']+"</span></a></li>";
              html+="<li><a href=\"#\">รอบ <span class=\"pull-right badge bg-aqua\">"+indexEntry['around_name']+"</span></a></li>";
              html+="<li><a href=\"#\">เวลา <span class=\"pull-right badge bg-aqua\">"+indexEntry['around_time']+"</span></a></li>";

              html+="<li><a href=\"#\" style=\"margin-top: 3px; margin-bottom: 3px;\"> ";
                    html+="<span class=\"\">";
                      html+="จัดการ";
                      html+="<button type=\"button\" id='del-"+indexEntry['id']+"' class=\"btn btn-danger btn-sm pull-right del\" style=\"margin-left: 3px;\"><i class=\"fa fa-trash-o\"></i></button>";
                      html+="<button type=\"button\" id='edit-"+indexEntry['id']+"' class=\"btn btn-warning btn-sm pull-right edit\"><i class=\"fa fa-fw fa-pencil\"></i></button>";
                    html+="</span>";
                html+="</a>";
              html+="</li>";
            html+="</ul>";
          html+="</div>";
        html+="</div>";
      html+="</div>";

	
	
	});
	$("#listDataAroundArea").html(html);
	
	
	//maanage
	$(".edit").click(function(){
		
		var id=this.id.split("-");
		id=id[1];
		//alert(id);
		$("#AroundModal").modal("show");
		findOneAroundDataFn(id);
		return false
		
	});
	
	$(".del").click(function(){
		var id=this.id.split("-");
		id=id[1];
		if(confirm("Do you want to Delete this data.")){
			delAroundFn(id);	
		}
		return false
	});
	
  
	
}

var getAroundDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/around_vehicle/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			listAroundDataFn(data);
			
			
		}
	});
	
}

var AroundInsertFn = function(){
	
	//validateFn();
	$.ajax({
		url:restURL+"/api/public/around_vehicle",
		type:"post",
		dataType:"json",
		data:{
			"around_name":$("#around_name_txt").val(),
            "around_time":$("#around_time_txt").val()
		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
			
					$("#AroundModal").modal("hide");
					getAroundDataFn();

			}
		}
	});
		
}

var AroundUpdateFn = function(){
	validateFn();
	var activeTxt="";
	if($("#activeTxt").prop("checked")==true){
		activeTxt="1";
	}else{
		activeTxt="0";
	}

	
	$.ajax({
		url:restURL+"/api/public/around_vehicle/"+$("#idAround").val(),
		type:"patch",
		dataType:"json",
		data:{
            "around_name":$("#around_name_txt").val(),
            "around_time":$("#around_time_txt").val()
		
		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				$("#AroundModal").modal("hide");
				getAroundDataFn();
			}
		}
	});
		
}
$(document).ready(function(){
	

	//getConfigDataFn();
	//alert(around_vehiclePicturePath);

     //Timepicker
     $('.timepicker').timepicker({
        showInputs: false
      })

	$("#addAround").click(function(){
		clearAroundDataFn();
		$("#AroundModal").modal("show");
	});
	 //get data
	 getAroundDataFn();
	 
	$("#btnSubmit").click(function(){
		
		if(validateAroundFn()!=""){
			alert(validateAroundFn());
			return false;
		}
		if($("#actionAround").val()=="add"){
			

			AroundInsertFn();

		}else{
			AroundUpdateFn();
		}
		
		
		
	
	});
	$("#btnReset").click(function(){
		clearAroundDataFn();
		$("#btnImageReset").click();
	});


	//if($("#actionAround").val()=="edit"){
		// $("#setChangePass").prop("checked",false);
		// $(".changePasswordArea").hide();
		// $("#setChangePass").click(function(){
		// 	if ($(this).is(":checked"))
		// 	{
		// 	  // it is checked
		// 	  	$(".changePasswordArea").show();
		// 	}else{
		// 		$(".changePasswordArea").hide();
		// 	}
		// });
	//}
	
	
	
	
	
	
	
	
});