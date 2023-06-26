import axios from "axios";
import CollectionModel from "./models/collectionModel";
import mongoose from "mongoose";
import { ethers } from "ethers";
import NFTModel from "./models/nftModel";
import { updateCurrentAsk } from "./utils/updateCurrentAsk";

import env from "./env";
const { MONGOURL } = env;
mongoose.connect(MONGOURL);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function makeRequest(collection_address: string, page: number) {
  const data = {
    query:
      "query Nfts($pagination: Page, $input: SearchRequest\u0021) {\n  search(pagination: $pagination, input: $input) {\n    hasMore\n    nfts {\n      name\n      thumbnail\n      token_id\n      likes\n      asset_id\n      animation_url\n      animation_mime\n      balance\n      rank\n      collection {\n        address\n        avatar\n        certified\n        kind\n        name\n        display_theme\n      }\n      sale {\n        sale_id\n        unitary_price_float\n        top_bid_float\n        quantity\n        kind\n        seller\n        expiration_date\n      }\n      offer {\n        offer_id\n        buyer\n        unitary_price_float\n        start_date\n        expiration_date\n      }\n    }\n  }\n}",
    variables: {
      input: {
        target: "nfts",
        keywords: "",
        sort: "price_asc",
        attributes: [],
        category_tags: [],
        sale_type: "",
        price_range: {},
        collection_address: collection_address,
      },
      pagination: {
        page: page,
        size: 100,
      },
    },
    operationName: "Nfts",
  };

  const response = await axios.post("https://backend.kalao.io/query", data, {
    headers: {
      authority: "backend.kalao.io",
      accept: "*/*",
      "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
      cookie: "",
      origin: "https://marketplace.kalao.io",
      referer: "https://marketplace.kalao.io/",
      "sec-ch-ua":
        '"Custom Browser";v="1", "Custom Engine";v="1", "Not-A.Brand";v="1"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Custom OS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Custom OS; Custom CPU) AppleWebKit/537.36 (KHTML, like Gecko) Custom Browser/1.0.0.0 Safari/537.36",
    },
  });

  return response.data;
}

function convertEthToWei(ethAmount: number): string {
  let wei = ethers.parseEther(ethAmount.toString());
  return wei.toString();
}

function replaceUnderscoreWithHyphen(str: string): string {
  return str.replace(/_/g, "-");
}

async function kalaoFetchCollections() {
  try {
    let docs = await CollectionModel.find({}, { id: 1, _id: 0 }).exec();
    for (const doc in docs) {
      let hasMore = true;
      let pageNum = 1;
      let delayBetweenRequests = 1000;
      console.log("NFT:", docs[doc].id);
      while (hasMore) {
        console.log("pageNum", pageNum);
        let response = await makeRequest(docs[doc].id, pageNum);
        hasMore = response.data.search.hasMore;
        console.log("hasMore", hasMore);
        let nfts = response.data.search.nfts;
        for (const nft of nfts) {
          if (nft.sale != null) {
            let price = convertEthToWei(nft.sale.unitary_price_float);
            let newCurrentAsk = {
              chain: "avalanche",
              isOrderAsk: true,
              currency: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
              price: price,
              amount: nft.sale.quantity.toString(),
              startTime: null,
              endTime: nft.sale.expiration_date,
              minPercentageToAsk: "",
              marketPlace: "kalao",
            };

            const newId = replaceUnderscoreWithHyphen(nft.asset_id);

            const existingNFT = await NFTModel.findOne({
              id: newId,
            }).exec();
            if (existingNFT) {
              await updateCurrentAsk(
                newId,
                newCurrentAsk,
                existingNFT,
                "kalao"
              );
            }

            await sleep(1000);
          }
        }
        if (hasMore) {
          await sleep(delayBetweenRequests);
          pageNum++;
        }
        if (pageNum > 10) {
          hasMore = false;
        }
      }
      await sleep(1000);
    }

    /*
   
    */
  } catch (error) {
    console.error(error);
  }
}

kalaoFetchCollections();
