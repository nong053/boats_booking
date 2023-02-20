
$(document).ready(function(){

	checkSessionFn();	
	$("#logOut").click(function(){
		
		sessionStorage.removeItem('galbalToken');
		sessionStorage.removeItem('galbalUsername');
		//sessionStorage.clear();

		location.reload();
	});
	
	

	
	
});