from edge_tts import Communicate
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel, Field

app = FastAPI()


class SpeechRequest(BaseModel):
    text: str = Field(min_length=1, max_length=2000)


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


@app.post("/api/speech")
async def generate_speech(request: SpeechRequest):
    text = request.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text is required.")

    audio_chunks = []
    try:
        communicate = Communicate(text, "en-US-AriaNeural")
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_chunks.append(chunk["data"])
    except Exception as error:
        raise HTTPException(
            status_code=502,
            detail="Edge TTS could not generate speech.",
        ) from error

    if not audio_chunks:
        raise HTTPException(status_code=502, detail="Edge TTS returned no audio.")

    return Response(
        content=b"".join(audio_chunks),
        media_type="audio/mpeg",
        headers={"Cache-Control": "no-store"},
    )
