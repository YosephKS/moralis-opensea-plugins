import React, { useState, useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import {
	Flex,
	Box,
	Spacer,
	Heading,
	Button,
	Stack,
	Input,
	NumberInput,
	NumberInputField,
} from "@chakra-ui/react";
import "./App.css";

function App() {
	const {
		Moralis,
		user,
		logout,
		authenticate,
		enableWeb3,
		isInitialized,
		isAuthenticated,
		isWeb3Enabled,
	} = useMoralis();
	const [values, setValues] = useState({ tokenAddress: "", tokenId: "" });
	const web3Account = useMemo(
		() => isAuthenticated && user.get("accounts")[0],
		[user, isAuthenticated],
	);

	const getAsset = async () => {
		const res = await Moralis.Plugins.opensea.getAsset({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
		});
		console.log(res);
	};

	const getOrder = async () => {
		const res = await Moralis.Plugins.opensea.getOrders({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
			orderSide: 0,
			page: 1, // pagination shows 20 orders each page
		});
		console.log(res);
	};

	const createSellOrder = async () => {
		const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
		const startAmount = 1;
		const endAmount = 1;

		await Moralis.Plugins.opensea.createSellOrder({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
			tokenType: "ERC1155",
			userAddress: web3Account,
			startAmount,
			endAmount,
			expirationTime: startAmount > endAmount && expirationTime, // Only set if you startAmount > endAmount
		});

		console.log("Create Sell Order Successful");
	};

	const createBuyOrder = async () => {
		await Moralis.Plugins.opensea.createBuyOrder({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
			tokenType: "ERC721",
			amount: 0.0001,
			userAddress: web3Account,
			paymentTokenAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
		});

		console.log("Create Buy Order Successful");
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
		<>
			<Flex sx={{ margin: 3 }}>
				<Box p="2">
					<Heading size="md">Moralis OpenSea</Heading>
				</Box>
				<Spacer />
				<Box>
					{isAuthenticated ? (
						<Flex justifyContent="center" alignItems="center">
							<div>{web3Account}</div>
							<Button
								colorScheme="teal"
								sx={{ ml: 3 }}
								onClick={() => logout()}
							>
								Logout
							</Button>
						</Flex>
					) : (
						<Button colorScheme="teal" onClick={() => authenticate()}>
							Connect to Metamask
						</Button>
					)}
				</Box>
			</Flex>
			<Flex sx={{ margin: 3 }}>
				<Box w="45vw" sx={{ mr: 3 }}>
					<Input
						sx={{ borderColor: "1px solid black" }}
						placeholder="NFT Token Address"
						onChange={(e) =>
							setValues({ ...values, tokenAddress: e.target.value })
						}
					/>
				</Box>
				<Box w="10vw">
					<NumberInput
						min={0}
						value={values.tokenId}
						onChange={(valueString) =>
							setValues({ ...values, tokenId: valueString })
						}
					>
						<NumberInputField sx={{ borderColor: "1px solid black" }} />
					</NumberInput>
				</Box>
			</Flex>
			<Stack direction="row" spacing={4} sx={{ margin: 3 }}>
				<Button onClick={getAsset}>Get Asset</Button>
				<Button onClick={getOrder}>Get Order</Button>
				{isAuthenticated && (
					<>
						<Button onClick={createBuyOrder}>Create Buy Order</Button>
						<Button onClick={createSellOrder}>Create Sell Order</Button>
					</>
				)}
			</Stack>
		</>
	);
}

export default App;
