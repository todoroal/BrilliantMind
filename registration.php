<?php
    $cfg['Console']['Mode'] = 'show';
    $cfg['Server']['hide_db'] = '';
    $cfg['Server']['only_db'] = '';
    $cfg['lang'] = 'de';

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $password = $_POST['password'];
    $gender = $_POST['gender'];
    $emailaddress = $_POST['emailaddress'];
    $phonenumber = $_POST['phonenumber'];
    $address = $_POST['address'];
    $postalcode = $_POST['postalcode'];

    //Databas connection

    $conn = new mysqli('http://localhost/phpmyadmin/index.php?route=/database/structure&server=1&db=registration', 'root', '', 'registration')
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }
    else{
        $stmt = $conn->prepare("insert into registration(firstname, lastname, password, gender, emailaddress, phonenumber, address, postalcode)
            values(?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->blind_param("ssssssss", $firstname, , $lastname, $password, $gender, $emailaddress, $phonenumber, $address, $postalcode);
        $stmt ->execute();
        echo "Registration Successfully...";
        $stmt->close();
        $conn->close();
    }
?>