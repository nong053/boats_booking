var ConfirmBookingPicturePath="";




//####  FILE IMPORT  START ####

	// Add events
	$('#fuel_attach_file_txt').on('change', prepareUpload);

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
		alert("upload");
		var validate_header_id="";
		if(!$("#fuel_attach_file_txt").val()){
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
			url:restURL+"/api/public/booking/upload_file/"+id,
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
				console.log(data);
				if(data['status']==200 && data['data'].length>0){

					//callFlashSlideInModal("Upload Successfully.",".information");
					$('#fuel_attach_file_txt').val("");
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



// //####  FILE IMPORT  START ####

// 	// Add events
// 	$('#picture_path_txt').on('change', prepareUpload);

// 	// Grab the files and set them to our variable
// 	function prepareUpload(event)
// 	{
// 	  //alert("perpare");
// 	  files = event.target.files;
// 	  //start upload file
// 	  //uploadFiles(event);

// 	}

// 	//$('#btnSubmit').on('click', uploadFiles);
// 	function uploadFiles(id)
// 	{
// 		console.log(id);
// 		//alert("upload");
// 		var validate_header_id="";
// 		if(!$("#picture_path_txt").val()){
// 			return false;

// 		}
// 	  //event.stopPropagation(); // Stop stuff happening
// 	 // event.preventDefault(); // Totally stop stuff happening

// 		// Create a formdata object and add the files
// 		var data = new FormData();
// 		//console.log(data);
// 		jQuery_1_1_3.each(files, function(key, value)
// 		{
// 			data.append(key, value);
// 			//data.append("process_type",$("#embedParamSearchProcessType").val());
// 		});


// 		jQuery_1_1_3.ajax({
// 			//url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+$("#attach_file_item_result_id").val(),
// 			url:restURL+"/api/public/vehicle/upload_file/"+id,
// 			type: 'POST',
// 			data: data,
// 			cache: false,
// 			dataType: 'json',
// 			processData: false, // Don't process the files
// 			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
// 			headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
// 			async:false,
// 			success: function(data, textStatus, jqXHR)
// 			{
// 				//console.log(data);
// 				if(data['status']==200 && data['data'].length>0){

// 					//callFlashSlideInModal("Upload Successfully.",".information");
// 					$('#picture_path_txt').val("");
// 					$(".dropify-clear").click();

// 				}else{

// 					//callFlashSlideInModal("Can't Upload file .","#information3");
// 				}
// 			},
// 			error: function(jqXHR, textStatus, errorThrown)
// 			{
// 				// Handle errors here
// 				//console.log('ERRORS: ' + textStatus);
// 				callFlashSlideInModal('ERRORS: ' + textStatus,".information");
// 				// STOP LOADING SPINNER
// 			}
// 		});


// 		return false;
// 	}
// //### FILE IMPORT END ###

var listAttachFileDataFn = function(data){

	//list_attach_file_area
	var html="";
	$.each(data,function(index,indexEntry){
 			html+="<tr>";
              html+="<td>1</td>";
              html+="<td>"+indexEntry['fuel_type']+"</td>";
              html+="<td>"+indexEntry['fuel_lite']+"</td>";
              html+="<td>ไฟล์แนบ"+(index+1)+"</td>";
              if(indexEntry['doc_path']!=undefined){
              html+="<td><a href='../public/"+indexEntry['doc_path']+"'><i style='cursor:pointer;' class=\"fa fa-download\"></i></a></td>";
              }else{
              html+="<td></td>";
              }
            html+="</tr>";
	});
	$("#list_attach_file_area").html(html);
}
var getAttachFileDataFn = function(booking_id){
	//upload_files_list
	$.ajax({
		url:restURL+"/api/public/booking/upload_file/"+booking_id,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			
			listAttachFileDataFn(data);

		}
	});
}

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
	if($("#actionConfirmBooking").val()=="add"){
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

var validateConfirmBookingFn=function(){
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
var delConfirmBookingFn = function(ConfirmBookingID){
	
	$.ajax({
		url:restURL+"/api/public/vehicle/"+ConfirmBookingID,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				delImageFn(ConfirmBookingID);
				getConfirmBookingDataFn();
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}

var clearConfirmBookingDataFn = function(){
	
	
	
	$("#vehicle_select_area option:first").attr('selected','selected');
	$("#chauffeur_select_area option:first").attr('selected','selected');
	
	$("#fuel_attach_file_txt").val("");
	$("#vehicle_operator").val("");
	
	$("#fuel_lite").val("");
	$("#fuel_type option:first").attr('selected','selected');
	

	$("#idConfirmBooking").val("");
	$("#booking_id").val("");
	$("#actionConfirmBooking").val("add");
	
	
}
var clearChauffeurAndVehicleDataFn = function(){
	

	$("#vehicle_select_area option:first").attr('selected','selected');
	$("#chauffeur_select_area option:first").attr('selected','selected');
	$("#vehicle_operator").val("");
	$("#operator_position").val("");
	
	
	
}

var findOneConfirmBookingDataFn = function(ConfirmBookingID){
	$.ajax({
		url:restURL+"/api/public/vehicle/"+ConfirmBookingID,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			$("#driver_license_txt").val(data['driver_license']);
			$("#ConfirmBooking_name_txt").val(data['ConfirmBooking_name']);
			$("#ConfirmBooking_tel_txt").val(data['ConfirmBooking_tel']);
			$("#actionConfirmBooking").val("edit");
			$("#idConfirmBooking").val(data['ConfirmBooking_id']);
			
		}
	});
};
var listConfirmBookingDataFn = function(data){
	/*listDataConfirmBookingArea*/

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
		if(indexEntry['approved_status']=='N'){
				
	          html+="<tr style='cursor:pointer;' role=\"row\"id=\"addConfirmBooking-"+indexEntry['booking_id']+"\" class=\"odd addConfirmBooking\">";
	            html+="<td class=\"\" style='width:5%;'>";
	             html+=(index+1);
	            html+="</td>";
	         //    if(parseInt(indexEntry['count_assign'])>0){
	         //    	html+="<td class=\"\" style='background-color:#d58512'>";
	        	// }else{
	        	// 	html+="<td class=\"bg-red\" >";
	        	// }

	        	html+="<td class=\"\" style='text-align:center; width:10%; '>";

	        	 if(getBookingImageFn(indexEntry['booking_id'])!=''){
                	//alert(0);
                	html+="<img  class=\"img-circle\" width=\"50\" src=\""+restURL+"/api/public/"+getBookingImageFn(indexEntry['booking_id'])+"\" alt=\"\"><br>";
                }else{
                	//alert(1);
                	html+=" <i style='font-size:33px; color:#ccc;' class=\"fa fa-automobile\"></i>";
                }

             	//html+="<img  class=\"img-circle\" width=\"80\" src=\""+restURL+"/api/public/"+getBookingImageFn(indexEntry['booking_id'])+"\" alt=\"\"><br>";
           	 html+=" </td>";
           	 html+="<td class=\"\" style='text-align:left; width:20% '>";
	        	 
	              html+="จาก <b>"+indexEntry['date_from']+"";
	              html+=" "+indexEntry['time_from']+"</b><br>";
	              html+="ถึง <b>"+indexEntry['date_to']+"";
	              html+=" "+indexEntry['time_to']+"</b><br>";
	               //html+="<img class=\"img-circle\" width=\"200\" src=\""+restURL+"/api/public/"+getBookingImageFn(indexEntry['booking_id'])+"\" alt=\"\">";
	           html+=" </td>";
	           html+="<td style='width:50%; '>";
	            html+=""+indexEntry['purpose']+"<br>";
	           html+="</td> ";

	           html+="<td style='text-align:center; width:20%;'>";
	            if(parseInt(indexEntry['count_assign'])>0){
	            	html+="<span  style='padding:7px; color:white; background-color:#d58512;'  class='btn-sm'><i class='fa fa-clone'></i> Assigned</span>";
	        	}else{
	        		html+="<span  style='padding:7px; color:white;'  class='bg-red btn-sm'><i class='fa fa-circle'></i> Booking</span>";
	        	}
	           html+="</td> ";



	          html+="</tr>";
		}	
	});
	$("#listDataConfirmBookingArea").html(html);
	$('#tableConfirmDataList').DataTable();

	$(".addConfirmBooking").click(function(){
		var id=this.id.split("-");
		id=id[1];
		clearConfirmBookingDataFn();
		$("#booking_id").val(id);
		$("#ConfirmBookingModal").modal("show");
		getChauffeurAndVehicleDataFn(id);
		getAttachFileDataFn(id);

		getBookingDataFn();
	});
	
	
}



var getConfirmBookingDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/booking/booking_list",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			listConfirmBookingDataFn(data);

		}
	});
	
}
var dropdownListConfirmBookingTypeFn = function(data){
	var html="";
	$.each(data,function(index,indexEntry){
		html+="<option value='"+indexEntry['vehicle_type_id']+"'>"+indexEntry['vehicle_type']+"</option>";
	});
	//alert(html);
	$("#vehicle_type_txt").html(html);

}
var getConfirmBookingTypeDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/vehicle_type/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			dropdownListConfirmBookingTypeFn(data);
			
			
		}
	});
	
}



var ConfirmBookingInsertFn = function(){
	

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
			"active":activeTxt,
			"fuel_type": $("#fuel_type_txt").val(),
			"fuel_lite": $("#fuel_lite_txt").val()

		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
			
					$("#ConfirmBookingModal").modal("hide");
					uploadFiles(data['data']['vehicle_id']);
					getConfirmBookingDataFn();

			}
		}
	});
		
}

var ConfirmBookingUpdateFn = function(){

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
		url:restURL+"/api/public/vehicle/"+$("#idConfirmBooking").val(),
		type:"patch",
		dataType:"json",
		data:{
			"vehicle_type_id":$("#vehicle_type_txt").val(),
			"vehicle_number":$("#vehicle_number_txt").val(),
			"number_of_seats":$("#number_of_seats_txt").val(),
			"active":activeTxt,
		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				if($("#picture_path_txt").val()){

					delImageFn($("#idConfirmBooking").val());
					uploadFiles($("#idConfirmBooking").val())

				}

				$("#ConfirmBookingModal").modal("hide");
				getConfirmBookingDataFn();
			}
		}
	});
		
}

var dropdownListVehicleFn = function(data){
	var html="";
	$.each(data,function(index,indexEntry){
		html+="<option value='"+indexEntry['vehicle_id']+"'>"+indexEntry['vehicle_type']+"("+indexEntry['vehicle_number']+")</option>";
	});
	$("#vehicle_select_area").html(html);
}

var getVehicleDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/vehicle/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			dropdownListVehicleFn(data);
			
		}
	});
}

var dropdownListChauffeurFn = function(data){
	var html="";
	$.each(data,function(index,indexEntry){
		html+="<option value='"+indexEntry['chauffeur_id']+"'>"+indexEntry['chauffeur_name']+"</option>";
	});
	$("#chauffeur_select_area").html(html);

}

var getChauffeurDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/chauffeur/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			dropdownListChauffeurFn(data);
		}
	});
	
}
var mappingBookingDataFn = function(data){
/*
ACTIVE_FLAG: null
ADDRESS: null
CREATED_BY: null
CREATED_DATE: null
DATE_OF_BIRTH: null
FIRST_NAME: null
GENDER: null
LAST_NAME: null
NATIONALITY: null
POSITION: null
RELIGION: null
STATUS: null
TITLE: null
UPDATED_BY: null
UPDATED_DATE: null
as_the_name: "วัดโพธิ์ชัย"
at_the_place: "วัดโพธิ์ชัยบ้านดงหมู อำเภอเขาวง จังหวัดกาฬสินธ์"
baggage_weight: null
booking_id: 1
chauffeur_id: 1
chauffeur_other: "จ.ต.นัฏพงษ์ ดากาวงศ์33333"
created_date: "2019-04-04"
date_from: "0000-00-00"
date_to: "0000-00-00"
district: "เขาวง"
email: null
from1: null
from2: null
from3: null
from4: null
fuel_lite: null
fuel_type: null
near_place: null
number_of_people: 22
operator_position: "ผลขับ"
password: null
pick_up_at: null
profile_id: null
province: "กาฬสินธ์"
purpose: "เพื่อไปทอดผ้าป่าสร้างโบสถ์วัดโพธิ์ชัย2"
role: null
stage: 1
sub_district: "คุ้มเก่า"
time_from: "0000-00-00"
time_to: "0000-00-00"
to1: null
to2: null
to3: null
to4: null
updated_date: "2019-04-04"
user_id: 2
vehicle_id: 1
vehicle_operator: "จ.ต.วีรชัย ศิลป"
*/
//alert(data['FIRST_NAME']);
	$("#purpose_txt").html(data['purpose']);
	$("#fullname_txt").html(data['FIRST_NAME']+" "+data['LAST_NAME']);
	$("#position_txt").html(data['POSITION']);
	$("#from_txt").html(data['from1']);
	$("#number_of_people_txt").html(data['number_of_people']);
	$("#near_place_txt").html(data['near_place']);
	$("#date_from_txt").html(data['date_from']);
	$("#date_to_txt").html(data['date_to']);
	$("#fuel_type_txt").html(data['fuel_type']);

	$("#to_txt").html(data['to1']);
	$("#baggage_weight_txt").html(data['baggage_weight']);
	$("#at_the_place_txt").html(data['at_the_place']);
	$("#time_from_txt").html(data['time_from']);
	$("#time_to_txt").html(data['time_to']);
	$("#fuel_lite_txt").html(data['fuel_lite']);
}
var getBookingDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/booking/booking_confrim_detail/"+$("#booking_id").val(),
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			mappingBookingDataFn(data[0]);
		
		}
	});
	
}
//ChauffeurAndVehicle start


var assignChauffeurAndVehicleFn=function(){

		$.ajax({
			url:restURL+"/api/public/chauffeur_and_vehicle",
			type:"post",
			dataType:"json",
			data:{
				"booking_id":$("#booking_id").val(),
				"vehicle_id":$("#vehicle_select_area").val(),
				"chauffeur_id":$("#chauffeur_select_area").val(),
				"vehicle_operator":$("#vehicle_operator").val(),
				"operator_position":$("#operator_position").val(),

			},
			headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
			success:function(data){
				
				if(data.status==200){

					getChauffeurAndVehicleDataFn($("#booking_id").val());


				}else if(data.status==400){
					alert(data.data.booking_id);
				}
			}
		});
};

var delChauffeurAndVehicleFn = function(id){
	
	$.ajax({
		url:restURL+"/api/public/chauffeur_and_vehicle/"+id,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				getChauffeurAndVehicleDataFn($("#booking_id").val());
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}
var findOneChauffeurAndVehicleDataFn = function(id){
	$.ajax({
		url:restURL+"/api/public/chauffeur_and_vehicle/"+id,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			// $("#driver_license_txt").val(data['driver_license']);
			// $("#ConfirmBooking_name_txt").val(data['ConfirmBooking_name']);
			// $("#ConfirmBooking_tel_txt").val(data['ConfirmBooking_tel']);
			// $("#actionConfirmBooking").val("edit");
			// $("#idConfirmBooking").val(data['ConfirmBooking_id']);
			
		}
	});
};

var listChauffeurAndVehicleDataFn = function(data){
	/*listDataConfirmBookingArea*/

// booking_id: 2
// chauffeur_id: 2
// chauffeur_name: "Kosit2 Aromsava2"
// created_date: "2019-05-01"
// cv_id: 5
// driver_license: null
// operator_position: "44"
// updated_date: "2019-05-01"
// vehicle_id: 8
// vehicle_number: "444"
// vehicle_operator: "44"
// vehicle_type: "รถกระบะ4ประตู"

	var html="";
	$.each(data,function(index,indexEntry){


			html+="<tr>";
	          html+="<td>"+indexEntry['vehicle_type']+"("+indexEntry['vehicle_number']+")</td>";
	          html+="<td>"+indexEntry['chauffeur_name']+"</td>";
	          html+="<td>"+indexEntry['driver_license']+"</td>";
	          html+="<td>"+indexEntry['vehicle_operator']+"</td>";
	          html+="<td>"+indexEntry['operator_position']+"</td>";
	          html+="<td>";
	           // html+="<button type=\"button\" id=\"editcv-"+indexEntry['cv_id']+"\" class=\"edit btn btn-warning btn-sm\"><i class=\"fa fa-fw fa-pencil\"></i></button>";
	            html+="<button type=\"button\" id=\"delcv-"+indexEntry['cv_id']+"\" class=\"delcv btn btn-danger btn-sm\"><i class=\"fa fa-trash-o\"></i></button>";
	          html+="</td>";
	        html+="</tr>";

     
	});

	$("#listChauffeurAndVehicleArea").html(html);
	
	
	//maanage
	$(".editcv").click(function(){
		
		var id=this.id.split("-");
		id=id[1];
		//$("#ConfirmBookingModal").modal("show");
		findOneChauffeurAndVehicleDataFn(id);
		return false
		
	});
	
	$(".delcv").click(function(){
		var id=this.id.split("-");
		id=id[1];
		if(confirm("Do you want to Delete this data.")){
			delChauffeurAndVehicleFn(id);	
		}
		return false
	});
	
  
	
}

var getChauffeurAndVehicleDataFn = function(booking_id){
	$.ajax({
		url:restURL+"/api/public/chauffeur_and_vehicle/index/"+booking_id,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			clearChauffeurAndVehicleDataFn();
			listChauffeurAndVehicleDataFn(data);

		}
	});
}
var getConfrimBookingSearch = function(){
	$.ajax({
		url:restURL+"/api/public/booking/booking_search",
		type:"post",
		dataType:"json",
		data:{'param_year':$("#param_year").val(),'param_month':$("#param_month").val()},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
	
			listConfirmBookingDataFn(data);
			
		}
	});
}

//ChauffeurAndVehicle end

$(document).ready(function(){
	



	getChauffeurDataFn();
	getVehicleDataFn();

	dropdownYearListFn();
	$("#param_month").val(month_c);

	$("#btn_search").click(function(){
	 	//alert("hello jquery");
	 	getConfrimBookingSearch();
	 	return false;
	 });
	$("#btn_search").click();

	$("#btnChauffeurAndVehicleAdd").click(function(){
		assignChauffeurAndVehicleFn();
	
	});

	

	 //get data
	// getConfirmBookingDataFn();
	 getConfirmBookingTypeDataFn();

	

	 
	$("#btnSubmit").click(function(){
		
		if(validateConfirmBookingFn()!=""){
			alert(validateConfirmBookingFn());
			return false;
		}
		if($("#actionConfirmBooking").val()=="add"){
	
			ConfirmBookingInsertFn();

		}else{
			ConfirmBookingUpdateFn();
		}
		
		
		
	
	});
	$("#btnReset").click(function(){
		clearConfirmBookingDataFn();
		$("#btnImageReset").click();
	});
	$("#btnbtnChauffeurAndVehicleAddReset").click(function(){

	});

	//if($("#actionConfirmBooking").val()=="edit"){
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