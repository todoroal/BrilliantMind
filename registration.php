<?php
    $nick = $_POST['nick']
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $password = $_POST['password'];
    $gender = $_POST['gender'];
    $emailaddress = $_POST['emailaddress'];
    $phonenumber = $_POST['phonenumber'];
    $address = $_POST['address'];
    $postalcode = $_POST['postalcode'];

    //Databas connection

    $conn = new mysqli('localhost', 'root', '', 'registration')
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