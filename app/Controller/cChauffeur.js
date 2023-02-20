var chauffeurPicturePath="";



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
			url:restURL+"/api/public/chauffeur/upload_file/"+id,
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
	if($("#actionChauffeur").val()=="add"){
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

var validateChauffeurFn=function(){
		var validate="";

		if($("#driver_license_txt").val()==""){
	 		validate+="Driver license not empty. \n";
	 	}
	 	if($("#chauffeur_name_txt").val()==""){
	 		validate+="Chauffeur name not empty. \n";
	 	}
	 	if($("#chauffeur_tel_txt").val()==""){
	 		validate+="Chauffeur tel not empty. \n";
	 	}

		
	 	
	 	return validate;
	}

var delImageFn = function(id){
	//stock/delete_file/
	$.ajax({
		url:restURL+"/api/public/chauffeur/delete_file",
		type:"post",
		dataType:"json",
		data:{"item_result_id":id},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			console.log(sessionStorage.getItem('galbalToken'));
			if(data.status==200){
				console.log("delete file success.");
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}
var delChauffeurFn = function(chauffeurID){
	
	$.ajax({
		url:restURL+"/api/public/chauffeur/"+chauffeurID,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				delImageFn(chauffeurID);
				getChauffeurDataFn();
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}

var clearChauffeurDataFn = function(){
	
	
	$("#picture_path_txt").val("");
	$("#driver_license_txt").val("");
	$("#chauffeur_name_txt").val("");
	$("#chauffeur_tel_txt").val("");
	$("#active_txt").prop("checked",true);
	$("#idChauffeur").val("");
	$("#actionChauffeur").val("add");
	
	
}

var findOneChauffeurDataFn = function(chauffeurID){
	$.ajax({
		url:restURL+"/api/public/chauffeur/"+chauffeurID,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){

			$("#driver_license_txt").val(data['driver_license']);
			$("#chauffeur_name_txt").val(data['chauffeur_name']);
			$("#chauffeur_tel_txt").val(data['chauffeur_tel']);
			$("#actionChauffeur").val("edit");
			$("#idChauffeur").val(data['chauffeur_id']);
			
		}
	});
};
var listChauffeurDataFn = function(data){
	/*listDataChauffeurArea*/
	var html="";
	$.each(data,function(index,indexEntry){
	
			console.log(indexEntry);

              html+="<div class=\"col-md-4\">";
                html+="<div class=\"box box-widget widget-user\">";
                  html+="<div class=\"widget-user-header bg-aqua-active\">";
                    html+="<h3 class=\"widget-user-username\">"+indexEntry['chauffeur_name']+"</h3>";
                    html+="<h5 class=\"widget-user-desc\">โทร."+indexEntry['chauffeur_tel']+"</h5>";
                  html+="</div>";
                  html+="<div class=\"widget-user-image\">";

                  	if(!indexEntry['doc_path']){
						html+="<img class=\"img-circle\" src=\"./dist/img/user1-128x128.jpg\" alt=\"User Avatar\">";
					}else{
						html+="<img class=\"img-circle\" src='"+restURL+"/api/public/"+indexEntry['doc_path']+"' alt=\""+indexEntry['chauffeur_name']+"\">";
						//html+="<td style='text-align:center;'> <img src='"+restURL+"/api/public/"+indexEntry['doc_path']+"' width='50px; height:50px;'></td>";		
					}

                    
                 
                  html+="</div>";
                  html+="<div class=\"box-footer\">";
                    html+="<div class=\"row\">";
                      html+="<div class=\"col-sm-4 border-right\">";
                        html+="<div class=\"description-block\">";
                          html+="<h5 class=\"description-header\">"+indexEntry['driver_license']+"</h5>";
                          html+="<span class=\"description-text\">ใบขับขี่</span>";
                        html+="</div>";
                      html+="</div>";
                       html+="<div class=\"col-sm-4\">";
                        html+="<div class=\"description-block\">";
                        if(indexEntry['active']==1){
                        	html+="<h5 style='color:green;' class=\"description-header\">พร้อม</h5>";
                        }else{
                        	html+="<h5 style='color:red;' class=\"description-header\">ไม่พร้อม</h5>";
                        }
                          
                          html+="<span class=\"description-text\">สถานะ</span>";
                        html+="</div>";
                      html+="</div>";
                      html+="<div class=\"col-sm-4\">";
                        html+="<div class=\"description-block\">";
                          html+="<h5 class=\"description-header\">";
                            html+="<i style='cursor:pointer; color:#f39c12 ' id='edit-"+indexEntry['chauffeur_id']+"' class=\" edit fa fa-fw fa-pencil\"></i>";
                            html+="<i style='cursor:pointer; color:#dd4b39 ' id='del-"+indexEntry['chauffeur_id']+"' class=\"del fa fa-trash-o\"></i>";
                          html+="</h5>";
                          html+="<span class=\"description-text\">จัดการ</span>";
                        html+="</div>";
                      html+="</div>";
                    html+="</div>";
                  html+="</div>";
                html+="</div>";
              html+="</div>";


	
	
	});
	$("#listDataChauffeurArea").html(html);
	
	
	//maanage
	$(".edit").click(function(){
		
		var id=this.id.split("-");
		id=id[1];
		//alert(id);
		$("#ChauffeurModal").modal("show");
		findOneChauffeurDataFn(id);
		return false
		
	});
	
	$(".del").click(function(){
		var id=this.id.split("-");
		id=id[1];
		if(confirm("Do you want to Delete this data.")){
			delChauffeurFn(id);	
		}
		return false
	});
	
  
	
}

var getChauffeurDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/chauffeur/index",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			listChauffeurDataFn(data);
			
			
		}
	});
	
}

var ChauffeurInsertFn = function(){
	
	/*
	$("#picture_path_txt").val("");
	$("#driver_license_txt").val("");
	$("#chauffeur_name_txt").val("");
	$("#chauffeur_tel_txt").val("");
	$("#active_txt").prop("checked",true);
	*/
	var activeTxt="";
	if($("#active_txt").prop("checked")==true){
		activeTxt="1";
	}else{
		activeTxt="0";
	}
	//alert(activeTxt);
	$.ajax({
		url:restURL+"/api/public/chauffeur",
		type:"post",
		dataType:"json",
		data:{
			"picture_path":$("#picture_path_txt").val(),
			"driver_license":$("#driver_license_txt").val(),
			"chauffeur_name":$("#chauffeur_name_txt").val(),
			"chauffeur_tel":$("#chauffeur_tel_txt").val(),
			"active":activeTxt,

		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
			
					$("#ChauffeurModal").modal("hide");
					uploadFiles(data['data']['chauffeur_id']);
					getChauffeurDataFn();

			}
		}
	});
		
}

var ChauffeurUpdateFn = function(){
	validateFn();
	var activeTxt="";
	if($("#active_txt").prop("checked")==true){
		activeTxt="1";
	}else{
		activeTxt="0";
	}

	
	$.ajax({
		url:restURL+"/api/public/chauffeur/"+$("#idChauffeur").val(),
		type:"patch",
		dataType:"json",
		data:{
			"driver_license":$("#driver_license_txt").val(),
			"chauffeur_name":$("#chauffeur_name_txt").val(),
			"chauffeur_tel":$("#chauffeur_tel_txt").val(),
			"active":activeTxt,
		},
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){

				if($("#picture_path_txt").val()){

					delImageFn($("#idChauffeur").val());
					uploadFiles($("#idChauffeur").val())

				}

				$("#ChauffeurModal").modal("hide");
				getChauffeurDataFn();
			}
		}
	});
		
}
$(document).ready(function(){
	

	//getConfigDataFn();
	//alert(chauffeurPicturePath);

	$("#addChauffeur").click(function(){
		clearChauffeurDataFn();
		$("#ChauffeurModal").modal("show");
	});
	 //get data
	 getChauffeurDataFn();
	 
	$("#btnSubmit").click(function(){
		
		if(validateChauffeurFn()!=""){
			alert(validateChauffeurFn());
			return false;
		}
		if($("#actionChauffeur").val()=="add"){
			

			ChauffeurInsertFn();

		}else{
			ChauffeurUpdateFn();
		}
		
		
		
	
	});
	$("#btnReset").click(function(){
		clearChauffeurDataFn();
		$("#btnImageReset").click();
	});


	//if($("#actionChauffeur").val()=="edit"){
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