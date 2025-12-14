// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AuditCertificate is ERC721 {
    uint256 public nextId = 1;
    address public registry;

    constructor(address _registry) ERC721("Audit Certificate", "AUDIT") {
        registry = _registry;
    }

    function mint(address to) external {
        require(msg.sender == registry, "only registry");
        _mint(to, nextId++);
    }
}
