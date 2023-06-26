import fastify from "fastify";

import mongoose from "mongoose";
import CollectionModel from "./models/collectionModel";
import NFTModel from "./models/nftModel";
import env from "./env";

import fastifyCors from "@fastify/cors";

const { MONGOURL } = env;
mongoose.connect(MONGOURL);

const server = fastify({ logger: true });

// Enable CORS for all origins
server.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
});

// API route that fetches collections
server.get("/collections", async (request, reply) => {
  try {
    const page = Number(request.query["page"]) || 1; // Determines what page the user is on.
    const limit = Number(request.query["limit"]) || 10; // Determines how many records will be displayed per page.

    const skip = (page - 1) * limit; // Determines which record to start from.

    const collections = await CollectionModel.find()
      .skip(skip)
      .limit(limit)
      .exec();

    return reply.status(200).send({ collections });
  } catch (error) {
    server.log.error(error);
    return reply
      .status(500)
      .send({ error: "Error fetching collections from the database." });
  }
});

// API route that fetches a single NFT by its ID
server.get("/nfts/:id", async (request, reply) => {
  try {
    const id = request.params["id"] as string; // Fetch the id from the request parameters
    console.log(id);

    // Query the NFTModel to find the NFT with the given id
    const searchTermRegex = new RegExp(id, "i");

    const page = Number(request.query["page"]) || 1;
    const limit = Number(request.query["limit"]) || 10;

    const skip = (page - 1) * limit;

    const nft = await NFTModel.find({ id: searchTermRegex })
      .skip(skip)
      .limit(limit)
      .exec();

    console.log("nft", nft);

    // If no NFT with the given id is found, return a 404 error
    if (!nft) {
      return reply
        .status(404)
        .send({ error: "No NFT found with the given id." });
    }

    // If an NFT with the given id is found, return it
    return reply.status(200).send({ nft });
  } catch (error) {
    server.log.error(error);
    return reply
      .status(500)
      .send({ error: "Error fetching NFT from the database." });
  }
});

// API route that fetches a single NFT by its ID
server.get("/nft/:id", async (request, reply) => {
  try {
    const id = request.params["id"] as string; // Fetch the id from the request parameters
    console.log(id);

    const nft = await NFTModel.findOne({ id: id });

    // If no NFT with the given id is found, return a 404 error
    if (!nft) {
      return reply
        .status(404)
        .send({ error: "No NFT found with the given id." });
    }

    // If an NFT with the given id is found, return it
    return reply.status(200).send({ nft });
  } catch (error) {
    server.log.error(error);
    return reply
      .status(500)
      .send({ error: "Error fetching NFT from the database." });
  }
});

// Start the server
const start = async () => {
  try {
    await server.listen(3000);
    server.log.info(`Server listening on ${server.server.address()}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
