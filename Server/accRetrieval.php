<?php
/**
 * Created by PhpStorm.
 * User: Aaron
 * Date: 17/06/2019
 * Time: 16:13
 */
include 'Server.php';
header("Access-Control-Allow-Origin: *");

if(isset($_POST['option'])){
    $option=$_POST['option'];

    if($option=='login'){
        login();
    }else if($option=='create'){
        create();
    }
}else{
    //header("Location: ../index.html");
    echo "oh noo";
    exit();
}

function create(){
    include 'Server.php';

    $name=$_POST['userName'];
    $email=$_POST['userEmail'];
    $pass=$_POST['userPass'];
    $conPass=$_POST['userConPass'];

    if(empty($name)||empty($email)||empty($pass)||empty($conPass)){
        echo ("empty");
    }else if(!filter_var($email,FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/",$name)){
        echo ("invalid params");
    }else if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        echo ("invalid email");
    }else if(!preg_match("/^[a-zA-Z0-9]*$/",$name)){
        echo ("invalid username".$email); //send back email to refill input field.
    }else if($pass !== $conPass){
        echo ("password mismatch");
    }else{

        $sql="SELECT userId FROM userlogin WHERE userName=?";
        $stmt=mysqli_stmt_init($connectDB);

        if(!mysqli_stmt_prepare($stmt,$sql)){
            echo("sql error");
            //echo "Error: ".mysqli_error($connectDB);
        }else{
            mysqli_stmt_bind_param($stmt,"s",$name);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resCheck=mysqli_stmt_num_rows($stmt);

            if($resCheck>0){
                echo ("name taken");
            }else{
                $sql="INSERT INTO userlogin (userName, userEmail, userPass) VALUES ( ?, ?, ?)";
                $stmt=mysqli_stmt_init($connectDB);
                if(!mysqli_stmt_prepare($stmt,$sql)) {
                    echo("sql error");
                }else{
                    $hashPass=password_hash($pass, PASSWORD_DEFAULT);

                    mysqli_stmt_bind_param($stmt,"sss",$name,$email, $hashPass);
                    mysqli_stmt_execute($stmt);
                    echo("create success");
                }

            }
        }
    }

    mysqli_stmt_close($stmt);
    mysqli_close($connectDB);
}

function login(){
    include 'Server.php';

    $mailUname=$_POST['mailUsername'];
    $pass=$_POST['userPass'];

    if(empty($mailUname)||empty($pass)){
        echo ("empty");
    }else{
        $sql="SELECT * FROM userlogin WHERE userName=? OR userEmail=?;";
        $stmt=mysqli_stmt_init($connectDB);

        if(!mysqli_stmt_prepare($stmt,$sql)) {
            echo("sql error");
            //echo "Error: ".mysqli_error($connectDB);
        }else{
            mysqli_stmt_bind_param($stmt,"ss",$mailUname,$mailUname);
            mysqli_stmt_execute($stmt);
            $result=mysqli_stmt_get_result($stmt);

            /*$sql ="SELECT * FROM userlogin WHERE userName='".$mailUname."' OR userEmail='".$mailUname."';";
            $result = mysqli_query($connectDB, $sql); */

            if($row=mysqli_fetch_assoc($result)){
                $passCheck=password_verify($pass,$row['userPass']);

                if($passCheck==false){
                    echo("wrong password");
                }else if($passCheck==true){
                    session_start();
                    $_SESSION['userId']=$row['userId'];
                    $_SESSION['userName']=$row['userName'];

                    echo("login success:".$row['userId']);
                }else{
                    echo("login error");
                }

            }else{
                echo("no user");
            }
        }
    }
}
