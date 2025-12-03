function calculateAndGenerate() {
  const streams = parseFloat(document.getElementById('streams').value) || 0;
  const minutes = parseFloat(document.getElementById('minutes').value) || 0;

  // Average song length assumption
  const averageSongLength = 3.5;

  // UK/USA average Spotify payout (rights holder earnings)
  const earningsPerStream = 0.004;

  // Require at least one input
  if (streams === 0 && minutes === 0) {
    alert("Please enter minutes or streams.");
    return;
  }

  // Decide whether user entered minutes or streams
  let totalStreams;
  let userInput;
  let inputType;

  if (minutes > 0) {
    inputType = "minutes";
    userInput = minutes;
    totalStreams = minutes / averageSongLength;
  } else {
    inputType = "streams";
    userInput = streams;
    totalStreams = streams;
  }

  const totalEarnings = totalStreams * earningsPerStream;

  // On-page result text
  const resultMessage = `
    <p>Spotify paid the rights holder approximately 
      <strong><span class="highlight">£${totalEarnings.toFixed(2)}</span></strong>
      for your listening.</p>

    <p style="font-weight: normal; font-size: 0.9em;">
      The Maths: £0.004 per stream (which is a generous UK/USA weighted average). 
    </p>
      
    <p style="font-weight: normal; font-size: 0.9em;">
      The Deal: Fully independent artists will receive all of that money. Artists signed to record labels could receive just 20%-50% of this amount.
    </p>

    <p style="font-weight: normal;">
      If you can, support your favourite artists in other ways like buying merch or physical media and
      attending live shows.
    </p>
  `;

  document.getElementById("result").innerHTML = resultMessage;

  // Generate the shareable image
  generateImage(totalEarnings.toFixed(2), userInput, inputType);

  // Smooth scroll to the results
  setTimeout(() => {
    document.getElementById("result").scrollIntoView({ behavior: "smooth" });
  }, 500);
}

function generateImage(totalEarnings, userInput, inputType) {
  const resultContainer = document.createElement("div");

  resultContainer.className = "result-container";
  resultContainer.style.cssText = `
    width: 1080px;
    height: 1920px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 120px 100px;
    text-align: center;
    background: linear-gradient(135deg, #811ba7, #0a0a0a);
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    box-sizing: border-box;
  `;

  resultContainer.innerHTML = `
    <img src="images/logo.png" style="width:320px; margin-bottom:20px;">
    <img src="images/spotify.png" style="width:380px; margin-bottom:40px;">

    <h2 style="font-size:64px; margin-bottom:40px; color:#1DB954;">
      Spotify Unwrapped 2025
    </h2>

    <p style="font-size:46px; margin-bottom:30px;">
      My favourite artists earned around <strong>£${totalEarnings}</strong>
      from my ${userInput.toLocaleString()} ${inputType}. 
    </p>

    <p style="font-size:46px; margin-bottom:30px;">
      To find out how much your streams were worth visit...
    
    </p>



    <p style="font-size:54px; font-weight:bold; margin-top:10px;">
      spotify-unwrapped.com
    </p>

  `;

  document.body.appendChild(resultContainer);

  html2canvas(resultContainer, {
    width: 1080,
    height: 1920,
    scale: 2,
  }).then((canvas) => {
    const img = canvas.toDataURL("image/jpeg");

    document.getElementById("imagePreview").innerHTML = `
      <p>Please share this image on your social media</p>
      <img src="${img}" style="max-width:100%; margin:20px 0;" />
      <a href="${img}" download="spotify-unwrapped-2025.jpg">Download</a>
    `;

    document.body.removeChild(resultContainer);
  });
}
