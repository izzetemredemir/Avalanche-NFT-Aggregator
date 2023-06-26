import axios from "axios";
import CollectionModel from "./models/collectionModel";
import mongoose from "mongoose";
import { ethers } from "ethers";
import NFTModel from "./models/nftModel";
import { updateCurrentAsk } from "./utils/updateCurrentAsk";

import env from "./env";
const { MONGOURL } = env;
mongoose.connect(MONGOURL);

NFTModel.find({ currentAsk: { $exists: true, $ne: [] } })
  .then((nfts) => {
    console.log("currentAsk değeri boş olmayan NFT kayıtları:");
    console.log(nfts);
  })
  .catch((err) => {
    console.error("Hata:", err);
  })
  .finally(() => {
    // Veritabanı bağlantısını kapatın
    mongoose.connection.close();
    console.log("Veritabanı bağlantısı kapatıldı");
  });
