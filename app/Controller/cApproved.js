var ApprovedBookingPicturePath="";







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
	if($("#actionApprovedBooking").val()=="add"){
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

var validateApprovedBookingFn=function(){
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
var delApprovedBookingFn = function(ApprovedBookingID){
	
	$.ajax({
		url:restURL+"/api/public/vehicle/"+ApprovedBookingID,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				//delImageFn(ApprovedBookingID);
				getApprovedBookingDataFn();
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}

var clearApprovedBookingDataFn = function(){
	
	
	// $("#picture_path_txt").val("");
	// $("#vehicle_type_txt option:first").attr('selected','selected');
	// $("#vehicle_number_txt").val("");
	// $("#number_of_seats_txt").val("");
	// $("#active_txt").prop("checked",true);
	// $("#idApprovedBooking").val("");
	// $("#booking_id").val("");
	// $("#actionApprovedBooking").val("add");


	 $("#approved_status_txt option:first").attr('selected','selected');
	 $("#approved_status_reason_txt").val("");
	 $(".alertFromServer").hide();
	
	
}

var findOneApprovedBookingDataFn = function(ApprovedBookingID){
	$.ajax({
		url:restURL+"/api/public/vehicle/"+ApprovedBookingID,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			$("#driver_license_txt").val(data['driver_license']);
			$("#ApprovedBooking_name_txt").val(data['ApprovedBooking_name']);
			$("#ApprovedBooking_tel_txt").val(data['ApprovedBooking_tel']);
			$("#actionApprovedBooking").val("edit");
			$("#idApprovedBooking").val(data['ApprovedBooking_id']);
			
		}
	});
};
var listApprovedBookingDataFn = function(data){
	/*listDataApprovedBookingArea*/

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
		
		//if(parseInt(indexEntry['count_assign'])>0){
			
          html+="<tr style='cursor:pointer;' role=\"row\"id=\"addApprovedBooking-"+indexEntry['booking_id']+"\" class=\"odd addApprovedBooking\">";
            html+="<td class=\"\" style='width:5%;'>";
             html+=(index+1);
            html+="</td>";
           //   if((parseInt(indexEntry['count_assign'])>0) && (indexEntry['approved_status']=='N')){
           //  	html+="<td class=\"\" style='background-color:#d58512'>";
        	  // }else if((parseInt(indexEntry['count_assign'])>0) && (indexEntry['approved_status']=='Y')){
        	  // 	html+="<td class=\"\" style='background-color:#00a65a'>";
        	  // }
        	  html+="<td class=\"\" style='text-align:center; width:10%; '>";
             	html+="<img  class=\"img-circle\" width=\"50\" src=\""+restURL+"/api/public/"+getBookingImageFn(indexEntry['booking_id'])+"\" alt=\"\"><br>";
           	 html+=" </td>";
           	 html+="<td class=\"\" style='width:20%;'>";
        	 
              	  html+="จาก <b>"+indexEntry['date_from']+"";
	              html+=" "+indexEntry['time_from']+"</b><br>";
	              html+="ถึง <b>"+indexEntry['date_to']+"";
	              html+=" "+indexEntry['time_to']+"</b><br>";
              // html+="<img class=\"img-circle\" width=\"200\" src=\""+restURL+"/api/public/"+getBookingImageFn(indexEntry['booking_id'])+"\" alt=\"\">";
           html+=" </td>";
            html+="<td style='width:50%;'>";
            html+=""+indexEntry['purpose']+"<br>";
          html+="</td> ";
		  html+="<td style='text-align:right; width:20%;'>";
            
          
       //    if((indexEntry['assign_status']=='Y') && (indexEntry['approved_status']=='N')){
       //      	//html+="<td class=\"\" style='background-color:#d58512'>";
       //      	html+="<span  style='padding:7px; color:white; background-color:#d58512;'  class='btn-sm'><i class='fa fa-clone'></i> Assigned</span>";
    	  // }else if((indexEntry['assign_status']=='Y') && (indexEntry['approved_status']=='Y')){
    	  // 		html+="<span  style='padding:7px; color:white; background-color:#00a65a'  class='btn-sm'><i class='fa fa-check-square'></i> Approved</span>";
    	  // }

    	  html+="<span  style='padding:7px; color:white; background-color:#00c0ef; '  class='btn-sm' ><i class='fa fa-clock-o'></i> Assigned</span>";
          html+="</td> ";
          html+="</tr>";
      //}
			
	});
	$("#listDataApprovedBookingArea").html(html);
	$('#tableApproveDataList').DataTable();

	$(".addApprovedBooking").click(function(){
		var id=this.id.split("-");
		id=id[1];
		clearApprovedBookingDataFn();
		$("#booking_id").val(id);
		$("#ApprovedBookingModal").modal("show");
		// getAttachFileDataFn(id);
		// getBookingMappingDataFn();
		// getChauffeurAndVehicleDataFn(id);

		getAttachFileDataSummaryFn(id);
		getChauffeurAndVehicleDataSummaryFn(id);
		getBookingMappingDataSummaryFn();
	});
	
	
}



var getApprovedBookingDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/booking/booking_list",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			listApprovedBookingDataFn(data);

		}
	});
	
}
var dropdownListApprovedBookingTypeFn = function(data){
	var html="";
	$.each(data,function(index,indexEntry){
		html+="<option value='"+indexEntry['vehicle_type_id']+"'>"+indexEntry['vehicle_type']+"</option>";
	});
	//alert(html);
	$("#vehicle_type_txt").html(html);

}
var getApprovedBookingTypeDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/vehicle_type/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			dropdownListApprovedBookingTypeFn(data);
			
			
		}
	});
	
}



var ApprovedBookingInsertFn = function(){
	

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

		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
			
					$("#ApprovedBookingModal").modal("hide");
					//uploadFiles(data['data']['vehicle_id']);
					getApprovedBookingDataFn();

			}
		}
	});
		
}


var ApprovedBookingUpdateFn = function(){


	var approved_status_reason="";
	if($("#assign_status_reason").val()!=""){
		approved_status_reason=""+$("#approved_status_reason_txt").val()
	}else{
		approved_status_reason="";
	}
    
	
	$.ajax({
		url:restURL+"/api/public/booking/booking_approved_status/"+$("#booking_id").val(),
		type:"patch",
		dataType:"json",
		data:{
			"approved_status":$("#approved_status_txt").val(),
			"approved_status_reason":approved_status_reason
		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			if(data.status==200){
				$("#ApprovedBookingModal").modal("hide");
				//getApprovedBookingDataFn();
				getApprovedBookingSearch();

				getBookingAssignedApprovedByuserFn();
				getBookingAssignedApprovedByAlluserFn();

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

//ChauffeurAndVehicle start



//ChauffeurAndVehicle end

var getApprovedBookingSearch = function(){
	$.ajax({
		url:restURL+"/api/public/booking/booking_approved_search",
		type:"post",
		dataType:"json",
		data:{'param_year':$("#param_year").val(),'param_month':$("#param_month").val()},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
	
			listApprovedBookingDataFn(data);
			
		}
	});
}

$(document).ready(function(){
	

	//get data
	//getApprovedBookingDataFn();
	dropdownYearListFn();
	$("#param_month").val(month_c);

	$("#btn_search").click(function(){
	 	//alert("hello jquery");
	 	getApprovedBookingSearch();
	 	return false;
	 });
	$("#btn_search").click();

	$("#btnSubmit").click(function(){
		if(($("#approved_status_txt").val()=='N' || $("#approved_status_txt").val()=='A' || $("#approved_status_txt").val()=='B') && $("#approved_status_reason_txt").val()==''){
			$(".alertFromServerTxt").html("กรุณากรอกเหตุผลด้วยครับ");
			$(".alertFromServer").show();
			return false;
		}
		ApprovedBookingUpdateFn();
	});
	$("#btnReset").click(function(){
		clearApprovedBookingDataFn();
	});

});