const openAiAPI = "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";

async function generateImage() {
    const text = document.getElementById('input-text').value.trim();
    if (!text) {
        alert('Please enter some text');
        return;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openAiAPI}`
            },
            body: JSON.stringify({
                prompt: text,
                model: 'dall-e-2',
                n: 1,
                size: "1080x1080"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data); // Important for debugging!
      
          // Check if the response contains an image
          if (!data || !data.data || !data.data[0] || !data.data[0].url) {
            throw new Error('No image found in the response');
          }
      
          const imageUrl = data.data[0].url;
        

        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;

    } catch (error) {
        console.error('Error generating image:', error);
        alert('An error occurred while generating the image. Please try again.');
      }
}
