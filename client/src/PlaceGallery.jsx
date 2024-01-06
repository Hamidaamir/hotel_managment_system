import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
<<<<<<< HEAD:client/src/pages/PlaceGallery.jsx
      <div className="inset-0 text-black min-h-screen">
        <div className="bg-white p-8 grid gap-4">
=======
      <div className="absolute inset-0 bg-black text- white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
>>>>>>> 6bbfc94a7ba794ec7c0cdf94c4c7ae54f3201d9d:client/src/PlaceGallery.jsx
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
<<<<<<< HEAD:client/src/pages/PlaceGallery.jsx
              className="fixed right-56 top-56 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
=======
              className=" fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
>>>>>>> 6bbfc94a7ba794ec7c0cdf94c4c7ae54f3201d9d:client/src/PlaceGallery.jsx
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 &&
<<<<<<< HEAD:client/src/pages/PlaceGallery.jsx
            place.photos.map((photo, index) => (
              <div className="w-96" key={index}>
                <img
                  src={"http://localhost:4000/uploads/" + photo}
                  alt={`Photo ${index}`}
                />
=======
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
>>>>>>> 6bbfc94a7ba794ec7c0cdf94c4c7ae54f3201d9d:client/src/PlaceGallery.jsx
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                style={{ position: "relative", top: ".1rem" }}
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Show More photos
      </button>
    </div>
  );
}
