function calculateAndGenerate() {
  const streams = parseFloat(document.getElementById('streams').value) || 0;
  const minutes = parseFloat(document.getElementById('minutes').value) || 0;
  const averageSongLength = 3.5; // in minutes
  const earningsPerStream = 1.28 / 543; // £1.28 for 543 streams

  // Get the selected plan value or default to Single (£11.99/month)
  const selectedPlan = document.getElementById('plan').value;
  let monthlyCost = parseFloat(selectedPlan);

  // Adjust Duo plan to reflect cost per user
  if (selectedPlan === "16.99") {
    monthlyCost = monthlyCost / 2; // Divide Duo cost by 2
  }

  const yearlySubscription = monthlyCost * 12;

  let totalStreams = streams;
  if (minutes > 0) {
    totalStreams = minutes / averageSongLength; // Convert minutes to streams
  }

  const totalEarnings = totalStreams * earningsPerStream;

  // Update result text
  const resultMessage = `
    <p>Total Spotify subscription for the year: <strong><span class="highlight">£${yearlySubscription.toFixed(2)}</span></strong>.</p>
    <p>Spotify paid approximately <strong><span class="highlight">£${totalEarnings.toFixed(2)}</span></strong> to your favorite artist.</p>
    <p>Fully independent artists will receive all of that money. Artists signed to record labels could receive just 20%-50% of this amount.</p>
    <p style="font-weight: normal;">If you can, support your favourite artists in other ways like buying merch, attending live shows, or <a href='https://www.independent.co.uk/arts-entertainment/music/news/kate-nash-onlyfans-earnings-tour-subscribers-b2657173.html' target='_blank' style='color: #1DB954;'>subscribing to their OnlyFans</a>.</p>
  `;
  document.getElementById('result').innerHTML = resultMessage;

  // Figure out what the user actually entered (streams or minutes)
  const userInput = streams > 0 ? streams : minutes;
  const inputType = streams > 0 ? 'streams' : 'minutes';

  // Generate Shareable Image
  generateImage(yearlySubscription, totalEarnings.toFixed(2), userInput, inputType);

  // Automatically scroll to the results section
  setTimeout(() => {
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

function generateImage(yearlySubscription, totalEarnings, userInput, inputType) {
  const resultContainer = document.createElement('div');
  resultContainer.className = 'result-container';

  // Main canvas styling – padded and boxed so text stays away from edges
  resultContainer.style.cssText = `
    width: 1080px;
    height: 1920px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #811ba7, #0a0a0a);
    text-align: center;
    color: #ffffff;
    padding: 120px 100px;      /* big safe padding around edges */
    box-sizing: border-box;    /* padding stays inside 1080x1920 */
  `;

  // Inner wrapper so text doesn't stretch too wide
  resultContainer.innerHTML = `
    <div style="max-width: 880px; margin: 0 auto;">
      <img src="images/logo.png"
           alt="Spotify Unwrapped Logo"
           style="width: 320px; margin: 0 auto 20px; display: block;">
      <img src="images/spotify.png"
           alt="Spotify Logo"
           style="width: 380px; margin: 0 auto 40px; display: block;">

      <h2 style="font-size: 64px; margin-bottom: 40px; color: #1DB954;">
        Spotify Unwrapped 2024
      </h2>

      <p style="font-size: 46px; margin-bottom: 20px;">
        In 2024, I paid <strong>£${yearlySubscription.toFixed(2)}</strong> to Spotify.
      </p>

      <p style="font-size: 46px; margin-bottom: 40px;">
        Spotify paid <strong>£${totalEarnings}</strong> to my favorite artist
        for ${userInput.toLocaleString()} ${inputType} of listening.
      </p>

      <p style="font-size: 36px; margin-bottom: 16px; color: #dddddd;">
        It’s time to <strong>#FixStreaming</strong>
      </p>

      <p style="font-size: 54px; font-weight: bold; margin-top: 10px;">
        spotify-unwrapped.com
      </p>
    </div>
  `;

  // Temporarily append the container to the body for rendering
  document.body.appendChild(resultContainer);

  // Generate the image with high resolution
  html2canvas(resultContainer, {
    width: 1080,
    height: 1920,
    scale: 2, // Increase rendering scale for higher resolution
  })
    .then((canvas) => {
      const img = canvas.toDataURL('image/jpeg');
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.innerHTML = `
        <p>Please share this image on your social media</p>
        <img src="${img}" alt="Generated Image" style="max-width: 100%; margin: 20px 0;" />
        <a href="${img}" download="spotify-unwrapped-2024.jpg">Download</a>
      `;

      // Remove the container after rendering
      document.body.removeChild(resultContainer);
    })
    .catch((error) => {
      console.error("Error generating image:", error);
    });
}
