song1="";
song2="";
leftWristX=00;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scorel=0;
scorer=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("Re:Zero");
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FFFFFF");
    song1s=song1.isPlaying();
    if(scorel>0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1s==false){
            document.getElementById("pepe").innerHTML="Peter Pan Theme"+"Yes";
            document.getElementById("harry").innerHTML="Harry Potter Theme"+"No";
            song1.play();
        }
    }
    song2s=song2.isPlaying();
    if(scorer>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song1s==false){
            document.getElementById("harry").innerHTML="Harry Potter Theme"+"Yes";
            document.getElementById("pepe").innerHTML="Peter Pan Theme"+"No";
            song2.play();
        }
    }
}
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function gotPoses(results){
    if (results.length>0) {
        console.log("WORK");
        scorel=results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist="+scorel);
        scorer=results[0].pose.keypoints[10].score;
        console.log("Score of Right Wrist="+scorer);
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristY="+leftWristY+"leftWristX="+leftWristX);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    }
}