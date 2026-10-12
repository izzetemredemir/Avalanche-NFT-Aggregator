# Avalanche NFT Aggregator

An NFT aggregator for Avalanche. It collects collections and listings from the Joepegs and Kalao marketplaces into MongoDB and serves them through a Fastify API and a React frontend, so prices for the same NFT can be compared in one place.

> **Status:** archived. Built in 2023. Kept for reference, not maintained.

![Collections grid](https://github.com/izzetemredemir/Avalanche-NFT-Aggregator/assets/11755605/c644728d-a303-42f7-83f8-36f740ff6f97)
![Items of one collection](https://github.com/izzetemredemir/Avalanche-NFT-Aggregator/assets/11755605/f407809d-54a2-4065-9924-c4938ac5b014)
![NFT page with best bid and current ask](https://github.com/izzetemredemir/Avalanche-NFT-Aggregator/assets/11755605/a0b137ef-603a-45b9-84ac-58a0f462802d)

## What it does

- `src/joeAddCollection.ts` pages through Joepegs' Avalanche collection list (ordered by 7-day volume) and stores new collections in MongoDB.
- `src/joeGetPriceData.ts` fetches the items of each stored collection from Joepegs, sorted by price, and saves NFT metadata, best bid and current ask, each tagged with its marketplace.
- `src/kalaoGetNftData.ts` queries Kalao's GraphQL search for the same collections, converts sale prices to wei and adds them to the matching NFT as a Kalao ask, updating it only when price or expiry changed.
- `src/index.ts` is a Fastify API with CORS: `GET /collections` (paginated), `GET /nfts/:id` (NFTs whose id matches, used to list a collection's items, paginated) and `GET /nft/:id`.
- `frontend/` is a React app with a collections grid, a per-collection item grid with "Load More", and an NFT page showing the best bid, current ask, attributes and token URI.

The Joepegs and Kalao endpoints used here are the ones their web apps called in 2023 and may no longer respond.

## Tech stack

- TypeScript, Node.js, Fastify, Mongoose (MongoDB), axios, ethers v6 (unit conversion), envalid and dotenv
- React 18 (Create React App), React Router, axios
- Docker Compose for MongoDB and a MongoDB web UI

## Running it locally

```bash
docker compose up -d                    # MongoDB on 27017, web UI on 4000
echo 'MONGOURL=<your MongoDB connection string>' > .env   # credentials are in docker-compose.yml
npm install
npx ts-node src/joeAddCollection.ts     # load collections
npx ts-node src/joeGetPriceData.ts      # load items and Joepegs prices
npx ts-node src/kalaoGetNftData.ts      # add Kalao listings
npm start                               # API on http://localhost:3000
```

Frontend (it calls the API at `http://localhost:3000`, so let it start on another port when asked):

```bash
cd frontend
npm install
npm start
```

## Project structure

- `src/`: crawlers, Mongoose models and the Fastify API
- `frontend/`: React frontend
- `docker-compose.yml`: local MongoDB

## License

MIT, see [LICENSE](LICENSE).
