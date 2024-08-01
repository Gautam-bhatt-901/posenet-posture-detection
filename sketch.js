let capture;
let poseNet;
let poses = [];

function setup(){
    createCanvas(600, 400);
    capture = createCapture(VIDEO);
    
    poseNet = ml5.poseNet(capture, modelReady);
    poseNet.on('pose', receivedPoses);
    capture.hide();
}

function modelReady(){
    console.log("Model Loaded");
}

function receivedPoses(results){
    poses = results;
}

function draw(){
    translate(600, 0);
    scale(-1, 1);
    image(capture, 0, 0);
    fill(255, 0, 0);
    
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        let skeleton = poses[i].skeleton;

        // Draw keypoints
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
            if (keypoint.score > 0.2) {
                fill(255, 0, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }

        // Draw skeleton
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255, 255, 255);
            strokeWeight(3);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
