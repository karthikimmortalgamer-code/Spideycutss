import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const portraitSchema = z.object({
  imageDataUrl: z.string().startsWith("data:image/").max(12_000_000),
});

const AESTHETIC_PORTRAIT_PROMPT = `Create a hyper-realistic black and white cinematic portrait based on the uploaded reference image. Keep the exact same vertical composition, centered subject placement, camera angle, portrait framing, distance from camera, body posture, head direction, background gradient, lighting setup, shadow intensity, contrast, grain texture and dark mysterious mood.

Replace only the original person with the character from the newly uploaded target reference image. Preserve the target character's facial identity, face shape, natural proportions, hairstyle if visible, skin tone values in monochrome, eyes, nose, lips, jawline, facial hair if present, and expression as accurately as possible.

The target character must keep the same pose: standing front-facing, shoulders relaxed, body centered, hands hidden behind the back or body, head slightly lowered, face partially covered by the shadow of the cap, looking forward with a serious and mysterious expression. The face must remain mostly dark, with only the nose bridge, lips, cheek edges and lower facial structure faintly visible.

Maintain the exact same dramatic black and white lighting: strong top-front cap shadow, bright cap highlight, dark face silhouette, black upper background fading into a soft gray-white gradient behind the shoulders, deep black clothing, intense contrast, soft film noise and vintage editorial texture.

Adapt the clothing to the target character while keeping the same simple dark oversized sweatshirt/crewneck silhouette. Keep a light-colored cap on the head, but adjust its shape and fit naturally to the target character. Any text or logo on the cap should be removed or turned into a subtle non-readable graphic detail.

Use a 70mm to 85mm portrait lens, eye-level camera angle, studio lighting, high contrast monochrome, soft grain, cinematic shadows, editorial fashion photography. No readable text, no brand logos, no extra accessories unless matching the target character, no colorful elements, no watermark.`;

function decodeBase64(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export const createAestheticPortrait = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => portraitSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["OPENAI_API_KEY"];
    if (!apiKey) throw new Error("Portrait generation is not configured yet.");

    const [header, base64] = data.imageDataUrl.split(",", 2);
    const mimeType = header.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64$/)?.[1];
    if (!mimeType || !base64) throw new Error("The uploaded image could not be read.");

    const request = new FormData();
    request.append("model", "gpt-image-1");
    request.append("prompt", AESTHETIC_PORTRAIT_PROMPT);
    request.append(
      "image",
      new Blob([decodeBase64(base64)], { type: mimeType }),
      "reference-image",
    );
    request.append("size", "1024x1536");
    request.append("quality", "medium");
    request.append("input_fidelity", "high");
    request.append("output_format", "webp");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: request,
    });

    const result = (await response.json()) as {
      data?: Array<{ b64_json?: string }>;
      error?: { message?: string };
    };

    if (!response.ok || !result.data?.[0]?.b64_json) {
      throw new Error(result.error?.message || "Portrait generation failed. Please try again.");
    }

    return { imageDataUrl: `data:image/webp;base64,${result.data[0].b64_json}` };
  });
