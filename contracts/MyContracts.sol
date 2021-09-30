//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20Token {
    string public name;
    mapping(address => uint256) public balances;

    function mint() public {
        balances[tx.origin]++;
    }
}

contract MyContractERC20Helper {
    address payable wallet;
    address public token;

    constructor(address payable _wallet, address _token) {
        wallet = _wallet;
        token = _token;
    }

    fallback() external payable {
        buyToken();
    }

    receive() external payable {
        wallet.transfer(msg.value);
    }

    function buyToken() public payable {
        ERC20Token _token = ERC20Token(address(token));
        _token.mint();
        wallet.transfer(msg.value);
    }
}

contract MyContract {
    mapping(address => uint256) public balances;
    address payable wallet;

    event Purchase(address _byer, uint256 _amount);

    constructor(address payable _wallet) {
        wallet = _wallet;
    }

    fallback() external payable {
        buyToken();
    }

    receive() external payable {
        wallet.transfer(msg.value);
    }

    function buyToken() public payable {
        balances[msg.sender] += 1;
        wallet.transfer(msg.value);
        emit Purchase(msg.sender, 1);
    }
}

contract ERC21Token {
    string public name;
    address payable wallet;

    mapping(address => uint256) public balances;

    constructor(string memory _name, address payable _wallet) {
        name = _name;
        wallet = _wallet;
    }

    fallback() external payable {
        mint();
    }

    receive() external payable {
        wallet.transfer(msg.value);
    }

    function mint() public payable virtual {
        balances[tx.origin]++;
        wallet.transfer(msg.value);
    }
}

contract MyToken is ERC21Token {
    string public symbol;
    address[] public owners;
    uint256 ownerCount;

    constructor(
        string memory _name,
        string memory _symbol,
        address payable _wallet
    ) ERC21Token(_name, _wallet) {
        symbol = _symbol;
    }

    function mint() public payable override {
        super.mint();
        ownerCount++;
        owners.push(msg.sender);
    }
}
