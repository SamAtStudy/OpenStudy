var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

function courseResults(){
    //var totalRows=checkResults();

    if(totalRows==0){
        //Hide load more btn and show no more results txt
        $("#noResults").show();
        $("#loadMoreResults").hide();
    }else if(totalRows<6){
        createTile(totalRows);

        $("#noResults").show();
        $("#loadMoreResults").hide();
    }else{
        createTile(6);
    }
}

//FUTURE: script for applying a relevant image for a particular Course Topic if no image available
function createTile(tilesShown){

    var ar={courseImg:"https://via.placeholder.com/320x180",courseTitle:"Tile Title",courseDesc:"Tile Description",
        coursePrice:"€0",courseRecommend:"notRecommended",courseThread:"0",courseBookmark:"notBookmarked"};

    var div;
    var numRows=""+totalRows;
    var tiles=""+tilesShown;

    $.post("https://study.ie/Server/api.php",{
        tiles: tiles,
        numRows: numRows
    },function(dbData,status){

        if(dbData.indexOf("Failed to connect") !==-1){
            console.log("Database Error"); //This is not working...
        }else{
            //alert(dbData);
            var decodedJSON=JSON.parse(dbData);
            //alert(tilesShown);
            //console.log(decodedJSON); //Use Console Log to Debug array structure
            //alert(decodedJSON);
            //$('#test').html(decodedJSON[1]['courseTitle']);
            var strSplit;

            for(i=5; i>=0; i--){

                if(decodedJSON[i]['courseFee'].indexOf("€") !==-1){
                    strSplit=decodedJSON[i]['courseFee'].split("€");
                    strSplit=strSplit[1].split(" ");
                    strSplit=strSplit[0].split(".");
                    decodedJSON[i]['coursePrice']="€"+strSplit[0];
                }else{
                    decodedJSON[i]['coursePrice']=" ";
                }

                //Truncates Card Desc
                if(decodedJSON[i]['courseDesc'].length<2){
                    decodedJSON[i]['courseDesc']="Course Description Not Available.";
                }else if(decodedJSON[i]['courseDesc'].length>250){
                    decodedJSON[i]['courseDesc']=decodedJSON[i]['courseDesc'].substr(0,238)+". . .";
                }

                div = $('<div class="row">' +
                    '<div class="col-12 mt-5 mx-auto">\n' +
                    '                <div class="card gmd-1 courseTile">\n' +
                    '                    <div class="card-horizontal">\n' +
                    '                        <div class="img-square-wrapper">\n' +
                    '                            <img class="courseImg courseTileImg" src="'+ar['courseImg']+'" alt="Card image cap">\n' +
                    '                        </div>\n' +
                    '                        <div class="card-body" style="position: relative;">\n' +
                    '                            <a class="removeColor" href="course.php?id='+numRows+'"><h3 class="courseTitle">'+decodedJSON[i]['courseTitle']+'<br><span style="opacity:0.8; font-size:1rem;">'+decodedJSON[i]['courseProvider']+' </span></h3></a>\n' +
                    '                            <p class="card-text courseDesc">'+decodedJSON[i]['courseDesc']+'</p>\n' +
                    '                            <div class="courseBotTileInfo">\n' +
                    '                                <img class="courseTileIconBottom recommendIcon courseRecommend" src="img/icons/'+ar['courseRecommend']+'.svg" value="'+ar['courseRecommend']+'" data-toggle="tooltip" data-placement="bottom" title="Recommend This">&nbsp<span id="courseRecommend">0</span> Recommended\n' +
                    '                                <a data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample"><img class="courseTileIconBottom ml-3 mr-1 threadIcon" src="img/icons/thread.svg" data-toggle="tooltip" data-placement="bottom" title="Show Threads"></a>&nbsp<span id="courseThread">'+ar['courseThread']+'</span> Threads\n' +                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="courseSideTileInfo">\n' +
                    '                            <div class="courseTileIconSide"><img class="bookmarkIcon courseBookmark" src="img/icons/'+ar['courseBookmark']+'.png" value="'+ar['courseBookmark']+'" data-toggle="tooltip" data-placement="bottom" title="Bookmark"></div>\n' +
                    '                            <div class="align-items-end courseTilePrice"><span id="coursePrice">'+decodedJSON[i]['coursePrice']+'</span></div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>' +
                    '</div>');
                totalRows=totalRows-1;

                $("#resContainerStep").append(div);
            }

            // add functionality to course tiles
            courseTileFunctions();
        }
    });

}

function createCoursePage(){

    var data={courseID:0,courseImg:"https://via.placeholder.com/320x180",courseTitle:"Course Title",
        courseDesc:"Course Description", courseProvider:"Course Provider",coursePrice:"€0",courseRecommend:"notRecommended",
        courseThread:"0", courseBookmark:"notBookmarked", courseSubjects:"Course Subjects/Modules",
        courseFeeInfo:"Info on Fees",courseDuration:"Info on duration", courseLink:"https://www.google.com/search?q=study.ie",
        courseCode:"XY000",coursePoints:"000", courseLocation:"Course Location",courseSetting:"Online",courseType:"Learning"};

    var strSplit;

    var courseId=GetURLParameter('id');

    $.post("https://study.ie/Server/api.php",{
        classId: classId
    },function(dbData,status){

        if(dbData.indexOf("Failed to connect") !==-1){
            console.log("Database Error"); //This is not working...
        }else{
            dbData=dbData.substring(1,dbData.length-1);
            var decodedJSON=JSON.parse(dbData);
            //alert("JSON Data: " + dbData + "\nStatus: " + status);

            //look into caching selectors for improved performance
            $(".courseTitle").html(decodedJSON['courseTitle']);

            //These features have to be added to the database
            //$("#courseImg").attr("src",decodedJSON['courseImg']);
            //$("#courseSetting").html(decodedJSON['courseSetting']);
            //$("#courseBookmark").attr("value",decodedJSON['courseBookmark']);
            //var bookmarkImg="img/icons/"+decodedJSON['courseBookmark']+".png";
            //$("#courseBookmark").attr("src",bookmarkImg);

            if(decodedJSON['courseDesc'].length<2){
                $("#courseDesc").html("Course Description Not Available.");
            }else{
                $("#courseDesc").html(decodedJSON['courseDesc']);
            }

            if(decodedJSON['courseProvider'].length<2){
                $("#courseProvider").html("Course Provider n/a");
            }else{
                $("#courseProvider").html(decodedJSON['courseProvider']);
            }

            if(decodedJSON['courseSubjects'].length<2){
                $("#courseSubjects").html("Course Structure n/a");
            }else{
                $("#courseSubjects").html(decodedJSON['courseSubjects']);
            }

            var moreInfo="";
            if(decodedJSON['courseFee'].length<2 || decodedJSON['courseDuration'].length<2){
                moreInfo=moreInfo+decodedJSON['courseFee'];
                moreInfo=moreInfo+decodedJSON['courseDuration'];
                moreInfo=moreInfo+"<br><br>More Information can be found on the course providers website.";
            }else{
                moreInfo=moreInfo+decodedJSON['courseDuration']+"<br><br>";
                moreInfo=moreInfo+decodedJSON['courseFee'];
            }


            $("#courseMoreInfo").html(moreInfo);
            if(decodedJSON['courseFee'].indexOf("€") !==-1){
                strSplit=decodedJSON['courseFee'].split("€");
                strSplit=strSplit[1].split(" ");
                strSplit=strSplit[0].split(".");
                $("#coursePrice").html("€"+strSplit[0]);
            }else{
                $("#coursePrice").html("");
            }

            strSplit=decodedJSON['courseLink'].split("~");
            $("#courseLink").attr("href",strSplit[strSplit.length-1]);

            // add functionality to course page
            coursePageFunctions();
            //FUTURE: need to add columns and tables for recommendation system and threads to database for this functionality
            //FUTURE: script for applying a relevant image for a particular course provider
        }
    });
}

function courseGroupTileFunctions(){
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $(".bookmarkIcon").click(function(){
        if($(this).attr("value")==="notBookmarked"){
            $(this).attr("src", "img/icons/bookmark.png");
            $(this).attr("value", "bookmarked");
            $(this).tooltip('disable');
        }else if($(this).attr("value")==="bookmarked"){
            $(this).attr("src", "img/icons/unbookmark.png");
            $(this).attr("value", "notBookmarked");
            $(this).tooltip('enable');
        }
    });

    $(".bookmarkIcon").hover(function(){
        if($(this).attr("value")==="notBookmarked"){
            $(this).attr("src", "img/icons/bookmark.png");
        }
    },function(){
        if($(this).attr("value")==="notBookmarked"){
            $(this).attr("src", "img/icons/notBookmarked.png");
        }
    });

    $(".recommendIcon").click(function(){
        if($(this).attr("value")==="notRecommended"){
            $(this).attr("src", "img/icons/Recommend.svg");
            $(this).attr("value", "recommended");
            $(this).tooltip('disable');
        }else if($(this).attr("value")==="recommended"){
            $(this).attr("src", "img/icons/recommend.svg");
            $(this).attr("value", "notRecommended");
            $(this).tooltip('enable');
        }
    });

    $(".recommendIcon").hover(function(){
        if($(this).attr("value")==="notRecommended"){
            $(this).attr("src", "img/icons/recommend.svg");
        }
    },function(){
        if($(this).attr("value")==="notRecommended"){
            $(this).attr("src", "img/icons/notRecommended.svg");
        }
    });
}

function coursePageFunctions(){

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $(".bookmarkIcon").click(function(){
        if($(this).attr("value")==="notBookmarked"){
            $(this).attr("src", "img/icons/bookmark.png");
            $(this).attr("value", "bookmarked");
            $(this).tooltip('disable');
        }else if($(this).attr("value")==="bookmarked"){
            $(this).attr("src", "img/icons/unbookmark.png");
            $(this).attr("value", "notBookmarked");
            $(this).tooltip('enable');
        }
    });

    $(".bookmarkIcon").hover(function(){
        if($(this).attr("value")==="notBookmarked"){
            $(this).attr("src", "img/icons/bookmark.png");
        }
    },function(){
        if($(this).attr("value")==="notBookmarked"){
            $(this).attr("src", "img/icons/notBookmarked.png");
        }
    });

    $(".recommendIcon").click(function(){
        if($(this).attr("value")==="notRecommended"){
            $(this).attr("src", "img/icons/Recommend.svg");
            $(this).attr("value", "recommended");
            $(this).tooltip('disable');
        }else if($(this).attr("value")==="recommended"){
            $(this).attr("src", "img/icons/recommend.svg");
            $(this).attr("value", "notRecommended");
            $(this).tooltip('enable');
        }
    });

    $(".recommendIcon").hover(function(){
        if($(this).attr("value")==="notRecommended"){
            $(this).attr("src", "img/icons/recommend.svg");
        }
    },function(){
        if($(this).attr("value")==="notRecommended"){
            $(this).attr("src", "img/icons/notRecommended.svg");
        }
    });


}