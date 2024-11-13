import Replicate from "replicate";

export default async function handler(req, res) {
  const { topic, mood } = req.body;

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const output = await replicate.run(
      "a16z-infra/llama13b-v2-chat:6b4da803a2382c08868c5af10a523892f38e2de1aafb2ee55b020d9efef2fdb8",
      {
        input: {
          prompt: `Write a single tweet about ${topic} with a ${mood} tone. Keep it concise, impactful, and within 280 characters.`,
          system_prompt:
            "You are an expert in writing concise, viral tweets. Focus on creating a single tweet only, without any extra description or hashtags. The tweet should be direct, engaging, and easy to read, aimed at maximizing shares and likes.",
        },
      }
    );

    res.status(200).json({ tweet: output });
  } catch (error) {
    console.error("AI tweet generation failed:", error);
    res.status(500).json({ error: "AI tweet generation failed" });
  }
}
