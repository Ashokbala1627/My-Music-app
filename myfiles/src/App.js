import React, { useState } from "react";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [heading, setHeading] = useState(true);
  const [tracks, setTracks] = useState([]);

  const projectData = async (event) => {
    event.preventDefault();
    
    // Check if the keyword is empty
    if (keyword.trim() === "") {
      alert("Please enter the song name");
      return; // Exit the function early if keyword is empty
    }
  
    setIsLoading(true);
    setHeading(false);
    
    const data = await fetch(
      `https://v1.nocodeapi.com/besingle/spotify/MHLFXQzYTOsIqCaT/search?q=${keyword}&type=track`
    );
    const convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
    setIsLoading(false);
    setKeyword(""); // Clear the input field after search
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: "#0e0e52",
          top: "0px",
          position: "fixed",
          zIndex: "2",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="Home"
            style={{ color: "white", fontFamily: "calibri" }}
          >
            <strong>My-Music</strong>
          </a>
          <form className="d-flex w-100" role="search">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="searchInput"
            />
            <button onClick={projectData} className="btn btn-outline-light">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div
        className="container"
        style={{ marginTop: "90px", marginBottom: "60px" }}
      >
        {" "}
        {/* Adjust top margin as needed */}
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 text-center">
            <div
              className="spinner-border"
              style={{
                width: "3rem",
                height: "3rem",
                color: "#0e0e52",
                marginTop: "200px",
              }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        {heading && ( // Render the heading only if heading state is true
          <div className="row">
            <div
              className="col-12 py-5 text-center"
              style={{ marginTop: "150px", color: "#0e0e52" }}
            >
              <h1>My-Music</h1>
              <p>Find your favourite 30s ringtone</p>
            </div>
          </div>
        )}
        <div className="row">
          {tracks.map((track) => (
            <div key={track.id} className="col-lg-3 col-md-6 py-2">
              <div className="card">
                <img
                  src={track.album.images[1]?.url || "placeholder_url"}
                  className="card-img-top"
                  alt="Album-Images"
                />
                <div className="card-body" style={{ color: "#0e0e52" }}>
                  <h5 className="card-title">{track.name}</h5>
                  {/* <p className="card-text">
                    Artist Name:{" "}
                    {track.album.artists[0]?.name || "Unknown Artist"}
                  </p> */}
                  <p className="card-text">
                    Release Date:{" "}
                    {track.album.release_date || "Unknown Release Date"}
                  </p>
                  <audio
                    src={track.preview_url}
                    controls
                    className="w-100"
                  ></audio>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
