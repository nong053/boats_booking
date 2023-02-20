 var date = new Date()
 var d    = date.getDate(),
     m    = date.getMonth(),
     y    = date.getFullYear()
var seatsAvailable=0;


var convertDateFormatYYYY_MM_DD_to_DD_MM_YYYY = function(date){
// dd-mm-yyyy
  var date_not_format = date.split("-");
  var date_format;
  date_format=date_not_format[2]+"-"+date_not_format[1]+"-"+date_not_format[0];

return date_format;
}
var convertDateFormatDD_MM_YYYY_to_YYYY_MM_DD = function(date){
  // dd-mm-yyyy
    var date_not_format = date.split("-");
    var date_format;
    date_format=date_not_format[2]+"-"+date_not_format[1]+"-"+date_not_format[0];
  
  return date_format;
  }


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


function enumerateDaysBetweenDates (startDate, endDate){
  let date = []
  while(moment(startDate) <= moment(endDate)){
    date.push(startDate);
    startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
  }
  return date;
}

var enableBackTripFn = function(){
  
  

  $("#date_back_txt").removeAttr("disabled");
  $("#boat_back_txt").removeAttr("disabled");
  $("#around_boat_back_txt").removeAttr("disabled");
  $("#seat_back_txt").removeAttr("disabled");
  
  $("#backTripArea").css({"opacity":"1"});

  
}
var disabledBackTripFn = function(){
  
  $("#boat_back_txt").attr("disabled","disabled");
  $("#date_back_txt").attr("disabled","disabled");
  $("#around_boat_back_txt").attr("disabled","disabled");
  $("#seat_back_txt").attr("disabled","disabled");
  $("#backTripArea").css({"opacity":"0.5"});
  
  
}

  
var getVehicleFn = function(){
  $.ajax({
		url:restURL+"/api/public/booking/vehicle",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
        //console.log(data);
        //boat_option

// active: 1
// created_date: "2019-06-23"
// fuel_consumption_rate: "10"
// fuel_type_master: "DIESEL"
// number_of_seats: 10
// updated_date: "2022-07-28"
// vehicle_id: 28
// vehicle_number: "ทอ6666"
// vehicle_type_id: 1

        var html="";
        var htmlEmbed="";
        $.each(data,function(index,indexEntry){
          html+="<option value='"+indexEntry['vehicle_id']+"'>";
          html+=indexEntry['vehicle_number'];
          
          htmlEmbed+="<div style='display:none;' id='number_of_seats_embed-"+indexEntry['vehicle_id']+"'>"+indexEntry['number_of_seats']+"</div>";
          
          html+="</option>";

        });
       

       $("#paramArea").html(htmlEmbed);
        $(".boat_option").html(html);
        
    }
  });
}
var getAroundVehicleFn = function(){
  $.ajax({
		url:restURL+"/api/public/booking/around_vehicle",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
      //around_boat_option
      // around_name: "555544"
      // around_time: "00:55:55"
      // created_date: "2022-08-05 13:59:35"
      // id: 1
      // updated_date: "2022-08-05 15:44:41"
       // console.log(data);
        var html="";
        $.each(data,function(index,indexEntry){
          html+="<option value='"+indexEntry['id']+"'>"+indexEntry['around_name']+"</option>";
        });
       
        $(".around_boat_option").html(html);
    }
  });
}
var bindingDisplayBookingFn=function(date_go,boat_id,around_id,seat_number,booking_id,modal_status){

  
  
  // idData=idData.split("_");
  
  // var date_go=idData[1];
  // var boat_id=idData[2];
  // var around_id=idData[3];
  // var seat_number=idData[4];

  $.ajax({
    url:restURL+"/api/public/booking/get_data_booking_by_booker",
    type:"get",
    dataType:"json",
    async:false,
    data:{
      booking_id:booking_id
  },
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


        $(".boat_go_display").html(data['boat_go']);
        $(".date_go_display").html(data['date_go']);
        $(".around_boat_go_display").html(data['around_boat_go']+" เวลา "+data['around_boat_go_time']);
        $(".seat_go_display").html(data['seat_go']);

   
        if(data['go_back_booking_flag']==1){

          $(".boat_back_display").html(data['boat_back']);
          $(".date_back_display").html(data['date_back']);
          $(".around_boat_back_display").html(data['around_boat_back']+" เวลา "+data['around_boat_back_time']);
          $(".seat_back_display").html(data['seat_back']);
          $(".booking_go_display").removeClass("col-md-12").addClass('col-md-6');
          $(".booking_back_display").show();

        }else{
          $(".booking_go_display").removeClass("col-md-6").addClass('col-md-12');
          $(".booking_back_display").hide();
        }     
      }
    }
  });
  if(modal_status==true){

    $("#dataBookingModal").modal();
  }
}

// var bindingDisplayBookingBackFn=function(idData){
  
//   idData=idData.split("_");
  
//   var date_back=idData[1];
//   var boat_back=idData[2];
//   var around_back=idData[3];
//   var seat_number=idData[4];
//   var booking_id=idData[4];

//   $.ajax({
//     url:restURL+"/api/public/booking/get_data_booking_back_by_booker",
//     type:"get",
//     dataType:"json",
//     async:false,
//     data:{
//       booking_id:booking_id
//   },
//     headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
//     success:function(data){
//       if(data!=""){
//         var data=data[0];

//         $("#ticket_vehicle_number_display").html(data['ticket_vehicle_number']);
//         $("#fullname_display").html(data['fullname']);
//         $("#tel_display").html(data['tel']);
//         $("#stay_display").html(data['stay']);
//         $("#type_passenger_display").html(typePassengerFn(data['type_passenger']));
//         $("#note_display").html(data['note']);


//         $("#boat_go_display").html(data['boat_go']);
//         $("#date_go_display").html(data['date_go']);
//         $("#around_boat_go_display").html(data['around_boat_go']);
//         $("#seat_go_display").html(data['seat_go']);
        
//         if(data['go_back_booking_flag']==1){
          

//           $("#boat_back_display").html(data['boat_back']);
//           $("#date_back_display").html(data['date_back']);
//           $("#around_boat_back_display").html(data['around_boat_back']);
//           $("#seat_back_display").html(data['seat_back']);

//           $("#booking_go_display").removeClass("col-md-12").addClass('col-md-6');
//           $("#booking_back_display").show();



//         }else{
//           $("#booking_go_display").removeClass("col-md-6").addClass('col-md-12');
//           $("#booking_back_display").hide();
//         }



        
//       }
//     }
//   });
//   $("#dataBookingModal").modal();
// }

var createDisplayHtmlSeatGoAllAndAvalibleFn = function(number_of_seats,date_go){
  // alert("date_go="+date_go);
  // alert("number_of_seats="+date_go);
  
  
  var html="";
  //html+="<div>";
  for(var i=1;i<= number_of_seats; i++){

    html+="<div class=\"seat seatGo\" id=\"seatGo_"+date_go+"_"+$("#boat_go_txt").val()+"_"+$("#around_boat_go_txt").val()+"_"+i+"_"+$("#idBooking").val()+"\">"+i+"</div>";

  }
 // html+="<div>";
  //alert(html);
 
  $("#seatsGoTotalArea").html(html);


  var htmlSelect="";
  htmlSelect+="<option value='0'>เลือกที่นั่ง</option>";
  for(var j=1; j<= number_of_seats;j++){
    
    htmlSelect+="<option value='"+j+"'>"+j+"</option>";
  }
  $("#seat_go_txt").html(htmlSelect);

 

  $.ajax({
		url:restURL+"/api/public/booking/seat_go_back_reserve",
		type:"post",
		dataType:"json",
    async:false,
    data:{
      
      booking_date:$("#date_go_txt").val()
      
     
  },
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
         
        $(".seatGo").removeClass('reseved').css({"cursor":"default"});
        $.each(data,function(index,indexEntry){
         

          if(indexEntry['date_go']==$("#date_go_txt").val() && indexEntry['boat_go']==$("#boat_go_txt").val() && indexEntry['around_boat_go']==$("#around_boat_go_txt").val()){
             $("#seatGo_"+$("#date_go_txt").val()+"_"+$("#boat_go_txt").val()+"_"+$("#around_boat_go_txt").val()+"_"+indexEntry['seat_go']+"_"+indexEntry['booking_id']).addClass('reseved').css({"cursor":"pointer"});
            
             $("select#seat_go_txt option[value*='"+indexEntry['seat_go']+"']").prop("disabled",true);
             
            }
        });
    }
  });

/*
  $(document).on("click",".reseved",function(){
    
    
    idData=this.id.split("_");
  
    var date_go=idData[1];
    var boat_id=idData[2];
    var around_id=idData[3];
    var seat_number=idData[4];
    var booking_id=idData[5];
    

    bindingDisplayBookingFn(date_go,boat_id,around_id,seat_number,booking_id,modal_status=true);
    
  });
  */
  



}

var createDisplayHtmlSeatBackAllAndAvalibleFn = function(number_of_seats,date_back){
 // alert(number_of_seats);
 // alert(date_back);
  var html="";
  html+="<div>";
  for(var i=1;i<= number_of_seats; i++){

    html+="<div class=\"seat seatBack\" id=\"seatBack_"+date_back+"_"+$("#boat_back_txt").val()+"_"+$("#around_boat_back_txt").val()+"_"+i+"_"+$("#idBooking").val()+"\">"+i+"</div>";
  }
  html+="<div>";
 
  $("#seatsBackTotalArea").html(html);


  var htmlSelect="";
  htmlSelect+="<option value='0'>เลือกที่นั่ง</option>";
  for(var j=1; j<= number_of_seats;j++){
   
    htmlSelect+="<option value='"+j+"'>"+j+"</option>";
  }
  $("#seat_back_txt").html(htmlSelect);

 

  $.ajax({
		url:restURL+"/api/public/booking/seat_go_back_reserve",
		type:"post",
		dataType:"json",
    async:false,
    data:{
      booking_date:$("#date_back_txt").val()
  },
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
         
        $(".seatBack").removeClass('reseved').css({"cursor":"default"});
        $.each(data,function(index,indexEntry){
         

          if(indexEntry['date_back']==$("#date_back_txt").val() && indexEntry['boat_back']==$("#boat_back_txt").val() && indexEntry['around_boat_back']==$("#around_boat_back_txt").val()){
           
            $("#seatBack_"+$("#date_back_txt").val()+"_"+$("#boat_back_txt").val()+"_"+$("#around_boat_back_txt").val()+"_"+indexEntry['seat_back']+"_"+indexEntry['booking_id']).addClass('reseved').css({"cursor":"pointer"});
            $("select#seat_back_txt option[value*='"+indexEntry['seat_back']+"']").prop("disabled",true);
          }
        });
    }
  });


  
  /*
  $(".reseved").click(function(){
    
    
    idData=this.id.split("_");
  
    var date_go=idData[1];
    var boat_id=idData[2];
    var around_id=idData[3];
    var seat_number=idData[4];
    var booking_id=idData[5];
    

    bindingDisplayBookingFn(date_go,boat_id,around_id,seat_number,booking_id,modal_status=true);
    
  });
  */
}

















  var callCalendarStart = function(data){

   
    $('#calendar').fullCalendar({
      header    : {
        left  : 'prev,next today',
        center: 'title',
        right : 'month,agendaWeek,agendaDay'
      },
      selectable: true,
      navLinks: true,
      navLinkDayClick: function(date, jsEvent) {
       
         
        $("#dateDisplayForGoBooking").html(""+date.format()); 
        $("#dateDisplayForBackBooking").html(""+date.format()); 
        sessionStorage.setItem("bookingDate",date.format()); 
        clearBookingDataFn();
        $('#date_go_txt').val(date.format());
        $('#date_back_txt').val(date.format());
        $("#booking_date_txt").val(date.format());
       
        createDisplayHtmlSeatGoAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_go_txt").val()).text(),date.format());
        createDisplayHtmlSeatBackAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_back_txt").val()).text(),$("#date_back_txt").val());
        

        $("#BookingModal").modal("show"); 
          


      },
      dayClick: function(date, jsEvent, view) {
       
        $("#dateDisplayForGoBooking").html(""+date.format()); 
        $("#dateDisplayForBackBooking").html(""+date.format()); 
        sessionStorage.setItem("bookingDate",date.format()); 
        clearBookingDataFn();
        $('#date_go_txt').val(date.format());
        $('#date_back_txt').val(date.format());
        $("#booking_date_txt").val(date.format());
       
        createDisplayHtmlSeatGoAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_go_txt").val()).text(),date.format());
        createDisplayHtmlSeatBackAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_back_txt").val()).text(),$("#date_back_txt").val());
        

        $("#BookingModal").modal("show");
        
      },
      eventClick: function (calEvent, jsEvent, view) {
        console.log(calEvent.booking_id);
        //alert(calEvent.booking_id);


        //maanage

        //EDIT START
        clearBookingDataFn();
        $("#BookingModal").modal("show");
        $("#btnDelete").show();
        $("#btnPrint").show();
        
        $("#btnSubmit").html("<i class=\"fa fa-fw fa-edit\"></i>แก้ไข");
        //alert(calEvent.start.format());
        //console.log(calEvent);
        //console.log(view);
        $("#dateDisplayForBooking").html("วันที่จอง "+calEvent.start.format("YYYY-MM-DD")); 
        sessionStorage.setItem("bookingDate",calEvent.start.format("YYYY-MM-DD")); 
        findOneBookingDataFn(calEvent.booking_id);
        

        
        
        return false
        //EDIT END


      },
      buttonText: {
        today: 'today',
        month: 'month',
        week : 'week',
        day  : 'day'
      },
      
      //Random default events
      events    : data,
      editable  : false,
      droppable : true, // this allows things to be dropped onto the calendar !!!
      drop      : function (date, allDay) { // this function is called when something is dropped

        // retrieve the dropped element's stored Event Object
        var originalEventObject = $(this).data('eventObject')

        // we need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject)

        // assign it the date that was reported
        copiedEventObject.start           = date
        copiedEventObject.allDay          = allDay
        copiedEventObject.backgroundColor = $(this).css('background-color')
        copiedEventObject.borderColor     = $(this).css('border-color')

        // render the event on the calendar
        // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
        $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)

        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove()
        }

      }
    })

}//end function ....

var clearBookingDataFn = function(){

  
  $(".seatGo").removeClass('reseved');
  $(".seatBack").removeClass('reseved');

  


  $("#seatsGoTotalArea").html("");
  $("#btnDelete").hide();
  $("#btnPrint").hide();
  $("#btnSubmit").html("<i class=\"fa fa-fw fa-save\"></i>บันทึก");
  $("#fullname_txt").val("");
  $("#tel_txt").val("");
  $("#stay_txt").val("");
  // $("#date_go_txt").val("");
  // $("#time_from_txt").val("");
  // $("#date_back_txt").val("");
  // $("#time_to_txt").val("");

  // $("#general_passenger_txt").val("0");
  // $("#special_passenger_txt").val("0");
  // $("#babies_passenger_txt").val("0");
  // $("#free_passenger_txt").val("0");

  $("#ticket_number_txt").val("");
  $("#note_txt").val("");
  $("#booking_price_total_txt").val("400.00");
  $("#goBackBooking").prop("checked",false);
  $("#back_booking_check").hide();
  $("#seat_back_all_area").hide();


  $("#boat_go_txt option:first").prop("selected",true);
  $("#around_boat_go_txt option:first").prop("selected",true);
  $("#seat_go_txt option:first").prop('selected',true);

  
  $("#boat_back_txt option:first").prop('selected',true);
  $("#around_boat_back_txt option:first").prop('selected',true);
  $("#seat_back_txt option:first").prop('selected',true);

  disabledBackTripFn();


 $("#idBooking").val("");
 $("#actionBooking").val("add");
 $(".alertFromServer").hide();
 
 
}

var findOneBookingDataFn = function(BookingID){
  

 // clearBookingDataFn();
   
  $("#idBooking").val(BookingID);

	$.ajax({
		url:restURL+"/api/public/booking/"+BookingID,
		type:"get",
		dataType:"json",
    async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
      
      if(data[0]!=="" && data[0]!==undefined){
        data=data[0];

        
      

        $("#fullname_txt").val(data['fullname']);
        $("#tel_txt").val(data['tel']);
        $("#stay_txt").val(data['stay']);

        $("#booking_date_txt").val(data['booking_date']);

        $("#ticket_number_txt").val(data['ticket_number']);
        
        $("#date_go_txt").val(data['date_go']);
        
        $("#date_back_txt").val(data['date_back']);
        
        $("#ticket_number_txt").val(data['ticket_vehicle_number']);

        $("#type_passenger_txt").val(data['type_passenger']);
        $("#booking_price_total_txt").val(data['booking_price_total']);
        

        


        $("#note_txt").val(data['note']);
        $("#booking_price_total_txt").val(data['booking_price_total']);
        
        if(data['go_back_booking_flag']==1){
          $("#goBackBooking").prop("checked",true);
          $("#back_booking_check").show();
          $("#seat_back_all_area").show();

        }else{
          $("#goBackBooking").prop("checked",false);
          $("#back_booking_check").hide();
          $("#seat_back_all_area").hide();
        }
        

        $(".alertFromServer").hide();
        




        $("#actionBooking").val("edit");
        
        $("#idBooking").val();

        $("#boat_go_txt").val(data['boat_go']);
        $("#boat_back_txt").val(data['boat_back']);
        $("#around_boat_go_txt").val(data['around_boat_go']);
        $("#around_boat_back_txt").val(data['around_boat_back']);

       
        
        
        
        createDisplayHtmlSeatGoAllAndAvalibleFn(data['number_of_seats_go'],data['date_go']);
        createDisplayHtmlSeatBackAllAndAvalibleFn(data['number_of_seats_back'],data['date_back']);
        $("#seat_go_txt").val(data['seat_go']);
        $("#seat_go_embed_txt").text(data['seat_go']);
        

        //alert(data['go_back_booking_flag']);
        if(data['go_back_booking_flag']==1){   
          //sessionStorage.setItem("seatBackAll", data['number_of_seats_back']);  
          //number_of_seats_go
       
          
          
          $("#seat_back_txt").val(data['seat_back']);
          $("#seat_back_embed_txt").text(data['seat_back']);
          enableBackTripFn();

        }else{
          disabledBackTripFn();
        }

        $("#dateDisplayForGoBooking").html(data['date_go']);
        $("#dateDisplayForBackBooking").html(data['date_back']);

      

    }
		}
	});
};

var delBookingFn = function(BookingID){
	
	$.ajax({
		url:restURL+"/api/public/booking/"+BookingID,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
			
        $("#BookingModal").modal('hide');
        setTimeout(function(){
          window.location.reload();
        },500);
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}



var getCalendarDataFn = function(){
  var datas="";
  $.ajax({
    url:restURL+"/api/public/booking/report_calendar_booking_vehicle",
    type:"post",
    dataType:"json",
    async:false,
    headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
    success:function(data){

     

      

      datas+="[";
      $.each(data,function(index,indexEntry){
        var date_go = indexEntry['date_go'];
        date_go=date_go.split("-");
        var date_go_y=date_go[0];
        var date_go_m=date_go[1];
        date_go_m=date_go_m-1;
        var date_go_d=date_go[2];
  
        var date_back = indexEntry['date_back'];
        date_back=date_back.split("-");
        var date_back_y=date_back[0];
        var date_back_m=date_back[1];
        date_back_m=date_back_m-1;
        var date_back_d=date_back[2];


        if(index==0){
          datas+="{";
        }else{
          datas+=",{";
        }
       
       if(indexEntry['go_back_booking_flag']==1){

        //datas+="{";
          datas+="\"booking_id\":\""+indexEntry['booking_id']+"\",";
          datas+="\"title\":\""+indexEntry['fullname']+"\",";
          datas+="\"start\":new Date("+date_go_y+", "+date_go_m+", "+date_go_d+"),";
          datas+="\"end\":new Date("+date_go_y+", "+date_go_m+", "+date_go_d+"),";
           datas+="\"allDay\":false,";
          datas+="\"backgroundColor\":\"#3c763d\",";
          datas+="\"borderColor\":\"#3c763d\""; 
        datas+="},";
        datas+="{";
          datas+="\"booking_id\":\""+indexEntry['booking_id']+"\",";
          datas+="\"title\":\""+indexEntry['fullname']+"\",";
          datas+="\"start\":new Date("+date_back_y+", "+date_back_m+", "+date_back_d+"),";
          datas+="\"end\":new Date("+date_back_y+", "+date_back_m+", "+date_back_d+"),";
           datas+="\"allDay\":false,";
          datas+="\"backgroundColor\":\"#efa300\",";
          datas+="\"borderColor\":\"#efa300\""; 
        datas+="}";
      }else{
       // datas+="{";
          datas+="\"booking_id\":\""+indexEntry['booking_id']+"\",";
          datas+="\"title\":\""+indexEntry['fullname']+"\",";
          datas+="\"start\":new Date("+date_go_y+", "+date_go_m+", "+date_go_d+"),";
          datas+="\"end\":new Date("+date_go_y+", "+date_go_m+", "+date_go_d+"),";
          datas+="\"allDay\":false,";
          datas+="\"backgroundColor\":\"#00c0ef\",";
          datas+="\"borderColor\":\"#00c0ef\""; 
        datas+="}";
      }

      });
       datas+="]";
      //alert(datas);   
      var dataObj=eval("("+datas+")");
      callCalendarStart(dataObj);
     

    }
  });
}






  $(function () {

    /* initialize the external events
     -----------------------------------------------------------------*/
    function init_events(ele) {
      ele.each(function () {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
          title: $.trim($(this).text()) // use the element's text as the event title
        }

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject)

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex        : 1070,
          revert        : true, // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
        })

      })
    }

    init_events($('#external-events div.external-event'))

    /* initialize the calendar
     -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data)
 



    /* ADDING EVENTS */
    var currColor = '#3c8dbc' //Red by default
    //Color chooser button
    var colorChooser = $('#color-chooser-btn')
    $('#color-chooser > li > a').click(function (e) {
      e.preventDefault()
      //Save color
      currColor = $(this).css('color')
      //Add color effect to button
      $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor })
    })
    $('#add-new-event').click(function (e) {
      e.preventDefault()
      //Get value and make sure it is not null
      var val = $('#new-event').val()
      if (val.length == 0) {
        return
      }

      //Create events
      var event = $('<div />')
      event.css({
        'background-color': currColor,
        'border-color'    : currColor,
        'color'           : '#fff'
      }).addClass('external-event')
      event.html(val)
      $('#external-events').prepend(event)

      //Add draggable funtionality
      init_events(event)

      //Remove event from text input
      $('#new-event').val('')
      
    })





//##### Funciton call here....
var dataEvents=
  [
        {
          title          : 'All Day Event',
          start          : new Date(y, m, 1),
          backgroundColor: '#f56954', //red
          borderColor    : '#f56954' //red
        },
        {
          title          : 'Long Event',
          start          : new Date(y, m, d - 5),
          end            : new Date(y, m, d - 2),
          backgroundColor: '#f39c12', //yellow
          borderColor    : '#f39c12' //yellow
        },
        {
          title          : 'Meeting',
          start          : new Date(y, m, d, 10, 30),
          allDay         : true,
          backgroundColor: '#0073b7', //Blue
          borderColor    : '#0073b7' //Blue
        },
        {
          title          : 'Lunch',
          start          : new Date(y, m, d, 12, 0),
          end            : new Date(y, m, d, 14, 0),
          allDay         : false,
          backgroundColor: '#00c0ef', //Info (aqua)
          borderColor    : '#00c0ef' //Info (aqua)
        },
        {
          title          : 'Birthday Party',
          start          : new Date(y, m, d + 1, 19, 0),
          end            : new Date(y, m, d + 1, 22, 30),
          allDay         : false,
          backgroundColor: '#00a65a', //Success (green)
          borderColor    : '#00a65a' //Success (green)
        },
        {
          title          : 'Click for Google',
          start          : new Date(y, m, 28),
          end            : new Date(y, m, 29),
          url            : 'http://google.com/',
          backgroundColor: '#3c8dbc', //Primary (light-blue)
          borderColor    : '#3c8dbc' //Primary (light-blue)
        }
      ];

//callCalendarStart(dataEvents);


})



//

var BookingInsertFn = function(){
	
  
  
  var ticket_number_txt =$("#ticket_number_txt").val();

  var fullname_txt =$("#fullname_txt").val();
  var tel_txt=$("#tel_txt").val();
  var stay_txt=$("#stay_txt").val();

   var date_go_txt=$("#date_go_txt").val();
  // var time_from_txt=$("#time_from_txt").val();
   var date_back_txt=$("#date_back_txt").val();
  // var time_to_txt=$("#time_to_txt").val();

  var boat_go_txt=$("#boat_go_txt").val();
  var boat_back_txt=$("#boat_back_txt").val();
  var around_boat_go_txt=$("#around_boat_go_txt").val();
  var around_boat_back_txt=$("#around_boat_back_txt").val();
  var seat_go_txt=$("#seat_go_txt").val();
  var seat_back_txt=$("#seat_back_txt").val();
  //var booking_date_txt=$("#booking_date_txt").val();

  var type_passenger_txt=$("#type_passenger_txt").val();

  // var general_passenger_txt = $("#general_passenger_txt").val();
  // var special_passenger_txt = $("#special_passenger_txt").val();
  // var babies_passenger_txt= $("#babies_passenger_txt").val();
  // var free_passenger_txt = $("#free_passenger_txt").val();


  var booking_price_total_txt=$("#booking_price_total_txt").val();
  var note_txt =$("#note_txt").val();
  var go_back_booking_flag_txt=0;

  if($("#goBackBooking").prop("checked")==true){
    go_back_booking_flag_txt="1";
  }else{
    go_back_booking_flag_txt="0";
  
  }
  
  var booking_date_txt = enumerateDaysBetweenDates(date_go_txt, date_back_txt);
  //alert(date_booking);
    // alert("1="+booking_price_total_txt);
    // alert("2="+note_txt);
    // alert("3="+go_back_booking_flag_txt);
    // alert("4="+type_passenger_txt);
    // alert("5="+booking_date_txt);
    // alert("6="+seat_back_txt);
    // alert("7="+seat_go_txt);
    // alert("8="+xx);
    // alert("9="+xx);
    // alert("10="+xx);
    // alert("11="+xx);
    
    

    
    $.ajax({
      url:restURL+"/api/public/booking",
      type:"post",
      dataType:"json",
      data:{
  
        "ticket_vehicle_number":ticket_number_txt,
        "fullname":fullname_txt,
        "tel":tel_txt,
        "stay":stay_txt,
        "date_go":date_go_txt,
        //"time_from":time_from_txt,
         "date_back":date_back_txt,
        // "time_to":time_to_txt,

        // "general_passenger":general_passenger_txt,
        // "special_passenger":special_passenger_txt,
        // "babies_passenger":babies_passenger_txt,
        // "free_passenger":free_passenger_txt,

       

        "note":note_txt,
        "booking_price_total":booking_price_total_txt,
        "go_back_booking_flag":go_back_booking_flag_txt,
        "boat_go":boat_go_txt,
        "boat_back":boat_back_txt,
        "around_boat_go":around_boat_go_txt,
        "around_boat_back":around_boat_back_txt,
         "seat_go":seat_go_txt,
         "seat_back":seat_back_txt,
        "type_passenger":type_passenger_txt,
        "booking_date":booking_date_txt
  
      },
      headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
      success:function(data){
        
        if(data.status==200){

            
            $("#BookingModal").modal("hide");
            setTimeout(function(){
              window.location.reload();
            },500);
            
            
  
        }else if(data.status==400){
          //$(".alert-error").html(data);
        }
      }
    });
  
    
  
  }
  
  var BookingUpdateFn = function(paramStep){
  
    var ticket_number_txt =$("#ticket_number_txt").val();
    var fullname_txt =$("#fullname_txt").val();
    var tel_txt=$("#tel_txt").val();
    var stay_txt=$("#stay_txt").val();

     var date_go_txt=$("#date_go_txt").val();
    // var time_from_txt=$("#time_from_txt").val();
     var date_back_txt=$("#date_back_txt").val();
    // var time_to_txt=$("#time_to_txt").val();
  
    // var general_passenger_txt = $("#general_passenger_txt").val();
    // var special_passenger_txt = $("#special_passenger_txt").val();
    // var babies_passenger_txt= $("#babies_passenger_txt").val();
    // var free_passenger_txt = $("#free_passenger_txt").val();
  


  var boat_go_txt=$("#boat_go_txt").val();
  var boat_back_txt=$("#boat_back_txt").val();
  
  var around_boat_go_txt=$("#around_boat_go_txt").val();
  var around_boat_back_txt=$("#around_boat_back_txt").val();

  var seat_go_txt="";
  var seat_back_txt="";
  if($("#seat_go_txt").val()==null){
    seat_go_txt=$("#seat_go_embed_txt").text();
  }else{
    seat_go_txt=$("#seat_go_txt").val();
  }
  if($("#seat_back_txt").val()==null){
    seat_back_txt=$("#seat_back_embed_txt").text();
  }else{
    seat_back_txt=$("#seat_back_txt").val();
  }

  
  //var booking_date_txt=$("#booking_date_txt").val();
  var type_passenger_txt=$("#type_passenger_txt").val();

  
    var booking_price_total_txt=$("#booking_price_total_txt").val();
    var note_txt =$("#note_txt").val();
    var go_back_booking_flag_txt=0;
    var booking_date_txt = enumerateDaysBetweenDates(date_go_txt, date_back_txt);




  
    if($("#goBackBooking").prop("checked")==true){
      go_back_booking_flag_txt="1";
    }else{
      go_back_booking_flag_txt="0";
    }

  
    $.ajax({
      url:restURL+"/api/public/booking/"+$("#idBooking").val(),
      type:"patch",
      dataType:"json",  
      data:{
  
        
        "ticket_vehicle_number":ticket_number_txt,
        "fullname":fullname_txt,
        "tel":tel_txt,
        "stay":stay_txt,
         "date_go":date_go_txt,
        // "time_from":time_from_txt,
         "date_back":date_back_txt,
        // "time_to":time_to_txt,
        // "general_passenger":general_passenger_txt,
        // "special_passenger":special_passenger_txt,
        // "babies_passenger":babies_passenger_txt,
        // "free_passenger":free_passenger_txt,
        "note":note_txt,
        "booking_price_total":booking_price_total_txt,
        "go_back_booking_flag":go_back_booking_flag_txt,

        

  
        "boat_go":boat_go_txt,
        "boat_back":boat_back_txt,
       

        "around_boat_go":around_boat_go_txt,
        "around_boat_back":around_boat_back_txt,
        "seat_go":seat_go_txt,
        "seat_back":seat_back_txt,

        "type_passenger":type_passenger_txt,
        //"booking_date":booking_date_txt


    
  
      },
      headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
      success:function(data){
        //console.log(data);
        if(data.status==200){
  
          //alert('updeated ok');
          
          $("#BookingModal").modal("hide");
          setTimeout(function(){
            window.location.reload();
          },500);
          
          
          
        }
      }
    });
      
  }

  var validateBookingFn=function(){
		var validate="";

    if($("#seat_go_txt").val()==0){
      validate+="<i class=\"fa fa-warning\"></i> เลือกที่นั่งด้วยครับ. <br>";
    }
    if($("#goBackBooking").prop("checked")==true){
      if($("#seat_back_txt").val()==0 ){
        validate+="<i class=\"fa fa-warning\"></i> เลือกที่นั่งขากลับด้วยครับ. <br>";
      }
    }


    if($("#fullname_txt").val()==""){
      validate+="<i class=\"fa fa-warning\"></i> กรอกชื่อ-นามสกุลด้วยครับ. <br>";
    }

    if($("#tel_txt").val()==""){
      validate+="<i class=\"fa fa-warning\"></i> กรอกเบอร์โทรด้วยครับ. <br>";
    }

		if($("#stay_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกที่อยู่พักด้วยครับ. <br>";
	 	}
	 	


	 	if($("#number_of_people_txt").val()==""){
	 		validate+="<i class=\"fa fa-warning\"></i> กรอกจำนวนผู้โดยสารด้วยครับ <br>";
	 	}
	 
	 	
	 
     if($("#date_go_txt").val()==""){
      validate+="<i class=\"fa fa-warning\"></i> ระบุวันที่เดินทางด้วยครับ <br>";
    }
    if($("#time_from_txt").val()==""){
      validate+="<i class=\"fa fa-warning\"></i> ระบุเวลาเดินทางด้วยครับ <br>";
    }



		if($("#goBackBooking").prop("checked")==true){

      if($("#date_back_txt").val()==""){
        validate+="<i class=\"fa fa-warning\"></i> ระบุวันที่กลับด้วยครับ <br>";
      }
      if($("#time_to_txt").val()==""){
        validate+="<i class=\"fa fa-warning\"></i> ระบุเวลากลับด้วยครับ <br>";
      }
	 		
	 	}

	 	// if(moment(""+$("#date_go_txt").val()+"").isBefore(""+$("#date_back_txt").val()+"") || moment(""+$("#date_go_txt").val()+"").isSame(""+$("#date_back_txt").val()+"")){
	 	// 	//alert("ok");
	 	// }else{
	 	// 	validate+="<i class=\"fa fa-warning\"></i> กรอกวันเดินทางไปและวันเดินทางกลับให้ถูกต้องด้วยครับ! <br>";
	 	// }
	
	 	return validate;
	}
  var calculationPrice = function(){
    var price=0.00;
    if($("#goBackBooking").prop("checked")==true){
      if($("#type_passenger_txt").val()=="general_price"){
        price=800.00;

      }else if($("#type_passenger_txt").val()=="special_price"){
        price=700.00;
  
      }else if($("#type_passenger_txt").val()=="babies_price"){
        price=400.00;
  
      }else if($("#type_passenger_txt").val()=="free_price"){
        price=0.00;
  
      }
    }else{
      if($("#type_passenger_txt").val()=="general_price"){
        price=400.00;

      }else if($("#type_passenger_txt").val()=="special_price"){
        price=350.00;
  
      }else if($("#type_passenger_txt").val()=="babies_price"){
        price=200.00;
  
      }else if($("#type_passenger_txt").val()=="free_price"){
        price=0.00;
  
      }
    }
    $("#booking_price_total_txt").val(price);
  }

  var calculationPrice_bk = function(){


    var general_total_price=0.00;
    var special_total_price=0.00;
    var babies_total_price=0.00;
    var free_total_price=0.00;

    var general_passenger=0;
    var special_passenger=0;
    var babies_passenger=0;
    var free_passenger=0;
    
    if($("#general_passenger_txt").val()==""){
 
      general_passenger=0;
     
    }else{
     
      general_passenger=parseInt($("#general_passenger_txt").val());
      
    }
    if($("#special_passenger_txt").val()==""){
      special_passenger=0;
    }else{
      special_passenger=parseInt($("#special_passenger_txt").val());
    }
    if($("#babies_passenger_txt").val()==""){
      babies_passenger=0;
    }else{
      babies_passenger=parseInt($("#babies_passenger_txt").val());
    }
    if($("#free_passenger_txt").val()==""){
      free_passenger=0;
    }else{
      free_passenger=parseInt($("#free_passenger_txt").val());
    }

    


    var general_passenger_price=450;
    var special_passenger_price=300;
    var babies_passenger_price=general_passenger_price/2;
    var free_passenger_price=0;

    var total_price=0.00;


    if($("#goBackBooking").prop("checked")==true){
      general_total_price=general_passenger*general_passenger_price*2;
      special_total_price=special_passenger*special_passenger_price*2;
      babies_total_price=babies_passenger*babies_passenger_price*2;
      //free_passenger=(parseInt($("#free_passenger_txt").val())*free_passenger_price)*2;

    }else{
      general_total_price=general_passenger*general_passenger_price;
      special_total_price=special_passenger*special_passenger_price;
      babies_total_price=babies_passenger*babies_passenger_price;
    }
    //alert(general_passenger);
    total_price+=parseInt(general_total_price)+parseInt(special_total_price)+parseInt(babies_total_price);
   
    
    
    if(isNaN(total_price)){
     
      $("#booking_price_total_txt").val(0.00);
    }else{

      $("#booking_price_total_txt").val(total_price);
    }
    
    //alert(total_price);
  }

  function printDiv() 
    {

      var date_go=$("#date_go_txt").val();
      var boat_id=$("#boat_go_txt").val();
      var around_id=$("#around_boat_go_txt").val();
      var seat_number=$("#seat_go_embed_txt").text();
      var booking_id = $("#idBooking").val();
      
      

      bindingDisplayBookingFn(date_go,boat_id,around_id,seat_number,booking_id,modal_status=false);

      
      var divToPrint=document.getElementById('DivIdToPrint');

      var newWin=window.open('','Print-Window');

      newWin.document.open();

      newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

      newWin.document.close();

      setTimeout(function(){newWin.close();},10);
      

    }

  

  $(document).ready(function(){


    

    getAroundVehicleFn();
    getVehicleFn();

    getCalendarDataFn();



    $('.numbersOnly').keyup(function () { 
      this.value = this.value.replace(/[^0-9\.]/g,'');
      // if(this.value==''){
      //   this.value=0;
      // }
  });

    // $("#general_passenger_txt").keyup(function(){
     
    //   calculationPrice();
      
    // });

    // $("#special_passenger_txt").keyup(function(){
    //   calculationPrice();
    // });

    // $("#babies_passenger_txt").keyup(function(){
    //   calculationPrice();
    // });

    $("#type_passenger_txt").change(function(){
      calculationPrice();
    });


    // $("#goBackBooking").change(function(){

    // });

    $("#goBackBooking").click(function(){

      calculationPrice();

      createDisplayHtmlSeatBackAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_back_txt").val()).text(),$("#date_back_txt").val());

  
      if($(this).prop( "checked" ) ==true){
        //console.log("ok check");
        $("#around_back_area").show();
        $("#seat_back_all_area").show();
        enableBackTripFn();
      }else{
        //console.log("not check");
        $("#around_back_area").hide();
        $("#seat_back_all_area").hide();
        disabledBackTripFn();
       
      }
    });	

    



    $("#boat_go_txt").change(function(){
      
     
      
      createDisplayHtmlSeatGoAllAndAvalibleFn($("#number_of_seats_embed-"+$(this).val()).text(),$("#date_go_txt").val());
      
      
    });

    $("#boat_back_txt").change(function(){
     
   
     
      createDisplayHtmlSeatBackAllAndAvalibleFn($("#number_of_seats_embed-"+$(this).val()).text(),$("#date_back_txt").val());
      
    });

    $("#date_go_txt").change(function(){
      
      $("#dateDisplayForGoBooking").html($(this).val());
     createDisplayHtmlSeatGoAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_go_txt").val()).text(),$("#date_go_txt").val());
     

    });

    $("#date_back_txt").change(function(){
     
      $("#dateDisplayForBackBooking").html($(this).val());
      createDisplayHtmlSeatBackAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_back_txt").val()).text(),$("#date_back_txt").val());
     
    });


    $("#around_boat_go_txt").change(function(){
    
      createDisplayHtmlSeatGoAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_go_txt").val()).text(),$("#date_go_txt").val());
      
    });

    $("#around_boat_back_txt").change(function(){
     
      createDisplayHtmlSeatBackAllAndAvalibleFn($("#number_of_seats_embed-"+$("#boat_back_txt").val()).text(),$("#date_back_txt").val());
    });

    


    

    

      $('.date_txt').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
      })

      //Timepicker
      $('.timepicker').timepicker({
        showInputs: false
      })

    $("#btnSubmit").click(function(){
        

      
      if(validateBookingFn()!=""){

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


   

    	
	$("#btnDelete").click(function(){
		var id=$("#idBooking").val();
		if(confirm("Do you want to Delete this data.")){
			delBookingFn(id);	
		}
		return false
	});


  $(document).on("click",".reseved",function(){
    
    
    idData=this.id.split("_");
  
    var date_go=idData[1];
    var boat_id=idData[2];
    var around_id=idData[3];
    var seat_number=idData[4];
    var booking_id=idData[5];
    

    bindingDisplayBookingFn(date_go,boat_id,around_id,seat_number,booking_id,modal_status=true);
    
  });
 



  



   

});

