import Platforms from "../../constants/platforms";
import {
  epochToReadableDate,
  epochToReadableTime,
} from "../../utils/timeConversion";

const CollectionThumbnail = ({ name, platform, lastSale, image }) => {
  if (image) {
    if (image.includes("https://feralas.infura-ipfs.io/ipfs")) {
      image = image.replace(
        "https://feralas.infura-ipfs.io/ipfs",
        "https://ipfs.io/ipfs"
      );
    }
  }
  if (!image) {
    image =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
  }
  return (
    <div className="thumbnail-container">
      <div className="thumbnail-container-image">
        <img src={image} alt={name} />
      </div>
      <div className="thumbnail-text-container">
        <div className="thumbnail-text thumbnail-text-left">
          <h3>{name}</h3>
          <div className="platform-label">
            <img src={`/platforms/${Platforms[platform]}`} alt={platform} />
            <p>{platform}</p>
          </div>
        </div>
        <div className="thumbnail-text thumbnail-text-right">
          <>
            <p>Last Price is </p>
            <p className="little-text">{lastSale}</p>
          </>
        </div>
      </div>
    </div>
  );
};

export default CollectionThumbnail;
