<?php
include 'indexHeader.php';
?>

    <div id="headerCardContainer" class="gmd-1">
        <div id="headerCardStep">
            <div id="headerCard" class="card gmd-3">
                <div class="card-body p-4">
                    <div class="p-2 mb-2 d-flex justify-content-center">
                        <h3 id="headerCardTitle">Find the right group for you</h3>
                    </div>
                    <div class="p-2 my-2 d-flex justify-content-center">
                        <input class="form-control" id="headerForm" data-toggle="tooltip" data-placement="right" title="" placeholder="Search">
                    </div>
                    <div>
                        <button id="headerCardBtn" type="button" class="btn btn-info btn-block btn-round mx-auto mt-4" onclick="searchHomeHeader();">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <ul class="rslides indexHeaderImgs" id="homeHeader">
            <li><img class="indexHeaderImg" src="img/1.jpg" alt=""></li>
            <li><img class="indexHeaderImg" src="img/2.jpg" alt=""></li>
            <li><img class="indexHeaderImg" src="img/3.jpg" alt=""></li>
        </ul>
    </div>

    <div id="headerMobileCard" class="card">
        <div class="card-body p-3">
            <div class="p-2 d-flex justify-content-center">
                <h3 id="headerMobileCardTitle">Find the right group for you</h3>
            </div>
            <div class="p-2 d-flex justify-content-center">
                <input class="form-control" id="headerMobileForm" data-toggle="tooltip" data-placement="right" title="" placeholder="Search">
            </div>
            <div>
                <button id="headerMobileCardBtn" type="button" class="btn btn-info btn-block btn-round mx-auto mt-2" onclick="searchHomeMobileHeader();">Search</button>
            </div>
        </div>
    </div>


    <div class="my-auto py-5" id="indexDevContainer">
        <div class="my-5">
            <div class="d-flex justify-content-center">
                <img src="img/icons/development.png" id="indexDevImg" class="p-2 my-xl-4 my-5 ml-xl-5 ml-3">
            </div>
            <div class="mb-sm-3 mt-sm-1 mb-5 mt-3" id="indexDevContentContainer">
                <h2 id="indexDevContent" class="text-center">
                    This Website is currently in development.
                    <br>
                    All Groups on the site are for
                    <br>
                    demo purposes only.
                </h2>
            </div>
        </div>
    </div>
    <br>
    <br>
<?php
include 'footer.php';
?>
