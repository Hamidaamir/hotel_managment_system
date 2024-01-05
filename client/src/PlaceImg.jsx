export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos || place.photos.length === 0) {
    // Return some default content or an empty string
    return "No photos available";
  }

  if (!className) {
    className = "object-cover";
  }

  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + place.photos[index]}
      alt=""
    />
  );
}
