require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Missing input",
    });
  }

  try {
    // 1) generate before/after text
    const textResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an AI artist and minimalist writer.

You create paired scenes that compare the same moment before and after loss.

Your style is plain, concrete, quiet, and object-focused.

Avoid:
- clichés
- melodrama
- direct explanation
- poetic endings
- long paragraphs
- mentioning people directly`,
        },
        {
          role: "user",
          content: `Create TWO versions of the same moment.

Moment:
"${text}"

Project idea:
The world does not change. The person changes after loss.
The same object, room, or place should feel different.

Return valid JSON only:
{
  "before": "4 to 6 short lines separated by newline characters",
  "after": "4 to 6 short lines separated by newline characters",
  "symbol": "one shared object used in both versions",
  "artistNote": "one short sentence explaining how perception changed"
}

Rules:
- Both scenes must use the SAME main object.
- Write exactly 4 to 6 lines for each scene.
- Each line must be separated by a newline.
- Do NOT write paragraphs.
- Maximum 12 words per line.
- Use simple, natural English.
- No direct emotional words: sad, grief, loss, death, father.
- Do not mention people directly: no he, she, him, her, they.
- No metaphors.
- No fog, shadows, echoes, whispers, or silence clichés.
- Before should feel warm, ordinary, alive.
- After should feel still, unfinished, slightly uncomfortable.
- End the after scene with a plain physical detail.`,
        },
      ],
    });

    const result = JSON.parse(textResponse.choices[0].message.content);

    // 2) generate before image
    const beforeImageResponse = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `Create a realistic, subtle, cinematic image based on this scene.

Scene:
${result.before}

Shared object:
${result.symbol}

Requirements:
- realistic image
- quiet emotional tone
- warm and ordinary atmosphere
- same object must be clearly visible
- no text in the image
- no collage
- no split screen`,
      size: "1024x1024",
    });

    // 3) generate after image
    const afterImageResponse = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `Create a realistic, subtle, cinematic image based on this scene.

Scene:
${result.after}

Shared object:
${result.symbol}

Requirements:
- realistic image
- quiet emotional tone
- still, distant, slightly uncomfortable atmosphere
- same object must be clearly visible
- no text in the image
- no collage
- no split screen`,
      size: "1024x1024",
    });

    const beforeImageBase64 = beforeImageResponse.data[0].b64_json;
    const afterImageBase64 = afterImageResponse.data[0].b64_json;

    res.json({
      before: result.before,
      after: result.after,
      symbol: result.symbol,
      artistNote: result.artistNote,
      beforeImage: `data:image/png;base64,${beforeImageBase64}`,
      afterImage: `data:image/png;base64,${afterImageBase64}`,
    });
  } catch (error) {
    console.error("ERROR:", error.message);

    res.status(500).json({
      error: "Something went wrong while generating the comparison",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});