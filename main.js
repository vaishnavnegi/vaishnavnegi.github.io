$(document).ready(function () {
  // Get JSON data from url
  $.getJSON("https://api.covid19india.org/data.json", function (data) {
    var states = [];
    var confirmed = [];
    var recovered = [];
    var deaths = [];
    var active = [];

    var total_active;
    var total_confirmed;
    var total_recovered;
    var total_deaths;

    var date = [];
    var totalconfirmed = [];
    var totaldeceased = [];
    var totalrecovered = [];

    // Take the first element in statewise array and add the objects values into the above variables
    total_active = data.statewise[0].active;
    total_confirmed = data.statewise[0].confirmed;
    total_recovered = data.statewise[0].recovered;
    total_deaths = data.statewise[0].deaths;
    var tbody = $('.table'),
      props = ["state", "confirmed", "active", "recovered", "deaths"];
    $.each(data.statewise, function (i, objk) {
      var tr = $('<tr>');
      $.each(props, function (i, prop) {
        $('<td>').html(objk[prop]).appendTo(tr);
      });
      tbody.append(tr);
    });

    // The each loop select a single statewise array element
    // Take the data in that array and add it to variables
    $.each(data.statewise, function (id, obj) {
      states.push(obj.state);
      confirmed.push(obj.confirmed);
      recovered.push(obj.recovered);
      deaths.push(obj.deaths);
      active.push(obj.active);
    });
    $.each(data.cases_time_series, function (id, obj) {
      date.push(obj.date);
      totalconfirmed.push(obj.totalconfirmed);
      totaldeceased.push(obj.totaldeceased);
      totalrecovered.push(obj.totalrecovered);
    });

    var x = 0;
    for (i in data.cases_time_series) {
      x++;
    }
    console.log(x);

    var inital = data.cases_time_series[x - 6].totalconfirmed;
    console.log(inital);
    var end = data.cases_time_series[x - 1].totalconfirmed;
    console.log(end);
    // Remove the first element in the states, confirmed, recovered, and deaths as that is the total value
    states.shift();
    confirmed.shift();
    recovered.shift();
    deaths.shift();
    active.shift();

    // console.log(confirmed);
    $("#confirmed").append(total_confirmed);
    $("#active").append(total_active);
    $("#recovered").append(total_recovered);
    $("#deaths").append(total_deaths);


    // Chart initialization
    var myChart2 = document.getElementById("myChart2").getContext("2d");
    var mypie = new Chart(myChart2, {
      type: "doughnut",
      data: {
        datasets: [
          {

            data: [total_active, total_confirmed, total_deaths, total_recovered],
            backgroundColor: ["#2A81EA", "#ff9000", "#F24338", "#14e81f"],
          },
        ],
        labels: [
          'Total Active',
          'Total Confirmed',
          'Total Deaths',
          'Total Recovered'
        ],

      },
      option: {},
    });

    var myChart = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(myChart, {
      type: "line",
      data: {
        labels: date,
        datasets: [
          {
            label: "Total Confirmed Cases",
            data: totalconfirmed,
            borderColor: "#ff9000",
            minBarLength: 100,

          },
          {
            label: "Total Deceased Cases",
            data: totaldeceased,
            backgroundColor: "#F24338",
            minBarLength: 100,
          },
          {
            label: "Total Recovered Cases",
            data: totalrecovered,
            backgroundColor: "#14e81f",
            minBarLength: 100,
          },

        ],
      },
      option: {},
    });

    var myChart3 = document.getElementById("myChart3").getContext("2d");
    var line = new Chart(myChart3, {
      type: "line",
      data: {
        labels: states,
        datasets: [
          {
            label: "Total Confirmed Cases",
            data: confirmed,
            borderColor: "#ff9000",
            minBarLength: 100,
            fill: false,
          },
          {
            label: "Total Deceased Cases",
            data: deaths,
            backgroundColor: "#F24338",
            minBarLength: 100,
          },
          {
            label: " Recovered Cases",
            data: recovered,
            backgroundColor: "#14e81f",
            minBarLength: 100,
          },
          {
            label: "Active Cases",
            data: active,
            backgroundColor: "#2A81EA",
            minBarLength: 100,
          },

        ],
      },
      option: {},
    })


    function calcPc(n1, n2) {
      return (((n2 - n1) / n1 * 100).toLocaleString('fullwide', { maximumFractionDigits: 2 }) + "%");
    }
    function calcPc1(n1, n2) {
      return (((n2 - n1) / n1 * 100));
    }

    function P(n1, n2) {
      return ((((n1 * n2)) / 100) + parseInt(total_confirmed)).toLocaleString('fullwide', { maximumFractionDigits: 0 });
    }


    var result = calcPc(inital, total_confirmed);
    var result1 = calcPc1(inital, total_confirmed);
    console.log(

      " Growth Rate: in last 7 days", result ,
    )

    var predict = P(result1, total_confirmed)

    console.log(predict);
    $("#predict").append(predict);
    $("#Growth").append(result);
  });


});
