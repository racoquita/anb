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

	    $firstname = $_POST['firstname']; 
	    $lastname = $_POST['lastname']; 
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
			$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
		}

		$string_exp = "/^[A-Za-z .'-]+$/";
		if(!preg_match($string_exp,$firstname)) {
			$error_message .= 'The First Name you entered does not appear to be valid.<br />';
		}

		if(!preg_match($string_exp,$lastname)) {
			$error_message .= 'The Last Name you entered does not appear to be valid.<br />';
		}

		if(strlen($petname) < 2) {
			$error_message .= 'The Name of the Pet you entered do not appear to be valid.<br />';
		}

		if(strlen($error_message) > 0) {
			died($error_message);
		}

		$email_message = "Form details below.\n\n";

		function clean_string($string) {
      		$bad = array("content-type","bcc:","to:","cc:","href");
      		return str_replace($bad,"",$string);
    	}

    	$email_message .= "Pet Name: ".clean_string($petname)."\n"; 
    	$email_message .= "First Name: ".clean_string($firstname)."\n";
		$email_message .= "Last Name: ".clean_string($lastname)."\n";
		$email_message .= "Email: ".clean_string($email_from)."\n";
		$email_message .= "Phone: ".clean_string($phone)."\n";
		$email_message .= "Address: ".clean_string($address)."\n";
		$email_message .= "City: ".clean_string($city)."\n";
		$email_message .= "state: ".clean_string($state)."\n";
		$email_message .= "zip: ".clean_string($zip)."\n";

		$headers = 'From: ' .$email_from. "\r\n". 'Reply-To: ' .$email_from. "\r\n";

		if(mail($email_to, $email_subject, $email_message, $headers)) {
			echo "<p>Message sent successfully!</p>";
		} else {
			echo "<p>Message delivery failed.</p>";
		}

	}

?>