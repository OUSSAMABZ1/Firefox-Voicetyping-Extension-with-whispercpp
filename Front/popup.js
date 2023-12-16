let recording = false;
let mediaRecorder;
const url = 'http://localhost:8000/upload';
let audioChunks = [];

const stopRecording = async () => {
    mediaRecorder.stop();

    const audioBlob = new Blob(audioChunks, { 'type': 'audio/wav' });

    // Create FormData object
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            body: formData,
        });

        if (response.ok) {
            console.log(response);
        } else {
            console.error('Failed to upload audio.');
        }
    } catch (error) {
        console.error('Error during fetch:', error);
    }
};


document.getElementById('btn').addEventListener('click', function() {
    recording = !recording;
    if (recording){
        document.getElementById("btn").style.backgroundColor = "crimson";
        const elements = document.getElementsByClassName("participation");
        for(const element of elements){
            element.classList.add("animate");
        }
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {

                    audioChunks.push(event.data);
            };
            mediaRecorder.start();
        })
        .catch((error) => {
            console.error('Error accessing microphone:', error);
        });


    }else{

        document.getElementById("btn").style.backgroundColor = "black";
        const elements = document.getElementsByClassName("participation");
        for(const element of elements){
            element.classList.remove("animate");
        }
        stopRecording();
    }       
})




//const url = 'http://localhost:8000/'
//fetch(url)
//.then(response => response.json())  
//.then(json => {
//    console.log(json);
//    document.querySelector("input").setAttribute('value', JSON.stringify(json));
//}) 

// when clicked, button changes to red and animation starts
// use microphone to record user
// Find a solution to stream
// send audio and language to the server
// retrieve result 
// write it search bar or firedoc doc
