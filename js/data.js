
//=========================================
//             NOTIFICATIONS
//=========================================

const notifications = [
  "James Wilson has accepted your quote",
  "New project milestone activated"
];


//=========================================
//             Members
//=========================================

const members = ['Victoria Chambers','Dale Byrd','Dawn Wood','Dan Oliver']

//=========================================
//             TRAFFIC CHART
//=========================================

//========== mobile chart ==========
//chart data
const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
      label: '# of Users',
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: [
        '#7477BF',
        '#78CF82',
        '#51B6C8'
      ]
    }]
  };
      
  //chart options
  const mobileOptions = {
  legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        fontStyle: 'bold'
      }
    }
  }

//========== daily chart ==================
//chart data
const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
          label: '# of Hits',
          data: [75, 115, 175, 125, 225, 200, 100],
          backgroundColor: '#7477BF',
          borderWidth: 1
      }]
    };
  //chart options
  const dailyOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      },
      legend : {
        display: false
      }
  }

//========== traffic chart =====================

let trafficData = {
    labels: [],
    datasets: [{
        data: [],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    }]
};

//chart options
let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 0
  },
  scales: {
    yAxes: [{
      ticks: {
         beginAtZero:true
      }
    }]
  },
  legend : {
    display: false
  }
};

let tData = {
    "Monthly": 
        {
            "labels": ["Jan", "Feb", "March"],
            "data": [2279, 6665, 8626]
        },
    "Weekly": 
        {
            "labels": ["Jan 16-22", "Jan 23-30", "Feb 1-5", "Feb 6-12", "Feb 13-19", "Feb 20-26", "Feb 27-31",
                "Mar 1-10", "Mar 11-17", "Mar 18-24", "Mar 25-31"],
            "data": [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,2500]
        },
    "Daily": 
        {
            "labels": ["Mon-16", "Tues-17", "Weds-18", "Thurs-19", "Fri-20", "Sat-21",
                "Sun-22"],
            "data": [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,2500]
        },
    "Hourly": 
        {
            "labels": ["1am", "2am", "3am", "4am", "5am", "6am", "7am",
                "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm",
                "8pm", "9pm", "10pm", "11pm", "12am"],
            "data": [0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 4, 5, 6, 16, 27, 6, 11, 5, 5, 2, 5, 16, 27, 11]
        }
    }

