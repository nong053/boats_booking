var typePassengerFn = function(type_passenger){
	var type_passenger_data="";
		  if(type_passenger=="general_price"){
			type_passenger_data="ราคาปกติ";
		  }else if(type_passenger=="special_price"){
			type_passenger_data="ราคาคนเกาะ";
		  }else if(type_passenger=="babies_price"){
			type_passenger_data="ราคาเด็ก";
		}else if(type_passenger=="free_price"){
			type_passenger_data="ฟรี";
		}
		return type_passenger_data;
}


var bindingDataForPrint = function(BookingID){
  
	// alert(BookingID);
	// clearBookingDataFn();
	  
	
   
	   $.ajax({
		   url:restURL+"/api/public/booking/"+BookingID,
		   type:"get",
		   dataType:"json",
	   async:false,
		   headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		   success:function(data){
		 
			if(data!=""){
				var data=data[0];
		
				$(".ticket_vehicle_number_display").html(data['ticket_vehicle_number']);
				$(".fullname_display").html(data['fullname']);
				$(".tel_display").html(data['tel']);
				$(".stay_display").html(data['stay']);
				$(".type_passenger_display").html(typePassengerFn(data['type_passenger']));
				$(".note_display").html(data['note']);
		
		
				$(".boat_go_display").html(data['boat_number_go']);
				$(".date_go_display").html(data['date_go']);
				$(".around_boat_go_display").html(data['around_name_go']+"("+data['around_name_go_time']+")");
				$(".seat_go_display").html(data['seat_go']);
		
		   
				if(data['go_back_booking_flag']==1){
		
				  $(".boat_back_display").html(data['boat_number_back']);
				  $(".date_back_display").html(data['date_back']);
				  $(".around_boat_back_display").html(data['around_name_back']+"("+data['around_name_back_time']+")");
				  $(".seat_back_display").html(data['seat_back']);
				  $(".booking_back_display").show();
		
				}else{
				  $(".booking_go_display").removeClass("col-md-6").addClass('col-md-12');
				  $(".booking_back_display").hide();
				}


				printDiv();
				
			  }
		}
	   });
   };

   

var listReportDataFn = function(data){
	var html="";

	$.each(data,function(index,indexEntry){
		// if(sessionStorage.getItem('galbalRole')==3 || sessionStorage.getItem('galbalRole')==4){
		// 	html+="<tr style='cursor:pointer;' class='adminManagement' id='adminManagement-"+indexEntry['booking_id']+"'>";
		// }else{
			html+="<tr>";
		// }
		 
		 html+="<td style='text-align:right'>"+indexEntry['ticket_vehicle_number']+"</td>";

		  html+="<td >";
		//   if(getBookingImageFn(indexEntry['booking_id'])!=''){
            	
        //     	html+="<img  class=\"img-circle\" width=\"50\" src=\""+restURL+"/api/public/"+getBookingImageFn(indexEntry['booking_id'])+"\" alt=\"\"><br>";
        //     }else{
            	
            	html+=" <i style='font-size:33px; color:#ccc;' class=\"fa fa-ship\"></i>";
            // }
		  html+="</td >";
          html+="<td >";
           
			
			if(indexEntry['go_back_booking_flag']==1){

				html+="เรือ"+indexEntry['boat_go']+"<br>"+indexEntry['around_boat_go']+"("+indexEntry['around_boat_go_time']+")"+"<br>ที่นั่ง"+indexEntry['seat_go']+"<br>วันที่ "+indexEntry['date_go']+"";

				html+="<hr> ";
				html+="เรือ"+indexEntry['boat_back']+"<br>"+indexEntry['around_boat_back']+"("+indexEntry['around_boat_back_time']+")<br>ที่นั่ง"+indexEntry['seat_back']+"<br>วันที่ "+indexEntry['date_back']+"";

			}else{
				html+="เรือ"+indexEntry['boat_go']+"<br>"+indexEntry['around_boat_go']+"("+indexEntry['around_boat_go_time']+")<br>ที่นั่ง"+indexEntry['seat_go']+"<br>วันที่ "+indexEntry['date_go']+"";
			}
          html+="</td>";
         
          html+="<td style='text-align:left'>"+indexEntry['fullname']+"<br>"+indexEntry['stay']+"<br>"+indexEntry['tel']+"</td>";
          // html+="<td style='text-align:right'>"+indexEntry['number_of_people']+"</td>";
          // html+="<td >"+indexEntry['title']+" "+indexEntry['FIRST_NAME']+""+indexEntry['LAST_NAME']+"</td>";
         
		  html+="<td style='text-align:center'>";
		 
		  html+=" "+typePassengerFn(indexEntry['type_passenger']);+"";
		
		  html+="</td>";
		  html+="<td style='text-align:center'>";
		 
		  html+=" "+indexEntry['booking_price_total']+"";
		
		  html+="</td>";

		  html+="<td style='text-align:center'>";
		  //html+="<i class=\"fa fa-fw fa-exclamation-circle\"></i>";
		   html+="<button style=\"display: inline-block;\" type=\"button\" id=\"btnPrint-"+indexEntry['booking_id']+"\" class=\"btn btn-success btnPrint\"><i class=\"fa fa-fw fa-print\"></i> พิมพ์</button>";
			/*
           	    if(indexEntry['booking_status']=='Y' && indexEntry['assign_status']=='Y' && indexEntry['approved_status']=='P' ){
	            	html+="<span  style='padding:7px; color:white; background:#00c0ef '  class='btn-sm '><i class='fa fa-clone'></i> Assigned</span>";
	        	}else if(indexEntry['approved_status']=='N'){
	        		html+="<span  style='padding:7px; color:white;'  class='bg-red btn-sm'><i class='fa fa-thumbs-o-down'></i> Not Approved</span>";
	        	}else if(indexEntry['booking_status']=='Y' && indexEntry['assign_status']=='Y' && indexEntry['approved_status']=='Y'){
	        		html+="<span  style='padding:7px; color:white;'  class='bg-green btn-sm'><i class='fa fa-check-square'></i> Approved</span>";
	        	}else if(indexEntry['booking_status']=='N' && indexEntry['assign_status']=='N' && indexEntry['approved_status']=='P'){
	        		html+="<span  style='padding:7px; color:white;'  class='bg-blue btn-sm'><i class='fa fa-circle'></i> Booking (Draft)</span>";
	        	}
	        	else if(indexEntry['booking_status']=='Y' && indexEntry['assign_status']=='N' && indexEntry['approved_status']=='P'){
	        		html+="<span  style='padding:7px; color:white;'  class='bg-yellow btn-sm'><i class='fa fa-circle'></i> Wait for assignment</span>";
	        	}
				*/
           html+="</td>";
         

        html+="</tr>";
	});
	$("#detailUseCarReportList").html(html);
	$('#detailUseCarReportTable').DataTable();

	$(".btnPrint").click(function(){
		var id = this.id;
		id=id.split("-");;
		id=id[1];
		bindingDataForPrint(id);
		
	});



	if($(sessionStorage.getItem('galbalRole')==4 || sessionStorage.getItem('galbalRole')==3)){
		

		$(".adminManagement").click(function(){
			var booking_id=this.id.split("-");
			booking_id=booking_id[1];
			
			$("#booking_id").val(booking_id);
			$(".alertDangerFromServer").hide();
			$("#AdminManagementModal").modal("show");
		
			getAttachFileDataSummaryFn(booking_id);
			getChauffeurAndVehicleDataSummaryFn(booking_id);
			getBookingMappingDataSummaryFn();
			return false;
		});
	}else{

		$("#adminManagement").remove();
		
	}




}

var getDataReportFn = function(){
	$.ajax({
		url:restURL+"/api/public/booking/booking_vehicle_report",
		type:"get",
		dataType:"json",
		data:{
			"date_from":$("#fromDatePicker").val(),"date_to":$("#toDatePicker").val()
			
		 },
		 headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		 cache: false,
		 async:true,
		success:function(data){
		
		$("#startDateTxt").html($("#fromDatePicker").val());
		$("#endDateTxt").html($("#toDatePicker").val());
		listReportDataFn(data);
		
      }

	});
}

var AdminStatusUpdateFn = function(){

	$.ajax({
		url:restURL+"/api/public/booking/booking_approved_status/"+$("#booking_id").val(),
		type:"patch",
		dataType:"json",
		data:{
			"approved_status":$("#approved_status_txt").val(),
			"approved_status_reason":$("#approved_status_reason_txt").val()
		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			if(data.status==200){
				$("#AdminManagementModal").modal("hide");;
				getDataReportFn();
				getBookingAssignedApprovedByuserFn();
				getBookingAssignedApprovedByAlluserFn();

			}
		}
	});
		
}


function printDiv() 
    {

      var divToPrint=document.getElementById('DivIdToPrint');

      var newWin=window.open('','Print-Window');

      newWin.document.open();

      newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

      newWin.document.close();

      setTimeout(function(){newWin.close();},10);

    }

$(document).ready(function(){


	
	
	$('#fromDatePicker').val(firstDate);
	$('#fromDatePicker').datepicker({
      autoclose: true,
      format: 'yyyy-mm-dd',
    })
	$('#toDatePicker').val(currentDate);
    $('#toDatePicker').datepicker({
      autoclose: true,
      format: 'yyyy-mm-dd',
    })
    $("#btnSearch").click(function(){

    	getDataReportFn();
    });
    
    $("#btnSearch").click();


    // $("#btnSubmit").click(function(){
	// 	if(($("#approved_status_txt").val()=='N' || $("#approved_status_txt").val()=='A' || $("#approved_status_txt").val()=='B') && $("#approved_status_reason_txt").val()==''){
	// 		$(".alertFromServerTxt").html("กรุณากรอกเหตุผลด้วยครับ");
	// 		$(".alertFromServer").show();
	// 		return false;
	// 	}
	// 	AdminStatusUpdateFn();
	// });

});
