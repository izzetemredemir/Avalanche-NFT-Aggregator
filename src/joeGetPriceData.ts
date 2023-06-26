import axios from "axios";
import NFTModel from "./models/nftModel";
import mongoose from "mongoose";
const { MongoClient } = require("mongodb");
import CollectionModel from "./models/collectionModel";
import { updateCurrentAsk } from "./utils/updateCurrentAsk";
import env from "./env";
const { MONGOURL } = env;
mongoose.connect(MONGOURL);

async function fetchData(
  pageNum: number,
  collectionAddress: string
): Promise<any[]> {
  try {
    const response = await axios.get("https://barn.joepegs.com/v3/items", {
      headers: {
        // headers
      },
      params: {
        attributeFilters: "[]",
        chain: "avalanche",
        collectionAddress: collectionAddress,
        connectedUserAddress: "",
        orderBy: "price_asc",
        pageNum: pageNum,
        pageSize: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllData() {
  let docs = await CollectionModel.find({}, { id: 1, _id: 0 }).exec();

  for (const doc in docs) {
    console.log("çalışıyor");
    let allData: any[] = [];
    let pageNum = 1;
    let hasMoreData = true;
    let delayBetweenRequests = 1000;

    while (hasMoreData == true) {
      const data = await fetchData(pageNum, docs[doc].id);

      console.log(docs[doc].id);

      if (data.length > 0) {
        for (const nftData of data) {
          const existingNFT = await NFTModel.findOne({
            collectionAddress: nftData.collectionAddress,
            tokenId: nftData.tokenId.toString(),
          }).exec();
          try {
            nftData.bestBid.marketPlace = "joepegs";
            nftData.currentAsk.marketPlace = "joepegs";
          } catch (error) {}
          nftData.bestBid = [nftData.bestBid];
          nftData.currentAsk = [nftData.currentAsk];

          if (!existingNFT) {
            await NFTModel.create(nftData);
            console.log(
              `NFT (tokenId: ${nftData.tokenId}) başarıyla kaydedildi.`
            );
          } else {
            console.log(
              `NFT (tokenId: ${nftData.tokenId}) zaten mevcut, atlanıyor.`
            );

            await updateCurrentAsk(
              nftData.id,
              nftData.currentAsk[0],
              existingNFT,
              "joepegs"
            );

            await sleep(1000);

            //await updateNFTDataIfChanged(nftData, existingNFT);
          }
        }

        hasMoreData = data && data.length > 0;

        if (hasMoreData == true) {
          pageNum++;
          delayBetweenRequests++;
          await sleep(delayBetweenRequests);
        } else {
          process.exit(0);
          break;
        }
        console.log("pagenum", pageNum, hasMoreData);
      } else {
        hasMoreData = false;
      }
      if (pageNum > 2) {
      }
      hasMoreData = false;
    }
  }
  await mongoose.disconnect();
}

fetchAllData();
