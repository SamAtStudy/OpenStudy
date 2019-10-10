
<!--SECTION 4 FOOTER -->
<div id="footerBox">
    <div class="row">
        <div class="col-12 col-xl-4 order-md-2">
            <div id="socialBox">
                <h4 id="socialLinkHeader">Follow Us On</h4>
                <div id="socialLinkBox" class="d-flex justify-content-center">
                    &nbsp
                    <button id="fbBtn" class="btn btn-primary" style="border-radius: 12px; background-color:white; border-color: #b4e4da;"><img src="img/icons/fbLogo.svg"></button>
                    <button id="twBtn" class="btn btn-primary buttonLeft" ><img src="img/icons/twitterLogo.svg"></button>
                    <button id="inBtn" class="btn btn-primary buttonLeft" ><img src="img/icons/Instagram.svg"></button>
                    <button id="lnBtn" class="btn btn-primary buttonLeft"><img src="img/icons/linkedin-logo.svg"></button>
                </div>
            </div>
        </div>
        <div class="col-12 col-xl-4 order-md-1">
            <div id="aboutUsBox">
                <img src="img/Logo2White.png" style="width:100%;">
                <a href="#" id="aboutUsBtn" data-toggle="modal" data-target="#aboutModal" > Who Are We? </a>
            </div>

            <!-- About Us Modal-->
            <div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            Empower any learner* to effortlessly find the best resources and help them visualise their learning journey.
                                        </div>
                                        <br/>
                                        <div class="container-fluid" id="aboutUsText" style="font-size:0.6vw; opacity: 0.8;">
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
                                            We quench this thirst by having all the best resources in one searchable location<br/>
                                            <br/>
                                            We then help them track not only what they've done in the past and present, but more importantly where their learning can advance to in the future.<br/>
                                        </div>
                                    </div>
                                </div>

                                <!-- Our Team -->
                                <h4>Our Team</h4>
                                <div class="row">
                                    <div class="col">
                                        <div class="container-fluid" id="aboutUsText">
                                            A small bunch on college students who are determined to help individuals see the value in what they're learning,
                                            and how their learning can take them to their deepest goals. You could call us the 'Avengers of Learning',
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
                <span class="footerMiscInfo" > Contact: sam@study.ie</span>
                <br>
                <span class="footerMiscInfo" ><a href="https://google.com" style="color:white;">Privacy Policy</a> &nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp <a href="https://google.com" style="color:white;">Terms of Use</a></span>
                <br>
                <span class="footerMiscInfo" > Copyright © 2019 Study.ie. All rights reserved. </span>
            </div>
        </div>
    </div>
</div>

<!-- SCRIPTS -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/jquery.cookie.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/sweetalert.min.js"></script>
<script src="js/studyScript.js"></script>
<script src="js/responsiveslides.min.js"></script>
</body>
</html>
