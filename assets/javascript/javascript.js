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
let trainConverted

// on click event for submit button
$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();
    trainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrain)
    console.log(trainConverted.toJSON());

    // database object
    let databaseObject = {
        "train Name": trainName,
        "destination": destination,
        "first Train": trainConverted.toJSON(),
        "frequency": frequency,
    };

    // pushing info to the database
    database.ref().push(databaseObject);
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {

    // storing the snapshot.val() in a variable for convenience
    let sv = snapshot.val();
    let currentTime = moment();
    let diffTime = moment().diff(moment(sv["first Train"]), "minutes");
    let timeRemainder = diffTime % sv.frequency;
    let minutesToTrain = sv.frequency - timeRemainder;
    let nextTrain = moment().add(minutesToTrain, "minutes");

    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    console.log("MINUTES TILL TRAIN: " + minutesToTrain);
    console.log("Time Remainder " + timeRemainder);
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //let empStartPretty = moment.unix(months)

    let tr = $("<tr>");

    tr.append($("<td>").html(sv["train Name"]));
    tr.append($("<td>").html(sv.destination));
    tr.append($("<td>").html(sv.frequency));
    tr.append($("<td>").text(moment(nextTrain).format("hh:mm A")));
    tr.append($("<td>").html(minutesToTrain))

    $("#tBody").append(tr);
});