function preload(){
    music = loadSound("sound.mp3");
}

function setup(){
    canvas = createCanvas(640,480);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(640,480)
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML ="Status : Detecting Objects";
}

stratus = "";
objects = [];

function draw(){
    image(video,0,0,640,480);
    if(stratus != ""){
        objectDetector.detect(video,gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i = 0; i<objects.length; i++){
            
            document.getElementById("status").innerHTML = "Object Detect (is it humano?...)";
            
            fill(r,g,b);
            percent = floor(objects[i].confidence *100);
            text(objects[i].label+" "+percent+"%", objects[i].x ,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("objects").innerHTML = "Humano is detected! Yo ears not gonna die"
                music.stop();
        }else{ document.getElementById("objects").innerHTML = "Humano not detected! Yo ears gonna blow"
        music.play();}
        if((objects.length == 0)){
            document.getElementById("objects").innerHTML = "Humano not detected! Yo ears gonna blow"
            music.play();
        }
        }
    }
    
}

function gotResult(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function modelLoaded(){
console.log("modelLoaded");
stratus = true;
}