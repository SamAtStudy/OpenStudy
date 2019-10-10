<?php
include 'Server.php';
header("Access-Control-Allow-Origin: *");

if(!$connectDB){
    echo "Failed to connect to MySQL: Error" . mysqli_connect_error();
}
/*
if(isset($_POST['classId'])) {
    retrieveGroup();
}*/

if(isset($_POST['tiles']) && isset($_POST['numRows'])  && isset($_POST['retrieveOption'])) {
    $retrieveOption=$_POST['retrieveOption'];
    if($retrieveOption=='userGroups' && isset($_POST['userId'])){
        retrieveUserGroupTiles();
    }else if($retrieveOption=='searchGroups' && isset($_POST['search'])){
        retrieveSearchGroupTiles();
    }else if($retrieveOption=='groups'){
        retrieveGroupTiles();
    }else if($groupTileJoinId !==null && isset($_post['suserId'])){
      joinGroup();
    }

}


if(isset($_POST['rowHeight'])){
    $rowHeight=$_POST['rowHeight'];
    if($rowHeight=='users' && isset($_POST['userId']) ){
        checkUserRowHeight();
    }else if($rowHeight=='search' && isset($_POST['search']) ){
        checkSearchRowHeight();
    }else if($rowHeight=='groups'){
        checkRowHeight();
    }

}


if(isset($_POST['email'])){
    Updatemail();
}

function checkRowHeight(){
    include 'Server.php';
    $rowHeight=$_POST['rowHeight'];

    $sql = "SELECT groupId FROM groups";
    $result = mysqli_query($connectDB, $sql);
    $num_rows = mysqli_num_rows($result);

    echo $num_rows;
}

function checkUserRowHeight(){
    include 'Server.php';
    $userId=$_POST['userId'];

    $sql = "SELECT groupMembers.groupId FROM groups JOIN groupMembers on groups.groupId = groupMembers.groupId JOIN userlogin on groupMembers.userId = userlogin.userId WHERE groupMembers.userId =  ".$userId.";";
    $result = mysqli_query($connectDB, $sql);
    $num_rows = mysqli_num_rows($result);

    echo $num_rows;
}

function checkSearchRowHeight(){
    include 'Server.php';
    $q=$_POST['search'];

    $sql = "SELECT groupId,groupName,groupLocation FROM groups WHERE groupName LIKE '%".$q."%' OR groupLocation LIKE '%".$q."%'";
    $result = mysqli_query($connectDB, $sql);
    $num_rows = mysqli_num_rows($result);

    echo $num_rows;
}

function retrieveGroupTiles(){
    //$tiles=$_POST['tiles'];
    //echo $tiles;

    //$numRows=$_POST['numRows'];
    //echo $numRows;

    include 'Server.php';
    $tiles=$_POST['tiles'];
    $numRows=$_POST['numRows'];
    //echo $tiles;

    if(7<$numRows){
        $numRows=$numRows-8;
    }else{
        $tiles=$numRows;
        $numRows=0;
    }

    $sql = "SELECT * FROM groups LIMIT ".$numRows.",".$tiles;
    $result = mysqli_query($connectDB, $sql);

    $resultAr= array();
    while ( $row = $result->fetch_assoc()){
        $resultAr[]=$row;
    }

    //Debugging array
    //print_r($resultAr);

    //header("Location: ./index.php?bookInfo=success");
    //print_r($resultAr);
    echo json_encode($resultAr,JSON_UNESCAPED_UNICODE);
}
function retrieveUserGroupTiles(){
    //$tiles=$_POST['tiles'];
    //echo $tiles;

    //$numRows=$_POST['numRows'];
    //echo $numRows;

    include 'Server.php';
    $userId= $_POST['userId'];
    $tiles=$_POST['tiles'];
    $numRows=$_POST['numRows'];

    if(2<$numRows){
        $numRows=$numRows-3;
    }else{
        $tiles=$numRows;
        $numRows=0;
    }


    $sql = "SELECT groupMembers.groupId, groups.groupName,groups.groupDescription, groups.groupLocation, groups.groupDate,groups.groupFrequency,groups.groupEnd,groups.groupStart,groups.groupImg,groups.groupResource1,groups.groupResource2,groups.groupResource3,groups.dateCreated FROM groups JOIN groupMembers on groups.groupId = groupMembers.groupId JOIN userlogin on groupMembers.userId = userlogin.userId WHERE groupMembers.userId = ".$userId." LIMIT ".$numRows.",".$tiles;
    $result = mysqli_query($connectDB, $sql);

    $resultAr= array();
    while ( $row = $result->fetch_assoc()){
        $resultAr[]=$row;
    }

    //Debugging array
    //print_r($resultAr);

    echo json_encode($resultAr,JSON_UNESCAPED_UNICODE);
}
function retrieveSearchGroupTiles(){
    //$tiles=$_POST['tiles'];
    //echo $tiles;

    //$numRows=$_POST['numRows'];
    //echo $numRows;

    include 'Server.php';
    $q=$_POST['search'];
    $tiles=$_POST['tiles'];
    $numRows=$_POST['numRows'];

    if(7<$numRows){
        $numRows=$numRows-8;
    }else{
        $tiles=$numRows;
        $numRows=0;
    }


    $sql = "SELECT * FROM groups WHERE groupName LIKE '%".$q."%' OR groupLocation LIKE '%".$q."%'";
    $result = mysqli_query($connectDB, $sql);

    $resultAr= array();
    while ( $row = $result->fetch_assoc()){
        $resultAr[]=$row;
    }

    //Debugging array
    //print_r($resultAr);

    echo json_encode($resultAr,JSON_UNESCAPED_UNICODE);
}
function joinGroup(){
    include 'Server.php';
    $userId= $_POST['userId'];
    $groupId= $_POST['targetId'];

    $sql = "INSERT INTO `groupMembers` (`userId`, `groupId`, `admin`) VALUES (".$userId.", ".$groupId.", 0)";
    if(mysqli_query($connectDB, $sql)){
        echo "New record created successfully";
    }else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }


}
/*
function retrieveTiles(){
    //$tiles=$_POST['tiles'];
    //echo $tiles;

    //$numRows=$_POST['numRows'];
    //echo $numRows;


    include 'Server.php';
    $tiles=$_POST['tiles'];
    $numRows=$_POST['numRows'];
    $numRows=$numRows-7;


    $sql = "SELECT * FROM coursedata LIMIT ".$numRows.",".$tiles;
    $result = mysqli_query($connectDB, $sql);

    $resultAr= array();
    while ( $row = $result->fetch_assoc()){
        $resultAr[]=$row;
    }

    //Debugging array
    //print_r($resultAr);

    //header("Location: ./index.php?bookInfo=success");
    echo json_encode($resultAr,JSON_UNESCAPED_UNICODE);
}

function retrieveCourse(){
    include 'Server.php';
    $courseID=$_POST['courseID'];

    $sql = "SELECT * FROM coursedata WHERE courseID=".$courseID;
    //$sql = "SELECT * FROM courseData WHERE courseID=19";
    $result = mysqli_query($connectDB, $sql);

    $resultAr= array();
    while ( $row = $result->fetch_assoc())  {
        $resultAr[]=$row;
    }

    //Debugging array
    //print_r($resultAr);

    //header("Location: ./index.php?bookInfo=success");
    echo json_encode($resultAr,JSON_UNESCAPED_UNICODE);
}
*/
function retrieveClass(){
    include 'Server.php';
    $classId=$_POST['classId'];

    $sql = "SELECT * FROM class WHERE classId=".$classId;
    //$sql = "SELECT * FROM courseData WHERE courseID=19";
    $result = mysqli_query($connectDB, $sql);

    $resultAr= array();
    while ( $row = $result->fetch_assoc())  {
        $resultAr[]=$row;
    }

    //Debugging array
    //print_r($resultAr);

    //header("Location: ./index.php?bookInfo=success");
    echo json_encode($resultAr,JSON_UNESCAPED_UNICODE);
}
/*
function Updatemail(){
    include 'Server.php';
    $email = $_POST['email'];
    $sql = "INSERT INTO `mlistdata`(`email`) VALUES ('$email')";
    if(mysqli_query($connectDB, $sql)) {

    }
    else{
        echo mysqli_error($connectDB);
    }
}


*/