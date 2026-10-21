import { useState,useEffect } from "react";

const API_KEY = "AIzaSyC9DWUFIe1gpeZTMyaBGe2lFbRRfkQQw9o";
const PLAYLIST_ID = "PLnyCB8CY7mpOrrsJs6dUfaEqAXpj0Z6TW"

function formatDuration(duration = "PT0S") {
    const match = duration.match(
        /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    );

    if (!match) return "0:00";

    const hours = Number(match[1] || 0);
    const minutes = Number(match[2] || 0);
    const seconds = Number(match[3] || 0);

    const totalSeconds =
        hours * 3600 + minutes * 60 + seconds;

    const formattedMinutes = Math.floor(totalSeconds / 60);
    const formattedSeconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${formattedMinutes}:${String(formattedSeconds).padStart(2, "0")}`;
}

export default function YouTube() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchVideos() {
        try {
            setLoading(true);
            setError("");

            // STEP 1: Fetch playlist items
            const params = new URLSearchParams({
                part: "snippet",
                playlistId: PLAYLIST_ID,
                maxResults: "50",
                key: API_KEY,
            });

            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?${params}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error?.message || "Unable to fetch videos."
                );
            }

            // STEP 2: Remove duplicate videos
            const uniqueItems = (data.items || [])
                .filter((item) => item.snippet?.resourceId?.videoId)
                .filter(
                    (item, index, array) =>
                        index ===
                        array.findIndex(
                            (video) =>
                                video.snippet.resourceId.videoId ===
                                item.snippet.resourceId.videoId
                        )
                );

            // STEP 3: Collect video IDs
            const videoIds = uniqueItems
                .map((item) => item.snippet.resourceId.videoId)
                .join(",");

            if (!videoIds) {
                setVideos([]);
                return;
            }

            // STEP 4: Fetch views and duration
            const detailsParams = new URLSearchParams({
                part: "statistics,contentDetails",
                id: videoIds,
                key: API_KEY,
            });

            const detailsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?${detailsParams}`
            );

            const detailsData = await detailsResponse.json();

            if (!detailsResponse.ok) {
                throw new Error(
                    detailsData.error?.message ||
                    "Unable to fetch video statistics."
                );
            }

            // STEP 5: Match video details by ID
            const detailsMap = new Map(
                (detailsData.items || []).map((video) => [
                    video.id,
                    {
                        views: video.statistics?.viewCount ?? "0",
                        duration: formatDuration(
                            video.contentDetails?.duration
                        ),
                    },
                ])
            );

            // STEP 6: Combine playlist data and video details
            const videoList = uniqueItems.map((item) => {
                const id = item.snippet.resourceId.videoId;
                const details = detailsMap.get(id) || {};

                return {
                    id,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    views: details.views ?? "0",
                    duration: details.duration ?? "0:00",
                    publishedAt: item.snippet.publishedAt,
                    thumbnail:
                        item.snippet.thumbnails?.high?.url ||
                        item.snippet.thumbnails?.medium?.url ||
                        item.snippet.thumbnails?.default?.url,
                };
            });

            setVideos(videoList);
        } catch (err) {
            console.error("YouTube API error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

        if (!API_KEY || !PLAYLIST_ID) {
            setError("Add your YouTube API key and uploads playlist ID to .env.");
            setLoading(false);
            return;
        }

        fetchVideos();
    }, []);

    if (loading) return <h2>Loading YouTube videos...</h2>;
    if (error) return <p className="error">{error}</p>;

    return (
        <main className="youtube-page">
            <h1>Latest YouTube Videos</h1>

            {selectedVideo && (
                <div className="video-player">
                    <button
                        className="close-player"
                        onClick={() => setSelectedVideo(null)}
                    >
                        Close ✕
                    </button>

                    <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                        title={selectedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />

                    <h2>{selectedVideo.title}</h2>
                    
                </div>
            )}

            <div className="video-grid">
                {videos.map((video) => (
                    <article className="video-card" key={video.id} datakey={video.id}>
                        <button
                            className="thumbnail-button"
                            onClick={() => setSelectedVideo(video)}
                            aria-label={`Play ${video.title}`}
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                loading="lazy"
                            />
                            <span className="play-icon">▶</span>
                        </button>

                        <div className="video-info">
                            <h3>{video.title}</h3>
                            <p>
                                {new Date(
                                    video.publishedAt
                                ).toLocaleDateString()}
                            </p>
                            <div className="video-meta">
                                <span>
                                    {Number(video.views).toLocaleString("en-US")} views
                                </span>
                                <span>{video.duration}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {videos.length === 0 && (
                <p>No videos found in this playlist.</p>
            )}
        </main>
    );
}