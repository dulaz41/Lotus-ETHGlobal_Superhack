// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OPGrant is Ownable {
    struct Proposal {
        address proposer;
        string name;
        string project;
        string description;
        uint256 totalFunds;
        uint256 fundingGoal;
        bool fundingCompleted;
        bool fundsWithdrawn;
        address[] funders;
    }

    mapping(uint256 => Proposal) public proposals;

    uint256 public proposalCounter;

    event ProposalCreated(
        uint256 proposalId,
        address proposer,
        string name,
        string project,
        string description,
        uint256 fundingGoal
    );

    constructor() {
        proposalCounter = 0;
    }

    receive() external payable {}

    function createProposal(
        string calldata name,
        string calldata project,
        string calldata description,
        uint256 fundingGoal
    ) external {
        Proposal storage newProposal = proposals[proposalCounter];
        newProposal.proposer = msg.sender;
        newProposal.name = name;
        newProposal.project = project;
        newProposal.description = description;
        newProposal.fundingGoal = fundingGoal;

        emit ProposalCreated(
            proposalCounter,
            msg.sender,
            name,
            project,
            description,
            fundingGoal
        );

        proposalCounter++;
    }
}
