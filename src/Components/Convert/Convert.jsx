import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Convertor() {
  const [codeInput, setCodeInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const convertedCodeRef = useRef(null);

  const languages = ["Python", "Java", "C", "C++"]; // Array of languages for the dropdown

  async function handleConvert(e) {
    e.preventDefault();
    setLoading(true);
    setConvertedCode("Converting your code...");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD5RK0vBDMI6oDBFK4rlO9j50PvuIPz2sA",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Convert the code to ${selectedLanguage}:\n\n${codeInput}\n\n- Also provide an in-depth explanation`,
                },
              ],
            },
          ],
        },
      });

      setConvertedCode(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error converting code:", error);
      setConvertedCode("Sorry, something went wrong. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (convertedCode) {
      convertedCodeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [convertedCode]);

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Code Converter</h1>
          <h2 className="hero-tagline">The only tool you need to convert your code to different languages!</h2>
          <p className="hero-description">
            Copy and paste your code, choose a language, and get it converted instantly.
          </p>
        </div>
      </div>
      <div className="container mt-5 d-flex justify-content-center">
        <form onSubmit={handleConvert} className="mb-4" style={{ maxWidth: "800px", width: "100%" }}>
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
          <div className="mb-3">
            <select
              className="form-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              required
            >
              <option value="">Select language to convert to</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className={`btn btn-${loading ? 'secondary' : 'primary'} btn-sm rounded-pill`}
              disabled={loading}
              style={{ width: "50%", margin: "0 auto", backgroundColor: "#29b6f6", borderColor: "#29b6f6" }}
            >
              {loading ? 'Converting...' : 'Convert Code'}
            </button>
          </div>
        </form>
      </div>
      <div className="container mt-4">
        {convertedCode && !loading && (
          <div ref={convertedCodeRef} className="p-4 bg-dark text-white rounded" style={{ width: "100%" }}>
            <h2 className="h5">Converted Code</h2>
            <div>
              <ReactMarkdown>{convertedCode}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
