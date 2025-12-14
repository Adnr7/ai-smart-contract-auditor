// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AuditRegistry {
    uint256 public nextAuditId = 1;

    struct Audit {
        uint256 id;
        bytes32 contractHash;
        string summary;
        uint8 riskScore;
        uint256 timestamp;
    }

    mapping(uint256 => Audit) public audits;
    mapping(bytes32 => uint256) public latestByHash;

    event AuditRegistered(uint256 id, bytes32 hash, uint8 riskScore);

    function registerAudit(
        bytes32 contractHash,
        string calldata summary,
        uint8 riskScore
    ) external returns (uint256) {
        uint256 id = nextAuditId++;
        audits[id] = Audit(id, contractHash, summary, riskScore, block.timestamp);
        latestByHash[contractHash] = id;
        emit AuditRegistered(id, contractHash, riskScore);
        return id;
    }
}
