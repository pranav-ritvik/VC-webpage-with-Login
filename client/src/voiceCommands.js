// src/voiceCommands.js
const commands = {
  "go to home": "/home",
  "go to about": "/about",
  "go to contact": "/contact",
  "go to services": "/services",
  "go to portfolio": "/portfolio",
  "go to testimonials": "/testimonials",
  "go to login": "/",
  "go to register": "/register",
  "go to profile": "/profile",
  "go back": -1,
};

export const startVoiceRecognition = (navigate, isLoggedIn) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => console.log("Voice recognition started");
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log(`You said: ${transcript}`);
    if (commands[transcript] !== undefined) {
      if (commands[transcript] === -1) {
        navigate(-1); // Go back
      } else {
        if (
          isLoggedIn ||
          commands[transcript] === "/" ||
          commands[transcript] === "/register"
        ) {
          navigate(commands[transcript]);
        } else {
          console.log("You must be logged in to navigate to this page.");
        }
      }
    } else {
      console.log(`Command not recognized: ${transcript}`);
    }
  };

  recognition.start();
};

export const stopVoiceRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.stop();
};
