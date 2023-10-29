import { useState, useEffect } from "react";
import instance from "./axios";
import 'primeflex/primeflex.css';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searched, setSearched] = useState('animal');
  const [isError, setIsError] = useState(false);

  const getImages = async (searchQuery, pageNumber) => {
    setLoading(true);
    try {
      const response = await instance.get("https://api.unsplash.com/search/photos", {
        params: {
          query: searchQuery,
          page: pageNumber,
        },
      });
      console.log(response);
      const newImages = response.data.results;

      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setImages([]);
    setSearched(searchInput);
    getImages(searchInput, 1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading && !isError
    ) {
      getImages(searched, page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    getImages(searched, page)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, page, searched]);

  return (
    <div className="App">
      <div className="flex justify-content-center mt-2 mb-2 gap-2">
        <input
          type="text"
          name="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ height: '24px' }}
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
      <div className="flex flex-wrap justify-content-center">
        {images &&
          images.map((image, index) => (
            <div key={index} className="image-container">
              <img className="image" src={image?.urls?.small} alt={image?.alt_description} />
            </div>
          ))
        }
      </div>
      {loading &&
        <h3>Loading.....</h3>}
      {!loading && images.length === 0 && <h3>No images found!</h3>}
      {isError && <h3>THE END!</h3>}
    </div>
  );
}

export default App;