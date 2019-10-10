
$(document).ready(function(){

    // CACHED SELECTORS
    var navSearch=$("#navbarSearch");

    $("#fbBtn").click(function(){
        window.location.href = "https://www.facebook.com/studyire/";
    });

    $("#twBtn").click(function(){
        window.location.href = "https://twitter.com/realstudyie";
    });

    $("#inBtn").click(function(){
        window.location.href = "https://www.instagram.com/study.ie_";
    });

    $("#lnBtn").click(function(){
        window.location.href = "https://www.linkedin.com/company/study-ie/";
    });

    $('#learnOnlineFocus').on('click', function() {
        //this scroll withour animations in chrome
        $('#sectionThreeBox').get(0).scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
    });

    loginStatus();

    $('#learInPersonFocus').on('click', function() {
        //this scroll withour animations in chrome
        $('#sectionThreeRowTwo').get(0).scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
    });

    $('#trackLearningFocus').on('click', function() {
        //this scroll withour animations in chrome
        $('#sectionThreeRowThree').get(0).scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
    });

    $('#pills-home').click(function(){
        loginStyle("revert");
    });

    $('#pills-profile-tab').click(function(){
        loginStyle("revert");
    });

    $('#navLogOut').click(function(){
        swal({
                title: "Are you sure?",
                text: " ",
                icon: "info",
                buttons: {
                    cancel: true,
                    confirm: {
                        text: "Log Out",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true
                    }
                }
        }).then(function(){
                swal({
                    title: "Logged Out!",
                    text: " ",
                    icon:"success",
                    timer: 2500,
                    buttons:false
                });
                $('#navSettings').hide();
                $('#navProfile').hide();
                $('#navLogin').show();
                sessionStorage.setItem("logged","none");
        });
    });
    // Login button
    $("#accLoginBtn").click(function(){
        var mailUsername=$("#mailUsername").val();
        var pass=$("#pass").val();
        var option="login";

        $.post("https://study.ie/Server/accRetrieval.php",{
            option: option,
            mailUsername: mailUsername,
            userPass: pass
        },function(data,status){
            //alert("Data: " + data + "\nStatus: " + status);
            var strSpilt;
            strSpilt = data.split(":");
           // alert(strSpilt[0] + strSpilt[1]);
            if(strSpilt[0]==="login success"){
                sessionStorage.setItem("mailUsername", mailUsername);
                sessionStorage.setItem("logged",strSpilt[1]);
                //alert(sessionStorage.getItem("logged"))f;
                //getUserData(sessionStorage.getItem("logged"));
                loginStyle("revert");
                loginStyle("clear");
                $('#loginModal').modal('hide');
                $('#dropdownAcc').html("User: "+mailUsername);
                $('#dropdownProfileLink').attr("href", "https://www.study.ie/user.html/"+mailUsername);
                $('#navSettings').show();
                $('#navProfile').show();
                $('#navLogin').hide();
                swal({
                    title: "Logged In!",
                    text: " ",
                    icon:"success",
                    timer: 2100,
                    //showConfirmButton: false
                    buttons:false
                });
                //loginStatus();
            }else{
                loginStyle("revert");
                loginStyle(data);
            }
        });
    });


    $("#accCreateBtn").click(function(){
        var username=$("#createUsername").val();
        var email=$("#createEmail").val();
        var pass=$("#createPass").val();
        var conPass=$("#confirmPass").val();
        var option="create";

        $.post("https://study.ie/Server/accRetrieval.php",{
            userName: username,
            userEmail: email,
            userPass: pass,
            userConPass: conPass,
            option: option
        },function(data,status){
            //alert("Data: " + data + "\nStatus: " + status);
            if(data==="create success"){
                swal({
                    title: "Account Created!",
                    text:"Now that you have an account, please log in",
                    icon:"success",
                    timer: 2500,
                    //showConfirmButton: false
                    buttons:false
                });
            }else{
                loginStyle("revert");
                loginStyle(data);
            }
        });
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $('#pass').tooltip('disable');
    $('#mailUsername').tooltip('disable');
    $('#createUsername').tooltip('disable');
    $('#createEmail').tooltip('disable');
    $('#createPass').tooltip('disable');
    $('#confirmPass').tooltip('disable');

//comment system
    $('#comment_form').on('submit', function(event){
        event.preventDefault();
        var form_data = $(this).serialize();
        $.ajax({
            url:"add_comment.php",
            method:"POST",
            data:form_data,
            dataType:"JSON",
            success:function(data)
            {
                if(data.error != '')
                {
                    $('#comment_form')[0].reset();
                    $('#comment_message').html(data.error);
                    $('#comment_id').val('0');
                    load_comment();
                }
            }
        })
    });

    load_comment();

    $(document).on('click', '.reply', function(){
        var comment_id = $(this).attr("id");
        $('#comment_id').val(comment_id);
        $('#comment_name').focus();
    });

    var searchContainer=$("#navbarSearchContainer");
    navSearch.click(function() {
        searchContainer.animate({width: "350px", borderRadius: "20px"}, 60).animate({height: "140px"}, 30 ); //animate border radius first. hierarchy of animations
        searchContainer.toggleClass("extended");
    });

    $(document).click(function (e) {
        if(!searchContainer.is(e.target) && searchContainer.has(e.target).length === 0 && searchContainer.hasClass("extended")) {
            searchContainer.animate({height: "38px"}, 30 ).animate({width: "275px", borderRadius: "30px"}, 60);
            searchContainer.toggleClass("extended");
            $("#navbarLiveSearch").html("");
        }
    });

    var mainNavbar=$("#mainNavbar");
    /* TODO: Hidden navbar when scrolls past a point but reapers when user scrolls up
    if ($(document).scrollTop() > 1.5 * $(window).height()) {
        mainNavbar.hide();
    }*/

    //TRANSPARENT NAVBAR
    var homeHeader=$("#homeHeader");
    if (homeHeader.length ) {
        // SLIDE FUNCTION. I <3 rslides sm
        $(function() {
            $(".rslides").responsiveSlides({
                speed:1500,
                timeout: 6000
            });
        });


        $(window).scroll(function() {
            if ($(document).scrollTop() > homeHeader.height()) {
                mainNavbar.css("-webkit-transition","all 0.85s ease");
                mainNavbar.css("transition","all 0.85s ease");
                mainNavbar.css("background","#63cbb7");
                navSearch.prop("disabled", false);
                searchContainer.css("opacity","0.65");
                searchContainer.animate({opacity: "1"},7);
                $('.show').css("background","#63cbb7");
                $('.collapsing').css("background","#63cbb7");
            }else{
                navSearch.prop("disabled", true);
                mainNavbar.css("background","transparent");
                searchContainer.css("opacity","0.35");
                searchContainer.animate({opacity: "0"},7);
                $('.show').css("background","hsla(0, 0%, 34%, 0.51) !important");
                $('.collapsing').css("background","hsla(0, 0%, 34%, 0.51) !important");
            }
        });
    }

    //SEARCH RESULTS
    var groupHeader=$("#groupResultsHeader");
    var userSearchRes=$("#userSearchRes");
    if (groupHeader.length) {
        var groupSearch = GetURLParameter("search");
        console.log("user searched for:"+groupSearch);
        var groupSearchId = GetURLParameter("id");
        if (groupSearch === undefined) {
            groupHeader.hide();
            groupResults("example");
        }else{
            userSearchRes.html(""+groupSearch);
            groupResults("search");
        }
    }


    /*if($("#userHeaderContainer").length){
        $("#groupTileJoin9").click(function(){
            alert("clicked!");
        });

        $("#groupTileJoin9").attr("onclick","groupResults('search');");
    } */

    /*var test=GetURLParameter("id");
    if(test===undefined){
        alert("It works!!");
    }else{
        alert("It no works!!");
        alert(GetURLParameter("id"));
    }*/
});

function load_comment(){
    $.ajax({
        url:"Server/fetch_comment.php",
        method:"POST",
        success:function(data)
        {
            $('#display_comment').html(data);
        }
    })
}

function loginStatus(){
    if(sessionStorage.getItem("logged")==="none" || sessionStorage.getItem("logged")===null){
        sessionStorage.setItem("logged","none");
        return "No User Logged In";
    }else{
        $('#dropdownAcc').html("User:"+sessionStorage.getItem("mailUsername"));
        $('#dropdownProfileLink').attr("href", "https://www.study.ie/user.html/"+sessionStorage.getItem("mailUsername"));
        $('#navSettings').show();
        $('#navProfile').show();
        $('#navLogin').hide();
        return "User "+sessionStorage.getItem("mailUsername")+" is logged in.";
    }
}

function loginStyle(x){
    var $tooltip=$('.tooltip');

    if(x==="revert"){
        $('#mailUsername').tooltip('disable');
        $('#pass').tooltip('disable');
        $('#createUsername').tooltip('disable');
        $('#createEmail').tooltip('disable');
        $('#createPass').tooltip('disable');
        $('#confirmPass').tooltip('disable');
        $('.form-control').css("box-shadow","");
    }else if(x==="clear"){
        $('.form-control').val("");
    }else if(x==="wrong password"){
        $('#pass').tooltip('enable');
        $('#pass').css("box-shadow","0 0 0 0.2rem hsl(0, 71%, 53%)");
    }else if(x==="no user"){
        $('#mailUsername').tooltip('enable');
        $('#mailUsername').css("box-shadow","0 0 0 0.2rem hsl(44, 90%, 80%)");
    }else if(x==="empty"){
        $('.form-control').css("box-shadow","0 0 0 0.2rem hsl(44, 90%, 80%)");
    }else if(x==="warning tooltip"){
        //Tooltip colors are currently working.
        $tooltip.css("background-color","hsla(44, 95%, 85%, 1)");
        $tooltip.css("color","hsl(43, 64%, 34%)");
        $tooltip.css("font-weight","700");
    }else if(x==="danger tooltip"){
        $tooltip.css("background-color","hsla(0, 89%, 77%, 1)");
        $tooltip.css("color","hsl(0, 56%, 36%)");
        $tooltip.css("font-weight","700");
    }else if(x==="name taken"){
        /* $('#createUsername').tooltip('enable'); */
        $('#createUsername').css("box-shadow","0 0 0 0.2rem hsl(44, 90%, 80%)");
    }else if(x==="invalid username"){
        $('#createUsername').tooltip('enable');
        $('#createUsername').css("box-shadow","0 0 0 0.2rem hsl(44, 90%, 80%)");
    }else if(x==="invalid email"){
        $('#createEmail').tooltip('enable');
        $('#createEmail').css("box-shadow","0 0 0 0.2rem hsl(44, 90%, 80%)");
    }else if(x==="invalid params"){
        $('#createUsername').tooltip('enable');
        $('#createEmail').tooltip('enable');
        $('#createUsername').css("box-shadow","0 0 0 0.2rem hsl(44, 90%, 80%)");
        $('#createEmail').css("box-shadow","0 0 0 0.2rem hsl(44, 90%, 80%)");
    }else if(x==="password mismatch"){
        $('#confirmPass').tooltip('enable');
        $('#confirmPass').css("box-shadow","0 0 0 0.2rem hsl(0, 71%, 53%)");
    }else{
        alert("Error! Oh no...\nLooks like its a "+x);
    }
}

function userProfile(){
    var x=loginStatus();
    if(x.indexOf("No User Logged In") ==-1){
        console.log("testing user profile status");
    }
}

var saving;
var tileName=$('#classTileName');
var tileTopic=$('#classTileTopic');

function editClassTile(){
    /*var tileName=$('#classTileName');
    var tileTopic=$('#classTileTopic'); */
    $('.editHighlight').css("outline","2px dashed hsl(206, 79%, 81%)");
    $('.editHighlight').attr("contenteditable","true");
    $('#classTileEdit').hide();
    $('#classTileSave').show();
    //tileName.css("cursor","pointer");
    //saving=setInterval(saveClassTile,10000);
}

function saveClassTile(tileName,tileTopic){
    alert("changes saved");
    $('#classTileEdit').show();
    $('#classTileSave').hide();
    $('.editHighlight').css("outline","");
    $('.editHighlight').attr("contenteditable","false");
    /*clearInterval(saving);
    tileName.css("outline","none");
    tileName.attr("contenteditable","false");
    tileTopic.css("outline","none");
    tileTopic.attr("contenteditable","false");
    //tileGoals.css("outline","");
    //tileGoals.attr("contenteditable","false");
    clearInterval(saving); */
}
var tasks=1;

function newTask(){
    $(".classTileNewTask").remove();
    tasks++;
    var div=('<div class="classTileGoal custom-control-lg custom-checkbox my-2 col-md-12 col-xl-4">\n' +
        '       <input type="checkbox" class="custom-control-input" id="customCheck'+tasks+1+'" disabled>\n' +
        '       <label class="custom-control-label" for="customCheck2"><span contenteditable="false" data-placeholder="Task '+tasks+'" class="editHighlight" style="color:black;"></span></label>\n' +
        ' </div>\n' +
        ' <div class="classTileGoal classTileNewTask custom-control-lg custom-checkbox my-2 col-md-12 col-xl-4">\n' +
        '       <img src="img/icons/add-button.svg" class="classTileNewTaskIcon" onclick="newTask()"><span style="margin-left:0.5rem;">New Task</span>\n' +
        ' </div>')
    $("#taskList").append(div);
}
var weeks=0;

function newTaskList(){
    $(".dropdownNewTaskList").remove();
    weeks++;
    var div=('<a class="dropdown-item" href="#">Week '+weeks+'</a>\n' +
        '     <a class="dropdown-item dropdownNewTaskList" href="#" onclick="newTaskList()"><img src="img/icons/add-button.svg" class="classTileNewTaskDropIcon"> <span style="margin-left:0.25rem;">New Task List</span>\n' +
        '     </a>');
    $("#taskDropdownMenu").append(div);
}

function newAnnouncement(){
    $('#classTileNewAnnounce').hide();
    $('#classTileAnnounce').show();
}

function verifyAnnouncement(x){
    if(x.innerText.length>50){
         x.innerText=x.innerText.substring(0,49);
         return;
    }
    //setInterval(saveTile,3000);

    setTimeout(function(){
        if(x.innerText.length>50){
            x.innerText=x.innerText.substring(0,49);
        }
    },250);
}

function checkResults(){
    /* Number of results/rows is cached here */
    //return 6;
    /*var amount="all";
    $.post("https://study.ie/Server/api.php",{
        amount: amount
    },function(data,status){
        data=data.substring(1,data.length-1);
        alert("JSON Data: " + data + "\nStatus: " + status);
       return 2000;
    });*/
}

function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

var totalRows=-1; //Hardcoded number of rows in DB;
function groupResults(x){
    var loadMoreBtn=$("#loadMoreResults");
    var noResults=$("#noResults");
    if(x==="example"){
        //var totalRows=checkResults();
        console.log("checking total number of rows..");
        var rowHeightOf="groups";
        $.post("https://study.ie/Server/api.php",{
            rowHeight: rowHeightOf
        },function(rows,status){
            //alert("total number of rows is: "+totalRows);

            if(totalRows==-1){
                totalRows=rows;
            }

            if(totalRows==0){
                //Hide load more btn and show no more results txt
                noResults.show();
                loadMoreBtn.hide();
            }else if(totalRows<8){
                createGroupTile(totalRows);
                noResults.show();
                loadMoreBtn.hide();
            }else{
                createGroupTile(8);
            }
        });
    }else{
        var type=x;
        console.log(type);

        if(type==="search"){
            var search = GetURLParameter("search");
            loadMoreBtn.attr("onclick","groupResults('search');");

            var rowHeightOf="search";
            $.post("https://study.ie/Server/api.php",{
                rowHeight: rowHeightOf,
                search:search
            },function(rows,status){
                //alert("total number of rows is: "+totalRows);

                if(totalRows==-1){
                    totalRows=rows;
                }
                console.log("Row Height: "+rows);

                if(totalRows==0){
                    //Hide load more btn and show no more results txt
                    noResults.show();
                    loadMoreBtn.hide();
                }else if(totalRows<8){
                    createGroupTileSearch(totalRows);
                    noResults.show();
                    loadMoreBtn.hide();
                }else{
                    createGroupTileSearch(8);
                }
            });
        }
    }
}
var UsertotalRows =-1;
function UsergroupResults(){
    //var totalRows=checkResults();
    //alert("checking total number of rows..");
    var rowHeightOf="users";
    var userId=""+sessionStorage.getItem("logged");
    $.post("https://study.ie/Server/api.php",{
        rowHeight: rowHeightOf,
        userId: userId
    },function(rows,status){

        if(UsertotalRows==-1){
            UsertotalRows=rows;
        }
        //alert("total number of rows is: "+UsertotalRows);
        if(UsertotalRows==0){
            //Hide load more btn and show no more results txt
            //$("#noResults").show();
            $("#loadMoreResults").hide();
        }else if(UsertotalRows<3){
            createUserGroupTile(UsertotalRows);
            //$("#noResults").show();
            $("#loadMoreResults").hide();
        }else{
            createUserGroupTile(3);
        }
    });
}
//FUTURE: script for applying a relevant image for a particular Course Topic if no image available
function createGroupTile(tilesShown){

    var ar={courseImg:"img/Logo1.png",courseTitle:"Tile Title",courseDesc:"Tile Description",
        coursePrice:"€0",courseRecommend:"notRecommended",courseThread:"0",courseBookmark:"notBookmarked"};

    var div;
    var numRows=""+totalRows;
    var tiles=""+tilesShown;
    var retrieveOption="groups";
    //may not work just trying something out
    var groupTileJoinId = null;

    $.post("https://study.ie/Server/api.php",{
        tiles: tiles,
        numRows: numRows,
        retrieveOption: retrieveOption,
        //may not work just trying something out
        groupTileJoinId: groupTileJoinId
    },function(dbData,status){

        if(dbData.indexOf("Failed to connect") !==-1){
            console.log("Database Error"); //This is not working...
        }else{
            //alert(dbData);
           // console.log(dbData);
            var decodedJSON=JSON.parse(dbData);
            console.log(decodedJSON); //Use Console Log to Debug array structure
            //alert(decodedJSON);
            //$('#loadMoreResults').html(decodedJSON[1]['groupName']);
            //var strSplit;
            //strSplit=groupTileIds.split(",");

            for(i=tilesShown-1; i>=0; i--){
                console.log(i);
                if(decodedJSON[i]['groupImg']===null || decodedJSON[i]['groupImg']===""){
                    decodedJSON[i]['groupImg']=ar['courseImg'];
                }

                div = $('<!-- GROUP TILE CONTAINER -->\n' +
                    '        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 groupTileContainer"> <!-- Add Unique Id Attribute to each create tile -->\n' +
                    '            <!-- GROUP TILE -->\n' +
                    '            <div class="card groupTile mx-md-4 mx-lg-3 mx-xl-4 my-3 my-lg-4 my-xl-5 gmd-1-hover" id="groupTile'+decodedJSON[i]['groupId']+'">\n' +
                    '\n' +
                    '<div class="groupTileLogoContainer py-2 px-3"> \n'+
                    '                <!-- Group Logo -->\n' +
                    '                <img src="'+decodedJSON[i]['groupImg']+'" alt="Card image cap" class="m-auto pt-2 px-1 pb-1 groupTileLogo">\n' +
                    '</div> \n'+
                    '\n' +
                    '                <!-- Group Tile Body -->\n' +
                    '                <div class="card-body groupTileBody">\n' +
                    '                    <!-- Group Tile Modal Trigger and Title -->\n' +
                    '                    <a class="stretched-link groupTileModalTrigger" style="color:black" href="#" data-toggle="modal" data-target="#groupTileModal">\n' +
                    '                        <h5 class="card-title text-center groupTileTitle" style="font-weight:700;" >'+decodedJSON[i]['groupName']+'</h5>\n' +
                    '                    </a>\n' +
                    '\n' +
                    '                    <!--Group Tile Time -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/timer.svg" class="classTileIcon" ><span class="groupTileTime">'+decodedJSON[i]['groupStart']+' - '+decodedJSON[i]['groupEnd']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Date -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/calendar.svg" class="classTileIcon" ><span class="pl-1 groupTileFreq" style="border-bottom:2px solid green; font-size: 1rem;">'+decodedJSON[i]['groupFrequency']+'</span>,&nbsp\n' +
                    '                        <span class=groupTileDate">'+decodedJSON[i]['groupDate']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Location -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/location-point.svg" class="classTileIcon" ><span class="groupTileLoc text-truncate">'+decodedJSON[i]['groupLocation']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!--Group Tile Members and Join Btn -->\n' +
                    '                    <div class="d-flex justify-content-between mt-3 mb-2">\n' +
                    '                        <div class="mt-2 text-muted">\n' +
                    '                            <span class="groupTileMembers">13</span> Members\n' +
                    '                        </div>\n' +
                    '                        <div>\n' +
                    '                            <button type="button" class="btn btn-info px-4 groupTileJoinBtn" id="groupTileJoin'+decodedJSON[i]['groupId']+'" style="border-radius: 20px; position: relative; z-index: 5; font-size:1.1rem;" onclick="swalAlertTester();">Join</button>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Resources Trigger -->\n' +
                    '                    <div class="row mt-1" style="font-weight:700;">\n' +
                    '                        <a class="text-muted text-center groupTileResTrigger" style="color:black; width:100%; position: relative; z-index: 5;" data-toggle="collapse" href="#groupTileCol'+decodedJSON[i]['groupId']+'" role="button" aria-expanded="false" aria-controls="groupTileCol'+decodedJSON[i]['groupId']+'" id="groupTileTrig'+decodedJSON[i]['groupId']+'">Resources </a>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Resources -->\n' +
                    '                    <div class="row groupResourceContainer collapse pt-1" id="groupTileCol'+decodedJSON[i]['groupId']+'" style="position: relative; z-index: 5;">\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">EDX</span>\n' +
                    '                            <span class="groupResources">CS50</span>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">Udemy</span>\n' +
                    '                            <span class="groupResources">Python - A begineers route</span>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">Skillshare</span>\n' +
                    '                            <span class="groupResources">Unity Basics</span>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Modal -->\n' +
                    '                    <!-- FUTUTRE: Display modal as swipable sidenav on moile that takes up 100% of the screen -->\n' +
                    '                    <div class="modal fade groupTileModal" id="groupTileModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
                    '                        <div class="modal-dialog groupModalDialog" role="document">\n' +
                    '                            <div class="modal-content groupModalContent">\n' +
                    '                                <div class="modal-body groupModalBody">\n' +
                    '                                    <button type="button" class="close groupTileClose" data-dismiss="modal" aria-label="Close">\n' +
                    '                                        <span aria-hidden="true">&times;</span>\n' +
                    '                                    </button>\n' +
                    '                                    <div id="aboutModalContent">\n' +
                    '                                        <!--Our Mission-->\n' +
                    '                                        <h4>Our Mission</h4>\n' +
                    '                                        <!-- <hr style="width: 40%"> -->\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    Empower any learner* to effortlessly find the best resources and help them visualise their learning journey.\n' +
                    '                                                </div>\n' +
                    '                                                <br/>\n' +
                    '                                                <div class="container-fluid" id="aboutUsText" style="font-size:0.6vw; opacity: 0.8;">\n' +
                    '                                                    *If you can think, you are a learner.\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                        <!-- About Study -->\n' +
                    '                                        <h4>About Study</h4>\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    We believe in the learner\'s natural need for the best learning.<br/>\n' +
                    '                                                    <br/>\n' +
                    '                                                    We quench this thirst by having all the best resources in one searchable location<br/>\n' +
                    '                                                    <br/>\n' +
                    '                                                    We then help them track not only what they\'ve done in the past and present, but more importantly where their learning can advance to in the future.<br/>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                        <!-- Our Team -->\n' +
                    '                                        <h4>Our Team</h4>\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    A small bunch on college students who are determined to help individuals see the value in what they\'re learning,\n' +
                    '                                                    and how their learning can take them to their deepest goals. You could call us the \'Avengers of Learning\',\n' +
                    '                                                    or more realistically just your regular local boyband.\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>');
                totalRows = totalRows - 1;

                $("#groupResTileContainer").append(div);

                //Event Listeners for each tile
                (function(j) {
                    $("#groupTileTrig"+decodedJSON[j]['groupId']).mouseenter(function (){
                        $("#groupTileCol"+decodedJSON[j]['groupId']).fadeIn();
                    });

                    $("#groupTile"+decodedJSON[j]['groupId']).mouseleave(function(){
                        $(".groupResourceContainer").fadeOut();
                    });
                })(i);

            }
            //checkee
            $('.groupTileJoinBtn').click(function(e){
                var groupTileJoinId=e.target.id;
            });

            //groupTileFunctions();
        }
    });

}
function createUserGroupTile(tilesShown){

    var ar={courseImg:"img/Logo1.png",courseTitle:"Tile Title",courseDesc:"Tile Description",
        coursePrice:"€0",courseRecommend:"notRecommended",courseThread:"0",courseBookmark:"notBookmarked"};

    var div;
    var numRows=""+UsertotalRows;
    var tiles=""+tilesShown;
    var userId=""+sessionStorage.getItem("logged");
    var retrieveOption="userGroups";

    $.post("https://study.ie/Server/api.php",{
        tiles: tiles,
        numRows: numRows,
        userId: userId,
        retrieveOption: retrieveOption
    },function(dbData,status){

        if(dbData.indexOf("Failed to connect") !==-1){
            console.log("Database Error"); //This is not working...
        }else{
           // alert(dbData);
            console.log(dbData);
            var decodedJSON=JSON.parse(dbData);
            //console.log(decodedJSON); //Use Console Log to Debug array structure
            //alert(decodedJSON);
            //$('#loadMoreResults').html(decodedJSON[1]['groupName']);
            //var strSplit;
            //strSplit=groupTileIds.split(",");

            for(i=tilesShown-1; i>=0; i--){
                //console.log(i);
                if(decodedJSON[i]['groupImg']===null || decodedJSON[i]['groupImg']===""){
                    decodedJSON[i]['groupImg']=ar['courseImg'];
                }

                div = $('<!-- GROUP TILE CONTAINER -->\n' +
                    '        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 groupTileContainer"> <!-- Add Unique Id Attribute to each create tile -->\n' +
                    '            <!-- GROUP TILE -->\n' +
                    '            <div class="card groupTile mx-md-4 mx-lg-3 mx-xl-4 my-3 my-lg-4 my-xl-5 gmd-1-hover" id="groupTile'+decodedJSON[i]['groupId']+'">\n' +
                    '\n' +
                    '<div class="groupTileLogoContainer py-2 px-3"> \n'+
                    '                <!-- Group Logo -->\n' +
                    '                <img src="'+decodedJSON[i]['groupImg']+'" alt="Card image cap" class="m-auto pt-2 px-1 pb-1 groupTileLogo">\n' +
                    '</div> \n'+
                    '\n' +
                    '                <!-- Group Tile Body -->\n' +
                    '                <div class="card-body groupTileBody">\n' +
                    '                    <!-- Group Tile Modal Trigger and Title -->\n' +
                    '                    <a class="stretched-link groupTileModalTrigger" style="color:black" href="#" data-toggle="modal" data-target="#groupTileModal">\n' +
                    '                        <h5 class="card-title text-center groupTileTitle" style="font-weight:700;" >'+decodedJSON[i]['groupName']+'</h5>\n' +
                    '                    </a>\n' +
                    '\n' +
                    '                    <!--Group Tile Time -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/timer.svg" class="classTileIcon" ><span class="groupTileTime">'+decodedJSON[i]['groupStart']+' - '+decodedJSON[i]['groupEnd']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Date -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/calendar.svg" class="classTileIcon" ><span class="pl-1 groupTileFreq" style="border-bottom:2px solid green; font-size: 1rem;">'+decodedJSON[i]['groupFrequency']+'</span>,&nbsp\n' +
                    '                        <span class=groupTileDate">'+decodedJSON[i]['groupDate']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Location -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/location-point.svg" class="classTileIcon" ><span class="groupTileLoc text-truncate">'+decodedJSON[i]['groupLocation']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!--Group Tile Members and Join Btn -->\n' +
                    '                    <div class="row text-left mt-3 mb-2">\n' +
                    '                        <div class="mt-2 text-muted">\n' +
                    '                            <span class="groupTileMembers">13</span> Members\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Resources Trigger -->\n' +
                    '                    <div class="row mt-1" style="font-weight:700;">\n' +
                    '                        <a class="text-muted text-center groupTileResTrigger" style="color:black; width:100%; position: relative; z-index: 5;" data-toggle="collapse" href="#groupTileCol'+decodedJSON[i]['groupId']+'" role="button" aria-expanded="false" aria-controls="groupTileCol'+decodedJSON[i]['groupId']+'" id="groupTileTrig'+decodedJSON[i]['groupId']+'">Resources </a>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Resources -->\n' +
                    '                    <div class="row groupResourceContainer collapse pt-1" id="groupTileCol'+decodedJSON[i]['groupId']+'" style="position: relative; z-index: 5;">\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">EDX</span>\n' +
                    '                            <span class="groupResources">CS50</span>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">Udemy</span>\n' +
                    '                            <span class="groupResources">Python - A begineers route</span>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">Skillshare</span>\n' +
                    '                            <span class="groupResources">Unity Basics</span>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Modal -->\n' +
                    '                    <!-- FUTUTRE: Display modal as swipable sidenav on moile that takes up 100% of the screen -->\n' +
                    '                    <div class="modal fade groupTileModal" id="groupTileModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
                    '                        <div class="modal-dialog groupModalDialog" role="document">\n' +
                    '                            <div class="modal-content groupModalContent">\n' +
                    '                                <div class="modal-body groupModalBody">\n' +
                    '                                    <button type="button" class="close groupTileClose" data-dismiss="modal" aria-label="Close">\n' +
                    '                                        <span aria-hidden="true">&times;</span>\n' +
                    '                                    </button>\n' +
                    '                                    <div id="aboutModalContent">\n' +
                    '                                        <!--Our Mission-->\n' +
                    '                                        <h4>Our Mission</h4>\n' +
                    '                                        <!-- <hr style="width: 40%"> -->\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    Empower any learner* to effortlessly find the best resources and help them visualise their learning journey.\n' +
                    '                                                </div>\n' +
                    '                                                <br/>\n' +
                    '                                                <div class="container-fluid" id="aboutUsText" style="font-size:0.6vw; opacity: 0.8;">\n' +
                    '                                                    *If you can think, you are a learner.\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                        <!-- About Study -->\n' +
                    '                                        <h4>About Study</h4>\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    We believe in the learner\'s natural need for the best learning.<br/>\n' +
                    '                                                    <br/>\n' +
                    '                                                    We quench this thirst by having all the best resources in one searchable location<br/>\n' +
                    '                                                    <br/>\n' +
                    '                                                    We then help them track not only what they\'ve done in the past and present, but more importantly where their learning can advance to in the future.<br/>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                        <!-- Our Team -->\n' +
                    '                                        <h4>Our Team</h4>\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    A small bunch on college students who are determined to help individuals see the value in what they\'re learning,\n' +
                    '                                                    and how their learning can take them to their deepest goals. You could call us the \'Avengers of Learning\',\n' +
                    '                                                    or more realistically just your regular local boyband.\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>');
                totalRows = totalRows - 1;

                $("#groupResTileContainer").append(div);

                //Event Listeners for each tile
                (function(j) {
                    $("#groupTileTrig"+decodedJSON[j]['groupId']).mouseenter(function (){
                        $("#groupTileCol"+decodedJSON[j]['groupId']).fadeIn();
                    });

                    $("#groupTile"+decodedJSON[j]['groupId']).mouseleave(function(){
                        $(".groupResourceContainer").fadeOut();
                    });
                })(i);

            }
            //groupTileFunctions();
        }
    });

}

function swalAlertTester(){
    swal({
        title: "Joined Group !",
        text:" ",
        icon:"success",
        timer: 2500,
        //showConfirmButton: false
        buttons:false
    });
}

function createGroupTileSearch(tilesShown){

    var ar={courseImg:"img/Logo1.png",courseTitle:"Tile Title",courseDesc:"Tile Description",
        coursePrice:"€0",courseRecommend:"notRecommended",courseThread:"0",courseBookmark:"notBookmarked"};

    var div;
    var numRows=""+totalRows;
    var tiles=""+tilesShown;
    var retrieveOption="searchGroups";
    var search = GetURLParameter("search"); //if user changes the url mid exucution, error ensues?

    $.post("https://study.ie/Server/api.php",{
        tiles: tiles,
        numRows: numRows,
        retrieveOption: retrieveOption,
        search:search
    },function(dbData,status){
        console.log(search);

        if(dbData.indexOf("Failed to connect") !==-1){
            console.log("Database Error"); //This is not working...
        }else{
            //alert(dbData);
            // console.log(dbData);
            var decodedJSON=JSON.parse(dbData);
            console.log(decodedJSON); //Use Console Log to Debug array structure
            //alert(decodedJSON);
            //$('#loadMoreResults').html(decodedJSON[1]['groupName']);
            //var strSplit;
            //strSplit=groupTileIds.split(",");

            for(i=tilesShown-1; i>=0; i--){
                console.log(i);
                if(decodedJSON[i]['groupImg']===null || decodedJSON[i]['groupImg']===""){
                    decodedJSON[i]['groupImg']=ar['courseImg'];
                }

                div = $('<!-- GROUP TILE CONTAINER -->\n' +
                    '        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 groupTileContainer"> <!-- Add Unique Id Attribute to each create tile -->\n' +
                    '            <!-- GROUP TILE -->\n' +
                    '            <div class="card groupTile mx-md-4 mx-lg-3 mx-xl-4 my-3 my-lg-4 my-xl-5 gmd-1-hover" id="groupTile'+decodedJSON[i]['groupId']+'">\n' +
                    '\n' +
                    '<div class="groupTileLogoContainer py-2 px-3"> \n'+
                    '                <!-- Group Logo -->\n' +
                    '                <img src="'+decodedJSON[i]['groupImg']+'" alt="Card image cap" class="m-auto pt-2 px-1 pb-1 groupTileLogo">\n' +
                    '</div> \n'+
                    '\n' +
                    '                <!-- Group Tile Body -->\n' +
                    '                <div class="card-body groupTileBody">\n' +
                    '                    <!-- Group Tile Modal Trigger and Title -->\n' +
                    '                    <a class="stretched-link groupTileModalTrigger" style="color:black" href="#" data-toggle="modal" data-target="#groupTileModal">\n' +
                    '                        <h5 class="card-title text-center groupTileTitle" style="font-weight:700;" >'+decodedJSON[i]['groupName']+'</h5>\n' +
                    '                    </a>\n' +
                    '\n' +
                    '                    <!--Group Tile Time -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/timer.svg" class="classTileIcon" ><span class="groupTileTime">'+decodedJSON[i]['groupStart']+' - '+decodedJSON[i]['groupEnd']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Date -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/calendar.svg" class="classTileIcon" ><span class="pl-1 groupTileFreq" style="border-bottom:2px solid green; font-size: 1rem;">'+decodedJSON[i]['groupFrequency']+'</span>,&nbsp\n' +
                    '                        <span class=groupTileDate">'+decodedJSON[i]['groupDate']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Location -->\n' +
                    '                    <div class="row my-2">\n' +
                    '                        <img src="img/icons/location-point.svg" class="classTileIcon" ><span class="groupTileLoc text-truncate">'+decodedJSON[i]['groupLocation']+'</span>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!--Group Tile Members and Join Btn -->\n' +
                    '                    <div class="d-flex justify-content-between mt-3 mb-2">\n' +
                    '                        <div class="mt-2 text-muted">\n' +
                    '                            <span class="groupTileMembers">13</span> Members\n' +
                    '                        </div>\n' +
                    '                        <div>\n' +
                    '                            <button type="button" class="btn btn-info px-4 groupTileJoinBtn" id="groupTileJoin'+decodedJSON[i]['groupId']+'" style="border-radius: 20px; position: relative; z-index: 5; font-size:1.1rem;">Join</button>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Resources Trigger -->\n' +
                    '                    <div class="row mt-1" style="font-weight:700;">\n' +
                    '                        <a class="text-muted text-center groupTileResTrigger" style="color:black; width:100%; position: relative; z-index: 5;" data-toggle="collapse" href="#groupTileCol'+decodedJSON[i]['groupId']+'" role="button" aria-expanded="false" aria-controls="groupTileCol'+decodedJSON[i]['groupId']+'" id="groupTileTrig'+decodedJSON[i]['groupId']+'">Resources </a>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Resources -->\n' +
                    '                    <div class="row groupResourceContainer collapse pt-1" id="groupTileCol'+decodedJSON[i]['groupId']+'" style="position: relative; z-index: 5;">\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">EDX</span>\n' +
                    '                            <span class="groupResources">CS50</span>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">Udemy</span>\n' +
                    '                            <span class="groupResources">Python - A begineers route</span>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-12 my-xl-2 my-4">\n' +
                    '                            <span class="ml-1 p-1 groupResourceType" style="border-style: solid; border-radius: 12px; border-width: 2px; border-color: hsl(206, 79%, 81%); color:hsl(206, 79%, 81%);background-color: hsl(206, 100%, 97%); font-size: 0.9rem;">Skillshare</span>\n' +
                    '                            <span class="groupResources">Unity Basics</span>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <!-- Group Tile Modal -->\n' +
                    '                    <!-- FUTUTRE: Display modal as swipable sidenav on moile that takes up 100% of the screen -->\n' +
                    '                    <div class="modal fade groupTileModal" id="groupTileModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
                    '                        <div class="modal-dialog groupModalDialog" role="document">\n' +
                    '                            <div class="modal-content groupModalContent">\n' +
                    '                                <div class="modal-body groupModalBody">\n' +
                    '                                    <button type="button" class="close groupTileClose" data-dismiss="modal" aria-label="Close">\n' +
                    '                                        <span aria-hidden="true">&times;</span>\n' +
                    '                                    </button>\n' +
                    '                                    <div id="aboutModalContent">\n' +
                    '                                        <!--Our Mission-->\n' +
                    '                                        <h4>Our Mission</h4>\n' +
                    '                                        <!-- <hr style="width: 40%"> -->\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    Empower any learner* to effortlessly find the best resources and help them visualise their learning journey.\n' +
                    '                                                </div>\n' +
                    '                                                <br/>\n' +
                    '                                                <div class="container-fluid" id="aboutUsText" style="font-size:0.6vw; opacity: 0.8;">\n' +
                    '                                                    *If you can think, you are a learner.\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                        <!-- About Study -->\n' +
                    '                                        <h4>About Study</h4>\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    We believe in the learner\'s natural need for the best learning.<br/>\n' +
                    '                                                    <br/>\n' +
                    '                                                    We quench this thirst by having all the best resources in one searchable location<br/>\n' +
                    '                                                    <br/>\n' +
                    '                                                    We then help them track not only what they\'ve done in the past and present, but more importantly where their learning can advance to in the future.<br/>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                        <!-- Our Team -->\n' +
                    '                                        <h4>Our Team</h4>\n' +
                    '                                        <div class="row">\n' +
                    '                                            <div class="col">\n' +
                    '                                                <div class="container-fluid" id="aboutUsText">\n' +
                    '                                                    A small bunch on college students who are determined to help individuals see the value in what they\'re learning,\n' +
                    '                                                    and how their learning can take them to their deepest goals. You could call us the \'Avengers of Learning\',\n' +
                    '                                                    or more realistically just your regular local boyband.\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>');
                totalRows = totalRows - 1;

                $("#groupResTileContainer").append(div);

                //Event Listeners for each tile
                (function(j) {
                    $("#groupTileTrig"+decodedJSON[j]['groupId']).mouseenter(function (){
                        $("#groupTileCol"+decodedJSON[j]['groupId']).fadeIn();
                    });

                    $("#groupTile"+decodedJSON[j]['groupId']).mouseleave(function(){
                        $(".groupResourceContainer").fadeOut();
                    });
                })(i);

            }
            //checke
            $('.groupTileJoinBtn').click(function(e){
                var groupTileJoinId=e.target.id;
                console.log("joining group id: "+groupTileJoinId+"...");
            });
            //groupTileFunctions();
        }
    });

}

function showResult(str) {
    if (str.length==0) {
        document.getElementById("navbarLiveSearch").innerHTML="";
        document.getElementById("livesearch").style.border="0px";
        return;
    }
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (this.readyState==4 && this.status==200) {
            console.log("waluigggo");
            document.getElementById("navbarLiveSearch").innerHTML=this.responseText;
            document.getElementById("livesearch").style.border="1px solid #A5ACB2";
        }
    }
    xmlhttp.open("GET","https://study.ie/Server/search.php?q="+str,true);
    xmlhttp.send();
}

function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

$('.searchGroups').keyup(delay(function (e) {
    showResult(this.value);
}, 500));

function searchHomeHeader(){
    var headerSearch=$("#headerForm").val();
    window.location.replace("https://study.ie/groupResults.php?search="+headerSearch);
}

function searchHomeMobileHeader(){
    var headerSearch=$("#headerMobileForm").val();
    window.location.replace("https://study.ie/groupResults.php?search="+headerSearch);
}