video = "";
status = "";

function preload()
{

}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded()
{
    console.log("Model Is Initialized");
    status = true;
}

function draw()
{
    image(video, 0, 0, 600, 500);
}