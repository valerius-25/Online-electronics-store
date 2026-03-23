import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Slider = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false); 

  useEffect(() => {
    axios
    .get(API_URL)
    .then((res) => {
      setImages(res.data.slider);
      setLoaded(true);
    })
    .catch((err) => console.error(err));
  }, []);

  if (!loaded) return null;

  return (
    <div className="w-full p-5 rounded-[50px]">
      <Slide
        autoplay={true}
        duration={3000}
        transitionDuration={500}
        infinite={true}
      >
        {images.map((image) => (
          <div key={image.id} className="each-slide w-full">
            <div
              className="w-[100%] h-[100vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <span className="opacity-0">slide</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slider;
