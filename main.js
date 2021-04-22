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
    if(scorel>0.2){
        song2.stop();
        circle(leftWristX,leftWristY,20);
        NoY1=Number(leftWristY);
        rd=floor(NoY1);
        document.getElementById("pepe").innerHTML="Peter Pan Theme"+"Yes";
        song1.play();
    }
    if(scorel<0.2){
        song1.stop();
        document.getElementById("pepe").innerHTML="Peter Pan Theme"+"No";
    }
    if(scorer>0.2){
        song2.stop();
        circle(leftWristX,leftWristY,20);
        NoY1=Number(leftWristY);
        rd=floor(NoY1);
        document.getElementById("harry").innerHTML="Harry Potter Theme"+"Yes";
        song2.play();
    }
    if(scorer<0.2){
        song2.stop();
        document.getElementById("harry").innerHTML="Harry Potter Theme"+"No";
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