const openAiAPI = "YOUR_API_HERE";

async function generateImage() {
  const text = document.getElementById("input-text").value;

  if (!text) {
    alert("Please enter some text");
    return;
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiAPI}`,
        },
        body: JSON.stringify({
          prompt: text,
          model: "dall-e-3",
          n: 1,
          size: "1024x1024",
        }),
      }
    );

    const data = await response.json();
    // console.log(data);

    if (!data || !data.data || !data.data[0] || !data.data[0].url) {
      throw new Error("No image found in the response");
    }

    const imageUrl = data.data[0].url;

    const outputElement = document.getElementById("output");
    outputElement.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
  } catch (error) {
    console.error("Error generating image:", error);
    alert("An error occurred while generating the image. Please try again.");
  }
}
async function generateText() {
  const text = document.querySelector("#input-text");

  if (!text) {
    alert("Please enter some text");
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiAPI}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `${text.value}`,
          },
        ],
        model: "gpt-3.5-turbo",
      }),
    });

    const textData = await response.json();
    // console.log(textData);

    const textResponse = textData.choices[0].message.content;
    const outputElement = document.getElementById("output");
    outputElement.innerHTML = `<p>${textResponse}<p>`;
  } catch (error) {
    console.error("Error generating text:", error);
    alert("An error occurred while generating the text. Please try again.");
  }
}
