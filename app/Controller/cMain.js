var galbalToken="";
$( document ).ajaxStart(function() {
	$("body").mLoading();
});
$( document ).ajaxStop(function() {
	$("body").mLoading('hide');
});



var getBookingAssignedApprovedByuserFn = function(){
	$.ajax({
		url:restURL+"/api/public/booking/booking_sum_booking_assigned_approved_by_user",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			console.log(data);
			//booking_by_user
			//assigned_by_user
			//booking_by_user
			//alert(data[0]['booking_by_user']);
			$(".booking_by_user").html(data[0]['booking_by_user']);
			// $(".assigned_by_user").html(data[0]['assigned_by_user']);
			// $(".approved_by_user").html(data[0]['approved_by_user']);
			// $(".not_approved_by_user").html(data[0]['not_approved_by_user']);

			
		}
	});
};

var getBookingAssignedApprovedByAlluserFn = function(){
	$.ajax({
		url:restURL+"/api/public/booking/booking_sum_booking_assigned_approved_by_all_user",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			console.log(data);
			//booking_all_user
			//assigned_all_user
			//booking_all_user

			$(".not_approved_all_user").html(data[0]['not_approved_all_user']);
			$(".booking_all_user").html(data[0]['booking_all_user']);
			$(".assigned_all_user").html(data[0]['assigned_all_user']);
			$(".approved_all_user").html(data[0]['approved_all_user']);
			$(".wait_for_assign_by_user").html(data[0]['wait_for_assign_by_user']);


			$(".total_chauffeur").html(data[0]['total_chauffeur']);
			$(".total_vehicle").html(data[0]['total_vehicle']);

			var chauffeur_use=parseInt(data[0]['total_chauffeur'])-parseInt(data[0]['chauffeur_use']);
			var vehicle_use=parseInt(data[0]['total_vehicle'])-parseInt(data[0]['vehicle_use']);
			
			$(".chauffeur_use").html(chauffeur_use);
			$(".vehicle_use").html(vehicle_use);

			
		}
	});
};


var listAttachFileDataSummaryFn = function(data){

	//list_attach_file_area
	var html="";
	$.each(data,function(index,indexEntry){
 			// html+="<tr>";
    //           html+="<td>1</td>";
    //           html+="<td>ไฟล์แนบ"+(index+1)+"</td>";
    //           html+="<td><a href='../public/"+indexEntry['doc_path']+"'><i style='cursor:pointer;' class=\"fa fa-download\"></i></a></td>";
    //         html+="</tr>";
    		html+="<tr>";
              html+="<td>"+(index+1)+"</td>";

			  html+="<td>"+indexEntry['vehicle_type']+"("+indexEntry['vehicle_number']+")</td>";              
              html+="<td>"+indexEntry['fuel_type']+"</td>";
              html+="<td style='text-align:right;'>"+indexEntry['fuel_amount']+"</td>";
             // html+="<td>ไฟล์แนบ"+(index+1)+"</td>";
              html+="<td style='text-align:right;'>";
              if(indexEntry['doc_path']!=undefined){
              html+="<a class='btn btn-primary btn-sm'  target=\"_blank\" href='../api/public/"+indexEntry['doc_path']+"'><i style='cursor:pointer;' class=\"fa fa-download\"></i></a>";
              }else{
              html+="<td></td>";
              }	
             // html+="<button type=\"button\" id=\"delcv-"+indexEntry['result_doc_id']+"\" class=\"delcv btn btn-danger btn-sm\"><i class=\"fa fa-trash-o\"></i></button>";
            html+="</td></tr>";
	});
	$("#list_attach_file_area").html(html);
}
var getAttachFileDataSummaryFn = function(booking_id){
	//upload_files_list
	$.ajax({
		url:restURL+"/api/public/booking/upload_file/"+booking_id,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			
			listAttachFileDataSummaryFn(data);

		}
	});
}

var mappingBookingDataSummaryFn = function(data){
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

	//alert(data['FIRST_NAME']+" "+data['LAST_NAME']);

	$("#fullname_txt_summary").html(data['FIRST_NAME']+" "+data['LAST_NAME']);
	$("#position_txt_summary").html(data['POSITION']);
	$("#purpose_txt_summary").html(data['purpose']);
	$("#from_txt_summary").html(data['from1']);
	$("#number_of_people_txt_summary").html(data['number_of_people']);
	$("#near_place_txt_summary").html(data['near_place']);
	$("#date_from_txt_summary").html(data['date_from']);
	$("#date_to_txt_summary").html(data['date_to']);
	$("#fuel_type_txt_summary").html(data['fuel_type']);

	$("#to_txt_summary").html(data['to1']);
	$("#baggage_weight_txt_summary").html(data['baggage_weight']);
	$("#at_the_place_txt_summary").html(data['at_the_place']);
	$("#time_from_txt_summary").html(data['time_from']);
	// $("#time_to_txt").html(data['time_to']);
	// $("#fuel_lite_txt").html(data['fuel_lite']);

	// $("#approved_status_txt select").val(data['approved_status']);
	// $("#approved_status_reason_txt").val(data['approved_status_reason']);
	$("#createBookingDate").html(data['created_date']);
	$("#assign_status_reason").val(data['assign_status_reason']);


	// if(data['approved_status_reason']!='' || data['approved_status_reason']==null){
	// 	$(".alertDangerFromServerTxt").html("เหตุผลที่ไม่อนุมัติการจองรถ: "+data['approved_status_reason']);
	// 	$(".alertDangerFromServer").show();
		
	// }

	$(".alertFromServer").hide();
	if(data['approved_status_reason']!="" && data['approved_status_reason']!=null){
		
		$(".alertFromServerTxt").html("<b><i style='font-size:20px;' class='fa fa-bullhorn'></i></b> ภภ"+data['approved_status_reason']);
		$(".alertFromServer").show();
	}

}


var getBookingMappingDataSummaryFn = function(){

	$.ajax({
		url:restURL+"/api/public/booking/booking_confrim_detail/"+$("#booking_id").val(),
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			setTimeout(function(){

				mappingBookingDataSummaryFn(data[0]);
				//alert('ok');
				console.log(data[0]);
			},1000);
			
		
		}
	});
	
}
var listChauffeurAndVehicleDataSummaryFn = function(data){
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
	          // html+="<td>"+indexEntry['operator_position']+"</td>";
	         // html+="<td style='text-align:right;'>";
	           // html+="<button type=\"button\" id=\"editcv-"+indexEntry['cv_id']+"\" class=\"edit btn btn-warning btn-sm\"><i class=\"fa fa-fw fa-pencil\"></i></button>";
	           // html+="<button type=\"button\" id=\"delcv-"+indexEntry['cv_id']+"-"+indexEntry['vehicle_id']+"\" class=\"delcv btn btn-danger btn-sm\"><i class=\"fa fa-trash-o\"></i></button>";
	          //html+="</td>";
	        html+="</tr>";

     
	});

	$("#listChauffeurAndVehicleArea").html(html);
	
	
	
	
  
	
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

var getChauffeurAndVehicleDataSummaryFn = function(booking_id){
	$.ajax({
		url:restURL+"/api/public/chauffeur_and_vehicle/index/"+booking_id,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			listChauffeurAndVehicleDataSummaryFn(data);

		}
	});
}





// Return today's date and time
function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}
var currentTime = new Date();

// returns the month (from 0 to 11)
var month_c = currentTime.getMonth() + 1
month_c=minTwoDigits(month_c);

// returns the day of the month (from 1 to 31)
var day_c = currentTime.getDate();

// returns the year (four digits)
var year_c = currentTime.getFullYear();

var currentDate=year_c+"-"+month_c+"-"+day_c;
var firstDate=year_c+"-"+month_c+"-"+"01";
var currentTime = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();

var dropdownYearListFn = function(data){
	
	current_year=year_c;
	var html="";
	for(var i=(current_year+5); i>(current_year-20);i--){
		html+="<option value='"+i+"'>"+i+"</option>";
	}
	$("#param_year").html(html);
	$("#param_year").val(year_c);
	

}

var getAmountNewRequestFn = function(){
	//http://localhost/ssi/api/public/borrow_tools_notice/list_user_borrow_notice
	$.ajax({
		url:restURL+"/api/public/borrow_tools_notice/list_user_borrow_notice",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			
			var amoutNewRequest=0;
			$.each(data,function(index,indexEntry){
				if(indexEntry['wait_status']!=0){
				amoutNewRequest+=1;
				//console.log(indexEntry['wait_status']);
				}
			});
			//alert(amoutNewRequest);
			if(amoutNewRequest>0){
				$("#amountNewRequest").show();
				$("#amountNewRequest").html(amoutNewRequest);

			}else{
				$("#amountNewRequest").hide();
			}
			
		}
	});
}
var getBookingImageFn = function(booking_id){
	var image_doc_path="";
	$.ajax({
		url:restURL+"/api/public/booking/list_vehicle_image",
		type:"post",
		dataType:"json",
		data:{booking_id},
		async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log("=================");
			//console.log(data[0]);
			if(data[0]!=undefined){
				image_doc_path=data[0].doc_path;
			}else{
				image_doc_path="";
			}
			
		}

	});
	return image_doc_path;
}
var checkSessionFn = function(){

	var token= sessionStorage.getItem('galbalToken');
	//console.log(token);
	
	$.ajax({
		url:restURL+"/api/public/session",
		type:"get",
		dataType:"json",
		 headers:{Authorization:"Bearer "+token},
		 cache: false,
		 async:true,
		success:function(data){
		
			if(data.status==200){
				
				$("#wrapper").show();
				return true;
				
			}else{
				console.log(data.status);
				window.location = "../";
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        window.location = "../";
      }

	});
	
};
var getPageFn = function(page){
	$.ajax({
		url:page,
		type:"get",
		success:function(data){
			$("#contentArea").html(data);
			
		}
	});
};


// function linkFn(menu_link){

// 	$.ajax({
// 		url:menu_link,
// 		type:"get",
// 		dataType:"html",
// 		async:false,
// 		success:function(data){
// 			//alert(data);
// 			$("#contentArea").html(data);
// 		}
// 	});
// }

//$(document).ready(function(){


	// $("#home_main_menu").click(function(){
	// 	linkFn("./home.html");
	// });

	// $("#user_main_menu").click(function(){
	// 	linkFn("./user-management.html");
	// });
	// $("#car_main_menu").click(function(){
	// 	linkFn("./car-management.html");
	// });
	// $("#car_type_main_menu").click(function(){
	
	// 	linkFn("./car-type-management.html");
	// });

	// $("#chauffeur_main_menu").click(function(){
	
	// 	linkFn("./chauffeur-management.html");
	// });
	// $("#booking_main_menu").click(function(){
	
	// 	linkFn("./booking-management.html");
	// });

	// $("#confirm_booking_main_menu").click(function(){
	
	// 	linkFn("./confirm-booking-management.html");
	// });
	// $("#approve_main_menu").click(function(){
	
	// 	linkFn("./approve-management.html");
	// });

	// $("#chauffeur_report_main_menu").click(function(){
	
	// 	linkFn("./chauffeur-report.html");
	// });
	// $("#use_car_report_main_menu").click(function(){
	
	// 	linkFn("./use-car-report.html");
	// });
	// $("#detail_use_car_report_main_menu").click(function(){
	
	// 	linkFn("./booking-boat-report.html");
	// });


	// $("#aboutus_main_menu").click(function(){
	
	// 	linkFn("./about-us.html");
	// });

	
/*route single page*/

var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
        templateUrl : "home.html"
    })
    .when("/pages/:url", {
        templateUrl : "home1.html",
        controller:"pageController"
    	
    })
    .otherwise({
    	templateUrl : "home1.html"
    });
});



app.controller("pageController",function($scope, $route, $routeParams){

	$route.current.templateUrl = $routeParams.url + ".html";
	  $.get($route.current.templateUrl, function (data){
	       $("#includePage").html(data);

	          //alert($routeParams.url);
			  sessionStorage.setItem("page",$routeParams.url);

	          $(".page_top").html('');
	          $(".mainMenu").removeClass('active');
			  if($routeParams.url=="home"){
			  	$("#home_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-ship"></i> จองเรือ');
			  	getBookingAssignedApprovedByAlluserFn();

			  }else if($routeParams.url=="user-management"){
			  	$("#user_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-users"></i> จัดการผู้ใช้งาน');
			  }else if($routeParams.url=="car-type-management"){
			  	$("#car_type_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-ship"></i> จัดการประเภทเรือ');
			  }else if($routeParams.url=="car-management"){
			  	$("#boat_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-ship"></i> จัดการข้อมูลเรือ');
			  }else if($routeParams.url=="chauffeur-management"){
			  	$("#chauffeur_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-user"></i> จัดการข้อมูลคนขับ');
			  }else if($routeParams.url=="booking-management"){
			  	$("#booking_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-ship"></i> จองเรือ');
			  }else if($routeParams.url=="confirm-booking-management"){
			  	$("#confirm_booking_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-edit"></i> รอมอบหมายเรือและคนขับ');
			  }else if($routeParams.url=="approve-management"){
			  	$("#approve_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-edit"></i> รออนุมัติการจอง');
			  }else if($routeParams.url=="chauffeur-report"){
			  	$("#chauffeur_report_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-book"></i> รายงาน <small>ข้อมูลคนขับ</small>');
			  }else if($routeParams.url=="use-car-report"){
			  	$("#use_car_report_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-book"></i> รายงาน <small>ข้อมูลการจองเรือ</small>');
			  }else if($routeParams.url=="booking-boat-report"){
			  	$("#detail_use_car_report_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-book"></i> รายงาน <small>ข้อมูลรายละเอียดการจองเรือ</small>');
			  }else if($routeParams.url=="about-us"){
			  	$("#aboutus_main_menu").parent().addClass('active');
			  	$(".page_top").html('<i class="fa fa-user"></i> ทีมผู้พัฒนา');
			  }
			  else if($routeParams.url=="around-management"){
				$("#around_main_menu").parent().addClass('active');
				$(".page_top").html('<i class="fa fa-ship"></i> รอบเรือ');
			}




	  });

});



$(".mainMenu").click(function(){
	$(".mainMenu").removeClass("active");
	$(this).addClass("active");
	$(".ui-datepicker").hide();
});
$(".menuDisplay").hide();
//alert('role'+sessionStorage.getItem('galbalRole'));

if(sessionStorage.getItem('galbalRole')=='4'){//admin
	//userMenu adminMenu AssignerMenu approversMenu
	$(".adminMenu").show();
	// alert(4);
}
if(sessionStorage.getItem('galbalRole')=='3'){//ผู้บังคับบัญชา
	// $(".adminMenu").hide();
	// $(".AssignerMenu").hide();
	// $(".userMenu").hide();
	$(".approversMenu").show();
	// alert(3);

}if(sessionStorage.getItem('galbalRole')=='2'){// ธรุการ
	
	$(".AssignerMenu").show();
	
	// alert(2);

}if(sessionStorage.getItem('galbalRole')=='1'){// ผู้ใช้ทั่วไป
	
	$(".userMenu").show();
	//alert(1);

}
//alert(sessionStorage.getItem('galbalStatus'));

/*route single page*/
getAmountNewRequestFn();



setTimeout(function(){
	$(".titleFullname").html(sessionStorage.getItem('galbalTitle')+" "+sessionStorage.getItem('galbalFirstName')+" "+sessionStorage.getItem('galbalLastName'));
	$("#position_top").html("เบอร์โทร. "+sessionStorage.getItem('galbalPosition'));

	var role_txt="";
	if(sessionStorage.getItem('galbalRole')==4){
		role_txt="Admin";
	}else if(sessionStorage.getItem('galbalRole')==3){
		role_txt="Approvers";
	}else if(sessionStorage.getItem('galbalRole')==2){
		role_txt="Assigner";
	}else if(sessionStorage.getItem('galbalRole')==1){
		role_txt="user";
	}
	$("#role_top").html("สิทธิ์ " +role_txt);


},1000);

//});

$(document).ready(function(){
//getBookingAssignedApprovedByuserFn();
//getBookingAssignedApprovedByAlluserFn();

	$(".sidebar-toggle").click(function(){
		
		setTimeout(function(){
			window.location="#/pages/"+sessionStorage.getItem("page");
		},500);
		
		
	});


});

