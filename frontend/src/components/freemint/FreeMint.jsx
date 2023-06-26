import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CollectionThumbnail from "./CollectionThumbnail";
const listOfData = [];

let currentPage = 2;

const FreeMint = () => {
  const [live, setLive] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMore = () => {
    axios
      .get("http://localhost:3000/collections", {
        params: { page: currentPage },
      })
      .then((res) => {
        setLive(live.concat(res.data.collections));
        currentPage++;
      });
  };

  useEffect(() => {
    let data;
    axios
      .get("http://localhost:3000/collections", {})
      .then((res) => {
        console.log(res.data.collections);
        setLive(res.data.collections);
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
                    <h2 className="collections-heading">Collections</h2>
                    <div className="collections">
                      {live.map((item) => {
                        return (
                          <Link to={{ pathname: `${item.id}` }} key={item.id}>
                            <CollectionThumbnail
                              name={item.name}
                              platform={item.platform || "joepegs"}
                              lastSale={item.floor || 0}
                              link={item.id}
                              image={item.bannerUrl}
                              // status={item.status||}
                              totalNFTs={item.numItems}
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
            <div className="loader">
              <img src="/loader-logo.png" alt="freemintator" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FreeMint;
