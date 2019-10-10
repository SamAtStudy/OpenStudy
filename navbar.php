<!-- NAV BAR-->
<nav class="navbar navbar-expand-lg navbar-light navbar-custom">
    <a class="navbar-brand" href="index.php">
        <img src=img/Logo2White.png alt="Study.ie" class="studyLogo" width="115" height="36">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto" style="margin-left:15px;">
            <li class="nav-item" id="courseNav">
                <a class="nav-link" href="courseResults.php">Courses</a>
            </li>
            <li class="nav-item ">
                <a class="nav-link" href="blog-home.php">Blog</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" style="visibility: hidden;"></a>
            </li>
        </ul>
    </div>
</nav>

<!-- Login Modal-->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="loginModalContent">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div id="loginModalBody">
                    <div class="form-title text-center">
                        <div class="bd-example bd-example-tabs">
                            <ul class="nav nav-pills mb-4 mt-n3 justify-content-center" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a style="color:black;" class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-expanded="true">Login</a>
                                </li>
                                <li class="nav-item">
                                    <a style="color:black;" class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-expanded="true">Sign Up</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div class="d-flex flex-column">
                                        <form id="loginFormContainer">
                                            <!-- <div class="form-group inner-addon left-addon">
                                                 <img src="img/icons/email.svg" class="glyph" style="height:35px;">
                                                 <input type="email" class="form-control loginForm" id="email1" placeholder="Email">
                                             </div> -->
                                            <div class="form-group">
                                                <input type="email" class="form-control loginForm" id="mailUsername" placeholder="Username / Email">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control loginForm" id="pass" placeholder="Password">
                                            </div>
                                            <div class="d-flex flex-row my-3">
                                                <div class="custom-control custom-checkbox mr-auto">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck1" checked>
                                                    <label class="custom-control-label" for="customCheck1">Remember Me</label>
                                                </div>
                                                <span style="color:black;"><a href="#" style="color:black;">Forgot password?</a></span>
                                            </div>
                                            <button id="accLoginBtn" type="button" class="btn btn-info btn-block btn-round">Login</button>
                                        </form>

                                        <!-- Or Divider -->
                                        <div class="strike my-4">
                                            <span style="font-weight: 400">Or</span>
                                        </div>


                                        <div class="d-flex flex-column text-center mb-3">
                                            <h4 style="font-weight: 700;">Login With...</h4>
                                        </div>


                                        <div id="loginSocialBox" class="d-flex justify-content-around">
                                            <button class="btn btn-primary">
                                                <img src="img/icons/googleLogo.svg">
                                                Google
                                            </button>
                                            <button class="btn btn-primary">
                                                <img src="img/icons/twitterLogo.svg">
                                                Twitter
                                            </button>
                                            <button class="btn btn-primary text-right">
                                                <img src="img/icons/fbLogo.svg">
                                                Facebook
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div class="d-flex flex-column">
                                        <form id="loginFormContainer">
                                            <div class="form-group">
                                                <input type="email" class="form-control loginForm" id="createUsername" placeholder="Username">
                                            </div>
                                            <div class="form-group">
                                                <input type="email" class="form-control loginForm" id="createEmail" placeholder="Email">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control loginForm" id="createPassword" placeholder="Password">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control loginForm" id="confirmPassword" placeholder="Confirm Password">
                                            </div>
                                            <div class="d-flex flex-row my-3">
                                                <div class="mx-auto">
                                                    <span style="font-size: 0.8rem;">By creating an account, you agree you've accepted our <a href="#" style="color:blue;">User Agreement</a><span>
                                                </div>
                                            </div>
                                            <button style="background-color: grey; border-color: grey; border-radius:10px; font-size:1.3rem;" type="button" class="btn btn-info btn-block btn-round">Create Account</button>
                                        </form>

                                        <!-- Or Divider -->
                                        <div class="strike my-4">
                                            <span style="font-weight: 400">Or</span>
                                        </div>


                                        <div class="d-flex flex-column text-center mb-3">
                                            <h4 style="font-weight: 700;">Create An Account With...</h4>
                                        </div>


                                        <div id="loginSocialBox" class="d-flex justify-content-around">
                                            <button class="btn btn-primary">
                                                <img src="img/icons/googleLogo.svg">
                                                Google
                                            </button>
                                            <button class="btn btn-primary">
                                                <img src="img/icons/twitterLogo.svg">
                                                Twitter
                                            </button>
                                            <button class="btn btn-primary text-right">
                                                <img src="img/icons/fbLogo.svg">
                                                Facebook
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>