from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from process import model

app = FastAPI()


class VideoRequest(BaseModel):
    audience_country: str
    audience_age_range: str
    video_type: str
    video_topics: List[str]

origins = [
    "http://localhost:5173",  # React app
    "http://127.0.0.1:5173",  # React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock function to simulate the Gemini API call
def generate_script(audience_country, audience_age_range, video_type, video_topics):
    prompt_parts = [f"""
    Imagine you are an expert script writer. You also understand how to make viral content.

    Remember these features often make a video go viral:
    1. Social Currency: People share content that enhances their social status or makes them appear knowledgeable. For that reason, viral content needs to be remarkable, unique, or offer exclusive information that others will want to share to boost their own social standing.
    2. Emotional Resonance: Content that brings out high-arousal emotions such as awe, laughter, or surprise is more likely to go viral. If your content tugs at the heartstrings, evokes strong reactions, or provides a cathartic experience, you’ll probably inspire more people to share your stuff.
    3. Social Proof: People want to be a part of what’s already popular. Videos that have lots of likes and comments are more likely to get even more likes and comments. Finding ways to encourage engagement and start a conversation with your content can create a virtuous cycle where more people feel compelled to engage because others have already done so. 
    4. Practical value: Content that solves a problem is incredibly shareable. Creating content that provides actionable tips, hacks, or advice that can improve people's lives or make tasks easier. Content that offers a tangible benefit makes people feel helpful when they share it with others.
    5. Storytelling: Berger also highlights the importance of storytelling in making content more shareable. Humans are wired for narratives, and compelling stories have the power to captivate and engage. Craft narratives that are relatable, emotionally compelling, and easy to remember. Stories can create a deeper connection with your audience, which makes them more likely to spread the story further.

    When creating a TikTok video, consider the following:
    1. Identify trending topics: By jumping on the trends early and adding your unique twist, you can capture the attention of the TikTok community and increase the likelihood of your video content being shared.
    2. Create powerful hooks — and make it shorter: Capture the viewer's attention within the first few seconds with an intriguing opening. Keep the length between 20 seconds to 30 seconds
    3. Engage with your audience. Encourage like, save, comments and share. Strategically leave “comment bait” throughout your video. Have a strong call-to-action at the end. Instead of answering all questions in your video, leave some to be asked and answered in the comments.
    4. Spark curiosity throughout the video. Make your viewers watch the full video for a high retention rate.
                    
    You are given the following information:
    Audience Country: {audience_country}
    Audience Age Range: {audience_age_range}
    Type of video: {video_type}
    Video Topic(s): {', '.join(video_topics)}

    Now create a script for a 20-30 seconds long TikTok video that will go viral.
    """
    ]
    # Response from the Gemini API
    response = model.generate_content(prompt_parts)
    return {
        response.text
    }

@app.post("/generate_script")
def create_video_script(request: VideoRequest):
    try:
        script = generate_script(
            request.audience_country,
            request.audience_age_range,
            request.video_type,
            request.video_topics
        )
        return script
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
