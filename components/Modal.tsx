"use client";
import { Genre, Movie, Video } from "@lib/types";
import { AddCircle, CancelRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface Props {
  movie: Movie;
  closeModal: () => void;
}

const Modal = ({ movie, closeModal }: Props) => {
  const [video, setVideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  const getMovieDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await res.json();

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (video: Video) => video.type === "Trailer"
        );
        setVideo(data.videos.results[index].key);
      }
      if(data?.genres) {
         setGenres(data.genres);
      }
    } catch (err) {
      console.log("Error fetching movie details", err);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [movie]);
  return (
    <div className="modal">
      <button className="modal-close" onClick={closeModal}>
        <CancelRounded
          sx={{ color: "white", fontSize: "35px", ":hover": { color: "red" } }}
        />
      </button>

      <iframe
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
        className="modal-video"
        loading="lazy"
        allowFullScreen
      />

      <div className="modal-content">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-base-bold">Name:</p>
            <p className="text-base-bold">{movie.title || movie.name}</p>
          </div>
          <div className="flex gap-3">
            <p className="text-base-bold">Add To List</p>
            <AddCircle className="cursor-pointer text-pink-1" />
          </div>
        </div>
        <div className="flex gap-3">
          <p className="text-base-bold">Release Date:</p>
          <p className="text-base-bold">{movie?.release_date}</p>
        </div>

        <p className="text-base-light">${movie?.overview}</p>

        <div className="flex gap-3">
          <p className="text-base-bold">Rating</p>
          <p className="text-base-bold">{movie?.vote_average}</p>
        </div>
        <div className="flex gap-3">
          <p className="text-base-bold">Genres:</p>
          <p className="text-base-bold">
            {genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
