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

    modifier canFundProposal(uint256 proposalId) {
        require(
            !proposals[proposalId].fundingCompleted,
            "Project funding is already completed"
        );
        require(
            !(proposals[proposalId].funders.length > 0) ||
                proposals[proposalId].funders[0] == msg.sender,
            "Proposal can only be funded by the initial funder"
        );
        _;
    }

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

    function fundProject(
        uint256 proposalId
    ) public payable canFundProposal(proposalId) {
        require(proposalId < proposalCounter, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];

        require(
            !proposal.fundingCompleted,
            "Project funding is already completed"
        );

        (bool success, ) = msg.sender.call{value: msg.value}("");
        require(success, "Insufficient funds");

        proposal.totalFunds += msg.value;
        proposal.funders.push(msg.sender);

        if (proposal.totalFunds >= proposal.fundingGoal) {
            proposal.fundingCompleted = true;

            emit ProposalFundingCompleted(proposalId);
        }

        emit ProposalFunded(proposalId, msg.sender, msg.value);
    }
}
