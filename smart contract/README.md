# OPGrant Smart Contract

The OPGrant smart contract is a crowdfunding contract that allows users to create proposals for funding projects and receive contributions from other users. It is implemented in Solidity and follows the ERC-20 standard. The contract provides functions for creating proposals, funding projects and withdraw funds.

## Features

- Proposal Creation: Users can create proposals by providing the name, project details, description, and funding goal. Each proposal is assigned a unique proposal ID.

- Upvoting/Downvoting: Users can upvote or downvote proposals to show their support or disapproval.

- Project Funding: Users can contribute funds to a project by calling the `fundProject` function. The total funds raised for a project are tracked, and if the funding goal is reached, the project is marked as completed.

- Proposal Information: Various getter functions are available to retrieve information about a proposal, such as the proposer, name, project details, description, upvotes, downvotes, total funds raised, funding goal, and funding completion status.

- Withdraw Funds: The contract owner can withdraw funds from the contract using the `withdrawFunds` function.

## Contract Structure

The OPGrant contract is built on top of the OpenZeppelin `Ownable` contract, which provides basic authorization control. The contract uses a struct called `Proposal` to store information about each proposal. It includes mappings to track pooled funds, owners, and an array of funders.

The contract maintains a `proposalCounter` variable to assign unique proposal IDs and uses events to emit important contract events, such as proposal creation and funding of successful reviewed proposal.

## Usage

To use the OPGrant smart contract, follow these steps:

1. Deploy the contract to a compatible Ethereum network.

2. Interact with the contract using the available functions:

   - Call the `createProposal` function to create a new proposal, providing the name, project details, description, and funding goal.

   - Contribute funds to a project by calling the `fundProject` function, providing the proposal ID and sending the desired amount of Ether.

   - Retrieve information about a proposal using the various getter functions, such as `getProposal`, `getFundedProposals`, and `getUnfundedProposals`.

   - The contract owner can withdraw funds from the contract using the `withdrawFunds` function.

## License

The OPGrant smart contract is released under the MIT License.
