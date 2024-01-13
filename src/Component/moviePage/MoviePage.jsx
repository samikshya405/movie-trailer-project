import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SwiperComponent from "../SwiperComponent";
import RecommendedMovie from "./RecommendedMovie";
import './MoviePage.css'

function MoviePage() {
  const { id } = useParams();
  const api_key = "6b1a6c73e4ee90d6decf504ae4440ba4";
  const [movieDetail, setMovieDetail] = useState({});
  const [similar, setSimilar] = useState([]);
  // const [recomended, setRecomended] = useState([])

  const searchMediaurl = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
  const recommendedContentUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}`;
  const similarContentUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}`;
  const fetchmedia = async () => {
    const response = await fetch(searchMediaurl);
    const data = await response.json();

    setMovieDetail(data);
  };
  useEffect(() => {
    fetchmedia();
  }, [id]);
  const fetchSimilarMovie = async () => {
    const response = await fetch(similarContentUrl);
    const data = await response.json();

    setSimilar(data.results);
    console.log(data);
  };
  // const fetchRecommendedMovies=async()=>{
  //   const response = await fetch(recommendedContentUrl)
  //   const data = await response.json()

  //   setRecomended(data.results)

  // }
  useEffect(() => {
    fetchSimilarMovie();
  }, [similar]);
  // useEffect(()=>{
  //   fetchRecommendedMovies()
  // },[recomended])
  return (
    <>
      <div className="d-flex gap-5 mt-5 container customize">
        <Card >
          {movieDetail.poster_path ? (
            <Card.Img
              variant="top"
              className="rounded-3" 
              src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
              alt=""
            />
          ) : (
            <Card.Img
              variant="top"
              className="rounded-3"
              src="https://moviea.vercel.app/assets/no-poster-af8294eb.png"
              alt=""
            />
          )}
        </Card>
        <div className=" d-flex flex-column gap-3">
          <h1>
            {movieDetail.title}({movieDetail?.release_date?.slice(0,4)})
          </h1>
          <p>{movieDetail.tagline} </p>
          <div className="d-flex gap-3">
            {movieDetail.genres?.map((genre) => {
              return (
                <p key={genre.id} className=" p-1 bg-danger">
                  {genre.name}
                </p>
              );
            })}
          </div>
          <h3>Overview</h3>
          <p>{movieDetail.overview}</p>
          <div className="d-flex gap-3 customize">
            <p>
              {" "}
              <span style={{ color: "green" }}>Status:</span>{" "}
              {movieDetail.status}
            </p>
            <p>
              {" "}
              <span style={{ color: "green" }}>Released Date:</span>{" "}
              {movieDetail.release_date}
            </p>
            <p>
              {" "}
              <span style={{ color: "green" }}>Runtime:</span>{" "}
              {(movieDetail.runtime / 60).toFixed(0)}hour{" "}
              {movieDetail.runtime % 60}min{" "}
            </p>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="d-flex justify-content-between p-3">
        <h1>Similar</h1>
      </div>
      <SwiperComponent movie={similar} />

      <RecommendedMovie id={id} />

    </>
  );
}

export default MoviePage;
