import mongoose, { Document, Model, Schema } from "mongoose";

interface BestBid extends Document {
  chain: string;
  isOrderAsk: boolean;
  currency: string;
  price: string;
  amount: string;
  startTime: string;
  endTime: string;
  minPercentageToAsk: string;
  marketPlace: String;
}

interface CurrentAsk extends BestBid {}

interface Owner extends Document {
  id: string;
  ownerId: string;
  quantity: number;
  name: string | null;
  pfpUrl: string | null;
}

interface Metadata extends Document {
  tokenUri: string;
  attributes: any[];
  description: string;
  externalUrl: string | null;
  image: string;
  animationUrl: string | null;
  name: string | null;
}

interface NFT extends Document {
  id: string;
  tokenId: string;
  collecion: String;
  singleId: String;
  numOwners: number;
  metadata: Metadata;
  rarityScore: number | null;
  rarityRanking: number | null;
  verified: string;
  bestBid: BestBid;
  currentAsk: CurrentAsk;
  auction: any | null;
  lastSalePrice: any | null;
  floorPrice: any | null;
  royaltyFee: number;
  protocolFee: number;
  creationType: string;
  numReactions: number;
  owner: Owner;
}

const bestBidSchema = new Schema<BestBid>({
  chain: String,
  isOrderAsk: Boolean,
  currency: String,
  price: String,
  amount: String,
  startTime: String,
  endTime: String,
  minPercentageToAsk: String,
  id: Number,
  marketPlace: String,
});

export const currentAskSchema = new Schema<CurrentAsk>({
  chain: String,
  isOrderAsk: Boolean,
  currency: String,
  price: String,
  amount: String,
  startTime: String,
  endTime: String,
  minPercentageToAsk: String,
  marketPlace: String,
});

const ownerSchema = new Schema<Owner>({
  id: String,
  ownerId: String,
  quantity: Number,
  name: String,
  pfpUrl: String,
});

const metadataSchema = new Schema<Metadata>({
  tokenUri: String,
  attributes: [Schema.Types.Mixed],
  description: String,
  externalUrl: String,
  image: String,
  animationUrl: String,
  name: String,
});

const nftSchema = new Schema<NFT>({
  id: String,
  tokenId: String,
  collecion: String,
  singleId: String,
  numOwners: Number,
  metadata: metadataSchema,
  rarityScore: Number,
  rarityRanking: Number,
  verified: String,
  bestBid: [bestBidSchema],
  currentAsk: [currentAskSchema],
  auction: Schema.Types.Mixed,
  lastSalePrice: Schema.Types.Mixed,
  floorPrice: Schema.Types.Mixed,
  royaltyFee: Number,
  protocolFee: Number,
  creationType: String,
  numReactions: Number,
  owner: ownerSchema,
});

const NFTModel = mongoose.model<NFT>("NFT", nftSchema);

export default NFTModel;
