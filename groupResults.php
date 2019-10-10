<?php
include 'header.php';
?>

<!-- HEADER -->
<div id="groupResultsHeader"class="pt-5">
    <h2 class="text-center" style="opacity:0.8">You Searched For</h2>
    <h1 class="text-center">" <span id="userSearchRes"></span> "</h1>
</div>

<br>
<div class = "container-fluid">
    <div class="row justify-content-between mx-xl-5 mx-3 mt-xl-5 mt-3">
        <div class="mx-md-4 mx-lg-3 mx-xl-4 mb-n3 mb-lg-n4 mb-xl-n5">
            <h2 class="ml-xl-3 mb-3" style="font-weight:700;">Groups</h2>
        </div>
        <div class="mx-md-4 mx-lg-3 mx-xl-4 mb-n3 mb-lg-n4 mb-xl-n5">
            <div class="dropdown mr-xl-3">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="sortDropdownMenuBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort By
                </button>
                <div class="dropdown-menu gmd-2" aria-labelledby="sortDropdownMenuBtn" id="sortDropdownMenu">
                    <a class="dropdown-item" href="#">Most Members</a>
                    <a class="dropdown-item" href="#">Least Members</a>
                    <a class="dropdown-item" href="#">Newest</a>
                </div>
            </div>
        </div>
    </div>
    <div class="row m-xl-5 m-3" id="groupResTileContainer">
    </div>
    <div class="row">
        <div class="col-12 my-5 mx-auto">
            <div id="test"></div>
            <button id="loadMoreResults" onclick="groupResults('example');" type="button" class="mx-auto btn btn-lrg my-5 gmd-1" style="display:block; width:60%; background: teal; color:white; border-radius: 30px; height:70px; font-size: 1.5rem; padding:10px;">Load More</button>
            <h1 id="noResults" class="my-5 text-center" style="display:none;"> No More Results . . .</h1>
        </div>
    </div>
</div>
<br>
<?php
include 'groupResFooter.php';
?>
