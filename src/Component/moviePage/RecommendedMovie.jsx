import React, { useEffect, useState } from "react";
import SwiperComponent from "../SwiperComponent";

function RecommendedMovie({ id }) {
  const api_key = "6b1a6c73e4ee90d6decf504ae4440ba4";
  const [recomended, setRecomended] = useState([]);
  const recommendedContentUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}`;
  const fetchRecommendedMovies = async () => {
    const response = await fetch(recommendedContentUrl);
    const data = await response.json();

    setRecomended(data.results);
  };
  useEffect(() => {
    fetchRecommendedMovies();
  }, [id]);

  return (
    <>
      {recomended.length ? (
        <div>
          <div className="d-flex justify-content-between p-3">
            <h1>Recommended For You</h1>
          </div>
          <SwiperComponent movie={recomended} />
        </div>
      ) : (
        <h1></h1>
      )}
    </>
  );
}

export default RecommendedMovie;
