status = "";
object = [];
song="";


function preload(){
    song=loadSound("baby_alarm.mp3")
}

function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(640, 420)
    video.hide()
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:object detected";

}

function modelLoaded() {
    console.log("Model Loaded Successfully")
    status = true;

}

function gotresult(error, results) {
    if (error) {
        console.error(error)
    }
    console.log(results)

    object = results;
}

function draw() {
    image(video, 0, 0, 640, 420)
    if (status != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        objectdetector.detect(video, gotresult)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "status:object detected";
            position_y = object[i].y
            position_x = object[i].x
            confidence = object[i].confidence
            width = object[i].width
            height = object[i].height
            name_object = object[i].label
            percent = floor(confidence * 100)
            fill(r, g, b)
            text(name_object + "" + percent + "%", position_x + 15, position_y + 15)
            noFill()
            stroke(r, g, b)
            rect(position_x, position_y, width, height) //x,y,wid,hei
            if (name_object=="person"){
                document.getElementById("baby_status").innerHTML="babyfound"
                song.stop()
            }
            if (name_object!="person"){
                document.getElementById("baby_status").innerHTML="baby not found"
                song.play()
            }
        }    if (object.length==0){
            document.getElementById("baby_status").innerHTML="baby not found"
            song.play()
        }


    }

}