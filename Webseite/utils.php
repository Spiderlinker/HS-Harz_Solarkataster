<?php

function getValue($key){
    $defaultValuesRaw = file_get_contents('default_values.json');
    $defaultValuesJson = json_decode($defaultValuesRaw, true);

    return $defaultValuesJson[$key];
}

?>