/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  421614: {
    Fundraising: {
      address: "0xD45DC1c313d2E4381FC075F192DC248551d8Da99",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_stableCoin",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "campaignId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "goalAmount",
              type: "uint256",
            },
          ],
          name: "CampaignCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "campaignId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "totalAmount",
              type: "uint256",
            },
          ],
          name: "CampaignFinalized",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "campaignId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "contributor",
              type: "address",
            },
          ],
          name: "ContributionMade",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "FundTokenTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "campaignId",
              type: "uint256",
            },
          ],
          name: "GoalReached",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "campaigns",
          outputs: [
            {
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              internalType: "string",
              name: "ipfs",
              type: "string",
            },
            {
              internalType: "string",
              name: "club",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "goalAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "currentAmount",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "finalized",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "endCampaign",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "checkAndFinalizeCampaigns",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_campaignId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "contributionAmount",
              type: "uint256",
            },
          ],
          name: "contribute",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "contributions",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_ipfs",
              type: "string",
            },
            {
              internalType: "string",
              name: "_club",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_goalAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_endCampaign",
              type: "uint256",
            },
          ],
          name: "createCampaign",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "fundToken",
          outputs: [
            {
              internalType: "contract ERC20",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_club",
              type: "string",
            },
          ],
          name: "getAllCampaignsByClub",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "ipfs",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "club",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "goalAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentAmount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "finalized",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "endCampaign",
                  type: "uint256",
                },
              ],
              internalType: "struct Fundraising.Campaign[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getCampaignCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getCampaigns",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "ipfs",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "club",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "goalAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentAmount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "finalized",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "endCampaign",
                  type: "uint256",
                },
              ],
              internalType: "struct Fundraising.Campaign[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "test",
              type: "address",
            },
          ],
          name: "getFundToken",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "stablecoin",
          outputs: [
            {
              internalType: "contract ERC20",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_newStableCoin",
              type: "address",
            },
          ],
          name: "switchStableCoin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        allowance: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        approve: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        balanceOf: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        decimals: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        decreaseAllowance: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        increaseAllowance: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        name: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        symbol: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        totalSupply: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        transfer: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        transferFrom: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
      },
    },
    StableCoin: {
      address: "0xDDa0648FA8c9cD593416EC37089C2a2E6060B45c",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "addedValue",
              type: "uint256",
            },
          ],
          name: "increaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "mintAmount",
              type: "uint256",
            },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        allowance: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        approve: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        balanceOf: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        decimals: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        decreaseAllowance: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        increaseAllowance: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        name: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        symbol: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        totalSupply: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        transfer: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        transferFrom: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
