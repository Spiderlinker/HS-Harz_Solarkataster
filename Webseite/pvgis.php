<?php 

# Call PHP from JS:
# https://stackoverflow.com/questions/15757750/how-can-i-call-php-functions-by-javascript
# https://stackoverflow.com/a/15758129/3520992

header('Content-Type: application/json');
ini_set("allow_url_fopen", 1);

$result = array();

if(!isset($_POST['lat'])){
    $result['error'] = 'No lat!';
}

if(!isset($_POST['lon'])){
    $result['error'] = 'No lon!';
}

if( !isset($result['error']) ) {
    $response = file_get_contents('https://re.jrc.ec.europa.eu/api/MRcalc?lat='.$_POST['lat'].'&lon='.$_POST['lon'].'&outputformat=json&horirrad=1');
    $result['data'] = json_decode($response, true);
}

echo json_encode($result);
?>