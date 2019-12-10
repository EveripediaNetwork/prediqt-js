# Prediqt JavaScript/TypeScript Client Library

[![Build Status](https://travis-ci.org/everipedianetwork/prediqt-js.svg?branch=master)](https://travis-ci.org/everipedianetwork/prediqt-js)
[![npm version](https://badge.fury.io/js/prediqt-js.svg)](https://badge.fury.io/js/prediqt-js)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/everipedianetwork/prediqt-js/master/LICENSE)

> General purpose library for the Prediqt

## Installation

Using Yarn:

```bash
yarn add prediqt-js
```

or using NPM:

```bash
npm install --save prediqt-js
```

## Quick Start

**CommonJS**

```js
const { Prediqt } = require("prediqt-js")
const fetch = require("isomorphic-fetch")

const endpoint = "https://api.kylin.alohaeos.com"
const client = new Prediqt(endpoint, { fetch })
```

**TypeScript**

```ts
import { Prediqt } from "prediqt-js"
import fetch from "isomorphic-fetch"

const endpoint = "https://api.kylin.alohaeos.com"
const client = new Prediqt(endpoint, { fetch })
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [setFee](#setfee)
    -   [Parameters](#parameters)
-   [acceptMarket](#acceptmarket)
    -   [Parameters](#parameters-1)
-   [claimShares](#claimshares)
    -   [Parameters](#parameters-2)
-   [cancelOrderNo](#cancelorderno)
    -   [Parameters](#parameters-3)
-   [cancelOrderYes](#cancelorderyes)
    -   [Parameters](#parameters-4)
-   [createMarket](#createmarket)
    -   [Parameters](#parameters-5)
-   [delMarket](#delmarket)
    -   [Parameters](#parameters-6)
-   [limitOrderNo](#limitorderno)
    -   [Parameters](#parameters-7)
-   [limitOrderYes](#limitorderyes)
    -   [Parameters](#parameters-8)
-   [marketInvalid](#marketinvalid)
    -   [Parameters](#parameters-9)
-   [marketResolve](#marketresolve)
    -   [Parameters](#parameters-10)
-   [proposeMarket](#proposemarket)
    -   [Parameters](#parameters-11)
-   [rejectMarket](#rejectmarket)
    -   [Parameters](#parameters-12)
-   [setResolver](#setresolver)
    -   [Parameters](#parameters-13)
-   [transferShares](#transfershares)
    -   [Parameters](#parameters-14)
-   [withdraw](#withdraw)
    -   [Parameters](#parameters-15)
-   [syncBank](#syncbank)
-   [getFees](#getfees)
    -   [Parameters](#parameters-16)
-   [getShares](#getshares)
    -   [Parameters](#parameters-17)
-   [getReferrals](#getreferrals)
    -   [Parameters](#parameters-18)
-   [getMarkets](#getmarkets)
    -   [Parameters](#parameters-19)
-   [getMarket](#getmarket)
    -   [Parameters](#parameters-20)
-   [getOrdersYes](#getordersyes)
    -   [Parameters](#parameters-21)
-   [getOrdersNo](#getordersno)
    -   [Parameters](#parameters-22)
-   [getBalance](#getbalance)
    -   [Parameters](#parameters-23)

### setFee

Set a fee for the platform (admin only)

#### Parameters

-   `fee`  

### acceptMarket

Accept a proposed market

#### Parameters

-   `resolver`  
-   `marketId`  

### claimShares

Claim shares for a particular market

#### Parameters

-   `user`  
-   `marketId`  

### cancelOrderNo

Cancel an order of type No

#### Parameters

-   `user`  
-   `marketId`  
-   `id`  

### cancelOrderYes

Cancel an order of type Yes

#### Parameters

-   `user`  
-   `marketId`  
-   `id`  

### createMarket

Create a Market

#### Parameters

-   `creator`  
-   `resolver`  
-   `ipfs`  
-   `time_in`  

### delMarket

Delete an existing Market

#### Parameters

-   `marketId`  

### limitOrderNo

Open an order for share type No in a market

#### Parameters

-   `user`  
-   `marketId`  
-   `shares`  
-   `limit`  
-   `referral`  
-   `buy`  

### limitOrderYes

Open an order for share type Yes in a market

#### Parameters

-   `user`  
-   `marketId`  
-   `shares`  
-   `limit`  
-   `referral`  
-   `buy`  

### marketInvalid

Set a market as invalid (only resolver)

#### Parameters

-   `marketId`  
-   `memo`  

### marketResolve

Set the outcome of a market (only resolver)

#### Parameters

-   `resolver`  
-   `marketId`  
-   `shareType`  
-   `memo`  

### proposeMarket

Propose a market to be part of the active markets

#### Parameters

-   `creator`  
-   `resolver`  
-   `ipfs`  
-   `time_in`  

### rejectMarket

Reject a proposed market (resolver only)

#### Parameters

-   `resolver`  
-   `marketId`  

### setResolver

Change resolver for a market (admin only)

#### Parameters

-   `resolver`  
-   `marketId`  

### transferShares

Transfer shares between users

#### Parameters

-   `from`  
-   `to`  
-   `shares`  
-   `shareType`  
-   `marketId`  

### withdraw

Withdraw from user balance

#### Parameters

-   `user`  
-   `quantity`  

### syncBank

Sync Bank

### getFees

Get fees related to the contract

#### Parameters

-   `limit`   (optional, default `100`)
-   `offset`   (optional, default `0`)

### getShares

Get shares related to a market

#### Parameters

-   `marketId`  
-   `limit`   (optional, default `100`)
-   `offset`   (optional, default `0`)

### getReferrals

Get referral shares related to a market

#### Parameters

-   `marketId`  
-   `limit`   (optional, default `100`)
-   `offset`   (optional, default `0`)

### getMarkets

Get markets

#### Parameters

-   `limit`   (optional, default `100`)
-   `offset`   (optional, default `0`)

### getMarket

Get a single market

#### Parameters

-   `marketId`  

### getOrdersYes

Get order of type Yes for a market

#### Parameters

-   `marketId`  
-   `limit`   (optional, default `100`)
-   `offset`   (optional, default `0`)

### getOrdersNo

Get order of type No for a market

#### Parameters

-   `marketId`  
-   `limit`   (optional, default `100`)
-   `offset`   (optional, default `0`)

### getBalance

Get balance of an user

#### Parameters

-   `holder`  
-   `symbol`  
-   `limit`   (optional, default `1`)