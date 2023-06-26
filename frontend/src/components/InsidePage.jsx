import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Platforms from "../constants/platforms";
import InfoBox from "./freemint/InfoBox";
import AttBox from "./freemint/AttBox";

const InsidePage = () => {
  const { slug } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/nft/" + slug)
      .then((res) => {
        if (
          res.data.nft.metadata.image.includes(
            "https://feralas.infura-ipfs.io/ipfs"
          )
        ) {
          res.data.nft.metadata.image = res.data.nft.metadata.image.replace(
            "https://feralas.infura-ipfs.io/ipfs",
            "https://ipfs.io/ipfs"
          );
        }
        setItem(res.data.nft);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading ? (
        <div>
          <div className="inner-page-nft-container">
            <div className="inner-page-nft-image-container">
              <img src={item.metadata.image} alt={item.name} />
            </div>
            <div className="inner-page-text-container">
              <div className="platform-label">
                <img
                  src={`/platforms/${Platforms[item.platform]}`}
                  alt={item.platform}
                />
                <p>{item.platform}</p>
              </div>
              <h1>#{item.tokenId}</h1>
              <a href={item.link} target="_blank" rel="noreferrer">
                <button className="free-mint-button">Go marketplace →</button>
              </a>
              <div className="bidcontainer" style={{ marginTop: 20 }}>
                <h1>BestBid</h1>
                <p>Chain: {item.bestBid[0].chain}</p>
                <p>Order Ask: {item.bestBid[0].isOrderAsk}</p>
                <p>Currency: {item.bestBid[0].currency}</p>
                <p>Price: {item.bestBid[0].price}</p>
                <p>Amount: {item.bestBid[0].amount}</p>
                <p>Start Time: {item.bestBid[0].startTime}</p>
                <p>End Time: {item.bestBid[0].endTime}</p>
                <p>Min Ask: {item.bestBid[0].minPercentageToAsk}</p>
                <p>Best bid: {item.bestBid[0].id}</p>
                <p>Best bid Place: {item.bestBid[0].marketPlace}</p>
              </div>
              <div className="bidcontainer" style={{ marginTop: 20 }}>
                <h1>CurrentAsk</h1>
                <p>Chain: {item.currentAsk[0].chain}</p>
                <p>Order Ask: {item.currentAsk[0].isOrderAsk}</p>
                <p>Currency: {item.currentAsk[0].currency}</p>
                <p>Price: {item.currentAsk[0].price}</p>
                <p>Amount: {item.currentAsk[0].amount}</p>
                <p>Start Time: {item.currentAsk[0].startTime}</p>
                <p>End Time: {item.currentAsk[0].endTime}</p>
                <p>Min Ask: {item.currentAsk[0].minPercentageToAsk}</p>
                <p>Best bid: {item.currentAsk[0].id}</p>
                <p>Best bid Place: {item.currentAsk[0].marketPlace}</p>
              </div>
            </div>
          </div>
          <div className="infodiv">
            <InfoBox
              wallet={item.owner.ownerId}
              shortDesc={item.metadata.description}
              attributes={item.metadata.attributes}
            />
            <AttBox
              attributes={item.metadata.attributes}
              tokenuri={item.metadata.tokenUri}
            />
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <div class="loader">
            <img src="/loader-logo.png" alt="Avalanche NFT Aggrigato" />
          </div>
        </div>
      )}
    </>
  );
};

export default InsidePage;
