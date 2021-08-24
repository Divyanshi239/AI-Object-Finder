video = "";
status = "";
objects = [];
object = "";

function preload() {

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function modelLoaded() {
    console.log("Model Is Initialized");
    status = "start";
}

function draw() {
    image(video, 0, 0, 600, 500);
    console.log("Before If");
    if (status != "") {
        console.log("Inside if");
        objectDetector.detect(video, gotresult);

        for (i = 0; i < objects.length; i++) {
            console.log(objects[i].label);
            if (object === objects[i].label) {
                text(objects[i].label + " " + percentage + "%", objects[i].x + 5, objects[i].y + 10);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                document.getElementById("status").innerHTML = "Object Found";
                video.stop();
                objectDetector.detect(gotresult);

                var synth = window.speechSynthesis;
                speak_data_1 = objects[i].label + "Found";
                var utterThis = new SpeechSynthesisUtterance(speak_data_1);
                synth.speak(utterThis);
            }
            else {
                document.getElementById("status").innerHTML = "Object Not Found";
            }
        }
    }
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    //status = true;
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("object").value;
    console.log(object);
}