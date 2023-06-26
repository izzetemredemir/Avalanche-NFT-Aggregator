import { Link } from "react-router-dom";
import Platforms from "../../constants/platforms";
import { epochToReadableDate, epochToReadableTime } from "../../utils/timeConversion";

const ClosestMint = ({ name, platform, mintDate, link, image, totalNFTs, slug }) => {
    return (
        <div className="inner-page-nft-container">
            <div className="inner-page-nft-image-container">
                    <img src={image} alt={name} />
            </div>
            <div className="inner-page-text-container">
                <div className="platform-label">
                    <img src={`/platforms/${Platforms[platform]}`} alt={platform} />
                    <p>{platform}</p>
                </div>
                <h1 >{name}</h1>
                <div style={{ margin: '1em 0' }}>
                    {
                    mintDate === 'live'?
                    <p>
                        mint is live
                    </p>:
                    mintDate !== 0 ?
                    <>
                        <p className="little-text">
                        mint starts at
                        </p>
                        <p className="mint-date">
                        {epochToReadableDate(mintDate)}
                        </p>
                        <p className="little-text">
                        {epochToReadableTime(mintDate)}
                        </p>
                    </>
                    :<>
                        <p>
                        mint time is not specified
                        </p>
                    </>}
                    <p className="little-text">
                    amount: {totalNFTs}
                    </p>
                </div>
                <Link to={{ pathname:slug }}>
                    <button className="free-mint-button">
                        see mint →
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ClosestMint