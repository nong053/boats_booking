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

function enumerateDaysBetweenDates (startDate, endDate){
  let date = []
  while(moment(startDate) <= moment(endDate)){
    date.push(startDate);
    startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
  }
  return date;
}
  
var getVehicleFn = function(){
  $.ajax({
		url:restURL+"/api/public/booking/vehicle",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
        console.log(data);
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
        $.each(data,function(index,indexEntry){
          html+="<option value='"+indexEntry['vehicle_id']+"'>"+indexEntry['vehicle_number']+"</option>";
        });
       
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
var getVehicleSeatAllByBoatFn = function(boat_id){
 
  $.ajax({
		url:restURL+"/api/public/booking/vehicle_seat_by_boat/"+boat_id,
		type:"get",
		dataType:"json",
    async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
      //seat_option,number_of_seats
       // console.log(data[0]['number_of_seats']);
       if(data!=''){
        seatsAvailable=data[0]['number_of_seats'];
       }
       //alert(seatsAvailable);
       

    /*
        var html="";
        for(var i=1; i<= data[0]['number_of_seats'];i++){
          html+="<option value='"+i+"'>"+i+"</option>";
        }
       
         $(".seat_option").html(html);
    */
    }
    
    
  });
  return seatsAvailable;
}

var createDisplayHtmlSeatGoAllAndAvalibleFn = function(number_of_seats){
  
  //booking/seat_go_reserve
  // $request->boat_go
	// 	   ,$request->around_boat_go
	// 	   ,$request->date_from
	// 	   ,$request->date_to

  

  
  


  
  var html="";
  html+="<div>";
  for(var i=1;i<= number_of_seats; i++){

    html+="<div class=\"seat seatGo\" id=\"seatGo-"+i+"\">"+i+"</div>";
  }
  html+="<div>";
 
  $("#seatsGoTotalArea").html(html);
 

  $.ajax({
		url:restURL+"/api/public/booking/seat_go_back_reserve",
		type:"post",
		dataType:"json",
    async:false,
    data:{
      boat_go:$("#boat_txt").val(),
      around_boat_go:$("#around_boat_go_txt").val(),
      date_from:$("#date_from_txt").val(),
     
  },
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
      //console.log(data);
     
      
          // console.log(data[0]['seat_go_number']);
          // console.log(data[0]['seat_back_number']);
         

          $(".seatGo").removeClass('reseved');
        $.each(data,function(index,indexEntry){
          console.log(indexEntry['seat_go_number']);
          if(indexEntry['booking_date']==$("#date_from_txt").val()){
             $("#seatGo-"+indexEntry['seat_go_number']).addClass('reseved');
          }
        });
         
      



    }
  });

}

var createDisplayHtmlSeatBackAllAndAvalibleFn = function(number_of_seats){

  var html="";
  html+="<div>";
  for(var i=1;i<= number_of_seats; i++){

    html+="<div class=\"seat seatBack\" id=\"seatBack-"+i+"\">"+i+"</div>";
  }  
  html+="<div>";
  $("#seatsBackTotalArea").html(html);


  $.ajax({
		url:restURL+"/api/public/booking/seat_back_reserve",
		type:"post",
		dataType:"json",
    async:false,
    data:{
      boat_back:$("#boat_back_txt").val(),
      around_boat_back:$("#around_boat_back_txt").val(),
      date_from:$("#date_from_txt").val(),
      date_to:$("#date_to_txt").val(),
  },
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
      console.log(data);
    }
  });

  /*
  
  */
}
var createHtmlSelectSeatGoAllFn = function(number_of_seats){
  var html="";
  for(var i=1; i<= number_of_seats;i++){
    html+="<option value='"+i+"'>"+i+"</option>";
  }
  $("#seat_go_txt").html(html);
};

var createHtmlSelectSeatBackAllFn = function(number_of_seats){
  var html="";
  for(var i=1; i<= number_of_seats;i++){
   
      html+="<option value='"+i+"'>"+i+"</option>";
    
    
  }
  $("#seat_back_txt").html(html);
};


var createHtmlSeatGoAllFn=function(number_of_seats){

        var html="";
        for(var i=1; i<= number_of_seats;i++){
          html+="<option value='"+i+"'>"+i+"</option>";
        }
       
         $(".seat_option").html(html);
}

var createHtmlSeatBackAllFn=function(number_of_seats){

  var html="";
  for(var i=1; i<= number_of_seats;i++){
    html+="<option value='"+i+"'>"+i+"</option>";
  }
 
   $(".seat_option").html(html);
}









getAroundVehicleFn();
getVehicleFn();



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
       
          /*
          clearBookingDataFn();
          // $('#date_from_txt').val(date.format());
          // $('#date_to_txt').val(date.format());
          $("#booking_date_txt").val(date.format());
		      $("#BookingModal").modal("show");
          */
         $("#dateDisplayForBooking").val(date.format());    


      },
      dayClick: function(date, jsEvent, view) {
        //alert('Clicked on: ' + date.format());
        $("#dateDisplayForBooking").html("วันที่จอง "+date.format()); 
        clearBookingDataFn();
        $('#date_from_txt').val(date.format());
        $('#date_to_txt').val(date.format());
        $("#booking_date_txt").val(date.format());
        createDisplayHtmlSeatGoAllAndAvalibleFn(sessionStorage.getItem("seatGoAll"));
        
        createDisplayHtmlSeatBackAllAndAvalibleFn(sessionStorage.getItem("seatGoAll"));

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
        $("#btnSubmit").html("<i class=\"fa fa-fw fa-edit\"></i>แก้ไข");
        findOneBookingDataFn(calEvent.booking_id);

        createDisplayHtmlSeatGoAllAndAvalibleFn(sessionStorage.getItem("seatGoAll"));
        
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

  $("#boat_txt option:first").prop("selected",true);
  sessionStorage.setItem("seatGoAll", getVehicleSeatAllByBoatFn(boat_id=$("#boat_txt").val()));
  createDisplayHtmlSeatGoAllAndAvalibleFn(sessionStorage.getItem("seatGoAll"));
  createHtmlSelectSeatGoAllFn(sessionStorage.getItem("seatGoAll"));
  


  $("#seatsGoTotalArea").html("");
  $("#btnDelete").hide();
  $("#btnSubmit").html("<i class=\"fa fa-fw fa-save\"></i>บันทึก");
  $("#fullname_txt").val("");
  $("#tel_txt").val("");
  $("#stay_txt").val("");
  // $("#date_from_txt").val("");
  // $("#time_from_txt").val("");
  // $("#date_to_txt").val("");
  // $("#time_to_txt").val("");

  // $("#general_passenger_txt").val("0");
  // $("#special_passenger_txt").val("0");
  // $("#babies_passenger_txt").val("0");
  // $("#free_passenger_txt").val("0");

  $("#ticket_number_txt").val("");
  $("#note_txt").val("");
  $("#booking_price_total_txt").val("0.00");
  $("#goBackBooking").prop("checked",false);
  $("#back_booking_check").hide();
  $("#seat_back_all_area").hide();

/*
  "fullname":fullname_txt,
  "tel":tel_txt,
  "stay":stay_txt,
  "date_from":date_from_txt,
  "time_from":time_from_txt,
  "date_to":date_to_txt,
  "time_to":time_to_txt,
  "general_passenger":general_passenger_txt,
  "special_passenger":special_passenger_txt,
  "babies_passenger":babies_passenger_txt,
  "free_passenger":free_passenger_txt,
  "note":note_txt,
  "booking_price_total":booking_price_total_txt,
  "go_back_booking_flag":go_back_booking_flag_txt
  */

 $("#idBooking").val("");
 $("#actionBooking").val("add");
 $(".alertFromServer").hide();
 
 
}

var findOneBookingDataFn = function(BookingID){
  

  clearBookingDataFn();
 

	$.ajax({
		url:restURL+"/api/public/booking/"+BookingID,
		type:"get",
		dataType:"json",
    async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

      
      sessionStorage.setItem("seatGoAll", getVehicleSeatAllByBoatFn(boat_id=data['boat_go']));

			$("#fullname_txt").val(data['fullname']);
	 		$("#tel_txt").val(data['tel']);
			$("#stay_txt").val(data['stay']);
      $("#booking_date_txt").val(data['booking_date']);

      $("#ticket_number_txt").val(data['ticket_number']);
      
			$("#date_from_txt").val(data['date_from']);
			//$("#time_from_txt").val(data['time_from']);
			$("#date_to_txt").val(data['date_to']);
			//$("#time_to_txt").val(data['time_to']);
      // $("#general_passenger_txt").val(data['general_passenger']);
      // $("#special_passenger_txt").val(data['special_passenger']);
      // $("#babies_passenger_txt").val(data['babies_passenger']);
      // $("#free_passenger_txt").val(data['free_passenger']);
      
      
      $("#ticket_number_txt").val(data['ticket_vehicle_number']);
      $("#boat_txt").val(data['boat_go']);
      createHtmlSelectSeatGoAllFn(sessionStorage.getItem("seatGoAll"));
      createDisplayHtmlSeatGoAllAndAvalibleFn(sessionStorage.getItem("seatGoAll"));

      $("#around_boat_go_txt").val(data['around_boat_go']);
      $("#around_boat_back_txt").val(data['around_boat_back']);


      $.ajax({
          url:restURL+"/api/public/booking/get_seat_reserve_by_booking_date/"+data['date_from']+"/"+BookingID,
          type:"get",
          dataType:"json",
          async:false,
          headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
          success:function(data){
            if(data!=""){
            //console.log('--------------');
            //console.log(data);
            
            $("#seat_go_txt").val(data[0]['seat_go_number']);
            $("#seat_back_txt").val(data[0]['seat_back_number']);
            
            }
          }
        });

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
				alert("ok");
        $("#BookingModal").modal('hide');
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
        
        if(index==0){
          datas+="{";
        }else{
          datas+=",{";
        }
        


          // title          : 'Meeting',
          // start          : new Date(y, m, d, 10, 30),
          // allDay         : true,
          // backgroundColor: '#0073b7', 
          // borderColor    : '#0073b7' 
         
          var date_from = indexEntry['date_from'];
          date_from=date_from.split("-");
          var date_from_y=date_from[0];
          var date_from_m=date_from[1];
          date_from_m=date_from_m-1;
          var date_from_d=date_from[2];

          var date_to = indexEntry['date_to'];
          date_to=date_to.split("-");
          var date_to_y=date_to[0];
          var date_to_m=date_to[1];
          date_to_m=date_to_m-1;
          var date_to_d=date_to[2];


          datas+="\"booking_id\":\""+indexEntry['booking_id']+"\",";
          datas+="\"title\":\""+indexEntry['fullname']+"\",";
          datas+="\"start\":new Date("+date_from_y+", "+date_from_m+", "+date_from_d+"),";
          datas+="\"end\":new Date("+date_to_y+", "+date_to_m+", "+date_to_d+"),";
           datas+="\"allDay\":false,";
          datas+="\"backgroundColor\":\"#00c0ef\",";
          datas+="\"borderColor\":\"#00c0ef\""; 
        datas+="}";

      });
       datas+="]";

     
      var dataObj=eval("("+datas+")");
      

       
      //console.log(dataObj);
      callCalendarStart(dataObj);
      /*
      $(".fc-day").css({"cursor":"pointer"});
      $(".fc-other-month").css({"cursor":""});
      $(".fc-day").click(function(){
        if(!$(this).hasClass('fc-other-month')){

          //console.log($(this).data());
          var dataDate =  $(this).data();
          console.log(dataDate.date);
          //alert(dataDate.date)
      
          clearBookingDataFn();



          $('#date_from_txt').val(dataDate.date);
          $('#date_to_txt').val(dataDate.date);
		      $("#BookingModal").modal("show");
           
        }
      });
      */

    }
  });
}

$("#goBackBooking").click(function(){
  //alert("helo juery");
  if($(this).prop( "checked" ) ==true){
    //console.log("ok check");
    $("#around_back_area").show();
    $("#seat_back_all_area").show();
  }else{
    //console.log("not check");
    $("#around_back_area").hide();
    $("#seat_back_all_area").hide();

   
  }
});	




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

   var date_from_txt=$("#date_from_txt").val();
  // var time_from_txt=$("#time_from_txt").val();
   var date_to_txt=$("#date_to_txt").val();
  // var time_to_txt=$("#time_to_txt").val();

  var boat_txt=$("#boat_txt").val();
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
  
  var booking_date_txt = enumerateDaysBetweenDates(date_from_txt, date_to_txt);
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
        "date_from":date_from_txt,
        //"time_from":time_from_txt,
         "date_to":date_to_txt,
        // "time_to":time_to_txt,

        // "general_passenger":general_passenger_txt,
        // "special_passenger":special_passenger_txt,
        // "babies_passenger":babies_passenger_txt,
        // "free_passenger":free_passenger_txt,

       

        "note":note_txt,
        "booking_price_total":booking_price_total_txt,
        "go_back_booking_flag":go_back_booking_flag_txt,
        "boat_go":boat_txt,
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
        alert('ok action insert');
        console.log(data);
        if(data.status==200){

            //window.location.reload();
            $("#BookingModal").modal("hide");
            
            
  
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

     var date_from_txt=$("#date_from_txt").val();
    // var time_from_txt=$("#time_from_txt").val();
     var date_to_txt=$("#date_to_txt").val();
    // var time_to_txt=$("#time_to_txt").val();
  
    // var general_passenger_txt = $("#general_passenger_txt").val();
    // var special_passenger_txt = $("#special_passenger_txt").val();
    // var babies_passenger_txt= $("#babies_passenger_txt").val();
    // var free_passenger_txt = $("#free_passenger_txt").val();
  

  var boat_txt=$("#boat_txt").val();
  var boat_back_txt=$("#boat_back_txt").val();
  
  var around_boat_go_txt=$("#around_boat_go_txt").val();
  var around_boat_back_txt=$("#around_boat_back_txt").val();
  var seat_go_txt=$("#seat_go_txt").val();
  var seat_back_txt=$("#seat_back_txt").val();
  //var booking_date_txt=$("#booking_date_txt").val();
  var type_passenger_txt=$("#type_passenger_txt").val();

  
    var booking_price_total_txt=$("#booking_price_total_txt").val();
    var note_txt =$("#note_txt").val();
    var go_back_booking_flag_txt=0;
    var booking_date_txt = enumerateDaysBetweenDates(date_from_txt, date_to_txt);




  
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
         "date_from":date_from_txt,
        // "time_from":time_from_txt,
         "date_to":date_to_txt,
        // "time_to":time_to_txt,
        // "general_passenger":general_passenger_txt,
        // "special_passenger":special_passenger_txt,
        // "babies_passenger":babies_passenger_txt,
        // "free_passenger":free_passenger_txt,
        "note":note_txt,
        "booking_price_total":booking_price_total_txt,
        "go_back_booking_flag":go_back_booking_flag_txt,

        

  
        "boat_go":boat_txt,
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
        //console.log(data);
        if(data.status==200){
  
          alert('updeated ok');
          //window.location.reload();
          $("#BookingModal").modal("hide");
          
          
        }
      }
    });
      
  }

  var validateBookingFn=function(){
		var validate="";


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
	 
	 	
	 
     if($("#date_from_txt").val()==""){
      validate+="<i class=\"fa fa-warning\"></i> ระบุวันที่เดินทางด้วยครับ <br>";
    }
    if($("#time_from_txt").val()==""){
      validate+="<i class=\"fa fa-warning\"></i> ระบุเวลาเดินทางด้วยครับ <br>";
    }



		if($("#goBackBooking").prop("checked")==true){

      if($("#date_to_txt").val()==""){
        validate+="<i class=\"fa fa-warning\"></i> ระบุวันที่กลับด้วยครับ <br>";
      }
      if($("#time_to_txt").val()==""){
        validate+="<i class=\"fa fa-warning\"></i> ระบุเวลากลับด้วยครับ <br>";
      }
	 		
	 	}

	 	// if(moment(""+$("#date_from_txt").val()+"").isBefore(""+$("#date_to_txt").val()+"") || moment(""+$("#date_from_txt").val()+"").isSame(""+$("#date_to_txt").val()+"")){
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

  

  $(document).ready(function(){


    


    getCalendarDataFn();
    createHtmlSelectSeatGoAllFn(sessionStorage.getItem("seatGoAll"));
    createHtmlSelectSeatBackAllFn(sessionStorage.getItem("seatBackAll"));


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


    $("#goBackBooking").change(function(){

      calculationPrice();

    });

    $("#boat_txt").change(function(){
      //$(this).val();
      sessionStorage.setItem("seatGoAll", getVehicleSeatAllByBoatFn(boat_id=$(this).val()));
      //createHtmlSeatGoAllFn(sessionStorage.getItem("seatGoAll"));
      createDisplayHtmlSeatGoAllAndAvalibleFn(sessionStorage.getItem("seatGoAll"));
      createHtmlSelectSeatGoAllFn(sessionStorage.getItem("seatGoAll"));
      
    });

    $("#boat_back_txt").change(function(){
      //$(this).val();
      sessionStorage.setItem("seatBackAll", getVehicleSeatAllByBoatFn(boat_id=$(this).val()));
      //createHtmlSeatBackAllFn(sessionStorage.getItem("seatBackAll"));
      createDisplayHtmlSeatBackAllAndAvalibleFn(sessionStorage.getItem("seatBackAll"));
      createHtmlSelectSeatBackAllFn(sessionStorage.getItem("seatBackAll"));
    });

    $("#around_boat_go_txt").change(function(){
      //$(this).val();
     
      //createHtmlSeatBackAllFn(sessionStorage.getItem("seatGoAll"));
      createDisplayHtmlSeatGoAllAndAvalibleFn(sessionStorage.getItem("seatGoAll"));
    });

    $("#around_boat_back_txt").change(function(){
      //$(this).val();
     
      //createHtmlSeatBackAllFn(sessionStorage.getItem("seatBackAll"));
      createDisplayHtmlSeatBackAllAndAvalibleFn(sessionStorage.getItem("seatBackAll"));
    });

    

    $("#boat_txt").click();
    $("#boat_back_txt").click();
    

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
        alert('add');

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



   

});

