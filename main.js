song = "";
song2 = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreLeftWrist = "";
scoreRightWrist = "";

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music1.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture();
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Intialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftWrist > 0) {
        circle(leftWristX, leftWristY, 30);
        if (song2.isPlaying(true)) {
            song2.stop();
            song.play();
        } else {
            song.play();
        }
    }

    if (scoreRightWrist > 0) {
        circle(rightWristX, rightWristY, 30);
        if (song.isPlaying(true)) {
            song.stop();
            song2.play();
        } else {
            song2.play();
        }
    }
}