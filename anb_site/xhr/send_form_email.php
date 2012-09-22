<?php 

	if(isset($_POST['petname'])) {

		$email_to = "rstovall@me.com";
    	$email_subject = "I'm interested in a pet from your shelter";

		function died($error) {
	        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
	        echo "These errors appear below.<br /><br />";
	        echo $error."<br /><br />";
	        echo "Please go back and fix these errors.<br /><br />";
	        die();
	    }

	    if(!isset($_POST['petname'])) {
	    	died('We are sorry, but there appears to be a problem with the form you submitted.');       
	    }

	    $first_name = $_POST['firstname']; // required
	    $last_name = $_POST['lastname']; // required
	    $email_from = $_POST['email']; // required
	    $phone = $_POST['phone']; // not required
	    $petname = $_POST['petname']; // required
	    $address = $_POST['address'];
	    $city = $_POST['city'];
	    $state = $_POST['state'];
	    $zip =$_POST['zip'];

	    echo "Testing Form to Email";
	}

?>