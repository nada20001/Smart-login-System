// signup inputs
var signup_name = document.getElementById("signUpName");
var signup_email = document.getElementById("signUpEmail");
var signup_password = document.getElementById("signUpPassword");
var signUpArray = [];

// signin inputs
var signin_email = document.getElementById("signInEmail");
var signin_password = document.getElementById("signInPassword");
// to get home URL
var base_url = window.location.origin;
var host = window.location.host;
var pathArray = window.location.pathname.split("/"); //turn path into array....
var homeURL = "";

// we need to take a step back and then open home file
for (var i = 0; i < pathArray.length - 1; i++) {
  homeURL += "/" + pathArray[i];
}
// var home = base_url + "/home.html";
// console.log(home);

//to add content to home page
var username = localStorage.getItem("loginUser");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}

//function to check inputs of signup is empty or not
function signupEmpty() {
  if (
    signup_name.value == "" ||
    signup_email.value == "" ||
    signup_password.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}

// function to check email is existed or not
function emailExisted() {
  for (var i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() == signup_email.value.toLowerCase()
    ) {
      return false;
    }
  }
}
// sign up
function signUp() {
  if (signupEmpty() == true) {
    document.getElementById("alert").innerHTML =
      '<p class="text-danger bg-transparent">All inputs is required</p>';
    document.getElementById("alert").classList.remove("d-none");
    return false;
  }
  // to store all value as object
  var user = {
    name: signup_name.value,
    email: signup_email.value,
    password: signup_password.value,
  };
  if (signUpArray.length == 0) {
    signUpArray.push(user);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("alert").innerHTML =
      '<p class="text-success ">Success</p>';
    document.getElementById("alert").classList.remove("d-none");

    return true;
  }
  if (emailExisted() == false) {
    document.getElementById("alert").innerHTML =
      '<p class="text-danger m-3">email already exists</p>';
    document.getElementById("alert").classList.remove("d-none");
  } else {
    signUpArray.push(user);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("alert").innerHTML =
      '<p class="text-success m-3">Success</p>';
    document.getElementById("alert").classList.remove("d-none");
  }
}

// login

//function to check inputs of login is empty or not
function loginEmpty() {
  if (signin_password.value == "" || signin_email.value == "") {
    return true;
  } else {
    return false;
  }
}

function login() {
  if (loginEmpty() == true) {
    document.getElementById("alert").innerHTML =
      '<p class="text-danger ">All inputs is required</p>';
    document.getElementById("alert").classList.remove("d-none");

    return false;
  }
  var usermail = signin_email.value;
  var user_password = signin_password.value;

  for (var i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() == usermail.toLowerCase() &&
      signUpArray[i].password.toLowerCase() == user_password.toLowerCase()
    ) {
      localStorage.setItem("loginUser", signUpArray[i].name);
      if (homeURL == "/") {
        location.replace("https://" + location.hostname + "/home.html");
      } else {
        location.replace(homeURL + "/home.html");
      }
    } else {
      document.getElementById("alert").innerHTML =
        '<p class="p-2 text-danger">incorrect email or password</p>';
      document.getElementById("alert").classList.remove("d-none");
    }
  }
}

//log out
function logout() {
  localStorage.removeItem("loginUser");
}

console.log(window.location.origin);
console.log(window.location.pathname);
