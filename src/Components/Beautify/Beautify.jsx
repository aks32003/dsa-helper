import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Beautify() {
  const [codeInput, setCodeInput] = useState("");
  const [beautifiedCode, setBeautifiedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const beautifiedCodeRef = useRef(null);

  async function handleBeautify(e) {
    e.preventDefault();
    setLoading(true);
    setBeautifiedCode("Beautifying your code...");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD5RK0vBDMI6oDBFK4rlO9j50PvuIPz2sA",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Correct the syntax, add comments in a different color of the code:${codeInput}
                          - Also provide an in deapth explanation`,
                },
              ],
            },
          ],
        },
      });

      setBeautifiedCode(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error beautifying code:", error);
      setBeautifiedCode("Sorry, something went wrong. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (beautifiedCode) {
      beautifiedCodeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [beautifiedCode]);

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Code Formatter</h1>
          <h2 className="hero-tagline">The only tool that you need to format, add comments and understand your code!</h2>
          <p className="hero-description">
            Just copy and paste the question, and get a formatted code with comments. Also find an in-depth explanation below.
          </p>
        </div>
      </div>
      <div className="container mt-5 d-flex justify-content-center">
        <form onSubmit={handleBeautify} className="mb-4" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Enter your code here"
              rows="7"
              required
            ></textarea>
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className={`btn btn-${loading ? 'secondary' : 'primary'} btn-sm rounded-pill`}
              disabled={loading}
              style={{ width: "50%", margin: "0 auto", backgroundColor: "#29b6f6", borderColor: "#29b6f6" }}
            >
              {loading ? 'Beautifying...' : 'Beautify Code'}
            </button>
          </div>
        </form>
      </div>
      <div className="container mt-4">
        {beautifiedCode && !loading && (
          <div ref={beautifiedCodeRef} className="p-4 bg-dark text-white rounded" style={{ width: "100%" }}>
            <h2 className="h5">Beautified Code</h2>
            <div>
              <ReactMarkdown>{beautifiedCode}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
