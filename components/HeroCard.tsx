"use client";
import { baseImgUrl } from "@lib/constants";
import { Movie } from "../lib/types";
import { InfoOutlined, PlayCircle } from "@mui/icons-material";
import { useState } from "react";
import Modal from "./Modal";

const HeroCard = ({ movie }: { movie: Movie }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="hero">
        <div className="hero-bg">
          <img
            src={`${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`}
            alt="movie"
            className="hero-bg-image"
          />
          <div className="overlay"></div>
        </div>
        <h1 className="hero-title">{movie?.title || movie?.name}</h1>
        <p className="hero-overview">{movie?.overview}</p>
        <div className="hero-btns">
          <button className="hero-btn" onClick={openModal}>
            <PlayCircle />
            Play Now
          </button>
          <button className="hero-btn" onClick={openModal}>
            <InfoOutlined />
            More Info
          </button>
        </div>
      </div>
      {showModal && <Modal movie={movie} closeModal={closeModal} />}
    </>
  );
};

export default HeroCard;
