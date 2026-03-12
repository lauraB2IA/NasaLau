from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import httpx
import os

# Load environment variables from .env
load_dotenv()

app = FastAPI(title="NASA APOD Birthday API")

# Setup CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")
NASA_APOD_URL = "https://api.nasa.gov/planetary/apod"

@app.get("/api/apod")
async def get_apod(date: str = Query(..., description="Date in YYYY-MM-DD format")):
    """Fetch the Astronomy Picture of the Day for a given date."""
    
    # Optional: Basic date validation could be added here
    
    params = {
        "api_key": NASA_API_KEY,
        "date": date
    }
    
    # Need to disable SSL verify due to local corporate proxy issues
    # Note: In production, verify=True is highly recommended
    async with httpx.AsyncClient(verify=False) as client:
        try:
            response = await client.get(NASA_APOD_URL, params=params)
            response.raise_for_status()
            data = response.json()
            return data
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 400:
                raise HTTPException(status_code=400, detail="Invalid Date or outside valid range.")
            elif e.response.status_code == 403:
                raise HTTPException(status_code=403, detail="Invalid NASA API Key.")
            elif e.response.status_code == 429:
                raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later or use your own NASA API Key.")
            else:
                raise HTTPException(status_code=e.response.status_code, detail="Error fetching data from NASA API.")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail="Failed to communicate with NASA API.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
