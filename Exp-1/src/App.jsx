import { useState } from "react";
import "./App.css";

function App() {
  const platforms = {
    Twitter: {
      limit: 280,
      description: "Short and concise posts work best on Twitter.",
    },
    Instagram: {
      limit: 2200,
      description: "Instagram supports longer captions.",
    },
    Facebook: {
      limit: 63206,
      description: "Facebook supports long-form posts.",
    },
    LinkedIn: {
      limit: 3000,
      description: "LinkedIn is suitable for professional content.",
    },
  };

  const [selectedPlatforms, setSelectedPlatforms] = useState(["Twitter"]);
  const [content, setContent] = useState("");

  // Add or remove a selected platform
  const handlePlatformChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Get validation status
  const getValidationStatus = (platform) => {
    const limit = platforms[platform].limit;
    const remaining = limit - content.length;

    if (remaining < 0) {
      return {
        type: "error",
        message: `Character limit exceeded by ${Math.abs(remaining)} characters.`,
      };
    }

    if (remaining <= limit * 0.1) {
      return {
        type: "warning",
        message: `Warning: Only ${remaining} characters remaining.`,
      };
    }

    return {
      type: "success",
      message: "Post is within the allowed character limit.",
    };
  };

  // Check whether all selected platforms are valid
  const isPostValid =
    selectedPlatforms.length > 0 &&
    selectedPlatforms.every(
      (platform) => content.length <= platforms[platform].limit
    ) &&
    content.trim().length > 0;

  const handlePublish = () => {
    if (isPostValid) {
      alert(
        `Post successfully published to: ${selectedPlatforms.join(", ")}`
      );
    }
  };

  return (
    <div className="app">
      <div className="composer-container">
        <h1>Dynamic Post Composer</h1>

        <p className="subtitle">
          Create one post and validate it for multiple social media platforms.
        </p>

        {/* Platform Selection */}
        <div className="section">
          <h2>1. Select Platforms</h2>

          <div className="platform-list">
            {Object.keys(platforms).map((platform) => (
              <label
                key={platform}
                className={`platform-card ${
                  selectedPlatforms.includes(platform) ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                />

                <span>{platform}</span>

                <small>
                  Maximum {platforms[platform].limit.toLocaleString()} characters
                </small>
              </label>
            ))}
          </div>
        </div>

        {/* Post Content */}
        <div className="section">
          <h2>2. Write Your Post</h2>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="What's on your mind?"
          />

          <div className="general-counter">
            Total Characters: {content.length}
          </div>
        </div>

        {/* Validation */}
        <div className="section">
          <h2>3. Real-Time Validation</h2>

          {selectedPlatforms.length === 0 ? (
            <div className="no-platform">
              Please select at least one platform.
            </div>
          ) : (
            <div className="validation-list">
              {selectedPlatforms.map((platform) => {
                const status = getValidationStatus(platform);
                const limit = platforms[platform].limit;

                return (
                  <div
                    key={platform}
                    className={`validation-card ${status.type}`}
                  >
                    <div className="validation-header">
                      <strong>{platform}</strong>

                      <span>
                        {content.length} / {limit.toLocaleString()}
                      </span>
                    </div>

                    <p>{platforms[platform].description}</p>

                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: `${Math.min(
                            (content.length / limit) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>

                    <p className="validation-message">
                      {status.message}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Publish Button */}
        <button
          className="publish-button"
          disabled={!isPostValid}
          onClick={handlePublish}
        >
          Publish Post
        </button>

        {!isPostValid && content.length > 0 && (
          <p className="publish-error">
            Resolve all validation errors before publishing.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;