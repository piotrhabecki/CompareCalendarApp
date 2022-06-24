import React, { useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import GlobalContext from "../../context/GlobalContext";
import image1 from "../../../assets/training/training.png";
import image2 from "../../../assets/training/training2.png";
import image3 from "../../../assets/training/training3.png";
import image4 from "../../../assets/training/training4.png";
import Image from "next/image";

const TrainingModal = () => {
  const { showTrainingModal, setShowTrainingModal } = useContext(GlobalContext);

  const closeModalHandler = () => {
    setShowTrainingModal(!showTrainingModal);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center" onClick={closeModalHandler}>
      <div className="bg-white rounded-lg shadow-2xl">
        <header className="bg-gray-100 px-4 py-2">
          <button>
            <span  className="text-gray-400">
              <AiOutlineCloseCircle />
            </span>
          </button>
        </header>
        <div>
          <Image src={image1} />
          <Image src={image2} />
          <Image src={image3} />
          <Image src={image4} />
        </div>
      </div>
    </div>
  );
};

export default TrainingModal;
