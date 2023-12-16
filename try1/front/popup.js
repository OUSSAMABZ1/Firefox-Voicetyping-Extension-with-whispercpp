const uploadURL = "http://localhost:8000/upload";
const startButton = document.getElementById("btn");
let recording = false;
let recorder;
var progress= document.getElementById("progress");
let language = document.getElementById("languageSelect").value;;
const lang = document.getElementById("languageSelect")

lang.addEventListener("change", function() {
      // Get the selected value from the select element
      language = document.getElementById("languageSelect").value;
})



startButton.addEventListener("click", function() {
  recording = !recording;

  if (recording) {
    document.getElementById("btn").style.backgroundColor = "crimson";
    const elements = document.getElementsByClassName("participation");
    for (const element of elements) {
      element.classList.add("animate");
    }

    if (!navigator.mediaDevices) {
      console.error("getUserMedia not supported.");
      return;
    }

    const constraints = { audio: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        let chunks = [];
        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = (event) => {
          console.log("Recording stopped.");
          progress.innerText = "Just a Moment. We are Transcribing!"
          let blob = new Blob(chunks, { type: recorder.mimeType });
          chunks = [];
          let formData = new FormData();
          formData.append("audio_file", blob);
          formData.append("lang", language);
          fetch(uploadURL, {
            method: "POST",
            cache: "no-cache",
            body: formData,
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              navigator.clipboard.writeText(json);
              progress.innerText = "Transcription Copied to Clipboard!"
            })
            .catch((err) => {
              console.error(err);
            });
        };

        recorder.onstart = (event) => {
          console.log("Recording started.");
          progress.innerText = "Recording..."
        };

        recorder.start();
      })
      .catch(function (err) {
        console.error(err);
      });
  } else {
    // Stop the recorder when the button is clicked again
    if (recorder && recorder.state === "recording") {
      recorder.stop();
    }

    document.getElementById("btn").style.backgroundColor = "black";
    const elements = document.getElementsByClassName("participation");
    for (const element of elements) {
      element.classList.remove("animate");
    }
  }
});