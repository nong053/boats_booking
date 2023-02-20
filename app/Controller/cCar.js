var CarPicturePath="";



//####  FILE IMPORT  START ####

	// Add events
	$('#picture_path_txt').on('change', prepareUpload);

	// Grab the files and set them to our variable
	function prepareUpload(event)
	{
	  //alert("perpare");
	  files = event.target.files;
	  //start upload file
	  //uploadFiles(event);

	}

	//$('#btnSubmit').on('click', uploadFiles);
	function uploadFiles(id)
	{
		console.log(id);
		//alert("upload");
		var validate_header_id="";
		if(!$("#picture_path_txt").val()){
			return false;

		}
	  //event.stopPropagation(); // Stop stuff happening
	 // event.preventDefault(); // Totally stop stuff happening

		// Create a formdata object and add the files
		var data = new FormData();
		//console.log(data);
		jQuery_1_1_3.each(files, function(key, value)
		{
			data.append(key, value);
			//data.append("process_type",$("#embedParamSearchProcessType").val());
		});


		jQuery_1_1_3.ajax({
			//url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+$("#attach_file_item_result_id").val(),
			url:restURL+"/api/public/vehicle/upload_file/"+id,
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
			async:false,
			success: function(data, textStatus, jqXHR)
			{
				//console.log(data);
				if(data['status']==200 && data['data'].length>0){

					//callFlashSlideInModal("Upload Successfully.",".information");
					$('#picture_path_txt').val("");
					$(".dropify-clear").click();

				}else{

					//callFlashSlideInModal("Can't Upload file .","#information3");
				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				// Handle errors here
				//console.log('ERRORS: ' + textStatus);
				callFlashSlideInModal('ERRORS: ' + textStatus,".information");
				// STOP LOADING SPINNER
			}
		});


		return false;
	}
//### FILE IMPORT END ###


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
	if($("#actionCar").val()=="add"){
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

var validateCarFn=function(){
		var validate="";
		if($("#vehicle_number_txt").val()==""){
	 		validate+="Vehicle umber not empty. \n";
	 	}
	 	if($("#number_of_seats_txt").val()==""){
	 		validate+="Number of seats not empty. \n";
	 	}
	 	return validate;
	}

var delImageFn = function(id){
	//stock/delete_file/
	$.ajax({
		url:restURL+"/api/public/vehicle/delete_file",
		type:"post",
		dataType:"json",
		data:{"item_result_id":id},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			console.log(sessionStorage.getItem('galbalToken'));
			if(data.status==200){
				//getStockDataFn();
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}
var delCarFn = function(CarID){
	
	$.ajax({
		url:restURL+"/api/public/vehicle/"+CarID,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				delImageFn(CarID);
				getCarDataFn();
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}

var clearCarDataFn = function(){
	
	
	$("#picture_path_txt").val("");
	$("#vehicle_type_txt option:first").attr('selected','selected');
	$("#vehicle_number_txt").val("");
	$("#number_of_seats_txt").val("");
	$("#fuel_type_master_txt").val("DIESEL");
	$("#fuel_consumption_rate_txt").val("");
	$("#active_txt").prop("checked",true);
	$("#idCar").val("");
	$("#actionCar").val("add");
	
	
}

var findOneCarDataFn = function(CarID){
	$.ajax({
		url:restURL+"/api/public/vehicle/"+CarID,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			// {"vehicle_id":11,"vehicle_type_id":4,"vehicle_number":"\u0e207555","number_of_seats":6,"active":1,"created_date":"2019-06-17 00:00:00","updated_date":"2019-06-17 00:00:00"}
			//$("#driver_license_txt").val(data['driver_license']);
			$("#picture_path_txt").val("");
			$("#vehicle_type_txt").val(data['vehicle_type_id']);
			$("#vehicle_number_txt").val(data['vehicle_number']);
			$("#number_of_seats_txt").val(data['number_of_seats']);

			$("#fuel_type_master_txt").val(data['fuel_type_master']);
			$("#fuel_consumption_rate_txt").val(data['fuel_consumption_rate']);

			$("#active_txt").val(data['active']);

			if(data['active']==1){
				$("#active_txt").prop("checked",true);
			}else{
				$("#active_txt").prop("checked",false);
			}
			
			$("#actionCar").val("edit");
			$("#idCar").val(data['vehicle_id']);
			
		}
	});
};
var listCarDataFn = function(data){
	/*listDataCarArea*/

/*
active: 1
created_by: null
created_date: "2019-04-03"
created_dttm: null
doc_path: null
item_result_id: null
number_of_seats: null
result_doc_id: null
updated_date: "2019-04-03"
vehicle_id: 1
vehicle_number: "3กส9429"
vehicle_type_id: 1	
*/
	var html="";
	$.each(data,function(index,indexEntry){
	
			console.log(indexEntry);



			html+="<div class=\"col-md-4\">";
                    html+="<div class=\"box box-widget widget-user-2\">";
                      html+="<div class=\"widget-user-header bg-aqua-active\">";
                        html+="<div class=\"widget-user-image\">";

                          

                          	if(!indexEntry['doc_path']){
                          		html+="<img class=\"img-circle\"  src=\"imgs/car.jpg\" alt=\"\">";
							}else{
								html+="<img class=\"img-circle\"  src='"+restURL+"/api/public/"+indexEntry['doc_path']+"' alt=\""+indexEntry['Car_name']+"\">";
							}


                        html+="</div>";
                        html+="<h5 style='font-size:20px;' class=\"widget-user-username\">"+indexEntry['vehicle_type']+"</h5>";
                        html+="<h5 class=\"widget-user-desc\">ทะเบียน: <b>"+indexEntry['vehicle_number']+"</b></h5>";
                      html+="</div>";
                      html+="<div class=\"box-footer no-padding\">";
                        html+="<ul class=\"nav nav-stacked\">";
                          html+="<li style=\"background: #ecf0f5;\"><a href=\"#\">รหัส <span class=\"pull-right badge bg-blue\">C"+indexEntry['vehicle_id']+"</span></a></li>";
                          html+="<li><a href=\"#\">จำนวนที่นั่ง <span class=\"pull-right badge bg-aqua\">"+indexEntry['number_of_seats']+"</span></a></li>";
                          if(indexEntry['active']==1){
                          	html+="<li style=\"background: #ecf0f5;\"><a href=\"#\">สถานะ <span class=\"pull-right badge bg-green\">พร้อมใช้งาน</span></a></li>";
                          }else{
                          	html+="<li style=\"background: #ecf0f5;\"><a href=\"#\">สถานะ <span class=\"pull-right badge bg-red\">ไม่พร้อมใช้งาน</span></a></li>";
                          }
						  /*
                          if(indexEntry['fuel_type_master']==null){
                          	html+="<li ><a href=\"#\">ชนิดเชื้อเพลิง <span class=\"pull-right badge bg-aqua\"></span></a></li>";
                      	  }else{
                      	  	html+="<li><a href=\"#\">ชนิดเชื้อเพลิง <span class=\"pull-right badge bg-aqua\">"+indexEntry['fuel_type_master']+"</span></a></li>";
                      	  }
                          if(indexEntry['fuel_consumption_rate']==null){
                          	html+="<li style=\"background: #ecf0f5;\"><a href=\"#\">อัตราสิ้นเปลือง <span class=\"pull-right badge bg-aqua\"></span></a></li>";
                      	  }else{
                      	  	html+="<li style=\"background: #ecf0f5;\"><a href=\"#\">อัตราสิ้นเปลือง <span class=\"pull-right badge bg-aqua\">"+indexEntry['fuel_consumption_rate']+"</span></a></li>";
                      	  }
							*/
                          html+="<li><a href=\"#\" style=\"margin-top: 3px; margin-bottom: 3px;\"> ";
                                html+="<span class=\" \">";
                                  html+="จัดการ";
                                  html+="<button type=\"button\" id='del-"+indexEntry['vehicle_id']+"' class=\"del btn btn-danger btn-sm pull-right\" style=\"margin-left: 3px;\"><i class=\"fa fa-trash-o\"></i></button>";
                                  html+="<button type=\"button\" id='edit-"+indexEntry['vehicle_id']+"' class=\"edit btn btn-warning btn-sm pull-right\"><i class=\"fa fa-fw fa-pencil\"></i></button>";
                                html+="</span>";
                            html+="</a>";
                          html+="</li>";
							
                        html+="</ul>";
                      html+="</div>";
                    html+="</div>";
                  html+="</div>";

     //          html+="<div class=\"col-md-4\">";
     //            html+="<div class=\"box box-widget widget-user\">";
     //              html+="<div class=\"widget-user-header bg-aqua-active\">";
     //                html+="<h3 class=\"widget-user-username\">"+indexEntry['Car_name']+"</h3>";
     //                html+="<h5 class=\"widget-user-desc\">โทร."+indexEntry['Car_tel']+"</h5>";
     //              html+="</div>";
     //              html+="<div class=\"widget-user-image\">";

     //              	if(!indexEntry['doc_path']){
					// 	html+="<img class=\"img-circle\" src=\"./dist/img/user1-128x128.jpg\" alt=\"User Avatar\">";
					// }else{
					// 	html+="<img class=\"img-circle\" src='"+restURL+"/api/public/"+indexEntry['doc_path']+"' alt=\""+indexEntry['Car_name']+"\">";
					// 	//html+="<td style='text-align:center;'> <img src='"+restURL+"/api/public/"+indexEntry['doc_path']+"' width='50px; height:50px;'></td>";		
					// }

                    
                 
     //              html+="</div>";
     //              html+="<div class=\"box-footer\">";
     //                html+="<div class=\"row\">";
     //                  html+="<div class=\"col-sm-4 border-right\">";
     //                    html+="<div class=\"description-block\">";
     //                      html+="<h5 class=\"description-header\">"+indexEntry['driver_license']+"</h5>";
     //                      html+="<span class=\"description-text\">ใบขับขี่</span>";
     //                    html+="</div>";
     //                  html+="</div>";
     //                   html+="<div class=\"col-sm-4\">";
     //                    html+="<div class=\"description-block\">";
     //                      html+="<h5 class=\"description-header\">พร้อม</h5>";
     //                      html+="<span class=\"description-text\">สถานะ</span>";
     //                    html+="</div>";
     //                  html+="</div>";
     //                  html+="<div class=\"col-sm-4\">";
     //                    html+="<div class=\"description-block\">";
     //                      html+="<h5 class=\"description-header\">";
     //                        html+="<i style='cursor:pointer; color:#f39c12 ' id='edit-"+indexEntry['Car_id']+"' class=\" edit fa fa-fw fa-pencil\"></i>";
     //                        html+="<i style='cursor:pointer; color:#dd4b39 ' id='del-"+indexEntry['Car_id']+"' class=\"del fa fa-trash-o\"></i>";
     //                      html+="</h5>";
     //                      html+="<span class=\"description-text\">จัดการ</span>";
     //                    html+="</div>";
     //                  html+="</div>";
     //                html+="</div>";
     //              html+="</div>";
     //            html+="</div>";
     //          html+="</div>";
	});
	$("#listDataCarArea").html(html);
	
	
	//maanage
	$(".edit").click(function(){
		
		var id=this.id.split("-");
		id=id[1];
		//alert(id);
		$("#CarModal").modal("show");
		findOneCarDataFn(id);
		return false
		
	});
	
	$(".del").click(function(){
		var id=this.id.split("-");
		id=id[1];
		if(confirm("Do you want to Delete this data.")){
			delCarFn(id);	
		}
		return false
	});
	
  
	
}



var getCarDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/vehicle/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			listCarDataFn(data);
		}
	});
	
}
var dropdownListCarTypeFn = function(data){
	var html="";
	$.each(data,function(index,indexEntry){
		html+="<option value='"+indexEntry['vehicle_type_id']+"'>"+indexEntry['vehicle_type']+"</option>";
	});
	//alert(html);
	$("#vehicle_type_txt").html(html);

}
var getCarTypeDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/vehicle_type/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			dropdownListCarTypeFn(data);
			
			
		}
	});
	
}



var CarInsertFn = function(){
	

/*
active: 1
created_by: null
created_date: "2019-04-03"
created_dttm: null
doc_path: null
item_result_id: null
number_of_seats: null
result_doc_id: null
updated_date: "2019-04-03"
vehicle_id: 1
vehicle_number: "3กส9429"
vehicle_type_id: 1	

*/
	var activeTxt="";
	if($("#active_txt").prop("checked")==true){
		activeTxt="1";
	}else{
		activeTxt="0";
	}
	//alert(activeTxt);
	$.ajax({
		url:restURL+"/api/public/vehicle",
		type:"post",
		dataType:"json",
		data:{
			"vehicle_type_id":$("#vehicle_type_txt").val(),
			"vehicle_number":$("#vehicle_number_txt").val(),
			"number_of_seats":$("#number_of_seats_txt").val(),
			"fuel_type_master":$("#fuel_type_master_txt").val(),
			"fuel_consumption_rate":$("#fuel_consumption_rate_txt").val(),
			"active":activeTxt,

		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
			
					$("#CarModal").modal("hide");
					uploadFiles(data['data']['vehicle_id']);
					getCarDataFn();

			}
		}
	});
		
}

var CarUpdateFn = function(){

/*
active: 1
created_by: null
created_date: "2019-04-03"
created_dttm: null
doc_path: null
item_result_id: null
number_of_seats: null
result_doc_id: null
updated_date: "2019-04-03"
vehicle_id: 1
vehicle_number: "3กส9429"
vehicle_type_id: 1	
*/
	validateFn();
	var activeTxt="";
	if($("#active_txt").prop("checked")==true){
		activeTxt="1";
	}else{
		activeTxt="0";
	}

	
	$.ajax({
		url:restURL+"/api/public/vehicle/"+$("#idCar").val(),
		type:"patch",
		dataType:"json",
		data:{
			"vehicle_type_id":$("#vehicle_type_txt").val(),
			"vehicle_number":$("#vehicle_number_txt").val(),
			"number_of_seats":$("#number_of_seats_txt").val(),
			"fuel_type_master":$("#fuel_type_master_txt").val(),
			"fuel_consumption_rate":$("#fuel_consumption_rate_txt").val(),
			"active":activeTxt,
		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){

				if($("#picture_path_txt").val()){

					delImageFn($("#idCar").val());
					uploadFiles($("#idCar").val())

				}

				$("#CarModal").modal("hide");
				getCarDataFn();
			}
		}
	});
		
}
$(document).ready(function(){
	

	//getConfigDataFn();
	//alert(CarPicturePath);

	$("#addCar").click(function(){
		clearCarDataFn();
		$("#CarModal").modal("show");
	});
	 //get data
	 getCarDataFn();
	 getCarTypeDataFn();
	 
	$("#btnSubmit").click(function(){
		
		if(validateCarFn()!=""){
			alert(validateCarFn());
			return false;
		}
		if($("#actionCar").val()=="add"){
			

			CarInsertFn();

		}else{
			CarUpdateFn();
		}
		
		
		
	
	});
	$("#btnReset").click(function(){
		clearCarDataFn();
		$("#btnImageReset").click();
	});


	//if($("#actionCar").val()=="edit"){
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