<?php

include 'courseHeader.php';

?>
    <!-- SECTION 1 OPTIONS -->
    <div id="sectionOneBox">
        <div class="row h-100" id="sectionOneStep">
            <div class="col-md-12" id="mobileCourseTitle">
                <h2 class="courseTitle"></h2>
            </div>
            <div class="col-xl-4 col-md-12">
                <div class="d-flex justify-content-center container-fluid mt-5">
                    <img id="courseImg" src="https://via.placeholder.com/320x180" alt="Card image cap">
                </div>
                <div id="courseSettingBox" class="d-flex justify-content-center container-fluid">
                    <div class="p-2 pt-4" id="courseSetting">Online</div>
                </div>
            </div>
            <div class="col-xl-8 col-md-12">
                <div class="container-fluid p-5">
                    <div>
                        <h2 class="courseTitle" id="desktopCourseTitle"></h2>
                        <br>
                        <p id="courseDesc"></p>
                        <br>
                        <span id="courseProvider"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION 2 ABOUT -->
    <div class="parallaxa gap-down" style="width:100%;"></div>
    <div class="container-fluid" id="sectionTwoBox">
        <div class="row h-100" id="sectionTwoStep" style=" height:50vh; margin: 10vh 12.5%;">
            <div class="col-xl-8 text-left">
                <div class="container-fluid p-5 text">
                    <div>
                        <h4 style="font-weight:600;">Course Structure</h4>
                        <br>
                        <p id="courseSubjects">
                        </p>
                        <br>
                        <h4 style="font-weight:600;">More Info</h4>
                        <br>
                        <p id="courseMoreInfo">
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="d-flex justify-content-end container-fluid mt-5">
                    <div class="pt-3 pb-4 pl-4 pr-4 text-center courseOptionsBox">
                        <div class="row">
                            <div class="mx-auto bookmarkIcon">
                                <img class="bookmarkIcon" id="courseBookmark" src="img/icons/notBookmarked.png" value="notBookmarked" data-toggle="tooltip" data-placement="bottom" title="Bookmark">
                            </div>
                        </div>
                        <hr style="margin-top:0px;">
                        <div class="row">
                            <div class="mx-auto">
                                <h5>Price: <span id="coursePrice"></span></h5>
                            </div>
                        </div>
                        <hr style="margin-top:0px;">
                        <div class="row">
                            <div class="mx-auto">
                                <h5><a href="#" id="courseLink" target="_blank">Link To Course</a></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION 3 EXPLANATIONS -->
    <div class="gap-up" style="background-color: #E7FEFC;">&nbsp</div>
    <div id="sectionThreeBox">
        <div id="sectionThreeStep" style="height:50vh;">
            <h1 class="text-center">Discussion</h1>
            <div class="h-100 text-center" id="courseNoThreads">
                <h3 class="pt-5" style="color:black;Font-weight:600"> There doesn't seem to be any threads . . .</h3>
            </div>
            <div id="courseThreads">
                <div class="row">
                    <div class="col-11 mt-3 mx-auto">
                        <div class="card card-body threadTile px-4">
                            <h5>Thread Title</h5>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-11 mt-3 mx-auto">
                        <div class="card card-body threadTile px-4">
                            <h5>Thread Title</h5>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-11 mt-3 mx-auto">
                        <div class="card card-body threadTile px-4">
                            <h5>Thread Title</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php

include 'footer.php';

?>