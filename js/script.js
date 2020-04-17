
const bellIcon = document.querySelector(".bell-icon");
const bellGreen = document.getElementById('bell-on');
let notificationRowClose;
const notificationPanel = document.getElementById('notifications');
const mainNav = document.querySelector('.main-nav-ul');
const alertBanner = document.getElementById("alert");
const trafficCanvas =document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("donut-chart");
const user = document.getElementById("userField");
const userResults = document.getElementById("user-search-results");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const settingsSuccess = document.getElementById("setting-success");
const trafficNav = document.querySelector(".traffic-nav");


//===================================================
//============== UNIVERSAl FUNCTIONS ===============
//===================================================

//styles selected nav item
let navStyleSelected = (ul, styleClass, event) => {  
  let element = event;
  let parentIsLI = element.closest("LI");
  let isLI = element.tagName === "LI";
  let style = styleClass;
  if( isLI || parentIsLI ) {
    //removes data-show class from chart nav
    for (let i = 0; i < ul.childElementCount; i += 1) {
      let li = ul.children[i];
      if (li.classList.contains(style)) {
        li.classList.remove(style);
      }
    }
    //adds data-show class to selected li element
    if (isLI) {
      element.classList += " " + style;
    } else if (parentIsLI) {
      parentIsLI.classList += " " + style;
    }
  }
};

//=========================================
//             NOTIFICATIONS
//=========================================

//shows green light on top of bell if there are any notifications
//adds notifications in notification panel
const moreNotifications = () => {
  if (notifications.length > 0) {
    bellGreen.style.display = "block";
  } else {
    bellGreen.style.display = "none";
    notificationPanel.style.display = "none";
  }
}

moreNotifications();


if (notifications.length > 0) {
  bellGreen.style.display = "block";
  for(let i = 0; i < notifications.length; i += 1) {
    let rowLeft = "<div class='row-left'></div>";
    let rowClose = "<p id='notification-row-close'>X</p>";
    let notification = rowLeft + "<p>"+ notifications[i] + "</p>" + rowClose;
    let rowWrapper = '<li class="notification-row">' + notification + '</li>';
    notificationPanel.innerHTML += rowWrapper;
  }
} else {
  bellGreen.style.display = "none";
}

// display/hide notification panel when bell is clicked;
bellIcon.addEventListener('click', e => {
  notificationPanel.classList.toggle("no-show");
});

//
const bellContainer = document.querySelector('.bell-container');

bellContainer.addEventListener('click', e => {
  //removes notification after user clicks 'X' beside corresponding row
  if (!notificationPanel.classList.contains("no-show") && e.target.textContent === "X") {
    notificationRowClose = document.querySelectorAll('#notification-row-close');
      let closeBtn = e.target;
      let li = closeBtn.parentElement;
      let notificationPanel = li.parentElement;
      let index = Array.prototype.indexOf.call(notificationPanel.children, li);
      console.log(index);
      notifications.pop(index);
      li.remove();
  }
  moreNotifications();
});


//======================================================



//========= style main nav ============
mainNav.addEventListener('click', e => {
  navStyleSelected(mainNav, "nav-selected", e.target)
});

//========== alert banner ==========

alertBanner.innerHTML = '<div class="alert-banner"><p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p><p class="alert-banner-close">x</p></div>';

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none"
    }
});


//=========================================
//             Message Section
//=========================================
    
//========= form validation ============

send.addEventListener('click', () => {
  // ensure user and message fields are filled out
  if (user.value === "" && message.value === "") {
  alert("Please fill out user and message fields before sending");
  } else if (user.value === "" ) {
  alert("Please fill out user field before sending");
  } else if (message.value === "" ) {
  alert("Please fill out message field before sending");
  } else {
  alert(`Message successfully sent to: ${user.value}`);
  }
});

//displays results
user.addEventListener('click', () => {
    userResults.style.display = "block";
});

//propagates input field with user selected member
userResults.addEventListener('click', e => {
  if(e.target.tagName === "LI") {
    let member = e.target.innerText;
    user.value = member;
  }
});

//removes results when user clicks out
user.addEventListener('focusout', () => {
  //timeout function is set to let user click on member before results dissapear
  setTimeout(function() {
    userResults.style.display = "none";
  }, 190);
});



//gets data from members array and adds each member(li) in container(ul)
for (let i = 0; i < members.length; i += 1) {
  let member = members[i];
  userResults.innerHTML +=  "<li>" + member + "</li>"
}
//toogles through search results based on user input
const filterResults = () => {
  let li = userResults.getElementsByTagName("li");
  let filter = user.value.toUpperCase();
  for (let i = 0; i < li.length; i += 1) {
    let a = li[i];
    let txtValue = a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
    } else {
        li[i].style.display = "none";
    }
  }
  if (li.length == 0) {
    userResults.style.display = "none";
  }
}

//=========================================
//            Settings Section
//=========================================

//store settings value in varieble
let profilePublic = document.getElementById("profile-public").checked;
let emailNotifications = document.getElementById("emailNotifications").checked;
let timezone = document.getElementById("timezone").value;
//arrays for key/value pairs
let settingsKey = ["email notifications", "public profile", "timezone"];
let settingsValue = [emailNotifications, profilePublic, timezone];
//targets settiongs container
const settings = document.querySelector(".settings")

//saves settings in local storage or returns default settings
settings.addEventListener('click', function(e){
  setDefaultSettings();

  const isBtn = e.target.tagName === "BUTTON"
  const saveBtn = isBtn && e.target.textContent === "Save";
  const cancelBtn = isBtn && e.target.textContent === "Cancel";
  if (saveBtn) {
    for (let i = 0; i < settingsKey.length; i += 1) {
      localStorage.setItem(settingsKey[i], settingsValue[i]);
      //displays success message
      settingsSuccess.style.display = "block";
      //removes success message after 2s
      setTimeout(function() {
        settingsSuccess.style.display = "none";
      }, 2000)
    }
  } else if (cancelBtn) {
    displayDefaultSettings();
  }
});

//display defaul settings stored in localstorage
let v;
const displayDefaultSettings = () => {
  v = JSON.parse(localStorage.getItem(settingsKey[0]));
  document.getElementById("emailNotifications").checked = v

  v = JSON.parse(localStorage.getItem(settingsKey[1]));
  document.getElementById("profile-public").checked = v

  v = localStorage.getItem(settingsKey[2]);
  document.getElementById("timezone").value = v
}

displayDefaultSettings();

//function updates variable values after settings have been modified
const setDefaultSettings = () => {
  profilePublic = document.getElementById("profile-public").checked;
  emailNotifications = document.getElementById("emailNotifications").checked;
  timezone = document.getElementById("timezone").value;
  settingsValue = [emailNotifications, profilePublic, timezone];
}

setDefaultSettings();

//===================================
//============ CHARTS ===============
//===================================
//data for charts can be found in data.js

//========== daily chart ==================
//adds chart!
let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
});
  
//========== mobile chart ==========
  
//adds chart!
let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});

//========== Traffic Chart ======= 


const Monthly = tData.Monthly;
const Weekly = tData.Weekly;
const Daily = tData.Daily;
const Hourly = tData.Hourly;

//function propagates chart with requested data
const dataFill = (arg1) => {
  //clean old data
  delete trafficData.labels
  delete trafficData.datasets[0].data
  //enter new data in graph
  trafficData.datasets[0].data = arg1.data
  trafficData.labels = arg1.labels
  //create new chart
  new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});
};

//calls function to fill chart with monthly data(default option)
dataFill(Monthly);


trafficNav.addEventListener('click', e => {
    //styles selected nav item
    navStyleSelected(trafficNav, "data-show", e.target);
    //updates chart with selected data
    let text = e.target.textContent;
    if (text === "Monthly") {
      dataFill(Monthly);
    } else if (text === "Weekly") {
      dataFill(Weekly);
    } else if (text === "Daily") {
      dataFill(Daily);
    } else if (text === "Hourly") {
      dataFill(Hourly);
    }
// }
});
    

