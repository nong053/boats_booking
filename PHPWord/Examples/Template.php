<?php
require_once '../PHPWord.php';

$PHPWord = new PHPWord();

$document = $PHPWord->loadTemplate('Template.docx');

// Write data from MySQL result
/*
	$objConnect = mysql_connect("localhost","root","root") or die("Error Connect to Database");
	$objDB = mysql_select_db("mydatabase");
	$strSQL = "SELECT * FROM customer";
	$objQuery = mysql_query($strSQL);
	while($objResult = mysql_fetch_array($objQuery))
	{
		// Add more rows / cells
		$table->addRow();
		$table->addCell(1500)->addText($objResult["CustomerID"]);
		$table->addCell(1500)->addText($objResult["Name"]);
		$table->addCell(1500)->addText($objResult["Email"]);
		$table->addCell(1500)->addText($objResult["CountryCode"]);
		$table->addCell(1500)->addText($objResult["Budget"]);
		$table->addCell(1500)->addText($objResult["Used"]);
	}
*/
	
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