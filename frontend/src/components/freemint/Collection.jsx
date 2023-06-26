import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CollectionThumbnail from "./CollectionThumbnail";
import { useParams } from "react-router-dom";

let listOfData = [];

let currentPage = 2;

const Collection = () => {
  const { collection } = useParams();
  const [live, setLive] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMore = () => {
    axios
      .get("http://localhost:3000/nfts/" + collection, {
        params: { page: currentPage },
      })
      .then((res) => {
        setLive(live.concat(res.data.nft));
        currentPage++;
      });
  };

  useEffect(() => {
    console.log("collection", collection);
    let data;
    axios
      .get("http://localhost:3000/nfts/" + collection, {})
      .then((res) => {
        console.log(res.data.nft);
        setLive(res.data.nft);
      })
      .finally(() => {
        setLoading(false);
      });

    setLive(listOfData);
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="container">
            {live.length > 0 ? (
              <div>
                {live.length > 0 ? (
                  <>
                    <h2 className="collections-heading">{collection} items</h2>
                    <div className="collections">
                      {live.map((item) => {
                        return (
                          <Link to={{ pathname: `${item.id}` }} key={item.id}>
                            <CollectionThumbnail
                              name={"#" + item.tokenId}
                              platform="joepegs"
                              image={item.metadata.image}
                              lastSale={item.lastSalePrice}
                              link={item.link}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {
              <div className="load-more" onClick={() => loadMore()}>
                Load More
              </div>
            }
          </div>
        </>
      ) : (
        <>
          <div className="loader-container">
            <div class="loader">
              <img src="/loader-logo.png" alt="freemintator" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Collection;
