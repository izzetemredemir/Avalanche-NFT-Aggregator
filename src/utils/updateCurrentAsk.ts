import axios from "axios";
import CollectionModel from "../models/collectionModel";
import mongoose from "mongoose";
import { ethers } from "ethers";
import NFTModel from "../models/nftModel";

const { MongoClient } = require("mongodb");

function removeFields(obj: any): any {
  const fieldsToRemove = [
    "v",
    "r",
    "s",
    "id",
    "params",
    "signer",
    "strategy",
    "nonce",
    "chainId",
    "tokenId",
    "collection",
  ];

  if (obj) {
    for (const field of fieldsToRemove) {
      try {
        if (obj.hasOwnProperty(field)) {
          delete obj[field];
        }
      } catch (error) {}
    }
  }
  return obj;
}

function findItemByMarketplaceValue(list, value) {
  if (!list || list.length === 0) {
    return null;
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i] && list[i].marketPlace == value) {
      return list[i];
    }
  }
  return null;
}

export async function updateCurrentAsk(
  nftId: string,
  newCurrentAsk: any,
  existingNFT: any,
  markePlace: string
) {
  let item = findItemByMarketplaceValue(existingNFT.currentAsk, markePlace);
  let update = false;
  if (item !== null && newCurrentAsk !== null) {
    update =
      item.price.toString() != newCurrentAsk.price.toString() ||
      item.endTime.toString() != newCurrentAsk.endTime.toString();
  } else if (item !== null || newCurrentAsk !== null) {
    update = true;
  }
  if (newCurrentAsk !== null && item == null) {
    update = true;
  } else if (item == null && newCurrentAsk != null) {
    update = true;
  }

  if (update == true) {
    newCurrentAsk = removeFields(newCurrentAsk);
    if (item != null) {
      // update existed item
      console.log("update existed item");

      NFTModel.findOneAndUpdate(
        { id: nftId, "currentAsk.marketPlace": markePlace },
        { $set: { "currentAsk.$": newCurrentAsk } },
        { new: true }
      )
        .then((updatedDoc) => {
          console.log(updatedDoc);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // add new item
      if (existingNFT.currentAsk == null) {
        NFTModel.findOneAndUpdate(
          { id: nftId },
          { $set: { currentAsk: [] } },
          { new: true }
        )
          .then((updatedDoc) => {
            return NFTModel.findOneAndUpdate(
              { id: nftId },
              { $push: { currentAsk: newCurrentAsk } },
              { new: true }
            );
          })
          .then((updatedDoc) => {
            console.log(updatedDoc);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        NFTModel.findOneAndUpdate(
          { id: nftId },
          { $push: { currentAsk: newCurrentAsk } },
          { new: true }
        )
          .then((updatedDoc) => {
            console.log(updatedDoc);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
}
