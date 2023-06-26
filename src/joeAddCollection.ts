import axios from "axios";
import CollectionModel from "./models/collectionModel";
import mongoose from "mongoose";
const { MongoClient } = require("mongodb");

import env from "./env";
const { MONGOURL } = env;
mongoose.connect(MONGOURL);
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function joeFetchCollections() {
  let pageNum = 1;
  let hasNextPage = true;
  let delayBetweenRequests = 1000;

  while (hasNextPage) {
    try {
      const response = await axios.get(
        `https://barn.joepegs.com/v3/collections?chain=avalanche&filterBy=7d&orderBy=volume&pageNum=${pageNum}`,
        {
          headers: {
            accept: "application/json",
            "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
            origin: "https://joepegs.com",
            referer: "https://joepegs.com/",
          },
        }
      );

      const data = response.data;

      const collections = response.data;

      for (const collectionData of collections) {
        const existingCollection = await CollectionModel.findOne({
          id: collectionData.id,
        }).exec();

        if (!existingCollection) {
          const newCollection = new CollectionModel(collectionData);
          await newCollection.save();
          console.log(`New collection added: ${collectionData.name}`);
        } else {
          console.log(`Collection already exists: ${collectionData.name}`);
        }
      }

      hasNextPage = data && data.length > 0;

      if (hasNextPage) {
        pageNum++;
        delayBetweenRequests++;
        await sleep(delayBetweenRequests);
      } else {
        process.exit(0);
        break;
      }
      console.log("pagenum", pageNum);
    } catch (error) {
      console.error("Error fetching data:", error.response.statusText);

      hasNextPage = false;
    }
    console.log("bitti");
  }
}

joeFetchCollections();
