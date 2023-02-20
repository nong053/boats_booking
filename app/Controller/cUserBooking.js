var BookingPicturePath="";


now = new Date();
var thday = new Array ("อาทิตย์","จันทร์",
"อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์");
var thmonth = new Array ("มกราคม","กุมภาพันธ์","มีนาคม",
"เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน",
"ตุลาคม","พฤศจิกายน","ธันวาคม");




//const moment = require('moment');

const SLASH_DMY = 'DD/MM/YYYY';
const SLASH_DMYHMS = 'DD/MM/YYYY HH:mm:ss';
const SLASH_YMD = 'YYYY/MM/DD';
const SLASH_YMDHMS = 'YYYY/MM/DD HH:mm:ss';
const DASH_DMY = 'DD-MM-YYYY';
const DASH_DMYHMS = 'DD-MM-YYYY HH:mm:ss';
const DASH_YMD = 'YYYY-MM-DD';
const DASH_YMDHMS = 'YYYY-MM-DD HH:mm:ss';

console.log('sysdate ::==',moment());

console.log('sysdate ::==',moment().format(SLASH_DMY));
console.log('sysdate ::==',moment().format(SLASH_DMYHMS));

console.log('sysdate ::==',moment().format(SLASH_YMD));
console.log('sysdate ::==',moment().format(SLASH_YMDHMS));

console.log('sysdate ::==',moment().format(DASH_DMY));
console.log('sysdate ::==',moment().format(DASH_DMYHMS));

console.log('sysdate ::==',moment().format(DASH_YMD));
console.log('sysdate ::==',moment().format(DASH_YMDHMS));


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
		//alert("upload");
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

var validateBookingFn=function(){
		var validate="";
		if($("#purpose_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกวัตถุประสงค์ด้วยครับ! <br>";
	 	}
	 	if($("#from1_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกสถานนีต้นทางด้วยครับ! <br>";
	 	}
	 	if($("#to1_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกสถานนีปลายทางด้วยครับ! <br>";
	 	}


	 	if($("#number_of_people_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกจำนวนผู้โดยสารด้วยครับ! <br>";
	 	}
	 	if($("#pick_up_at_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกสถานที่ให้รถไปรับด้วยครับ! <br>";
	 	}
	 	
	 	if($("#date_from_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> ระบุวันที่เดินทางด้วยครับ! <br>";
	 	}
	 	if($("#time_from_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> ระบุเวลาเดินทางด้วยครับ! <br>";
	 	}
	 	if($("#date_to_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> ระบุวันที่กลับด้วยครับ! <br>";
	 	}
	 	if($("#time_to_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> ระบุเวลากลับด้วยครับ! <br>";
	 	}

	 	if($("#self_drive_license_flag").prop("checked")==true){

	 		if($("#self_drive_name_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกชื่อพลขับด้วยด้วยครับ! <br>";
	 		}

	 		if($("#self_drive_license_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกหมายเลขใบขับขี่กลาโหมด้วยครับ! <br>";
	 		}
	 		
	 	}

	 	// if(){

	 	// }

	 	var dateFormFormat=moment($("#date_from_txt").val()).format('DD/MM/YYYY');
	 	var dateToFormat=moment($("#date_to_txt").val()).format('DD/MM/YYYY')
	 	// alert("dateFormFormat="+dateFormFormat+", dateToFormat="+dateToFormat);
	 	// console.log(moment(""+$("#date_from_txt").val()+"").isBefore(""+$("#date_to_txt").val()+""));

	 	//moment('2010-10-20').isSame('2010-10-20')
	 	if(moment(""+$("#date_from_txt").val()+"").isBefore(""+$("#date_to_txt").val()+"") || moment(""+$("#date_from_txt").val()+"").isSame(""+$("#date_to_txt").val()+"")){
	 		//alert("ok");
	 	}else{
	 		validate+="<i class=\"fa fa-warning\"></i> ระบุวันที่เดินทางและวันที่เดินทางกลับให้ถูกต้องด้วยครับ! <br>";
	 	}
	 	
	 	
	 	

	 	
	 	
	 	return validate;
	}

var delImageFn = function(id){
	//stock/delete_file/
	$.ajax({
		url:restURL+"/api/public/booking/delete_file",
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
var delBookingFn = function(BookingID){
	
	$.ajax({
		url:restURL+"/api/public/booking/"+BookingID,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				delImageFn(BookingID);
				//getBookingDataFn();
				getBookingSearch();
				getBookingAssignedApprovedByuserFn();
				getBookingAssignedApprovedByAlluserFn();
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}

var clearBookingDataFn = function(){



	 $("#fullname_txt").val(sessionStorage.getItem('galbalTitle')+" "+sessionStorage.getItem('galbalFirstName')+" "+sessionStorage.getItem('galbalLastName'));
	 $("#position_txt").val(sessionStorage.getItem('galbalPosition'));
	
	$("#purpose_txt").val("");
	$("#from1_txt").val("");
	$("#from2_txt").val("");
	$("#from3_txt").val("");
	$("#from4_txt").val("");
	$("#to1_txt").val("");
	$("#to2_txt").val("");
	$("#to3_txt").val("");
	$("#to4_txt").val("");

	$("#number_of_people_txt").val("");
	$("#baggage_weight_txt").val("");
	$("#pick_up_at_txt").val("");
	$("#near_place_txt").val("");

	//$("#date_from_txt").val("");
	//$("#time_from_txt").val("");
	//$("#date_to_txt").val("");
	//$("#time_to_txt").val("");

	$('#date_from_txt').val(currentDate);
    $('#date_to_txt').val(currentDate);
    $('#time_from_txt').val(currentTime);
    $('#time_to_txt').val(currentTime);
    

	$("#fuel_type_txt option:first").attr('selected','selected');
	$("#fuel_lite_txt").val("");
	$("#fuel_attach_file_txt").val("");

	$("#self_drive_name_txt").val("");
	$("#self_drive_license_txt").val("");


	$("#assign_status_reason").val();

	$("#idBooking").val("");
	$("#actionBooking").val("add");

	$(".alertFromServer").hide();
	
	
}

var findOneBookingDataFn = function(BookingID){
	$.ajax({
		url:restURL+"/api/public/booking/"+BookingID,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){


			$("#fullname_txt").val(sessionStorage.getItem('galbalTitle')+" "+sessionStorage.getItem('galbalFirstName')+" "+sessionStorage.getItem('galbalLastName'));
	 		$("#position_txt").val(sessionStorage.getItem('galbalPosition'));

		
			$("#purpose_txt").val(data['purpose']);
			$("#from1_txt").val(data['from1']);
			$("#from2_txt").val(data['from2']);
			$("#from3_txt").val(data['from3']);
			$("#from4_txt").val(data['from4']);
			$("#to1_txt").val(data['to1']);
			$("#to2_txt").val(data['to2']);
			$("#to3_txt").val(data['to3']);
			$("#to4_txt").val(data['to4']);

			$("#number_of_people_txt").val(data['number_of_people']);
			$("#baggage_weight_txt").val(data['baggage_weight']);
			$("#pick_up_at_txt").val(data['pick_up_at']);
			$("#near_place_txt").val(data['near_place']);

			$("#date_from_txt").val(data['date_from']);
			$("#time_from_txt").val(data['time_from']);
			$("#date_to_txt").val(data['date_to']);
			$("#time_to_txt").val(data['time_to']);
			//$("#fuel_type_txt").val(data['fuel_type']);
			//$("#fuel_type_txt select").val(data['fuel_type']);
			// $('#fuel_type_txt').val(data['fuel_type']);
			// $("#fuel_lite_txt").val(data['fuel_lite']);

			//$("#booking_status_reason").val(data['booking_status_reason']);

			$(".alertFromServer").hide();
			if(data['booking_status_reason']!="" && data['booking_status_reason']!=null){
				
				$(".alertFromServerTxt").html("<b><i style='font-size:20px;' class='fa fa-bullhorn'></i></b> "+data['booking_status_reason']);
				$(".alertFromServer").show();
			}





			$("#actionBooking").val("edit");
			$("#idBooking").val(data['booking_id']);
			
		}
	});
};
var listBookingDataFn = function(data){
	/*listDataBookingArea*/

/*

baggage_weight: null
from1: null
from2: null
from3: null
from4: null
to1: null
to2: null
to3: null
to4: null
near_place: null
number_of_people: 22
pick_up_at: null
purpose: "เพื่อไปทอดผ้าป่าสร้างโบสถ์วัดโพธิ์ชัย2"
date_from: "0000-00-00"
date_to: "0000-00-00"
time_from: "0000-00-00"
time_to: "0000-00-00"
user_id: 2

*/
	var html="";
	$.each(data,function(index,indexEntry){
	


		

  		  // if((indexEntry['booking_status']=='Y' && indexEntry['assign_status']=='Y' && indexEntry['approved_status']=='Y') || (indexEntry['approved_status_reason']!='' || indexEntry['approved_status_reason']!=null))
  		  // {
  		  // 	html+="<tr role=\"row\" style='cursor:pointer;' id=\"addApprovedBooking-"+indexEntry['booking_id']+"\" class=\" addApprovedBooking \">";
  		  // }else{
  		  // 	html+="<tr role=\"row\" class=\"\">";
  		  // }
          html+="<tr role=\"row\" class=\"\">";
            html+="<td class=\"\" style='text-align:right; style='width:5%;'>";
             html+=""+(index+1);
            html+="</td>";
            
             html+="<td class=\"\" style='text-align:center; width:10%;'>";
             //alert(getBookingImageFn(indexEntry['booking_id']));
                if(getBookingImageFn(indexEntry['booking_id'])!=''){
                	//alert(0);
                	html+="<img  class=\"img-circle\" width=\"50\" src=\""+restURL+"/api/public/"+getBookingImageFn(indexEntry['booking_id'])+"\" alt=\"\"><br>";
                }else{
                	//alert(1);
                	html+=" <i style='font-size:33px; color:#ccc;' class=\"fa fa-automobile\"></i>";
                }
             	
           	 
           	 html+=" </td>";
           	 html+="<td class=\"\" style='text-align:left; width:20%; '>";
           	  html+="จาก <b>"+indexEntry['date_from']+"";
              html+=" "+indexEntry['time_from']+"</b><br>";
              html+="ถึง <b>"+indexEntry['date_to']+"";
              html+=" "+indexEntry['time_to']+"</b><br>";
               

           html+=" </td>";
            html+="<td style='width:50%; '>";
            html+=""+indexEntry['purpose']+"<br>";
          html+="</td> ";
            html+="<td style='text-align:right; width:20%;'>";
            

            
            	
            	html+="<span  style='padding:7px;' color:white;  class='bg-blue btn-sm'><i class='fa fa-clock-o'></i> Booking (Draft)</span>";
            	html+="&nbsp; <button type=\"button\" id=\"edit-"+indexEntry['booking_id']+"\" class=\"edit btn btn-warning btn-sm\"><i class=\"fa fa-fw fa-pencil\"></i></button>";
              	html+="&nbsp;<button type=\"button\" id=\"del-"+indexEntry['booking_id']+"\" class=\"del btn btn-danger btn-sm\"><i class=\"fa fa-trash-o\"></i></button>";
            
              
              
            html+="</td>";
          html+="</tr>";


			
	});
	$("#listDataBookingArea").html(html);
	$('#bookingDataList').DataTable();
	
	
	//maanage
	$(".edit").click(function(){
		
		var id=this.id.split("-");
		id=id[1];
		//alert(id);
		$("#BookingModal").modal("show");
		findOneBookingDataFn(id);
		return false
		
	});
	
	$(".del").click(function(){
		var id=this.id.split("-");
		id=id[1];
		if(confirm("Do you want to Delete this data.")){
			delBookingFn(id);	
		}
		return false
	});

	 $(".addApprovedBooking").click(function(){
		var id=this.id.split("-");
		id=id[1];
		
		$("#booking_id").val(id);
		$(".alertDangerFromServer").hide();
		$("#ApprovedBookingModal").modal("show");
	
		getAttachFileDataSummaryFn(id);
		getChauffeurAndVehicleDataSummaryFn(id);
		getBookingMappingDataSummaryFn();
		return false;
	});
	
  
	
}



var getBookingDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/booking/booking_list",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			listBookingDataFn(data);
		}
	});
	
}
var dropdownListBookingTypeFn = function(data){
	var html="";
	$.each(data,function(index,indexEntry){
		html+="<option value='"+indexEntry['vehicle_type_id']+"'>"+indexEntry['vehicle_type']+"</option>";
	});
	//alert(html);
	$("#vehicle_type_txt").html(html);

}


var getBookingTypeDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/vehicle_type/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			dropdownListBookingTypeFn(data);
			
			
		}
	});
	
}



var BookingInsertFn = function(paramStep){
	
//alert("BookingInsertFn");
/*
as_the_name: "วัดโพธิ์ชัย"
at_the_place: "วัดโพธิ์ชัยบ้านดงหมู อำเภอเขาวง จังหวัดกาฬสินธ์"
baggage_weight: null
from1: null
from2: null
from3: null
from4: null
to1: null
to2: null
to3: null
to4: null
near_place: null
number_of_people: 22
pick_up_at: null
purpose: "เพื่อไปทอดผ้าป่าสร้างโบสถ์วัดโพธิ์ชัย2"
date_from: "0000-00-00"
date_to: "0000-00-00"
time_from: "0000-00-00"
time_to: "0000-00-00"
user_id: 2




*/
	var activeTxt="";
	var self_drive_flag="";
	var booking_status="";
	

	if($("#active_txt").prop("checked")==true){
		activeTxt="1";
	}else{
		activeTxt="0";
	}

	if($("#self_drive_license_flag").prop("checked")==true){
		self_drive_flag="1";
	}else{
		self_drive_flag="0";
	}

	
	if(paramStep=='SendToAssigner'){
		booking_status='Y';
	}else{
		booking_status='N';
	}
	var assign_status_reason="";
	if($("#assign_status_reason").val()!=""){
		assign_status_reason="<b>ข้อความจากผู้จองรถ</b> "+$("#assign_status_reason").val()
	}else{
		assign_status_reason="";
	}
	//alert(activeTxt);
	$.ajax({
		url:restURL+"/api/public/booking",
		type:"post",
		dataType:"json",
		data:{


			// "as_the_name": $("#number_of_seats_txt").val(),
			// "fuel_type": $("#fuel_type_txt").val(),
			// "fuel_lite": $("#fuel_lite_txt").val(),
			"baggage_weight": $("#baggage_weight_txt").val(),
			"from1": $("#from1_txt").val(),
			"from2": $("#from2_txt").val(),
			"from3": $("#from3_txt").val(),
			"from4": $("#from4_txt").val(),
			"to1": $("#to1_txt").val(),
			"to2": $("#to2_txt").val(),
			"to3": $("#to3_txt").val(),
			"to4": $("#to4_txt").val(),
			"near_place": $("#near_place_txt").val(),
			"number_of_people": $("#number_of_people_txt").val(),
			"pick_up_at": $("#pick_up_at_txt").val(),
			"purpose": $("#purpose_txt").val(),
			"date_from": $("#date_from_txt").val(),
			"date_to": $("#date_to_txt").val(),
			"time_from": $("#time_from_txt").val(),
			"time_to": $("#time_to_txt").val(),

			"self_drive_name": $("#self_drive_name_txt").val(),
			"self_drive_license": $("#self_drive_license_txt").val(),
			"self_drive_license_flag":self_drive_flag,
			

			"user_id": sessionStorage.getItem('galbalEmpId'),
			"booking_status":booking_status,
			"assign_status_reason":assign_status_reason


		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
			
					// $("#BookingModal").modal("hide");
					// uploadFiles(data['data']['booking_id']);
					// getBookingSearch();
					$(".alertSuccessFromServersTxt").html("<i class='fa fa-check-square-o'></i> จองรถเรียบร้อย");
					$(".alertFromServer").hide();
					$(".alertSuccessFromServer").show();
					clearBookingDataFn();

					getBookingAssignedApprovedByuserFn();
					getBookingAssignedApprovedByAlluserFn();


			}else if(data.status==400){
				//$(".alert-error").html(data);
			}
		}
	});
		
}

var BookingUpdateFn = function(paramStep){

	var booking_status='';
	var self_drive_flag="";
	if(paramStep=='SendToAssigner'){
		booking_status='Y';
	}else{
		booking_status='N';
	}


	if($("#self_drive_license_flag").prop("checked")==true){
		self_drive_flag="1";
	}else{
		self_drive_flag="0";
	}


	var assign_status_reason="";
	if($("#assign_status_reason").val()!=""){
		assign_status_reason="<b>ข้อความจากผู้จองรถ</b> "+$("#assign_status_reason").val()
	}else{
		assign_status_reason="";
	}
	
	$.ajax({
		url:restURL+"/api/public/booking/"+$("#idBooking").val(),
		type:"patch",
		dataType:"json",
		data:{

			

			"fuel_type": $("#fuel_type_txt").val(),
			"fuel_lite": $("#fuel_lite_txt").val(),
			"baggage_weight": $("#baggage_weight_txt").val(),
			"from1": $("#from1_txt").val(),
			"from2": $("#from2_txt").val(),
			"from3": $("#from3_txt").val(),
			"from4": $("#from4_txt").val(),
			"to1": $("#to1_txt").val(),
			"to2": $("#to2_txt").val(),
			"to3": $("#to3_txt").val(),
			"to4": $("#to4_txt").val(),
			"near_place": $("#near_place_txt").val(),
			"number_of_people": $("#number_of_people_txt").val(),
			"pick_up_at": $("#pick_up_at_txt").val(),
			"purpose": $("#purpose_txt").val(),
			"date_from": $("#date_from_txt").val(),
			"date_to": $("#date_to_txt").val(),
			"time_from": $("#time_from_txt").val(),
			"time_to": $("#time_to_txt").val(),

			"self_drive_name": $("#self_drive_name_txt").val(),
			"self_drive_license": $("#self_drive_license_txt").val(),
			"self_drive_license_flag": self_drive_flag,
			
			"booking_status":booking_status,
			"assign_status_reason":assign_status_reason
	

		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){

				if($("#fuel_attach_file_txt").val()){

					delImageFn($("#idBooking").val());
					uploadFiles($("#idBooking").val())

				}

				$("#BookingModal").modal("hide");
				//getBookingDataFn();
				getBookingSearch();
				
				getBookingAssignedApprovedByuserFn();
				getBookingAssignedApprovedByAlluserFn();
			}
		}
	});
		
}
var getBookingSearch = function(){

	//booking_search_by_user
	var url_list="";
	if(sessionStorage.getItem('galbalRole')==1){
		 url_list=restURL+"/api/public/booking/booking_search_by_user";
	}else{
		 url_list=restURL+"/api/public/booking/booking_search";
	}
	

	$.ajax({
		url:url_list,
		type:"post",
		dataType:"json",
		data:{'param_year':$("#param_year").val(),'param_month':$("#param_month").val()},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			listBookingDataFn(data);
			
			
		}
	});
}

$(document).ready(function(){
	

	//getConfigDataFn();
	//alert(BookingPicturePath);

		//alert(now.getDate());


	 $("#self_drive_license_flag").click(function(){
	 	//alert("helo juery");
	 	if($(this).prop( "checked" ) ==true){
	 		console.log("ok check");
	 		$("#display_self_drive_check").show();
	 	}else{
	 		console.log("not check");
	 		$("#display_self_drive_check").hide();

	 		$("#self_drive_name_txt").val("");
			$("#self_drive_license_txt").val("");
	 	}
	 });	
	 $("#currentDateTxt").html("วัน" + thday[now.getDay()]+ "ที่ "+ now.getDate()+ " " +
thmonth[now.getMonth()]+ " " + (now.getFullYear()+543));

	 


	$(".fullname_txt").val(sessionStorage.getItem('galbalTitle')+" "+sessionStorage.getItem('galbalFirstName')+" "+sessionStorage.getItem('galbalLastName'));
	$(".position_txt").val(sessionStorage.getItem('galbalPosition'));
	$(".fullname_txt").html(sessionStorage.getItem('galbalTitle')+" "+sessionStorage.getItem('galbalFirstName')+" "+sessionStorage.getItem('galbalLastName'));
	$(".position_txt").html(sessionStorage.getItem('galbalPosition'));


	checkSessionFn();
	$("#logOut").click(function(){
		
		sessionStorage.removeItem('galbalToken');
		sessionStorage.removeItem('galbalUsername');
		//sessionStorage.clear();


		location.reload();
	});
	
	$('#date_from_txt').val(currentDate);
    $('#date_to_txt').val(currentDate);

	$('#date_from_txt').datepicker({
      autoclose: true,
      format: 'yyyy-mm-dd',
    })
    

	
    $('#date_to_txt').datepicker({
      autoclose: true,
      format: 'yyyy-mm-dd',
    })
    
    

     //Timepicker
    $('.timepicker').timepicker({
      showInputs: false
    })
    dropdownYearListFn();
	$("#param_month").val(month_c);


	 $("#btn_search").click(function(){
	 	//alert("hello jquery");
	 	getBookingSearch();
	 	return false;
	 });

	 $("#btn_search").click();
	 

	$("#addBooking").click(function(){
		clearBookingDataFn();

		$("#BookingModal").modal("show");
	});
	 //get data
	 //getBookingDataFn();
	 //getBookingTypeDataFn();
	 
	 
	 $("#btnCancel").click(function(){
		clearBookingDataFn();
	});

	$("#btnSubmit").click(function(){
		
	
		//alert($("#actionBooking").val());
		//alert(validateBookingFn());
		if(validateBookingFn()!=""){

			//alert(validateBookingFn());
			$(".alertFromServerTxt").html(validateBookingFn());
			$(".alertFromServer").show();
			return false;
		}
		if($("#actionBooking").val()=="add"){
			

			BookingInsertFn();


		}else{
			BookingUpdateFn();
		}
		
		
		
	
	});
	$("#btnSubmitAndSendToAssigner").click(function(){
		if(validateBookingFn()!=""){
			$(".alertFromServerTxt").html(validateBookingFn());
			$(".alertFromServer").show();
			return false;
		}
		if($("#actionBooking").val()=="add"){
			BookingInsertFn(paramStep='SendToAssigner');
		}else{
			BookingUpdateFn(paramStep='SendToAssigner');
		}
	});
	$("#btnReset").click(function(){
		clearBookingDataFn();
		$("#btnImageReset").click();
	});

	 //Timepicker
    $('.timepicker').timepicker({
      showInputs: false
    })




   


	
	
	
	
	
	
	
	
});