import React, { useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import "./App.css";

function App() {
  const {
    Moralis,
    user,
    authenticate,
    enableWeb3,
    isInitialized,
    isAuthenticated,
    isWeb3Enabled,
  } = useMoralis();

  const web3Account = useMemo(
    () => isAuthenticated && user.get("accounts")[0],
    [user, isAuthenticated]
  );

  const getAsset = async () => {
    const res = await Moralis.Plugins.opensea.getAsset({
      network: "testnet",
      tokenAddress: "0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF",
      tokenId: "5770",
    });
    console.log(res);
  };

  const getOrder = async () => {
    const res = await Moralis.Plugins.opensea.getOrders({
      network: "testnet",
      tokenAddress: "0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF",
      tokenId: "5570",
      orderSide: "buyOrders",
      page: 1, // pagination shows 20 orders each page
    });
    console.log(res);
  };

  const createSellOrder = async () => {
    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);

    await Moralis.Plugins.opensea.createSellOrder({
      network: "testnet",
      tokenAddress: "0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF",
      tokenId: "0",
      tokenType: "ERC1155",
      userAddress: "0x7fB3948c368A943e4EFE848F251E4f254dA1a2b2",
      startAmount: 1,
      endAmount: 1,
      expirationTime: expirationTime, // Only set if you startAmount > endAmount
    });
  };

  const createBuyOrder = async () => {
    const res = await Moralis.Plugins.opensea.createBuyOrder({
      network: "testnet",
      tokenAddress: "0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF",
      tokenId: "5770",
      tokenType: "ERC721",
      amount: 0.5,
      userAddress: web3Account,
      paymentTokenAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
    });

    console.log(res);
  };

  useEffect(() => {
    if (isInitialized) {
      Moralis.initPlugins();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled) {
      enableWeb3();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="App">
      <button onClick={() => authenticate()}>Connect to Metamask</button>
      <button onClick={getAsset}>Get Asset</button>
      <button onClick={getOrder}>Get Order</button>
      {isAuthenticated && (
        <>
          <button onClick={createSellOrder}>Create Sell Order</button>
          <button onClick={createBuyOrder}>Create Buy Order</button>
        </>
      )}
    </div>
  );
}

export default App;
