<?php


if( $_REQUEST['type'] == 'pets'){
	
	echo get_shelter_pets();

};
if($_REQUEST['type'] == 'shelter'){

	echo get_shelter();
};

function get_shelter(){

	$params = array(
		'key'	=> '3eabe8f8401bab71f5a49fa27935fef1',
		'id'	=> 'FL163',
	);
	
	$encoded_params = array();
	
	foreach ($params as $k => $v){
	
		$encoded_params[] = $k.'='. $v;
	}

	$url = "http://api.petfinder.com/shelter.get?".implode('&', $encoded_params);
	$rsp = simplexml_load_file($url);
	
	return json_encode($rsp);
}
function get_shelter_pets(){

	$params = array(
		'key'	=> '3eabe8f8401bab71f5a49fa27935fef1',
		'id'	=> 'FL163',
		'count' => '150',
		'output' => 'full'
	);
	
	$encoded_params = array();
	
	foreach ($params as $k => $v){
	
		$encoded_params[] = $k.'='. $v;
	}

	$url = "http://api.petfinder.com/shelter.getPets?".implode('&', $encoded_params);
	$rsp = simplexml_load_file($url);
	
	return json_encode($rsp, true);
}


?>