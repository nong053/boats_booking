<meta charset charset=UTF-8>
<?php
require_once '../PHPWord.php';

$PHPWord = new PHPWord();

$document = $PHPWord->loadTemplate('Template.docx');

// Write data from MySQL result
$booking_id=$_GET['booking_id'];
$objConnect = mysql_connect("localhost","root","") or die("Error Connect to Database");
	$objDB = mysql_select_db("booking_car_db");
	mysql_query("SET NAMES utf8");  
	//mysql_set_charset(charset)
	if($objDB){
		echo "ok";
	}
$srtSQL="";
// $srtSQL="SELECT b.* ,p.*
// FROM booking_car_db.booking b 
// left join profile p on b.user_id=p.profile_id
// where b.booking_id=$booking_id;
// ";
$strSQL="

SELECT b.* ,p.*
 FROM booking_car_db.booking b 
 left join profile p on b.user_id=p.profile_id
 where b.booking_id=".$booking_id."";

$objQuery = mysql_query($strSQL);
$objResult = mysql_fetch_array($objQuery);
echo $objResult['ACTIVE_FLAG'];
echo $objResult['ADDRESS'];
echo $objResult['FIRST_NAME'];

echo $objResult['LAST_NAME'];
echo $objResult['GENDER'];
echo $objResult['POSITION'];
echo $objResult['as_the_name'];
echo $objResult['at_the_place'];
echo $objResult['chauffeur_other'];
echo $objResult['date_from'];
echo $objResult['date_to'];


echo $objResult['from1'];
echo $objResult['from2'];
echo $objResult['from3'];
echo $objResult['from4'];

// ACTIVE_FLAG: null
// ADDRESS: null
// CREATED_BY: null
// CREATED_DATE: null
// DATE_OF_BIRTH: null
// FIRST_NAME: null
// GENDER: null
// LAST_NAME: null
// NATIONALITY: null
// POSITION: null
// RELIGION: null
// STATUS: null
// TITLE: null
// UPDATED_BY: null
// UPDATED_DATE: null
// approved_status: "Y"
// approved_status_reason: ""
// as_the_name: "วัดโพธิ์ชัย"
// assign_status: null
// at_the_place: "วัดโพธิ์ชัยบ้านดงหมู อำเภอเขาวง จังหวัดกาฬสินธ์"
// baggage_weight: null
// booking_id: 1
// booking_status: null
// chauffeur_id: 1
// chauffeur_other: "จ.ต.นัฏพงษ์ ดากาวงศ์33333"
// created_date: "2019-04-04"
// date_from: "2019-05-05"
// date_to: "2019-05-08"
// district: "เขาวง"
// email: null
// from1: null
// from2: null
// from3: null
// from4: null
// fuel_lite: null
// fuel_type: null
// near_place: null
// number_of_people: 22
// operator_position: "ผลขับ"
// password: null
// pick_up_at: null
// profile_id: null
// province: "กาฬสินธ์"
// purpose: "เพื่อไปทอดผ้าป่าสร้างโบสถ์วัดโพธิ์ชัย2"
// role: null
// stage: 1
// sub_district: "คุ้มเก่า"
// time_from: "00:00:00"
// time_to: "00:00:00"
// to1: null
// to2: null
// to3: null
// to4: null
// updated_date: "2019-05-20"
// user_id: 2
// vehicle_id: 1
// vehicle_operator: "จ.ต.วีรชัย ศิลป"



$document->setValue('Value1', 'Sun');
$document->setValue('Value2', 'Mercury');
$document->setValue('Value3', 'Venus');
$document->setValue('Value4', 'Earth');
$document->setValue('Value5', 'Mars');
$document->setValue('Value6', 'Jupiter');
$document->setValue('Value7', 'Saturn');
$document->setValue('Value8', 'Uranus');
$document->setValue('Value9', 'Neptun');
$document->setValue('Value10', 'Pluto');

$document->setValue('weekday', date('l'));
$document->setValue('time', date('H:i'));

$document->save('Solarsystem.docx');
?>