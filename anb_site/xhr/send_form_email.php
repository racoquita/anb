<?php 

	require 'jsonwrapper.php';

	if(isset($_POST['petname'])) {

		$email_to = "rstovall@me.com";

		function died($error) {
			echo json_encode(array(
				'status' => 'form_error', 
				'error_1' => 'We are very sorry, but there were error(s) found with the form you submitted. These errors appear below.',
				'error_msg' => $error,
				'error_2' => 'Please go back and fix these errors and resubmit your form.'
			));
	        die();
	    }

	    if(!isset($_POST['petname'])) {
	    	died('We are sorry, but there appears to be a problem with the form you submitted.');       
	    }

	    $choice = $_POST['choice'];
	    $firstname = $_POST['firstname']; 
	    $lastname = $_POST['lastname'];
	    $age = $_POST['age'];
	    $email_from = $_POST['email']; 
	    $phone = $_POST['phone']; 
	    $petname = $_POST['petname']; 
	    $address = $_POST['address'];
	    $city = $_POST['city'];
	    $state = $_POST['state'];
	    $zip =$_POST['zip'];
	    

	    $error_message = "";

	    function check_email_address($email) {
			if (!ereg("^[^@]{1,64}@[^@]{1,255}$", $email)) {
				return false;
			}

			$email_array = explode("@", $email);
			$local_array = explode(".", $email_array[0]);
			
			for ($i = 0; $i < sizeof($local_array); $i++) {
		    	if(!ereg("^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~-][A-Za-z0-9!#$%&↪'*+/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$", $local_array[$i])) {
		      		return false;
		    	}
		  	}

		  	if (!ereg("^\[?[0-9\.]+\]?$", $email_array[1])) {
		    	$domain_array = explode(".", $email_array[1]);
			    if (sizeof($domain_array) < 2) {
			        return false; // Not enough parts to domain
			    }
		    	for ($i = 0; $i < sizeof($domain_array); $i++) {
		      		if(!ereg("^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|↪([A-Za-z0-9]+))$", $domain_array[$i])) {
			        	return false;
			      	}
			    }
			}
			return true;
		}

		if(check_email_address($email_from) != true) {
			$error_message .= 'The Email Address you entered does not appear to be valid. ';
		}

		$string_exp = "/^[A-Za-z .'-]+$/";
		if(!preg_match($string_exp,$firstname)) {
			$error_message .= 'The First Name you entered does not appear to be valid. ';
		}

		if(!preg_match($string_exp,$lastname)) {
			$error_message .= 'The Last Name you entered does not appear to be valid. ';
		}

		if($age < 18) {
			$error_message .= 'You must be at least 18 years of age to adopt a pet from A New Beginning Pet Rescue. ';
		}

		if(strlen($petname) < 2) {
			$error_message .= 'The Name of the Pet you entered do not appear to be valid. ';
		}

		if(strlen($error_message) > 0) {
			died($error_message);
		}

		$email_subject = "I'm interested in " .$choice. "ing a pet from your shelter";
		$email_message = "Form details below.\n\n";

		function clean_string($string) {
      		$bad = array("content-type","bcc:","to:","cc:","href");
      		return str_replace($bad,"",$string);
    	}

    	$email_message .= "Interested in " .clean_string($choice)."\n"; 
    	$email_message .= "Pet Name: ".clean_string($petname)."\n"; 
    	$email_message .= "First Name: ".clean_string($firstname)."\n";
		$email_message .= "Last Name: ".clean_string($lastname)."\n";
		$email_message .= "Age: ".clean_string($age)."\n";
		$email_message .= "Email: ".clean_string($email_from)."\n";
		$email_message .= "Phone: ".clean_string($phone)."\n";
		$email_message .= "Address: ".clean_string($address)."\n";
		$email_message .= "City: ".clean_string($city)."\n";
		$email_message .= "State: ".clean_string($state)."\n";
		$email_message .= "Zip: ".clean_string($zip)."\n";

		$headers = 'From: ' .$email_from. "\r\n". 'Reply-To: ' .$email_from. "\r\n";

		if(mail($email_to, $email_subject, $email_message, $headers)) {
			echo json_encode(array('status' => 1, 'message' => 'Message sent successfully! Someone from A New Beginning will contact you shortly!'));
		} else {
			echo json_encode(array('status' => 0, 'message' => 'Message delivery failed.'));
		}

	}

?>