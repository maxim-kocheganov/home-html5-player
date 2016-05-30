<?php

$dir          = "music/";
$return_array = array();

$newdir = null;
$path = null;
if (isset($_GET['directory'])) {
    $path = $_GET['directory'];
    
    $newdir = $dir . $path;
    
    $newdir = mb_convert_encoding($newdir, "utf-8", "windows-1251");
}

if(is_dir($newdir)){
    if($dh = opendir($newdir)){
        while(($file = readdir($dh)) != false){

            if($file == "." or $file == ".."){
                if($dir != $newdir)
                {
                    if($file != ".")
                    $return_array[] = $file;
                }
            } else {
            if(is_dir($newdir . $file)){
                $return_array[] = $file . "/"; // Add the file to the array
            }
            else {
                $return_array[] = $file;
            }
            }
        }
    }

    echo json_encode($return_array);
}

?>
