// Initialize Firebase
var config = {
    apiKey: "AIzaSyD7u8261qI4CKFcIXdqr7zuB6uDrjHQ9ck",
    authDomain: "train-time-f5b2f.firebaseapp.com",
    databaseURL: "https://train-time-f5b2f.firebaseio.com",
    projectId: "train-time-f5b2f",
    storageBucket: "train-time-f5b2f.appspot.com",
    messagingSenderId: "804841066751"
};

firebase.initializeApp(config);

let database = firebase.database();

// initial variables
let trainName;
let destination;
let firstTrain;
let frequency;

// on click event for submit button
$("#submit").on("click", function (event) {
    event.preventDefault();
    console.log(moment().format());

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(trainName + destination + firstTrain + frequency);

    // database object
    let databaseObject = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };

    // pushing info to the database
    database.ref().push(databaseObject);
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {

    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log("Train Name " + sv.trainName);
    console.log("destination " + sv.destination);
    console.log("First Train " + sv.firstTrain);
    console.log("Frequency " + sv.frequency);

    //let empStartPretty = moment.unix(months)

    let tr = $("<tr>");
    //let months = moment().diff(moment(sv.startDate), 'months')

    tr.append($("<td>").html(sv.trainName));
    tr.append($("<td>").html(sv.destination));
    tr.append($("<td>").html(sv.frequency));
    tr.append($("<td class='rightMe'>").html(sv.firstTrain));
    //tr.append($("<td class='rightMe'>").html("$ " + sv.monthlyRate));
    //tr.append($("<td class='rightMe'>").html("$ " + months * sv.monthlyRate));

    $("#tBody").append(tr);
});