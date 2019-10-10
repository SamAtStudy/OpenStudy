<?php
include('Server.php');
$results = mysqli_query($connectDB, "SELECT * FROM groups where groupId = '1'");
$classes = mysqli_query($connectDB, "SELECT groupMembers.groupId, groups.groupName,groups.groupDescription, groups.groupLocation, groups.groupDate,groups.groupFrequency,groups.groupEnd,groups.groupStart,groups.groupImg,groups.groupResource1,groups.groupResource2,groups.groupResource3,groups.dateCreated FROM groups JOIN groupMembers on groups.groupId = groupMembers.groupId JOIN userlogin on groupMembers.userId = userlogin.userId WHERE groupMembers.userId = x");
?>

<?php
include 'header.php';
?>

<div id="userHeaderContainer">
    <div id="userHeaderBody" class="mx-auto d-flex justify-content-center">
        <div id="headerUserProfile" class="mt-xl-5 mt-4">
            <img src="img/Andriy.jpg" class="rounded-circle float-left gmd-1 ml-n4" id="headerUserIcon">
            <div class="ml-3 mt-1 float-left" style="color:white;">
                <span id ="firstName" style="font-size:24px;"></span>
                <p style="opacity:0.85;" class="mt-n1"><span style="font-size:16px;"><span id = "userName" style="font-size:12px;"></span></span></p>
            </div>
        </div>
    </div>
</div>

<div id="bodyContainer" style="min-height: 75vh;">

    <div class="row justify-content-between mx-xl-5 mx-3 mt-xl-5 mt-5">
        <div class="mx-md-4 mx-lg-3 mx-xl-4 mb-n3 mb-lg-n4 mb-xl-n5">
            <h2 class="ml-xl-3" style="font-weight:700;">Groups</h2>
        </div>
        <div class="mx-md-4 mx-lg-3 mx-xl-4 mb-n3 mb-lg-n4 mb-xl-n5">
            &nbsp
        </div>
    </div>

    <div class = "container-fluid">
        <div class="row m-xl-5 m-3" id="groupResTileContainer">
        </div>
    </div>

    <div class="row justify-content-xl-center justify-content-between mx-xl-5 mx-3 mt-xl-5 mt-5">
        <div class="mx-md-4 mx-lg-3 mx-xl-4 mb-n3 mb-lg-n4 mb-xl-n5">
            <h2 class="ml-xl-3 mb-xl-5" style="font-weight:700;">Classes</h2>
        </div>
        <div class="mx-md-4 mx-lg-3 mx-xl-4 mb-n3 mb-lg-n4 mb-xl-n5">
            &nbsp
        </div>
    </div>

    <div id="classTileContainer">
        <!-- CLASS TILE ROW -->
        <div class="row classTileRow pb-5 mb-5" style="display:block;">
            <div class="col-11 col-xl-7 mx-auto my-5">
                <div class="classTile card text-center gmd-1">
                    <form class="card-body m-xl-2">

                        <!-- Class Tile options -->
                        <div class="dropdown show">
                            <img src="img/icons/menu.svg" id="classTileOptionsIcon" data-toggle="dropdown"
                                 aria-haspopup="true" aria-expanded="false">
                            <div class="dropdown-menu gmd-1" aria-labelledby="classTileOptions"
                                 id="classTileOptionsDropdown">
                                <a class="dropdown-item" href="#" id="classTileEdit" onclick="editClassTile()">Edit</a>
                                <a class="dropdown-item" href="#" id="classTileSave" onclick="saveClassTile()"
                                   style="display:none;">Save</a>
                                <a class="dropdown-item" href="#">Pin</a>
                                <a class="dropdown-item" href="#">Mute Notifications</a>
                                <a class="dropdown-item" href="#">Delete Class</a>
                            </div>
                        </div>
                        <?php while ($row= mysqli_fetch_array($results)):?>
                        <!-- Class Tile Header -->
                        <div class="classTileHeader">
                            <h3 class="card-title classTileTitle"><span id="classTileName" class="editHighlight"
                                                                        contenteditable="false"
                                                                        data-placeholder="<?php echo $row['groupName'];?>"></span></h3>
                            <p class="card-subtitle text-muted classTileSubtitle"><img src="img/icons/calendar.svg"
                                                                                       class="classTileIcon"><span
                                    id="classTileDate" class="editHighlight" contenteditable="false"
                                    data-placeholder="Time and Date"></span><?php echo $row['time'];?></p>
                            <p class="card-subtitle text-muted classTileSubtitle"><img
                                    src="img/icons/location-point.svg" class="classTileIcon"><span
                                    id="classTileLocation" class="editHighlight" contenteditable="false"
                                    data-placeholder="Location"></span><?php echo $row['location'];?></p>
                            <h3 class="card-title mt-xl-3 mt-2"><span id="classTileTopic" class="editHighlight"
                                                                      contenteditable="false"
                                                                      data-placeholder="Current Topic"></span></h3>
                        </div>
                        <?php endwhile;?>

                        <!-- Class Tile Announcement -->
                        <div class="mt-xl-4 mx-xl-5 text-center" id="classTileAnnounce">
                            <div class="classTileAnnounceStep mt-2 mb-2 mx-2">
                                <p><img src="img/icons/information.svg" class="mr-1 classTileAnnounceIcon"> <span
                                        onkeydown="verifyAnnouncement(this)" contenteditable="true"
                                        data-placeholder="Announcement" id="classTileAnnounceText"></span></p>
                            </div>
                        </div>
                        <div class="mt-xl-4 mx-xl-5 text-center" id="classTileNewAnnounce">
                            <div class="classTileAnnounceStep mt-2 mb-2 mx-2">
                                <p><img src="img/icons/add-button.svg" class="mr-1 classTileAnnounceIcon"
                                        onclick="newAnnouncement()"> <span
                                        id="classTileAnnounceText">New Announcement </span></p>
                            </div>
                        </div>

                        <!-- Class Tile Tasks -->
                        <div class="classTileBody my-3 my-xl-4 mx-xl-5 text-left">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="taskDropdownMenuBtn"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Tasks
                                </button>
                                <div class="dropdown-menu gmd-2" aria-labelledby="taskDropdownMenuBtn"
                                     id="taskDropdownMenu">
                                    <a class="dropdown-item" href="#">Week 0</a>
                                    <a class="dropdown-item dropdownNewTaskList" href="#" onclick="newTaskList()"><img
                                            src="img/icons/add-button.svg" class="classTileNewTaskDropIcon"> <span
                                            style="margin-left:0.25rem;">New Task List</span>
                                    </a>
                                </div>
                            </div>
                            <div class="row my-1 mx-4 my-xl-3 mx-xl-5 w1" id="taskList">
                                <div class="classTileGoal custom-control-lg custom-checkbox my-2 col-md-12 col-xl-4">
                                    <input type="checkbox" class="custom-control-input" id="customCheck2" disabled>
                                    <label class="custom-control-label" for="customCheck2"><span contenteditable="false"
                                                                                                 data-placeholder="Task 1"
                                                                                                 class="editHighlight"
                                                                                                 style="color:black;"></span></label>
                                </div>
                                <div
                                    class="classTileGoal classTileNewTask custom-control-lg custom-checkbox my-2 col-md-12 col-xl-4">
                                    <img src="img/icons/add-button.svg" class="classTileNewTaskIcon"
                                         onclick="newTask()"><span style="margin-left:0.5rem;">New Task</span>
                                </div>
                            </div>
                        </div>
                        <!-- Class Tile Comments -->
                        <div class="text-center text-xl-left m-1 mx-xl-5">
                            <a style="color:black;" data-toggle="collapse" href="#commentCollapse" role="button"
                               aria-expanded="false" aria-controls="collapseExample">
                                <img src="img/icons/thread.svg" class="mr-1 ml-xl-2 mr-xl-2 classTileCommentIcon">Show
                                Comments (<span id="classTileCommentNum">0</span>)
                            </a>
                        </div>
                        <div class="collapse mt-2 mt-n-3 mx-n3 mb-n3 mx-xl-n4 mb-xl-n4" id="commentCollapse">
                            <div class="card card-body classTileCommentBody p-4">
                                <div class="step px-xl-5 py-xl-2">
                                    @Sam
                                    <form method="POST" id="comment_form">
                                        <div class="form-group">
                                            <textarea name="comment_content" id="comment_content" class="form-control"
                                                      placeholder="Enter Comment" rows="5"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <input type="hidden" name="comment_id" id="comment_id" value="0"/>
                                            <input type="submit" name="submit" id="submit" class="btn btn-info"
                                                   value="Submit"/>
                                        </div>
                                    </form>
                                    <span id="comment_message"></span>
                                    <br/>
                                    <div id="display_comment"></div>

                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!--SECTION 4 FOOTER -->
<div id="footerBox">
    <div class="row">
        <div class="col-12 col-xl-4 order-md-2">
            <div id="socialBox">
                <h4 id="socialLinkHeader">Follow Us On</h4>
                <div id="socialLinkBox" class="d-flex justify-content-center">
                    &nbsp
                    <button id="fbBtn" class="btn btn-primary"
                            style="border-radius: 12px; background-color:white; border-color: #b4e4da;"><img
                            src="img/icons/fbLogo.svg"></button>
                    <button id="twBtn" class="btn btn-primary buttonLeft"><img src="img/icons/twitterLogo.svg"></button>
                    <button id="inBtn" class="btn btn-primary buttonLeft"><img src="img/icons/Instagram.svg"></button>
                    <button id="lnBtn" class="btn btn-primary buttonLeft"><img src="img/icons/linkedin-logo.svg">
                    </button>
                </div>
            </div>
        </div>
        <div class="col-12 col-xl-4 order-md-1">
            <div id="aboutUsBox">
                <img src="img/Logo2White.png" style="width:100%;">
                <a href="#" id="aboutUsBtn" data-toggle="modal" data-target="#aboutModal"> Who Are We? </a>
            </div>

            <!-- About Us Modal-->
            <div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content" id="aboutUsContent">
                        <div class="modal-body">
                            <button type="button" class="loginClose" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div id="aboutModalContent">

                                <!--Our Mission-->
                                <h4>Our Mission</h4>
                                <!-- <hr style="width: 40%"> -->
                                <div class="row">
                                    <div class="col">
                                        <div class="container-fluid" id="aboutUsText">
                                            Empower any learner* to effortlessly find the best resources and help them
                                            visualise their learning journey.
                                        </div>
                                        <br/>
                                        <div class="container-fluid" id="aboutUsText"
                                             style="font-size:0.6vw; opacity: 0.8;">
                                            *If you can think, you are a learner.
                                        </div>
                                    </div>
                                </div>


                                <!-- About Study -->
                                <h4>About Study</h4>
                                <div class="row">
                                    <div class="col">
                                        <div class="container-fluid" id="aboutUsText">
                                            We believe in the learner's natural need for the best learning.<br/>
                                            <br/>
                                            We quench this thirst by having all the best resources in one searchable
                                            location<br/>
                                            <br/>
                                            We then help them track not only what they've done in the past and present,
                                            but more importantly where their learning can advance to in the future.<br/>
                                        </div>
                                    </div>
                                </div>

                                <!-- Our Team -->
                                <h4>Our Team</h4>
                                <div class="row">
                                    <div class="col">
                                        <div class="container-fluid" id="aboutUsText">
                                            A small bunch on college students who are determined to help individuals see
                                            the value in what they're learning,
                                            and how their learning can take them to their deepest goals. You could call
                                            us the 'Avengers of Learning',
                                            or more realistically just your regular local boyband.
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-xl-4 order-md-3" style="margin-top:4vh;">
            <div style="margin:auto; margin-left:10px;">
                <span class="footerMiscInfo"> Contact: sam@study.ie</span>
                <br>
                <span class="footerMiscInfo"><a href="https://google.com" style="color:white;">Privacy Policy</a> &nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp <a
                        href="https://google.com" style="color:white;">Terms of Use</a></span>
                <br>
                <span class="footerMiscInfo"> Copyright © 2019 Study.ie. All rights reserved. </span>
            </div>
        </div>
    </div>
</div>
</body>
</html>
<!-- SCRIPTS -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/sweetalert.min.js"></script>
<script src="js/studyScript.js"></script>
<script>
    //Load User Profile
    userProfile();
    UsergroupResults();
    document.getElementById("userName").innerHTML = "@" + sessionStorage.getItem("mailUsername");
    document.getElementById("firstName").innerHTML = sessionStorage.getItem("mailUsername");
</script>