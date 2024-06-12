import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Gemeni() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [videos, setVideos] = useState([]);
  const solutionRef = useRef(null);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Loading your answer... \n It might take up to 10 seconds");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD5RK0vBDMI6oDBFK4rlO9j50PvuIPz2sA",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Generate a solution for the following DSA question: ${question}. The response should include:
                  - First a detailed solution in different approaches along with Code
                  - Second Related Topics
                  - Third Similar questions (Provide working leetcode questions)
                  `,
                },
              ],
            },
          ],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
      fetchYouTubeVideos(question);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  useEffect(() => {
    if (answer && !generatingAnswer) {
      solutionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [answer, generatingAnswer]);

  const fetchYouTubeVideos = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(query)}&key=AIzaSyBRSTfs_70qTw4qfYHiadiBLDr7Lu2lUec`
      );
      console.log('YouTube API response:', response.data.items);
      setVideos(response.data.items);
    } catch (error) {
      console.log('YouTube API error:', error);
    }
  };

  return (
    <div>
      <div className="container mt-5 d-flex justify-content-center">
        <form onSubmit={generateAnswer} className="mb-4" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="mb-3">
            <textarea
              required
              className="form-control"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your DSA question you would like to solve"
              rows="7"
            ></textarea>
          </div>
          
          <div className="d-grid gap-2">
            <button
              type="submit"
              className={`btn btn-${generatingAnswer ? 'secondary' : 'primary'} btn-sm rounded-pill`}
              disabled={generatingAnswer}
              style={{ width: "50%", margin: "0 auto", backgroundColor: "#29b6f6", borderColor: "#29b6f6" }}
            >
              {generatingAnswer ? 'Generating...' : 'Generate Solution'}
            </button>
          </div>
        </form>
      </div>
      {answer && !generatingAnswer && (
        <div ref={solutionRef} className="container mt-4 p-4 bg-dark text-white rounded" style={{ width: "100%" }}>
          <h2 className="h5">Generated Solution</h2>
          <div>
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}
      {videos.length > 0 && (
        <div className="container mt-4">
          <h2 className="h5">Related YouTube Videos</h2>
          <div className="row">
            {videos.map((video) => (
              <div key={video.id.videoId} className="col-md-4 mb-3">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    allowFullScreen
                    title={video.snippet.title}
                  ></iframe>
                </div>
                <p>{video.snippet.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
