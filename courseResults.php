<?php

include 'courseResultsHeader.php';

?>
<div id="courseResHeader">
    <!-- <img src=""> -->
    <div style="background-color: teal; width: 100%; height:60vh; position: relative; z-index: 0;">
        <div class="container h-100">
            <div class="d-flex justify-content-center h-100">
                <div style="margin-top:13%;">
                    <div class="searchbar">
                        <input class="search_input" type="text" id="input" size="30" placeholder="Search...">
                        <a href="#" class="search_icon"><img src="img/icons/search.svg" style="height:70%;"></a>
                    </div>
                    <div id="livesearch" style="background: grey;padding: 15px;padding-top: 25px;width: 275px;color: white;border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;position: absolute;top: 32px;left: 163px;"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--FUTURE: Replace with SVG. Draw PNG then convert to SVG -->
<div style=" position: absolute; margin-top: -15vh; border-top-left-radius: 15vw; border-top-right-radius: 15vw; width: 100%; height:15vh;background-color: #f3fefd;"></div>

<div id="courseResContainer">
    <div class="container-fluid" id="resContainerStep">
        <!-- FUTURE: Expandable thread preview tile-->
        <!-- FIX: Data target removed from a tags surrounding course thread icon until unique selector is fixed 'href="#collapseExample" '-->
    </div>
    <div class="row">
        <div class="col-12 my-5 mx-auto">
            <div id="test"></div>
            <button id="loadMoreResults" onclick="courseResults();" type="button" class="mx-auto btn btn-lrg my-5 gmd-1" style="display:block; width:60%; background: teal; color:white; border-radius: 30px; height:70px; font-size: 1.5rem; padding:10px;">Load More</button>
            <h1 id="noResults" class="my-5 text-center" style="display:none;"> No More Results . . .</h1>
        </div>
    </div>
</div>

<?php

include 'footer.php';

?>