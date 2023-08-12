// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Lotus
 * @dev A smart contract for managing project funding proposals.
 */
contract Lotus is Ownable {
    // Structure to represent a funding proposal
    struct Proposal {
        address proposer; // Address of the proposal creator
        string name; // Name of the proposal
        string project; // Name of the project associated with the proposal
        string description; // Description of the proposal
        uint256 totalFunds; // Total funds collected for the proposal
        uint256 fundingGoal; // Amount of funds required for the proposal
        bool fundingCompleted; // Flag indicating whether funding is completed
        bool fundsWithdrawn; // Flag indicating whether funds have been withdrawn
        address[] funders; // List of addresses that have funded the proposal
    }

    // Mapping to store proposals using a unique identifier
    mapping(uint256 => Proposal) public proposals;

    uint256 public proposalCounter; // Counter to track the number of proposals

    // Events
    event ProposalCreated(
        uint256 proposalId,
        address proposer,
        string name,
        string project,
        string description,
        uint256 fundingGoal
    );
    event ProposalFunded(uint256 proposalId, address funder, uint256 amount);
    event ProposalFundingCompleted(uint256 proposalId);
    event ProposalFundsWithdrawn(
        uint256 proposalId,
        address proposalCreator,
        uint256 withdrawalAmount
    );

    // Modifier to check whether a proposal can be funded
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

    /**
     * @dev Creates a new proposal.
     * @param name Name of the proposal.
     * @param project Name of the associated project.
     * @param description Description of the proposal.
     * @param fundingGoal Amount of funds required for the proposal.
     */
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

    /**
     * @dev Funds a proposal.
     * @param proposalId Identifier of the proposal to fund.
     */
    function fundProposal(
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

    /**
     * @dev Withdraws funds from a proposal after funding is completed.
     * @param proposalId Identifier of the proposal to withdraw funds from.
     */
    function withdrawProposalFunds(uint256 proposalId) external payable {
        require(proposalId < proposalCounter, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        require(
            msg.sender == proposal.proposer,
            "Only the proposal creator can withdraw funds"
        );
        require(proposal.fundingCompleted, "Project funding is not completed");
        require(proposal.fundingGoal > 0, "No funds available for withdrawal");
        require(!proposal.fundsWithdrawn, "Funds have already been withdrawn");

        (bool success, ) = msg.sender.call{value: proposal.fundingGoal}("");
        require(success, "Insufficient funds");
        proposal.fundsWithdrawn = true;

        emit ProposalFundsWithdrawn(
            proposalId,
            msg.sender,
            proposal.fundingGoal
        );
    }

    /**
     * @dev Withdraws funds from the contract by the contract owner.
     * @param amount Amount of funds to withdraw.
     */
    function withdrawFunds(uint256 amount) external payable onlyOwner {
        require(
            amount <= address(this).balance,
            "Insufficient contract balance"
        );
        payable(owner()).transfer(amount);
    }

    // Getters

    /**
     * @dev Retrieves information about a specific proposal.
     * @param proposalId Identifier of the proposal.
     */
    function getProposal(
        uint256 proposalId
    )
        external
        view
        returns (
            address proposer,
            string memory name,
            string memory project,
            string memory description,
            uint256 totalFunds,
            uint256 fundingGoal,
            bool fundingCompleted
        )
    {
        require(proposalId < proposalCounter, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];

        return (
            proposal.proposer,
            proposal.name,
            proposal.project,
            proposal.description,
            proposal.totalFunds,
            proposal.fundingGoal,
            proposal.fundingCompleted
        );
    }

    /**
     * @dev Retrieves a list of proposal IDs for funded proposals.
     */
    function getFundedProposals() external view returns (uint256[] memory) {
        uint256[] memory fundedProposalIds = new uint256[](proposalCounter);
        uint256 fundedCount = 0;

        for (uint256 i = 1; i < proposalCounter; i++) {
            Proposal storage proposal = proposals[i];
            if (proposal.fundingCompleted) {
                fundedProposalIds[fundedCount] = i;
                fundedCount++;
            }
        }

        uint256[] memory fundedProposals = new uint256[](fundedCount);
        for (uint256 i = 0; i < fundedCount; i++) {
            fundedProposals[i] = fundedProposalIds[i];
        }

        return fundedProposals;
    }

    /**
     * @dev Retrieves a list of proposal IDs for unfunded proposals.
     */
    function getUnfundedProposals() external view returns (uint256[] memory) {
        uint256[] memory unfundedProposalIds = new uint256[](proposalCounter);
        uint256 unfundedCount = 0;

        for (uint256 i = 1; i < proposalCounter; i++) {
            Proposal storage proposal = proposals[i];
            if (!proposal.fundingCompleted) {
                unfundedProposalIds[unfundedCount] = i;
                unfundedCount++;
            }
        }

        uint256[] memory unfundedProposals = new uint256[](unfundedCount);
        for (uint256 i = 0; i < unfundedCount; i++) {
            unfundedProposals[i] = unfundedProposalIds[i];
        }

        return unfundedProposals;
    }

    /**
     * @dev Retrieves a list of funders for a specific proposal.
     * @param proposalId Identifier of the proposal.
     */
    function getProposalFunders(
        uint256 proposalId
    ) external view returns (address[] memory) {
        require(proposalId < proposalCounter, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];

        return proposal.funders;
    }
}
