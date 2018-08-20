  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDZ7qL6ac6A5Hpdnx0PvGKl4599R1dzcN4",
    authDomain: "my-project-269a9.firebaseapp.com",
    databaseURL: "https://my-project-269a9.firebaseio.com",
    projectId: "my-project-269a9",
    storageBucket: "my-project-269a9.appspot.com",
    messagingSenderId: "432116256770"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding train data
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var Destination = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm X");
    var freq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var trainData = {
      trainname: trainName,
      dest: Destination,
      time: trainTime,
      freq: freq
    };
  
    // Uploads train data to the database
    database.ref().push(trainData);
  
    // Logs everything to console
    console.log(trainData.trainname);
    console.log(trainData.dest);
    console.log(trainData.time);
    console.log(trainData.freq);
  
   
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainname;
    var destination = childSnapshot.val().dest;
    var time = childSnapshot.val().time;
    var Freq = childSnapshot.val().freq;
  
    // Train Info Input
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(Freq);
   
    //store frequency time in tfrequency var
    var tFrequency = Freq;

    // Store input first train time in firsttime variable
    var firstTime = time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nexttraintime = moment(nextTrain).format("hh:mm A");
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(Freq),
      $("<td>").text(nexttraintime),
     $("<td>").text(tMinutesTillTrain)
    
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });