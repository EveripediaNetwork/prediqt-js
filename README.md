# PredIQt JavaScript/TypeScript Client Library

[![CircleCI](https://circleci.com/gh/EveripediaNetwork/prediqt-js/tree/master.svg?style=svg)](https://circleci.com/gh/EveripediaNetwork/prediqt-js/tree/master)
[![npm version](https://badge.fury.io/js/@everipedia%2Fprediqt-js.svg)](https://badge.fury.io/js/@everipedia%2Fprediqt-js)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/everipedianetwork/prediqt-js/master/LICENSE)

> General purpose library for the PredIQt

## Installation

Using yarn:

```bash
yarn add @everipedia/prediqt-js
```

or using npm:

```bash
npm install --save @everipedia/prediqt-js
```

## Quick Start

**API initialization**

*Frontend usage*

```js
import { Prediqt } from "@everipedia/prediqt-js"

const nodeEndpoint = "https://api.kylin.alohaeos.com"; // you can use any other node endpoint

const client = new Prediqt(
    { createApi: { signatureProvider, nodeEndpoint }}, // create signatureProvider with eosjs or based on it libs
    auth,                                              // (optional) Array with authorization objects, you can set it later with setAuth method
    contracts                                          // (optional) Object that takes prediqt, prediqtMarket, iqToken, prediqtBank contracts' names
);

// or you can pass created api

import { Api, JsonRpc } from "eosjs";

const rpc = new JsonRpc(nodeEndpoint);
const api = new Api({ rpc, signatureProvider });       // create rpc and signatureProvider with eosjs or based on it libs

const client = new Prediqt(
    { customApi: api },
    ...                                                // the same parameters
);
```

*Server usage*

```js
... 

// or you can pass created api

const { Prediqt } = require("@everipedia/prediqt-js");
const { Api, JsonRpc } = require("eosjs");
const fetch = require("isomorphic-fetch");

const rpc = new JsonRpc(nodeEndpoint, { fetch });
const api = new Api({ rpc, signatureProvider });       // create rpc and signatureProvider with eosjs or based on it libs

const client = new Prediqt(
    { customApi: api },
    ...                                                // the same parameters
);
```

**Graph API initialization** 

```js
import { PrediqtGraph } from "@everipedia/prediqt-js";

const apiEndponit = "https://prediqt-api-kylin.azurewebsites.net/graphql"; // endpoint for mainnet - https://prediqt-api-mainnet.azurewebsites.net/graphql 

const graphClient = new PrediqtGraph(apiEndponit);
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

*Utils methods*

### setAuth

Set authorisation to execute transactions

#### Parameters

-   `auth` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
    -   `auth[].actor` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `auth[].permission` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### resetAuth

Reset authorisation to execute transactions

---
*Methods that requires authorization*

### setFee

Set a fee for the platform (admin only)

#### Parameters

-   `fee` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `fee.id` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `fee.fee` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### acceptMarket

Accept a proposed market

#### Parameters

-   `resolver` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### claimShares

Claim shares for a particular market

#### Parameters

-   `user` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### cancelOrder

Cancel an order

#### Parameters

-   `nameId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** takes "yes" or "no"
-   `user` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `id` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### createMarket

Create a Market

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.creator` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.resolver` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.ipfs` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.timeIn` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.transferToken` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### deleteMarket

Delete an existing Market

#### Parameters

-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### limitOrder

Open an order for shares in a market

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.nameId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** takes "yes" or "no"
    -   `data.user` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.shares` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.limit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.transferToken` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.referral` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.buy` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### marketInvalid

Set a market as invalid (only resolver)

#### Parameters

-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `memo` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### marketResolve

Set the outcome of a market (only resolver)

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.resolver` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.shareType` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
    -   `data.memo` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### proposeMarket

Propose a market to be part of the active markets

#### Parameters

-   `creator` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `resolver` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `ipfs` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `timeIn` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `transferToken` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `transferMemo` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### rejectMarket

Reject a proposed market (resolver only)

#### Parameters

-   `resolver` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### setResolver

Change resolver for a market (admin only)

#### Parameters

-   `resolver` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### withdraw

Withdraw from user balance

#### Parameters

-   `user` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `quantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### syncBank

Sync Bank

### transferShares

Transfer shares to user

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.from` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.to` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.shares` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.shareType` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
    -   `data.marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### cancelShares

Cancel transferred shares

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.from` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.sharedId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### buyShares

Buy shares

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.from` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.price` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.shares` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.shareType` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
    -   `data.marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.transferToken` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### sellShares

Sell shares

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.from` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.shares` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.shareType` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
    -   `data.marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.price` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### proposeMultiSig

Propose MultiSignature

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.proposalName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.proposer` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `data.requested` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

---
*Methods that doesn't require authorization*

### getFees

Get fees related to the contract

#### Parameters

-   `limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `100`)
-   `offset` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `0`)

### getShares

Get shares related to a market

#### Parameters

-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `100`)
-   `offset` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `0`)

### getReferrals

Get referral shares related to a market

#### Parameters

-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `100`)
-   `offset` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `0`)

### getMarkets

Get markets

#### Parameters

-   `tableKey` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `""`)
-   `limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `100`)
-   `offset` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `0`)

### getMarket

Get a single market

#### Parameters

-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### getOrders

Get orders for a market

#### Parameters

-   `data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `data.nameId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** takes "yes" or "no"
    -   `data.marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
    -   `data.tableKey` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `""`)
    -   `data.limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `100`)
    -   `data.offset` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**  (optional, default `0`)

### getBalance

Get balance of an user

#### Parameters

-   `username` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `symbol` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### getIqBalance

Get IQ balance of an user

#### Parameters

-   `username` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### getUserResources

Get resources of an user

#### Parameters

-   `username` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### getAccount

Get account data of an user

#### Parameters

-   `username` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## Graph API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### getProposedMarkets

Get proposed markets

#### Parameters

-   `skip` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `count` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `creator` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `""`)
-   `filterUrlParam` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 
    -   `filterUrlParam.paramName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `filterUrlParam.paramValue` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### getMarkets

Get markets

#### Parameters

-   `excludeInvalidIpfs` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `skip` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `count` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `isVerified` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `creator` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `filterUrlParam` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 
    -   `filterUrlParam.paramName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `filterUrlParam.paramValue` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### getMarket

Get market

#### Parameters

-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### getMarketPage

Get market page

#### Parameters

-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `loggedInUser` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 

### getPlatformFees

Get platform fees

### getCategoriesAndTags

Get categories and tags

### getDappInfo

Get information about dapp

### getUserProfile

Get user's profile

#### Parameters

-   `username` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### getShareHolders

Get shareholders

#### Parameters

-   `marketId` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `loggedInUser` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### getChainInfo

Get info about node's backlog
