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
    <p style="font-weight: normal;">Fully independent artists will receive approx. 90% of that money. Artists signed to record labels could receive anywhere from 5% to 50% depending on their record deal.</p>
    <p style="font-weight: normal;">If you can, support your favourite artists in other ways like buying merch, attending live shows, or <a href='https://www.independent.co.uk/arts-entertainment/music/news/kate-nash-onlyfans-earnings-tour-subscribers-b2657173.html' target='_blank' style='color: #1DB954;'>subscribing to their OnlyFans</a>.</p>
  `;
  document.getElementById('result').innerHTML = resultMessage;

  // Generate Shareable Image
  const userInput = streams > 0 ? streams : minutes;
  const inputType = streams > 0 ? 'streams' : 'minutes';
  generateImage(yearlySubscription, totalEarnings.toFixed(2), userInput, inputType);

  // Automatically scroll to the results section
  setTimeout(() => {
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

function generateImage(yearlySubscription, totalEarnings, userInput, inputType) {
  const resultContainer = document.createElement('div');
  resultContainer.className = 'result-container';
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
  `;

  resultContainer.innerHTML = `
    <img src="images/logo.png" alt="Spotify Unwrapped Logo" style="width: 600px; margin-bottom: 20px;">
    <img src="images/spotify.png" alt="Spotify Logo" style="width: 700px; margin-bottom: 40px;">
    <p style="font-size: 48px; margin-bottom: 20px;">I paid <strong>£${yearlySubscription.toFixed(2)}</strong> to Spotify.</p>
    <p style="font-size: 48px; margin-bottom: 20px;">Spotify paid <strong>£${totalEarnings}</strong> to my favourite artist(s) for <strong>${userInput.toLocaleString()} ${inputType}</strong> played in 2024.</p>
    <p style="font-size: 32px; color: #666;">Find out how much (or) Spotify paid your favorite artists at</p>
    <p style="font-size: 40px; font-weight: bold;">spotify-unwrapped.com</p>
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
        <p>Please share this image on your social media and spread the word.</p>
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

