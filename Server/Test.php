<?php
include 'Server.php';

// Check connection
if ($connectDB->connect_error) {
    die("Connection failed: " . $connectDB->connect_error);
}
else{
    echo "connect Success";
}
$sql= "SELECT * FROM class where classId = '1'";
if($result = $connectDB->query($sql)) {

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_array()) {
            echo "id: " . $row['className'] . "<br>" . $row['topic'] . "<br>" . $row['time'] . "<br>" . $row['tasks'] . "<br>";
        }
    } else {
        echo "0 results";
    }
}else{
    echo "ERROR:".$connectDB->error;
}