
var listReportDataFn = function(data){
	var html="";

	$.each(data,function(index,indexEntry){
		if(sessionStorage.getItem('galbalRole')==3 || sessionStorage.getItem('galbalRole')==4){
			html+="<tr style='cursor:pointer;' class='adminManagement' id='adminManagement-"+indexEntry['booking_id']+"'>";
		}else{
			html+="<tr>";
		}
		 
		 html+="<td style='text-align:right'>"+(index+1)+"</td>";

		  html+="<td >";
		  if(getBookingImageFn(indexEntry['booking_id'])!=''){
            	//alert(0);
            	html+="<img  class=\"img-circle\" width=\"50\" src=\""+restURL+"/api/public/"+getBookingImageFn(indexEntry['booking_id'])+"\" alt=\"\"><br>";
            }else{
            	//alert(1);
            	html+=" <i style='font-size:33px; color:#ccc;' class=\"fa fa-ship\"></i>";
            }
		  html+="</td >";
          html+="<td >";
           
			html+="จาก <b>"+indexEntry['date_from']+" "+indexEntry['time_from']+"</b>";
            html+="<br>ถึง ";
            html+="<b>"+indexEntry['date_to']+" "+indexEntry['time_to']+"</b>";

          html+="</td>";
         
          html+="<td style='text-align:left'>"+indexEntry['fullname']+"<br>"+indexEntry['stay']+"<br>"+indexEntry['tel']+"</td>";
          // html+="<td style='text-align:right'>"+indexEntry['number_of_people']+"</td>";
          // html+="<td >"+indexEntry['title']+" "+indexEntry['FIRST_NAME']+""+indexEntry['LAST_NAME']+"</td>";
           html+="<td style='text-align:right'>";

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

           html+="</td>";
         

        html+="</tr>";
	});
	$("#detailUseCarReportList").html(html);
	$('#detailUseCarReportTable').DataTable();



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
		url:restURL+"/api/public/booking/report_overview_booking_vehicle",
		type:"post",
		dataType:"json",
		data:{
			"date_from":$("#fromDatePicker").val(),"date_to":$("#toDatePicker").val(),
			"status":$("#status_report").val()
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


    $("#btnSubmit").click(function(){
		if(($("#approved_status_txt").val()=='N' || $("#approved_status_txt").val()=='A' || $("#approved_status_txt").val()=='B') && $("#approved_status_reason_txt").val()==''){
			$(".alertFromServerTxt").html("กรุณากรอกเหตุผลด้วยครับ");
			$(".alertFromServer").show();
			return false;
		}
		AdminStatusUpdateFn();
	});

});
