import mongoose, { Document, Model, Schema } from "mongoose";

interface ICollection extends Document {
  chain: string;
  chainId: number;
  id: string;
  address: string;
  name: string;
  slugName: string | null;
  symbol: string;
  type: string;
  createdAt: number;
  creationType: string;
  attributes: string | null;
  numOwners: number;
  numItems: number;
  numAsks: number;
  numSales: number;
  volume: string;
  volumeTotal: string;
  floor: string;
  externalVolume: string | null;
  volumeUsd: string;
  verified: string;
  discordUrl: string | null;
  twitterUrl: string | null;
  websiteUrl: string | null;
  bannerUrl: string;
  pfpUrl: string;
  description: string | null;
  pctVolumeChanged: string | null;
  pctFloorPriceChanged: string | null;
}

const CollectionSchema: Schema = new Schema({
  chain: String,
  chainId: Number,
  id: String,
  address: String,
  name: String,
  slugName: String,
  symbol: String,
  type: String,
  createdAt: Number,
  creationType: String,
  attributes: String,
  numOwners: Number,
  numItems: Number,
  numAsks: Number,
  numSales: Number,
  volume: String,
  volumeTotal: String,
  floor: String,
  externalVolume: String,
  volumeUsd: String,
  verified: String,
  discordUrl: String,
  twitterUrl: String,
  websiteUrl: String,
  bannerUrl: String,
  pfpUrl: String,
  description: String,
  pctVolumeChanged: String,
  pctFloorPriceChanged: String,
});

const CollectionModel: Model<any> = mongoose.model(
  "Collection",
  CollectionSchema
);

export default CollectionModel;
