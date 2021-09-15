pragma solidity ^0.8.6;

// External references
import "../external/tokens/ERC20.sol";

// Internal references
import "../interfaces/IDivider.sol";
import "./BaseToken.sol";

// @title Claim token contract that allows excess collection pre-maturity
contract Claim is BaseToken {
    constructor(
        uint256 _maturity,
        address _divider,
        address _feed,
        string memory _name,
        string memory _symbol
    ) BaseToken(_maturity, _divider, _feed, _name, _symbol) {}

    function collect() external returns (uint256 _collected) {
        return IDivider(divider).collect(msg.sender, feed, maturity, balanceOf[msg.sender]);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 value
    ) internal virtual override {
        IDivider(divider).collect(msg.sender, feed, maturity, balanceOf[msg.sender]);
    }

    /**
     * @dev ERC20 override that adds a call to collect on each burn.
     * @dev Destroys `amount` tokens from the caller.
     * See {ERC20-_burn}.
     * @param account The address to send the minted tokens.
     * @param amount The amount to be minted.
     **/
    function burn(
        address account,
        uint256 amount,
        bool collect
    ) public virtual onlyDivider {
        if (collect) IDivider(divider).collect(msg.sender, feed, maturity, balanceOf[msg.sender]);
        _burn(account, amount);
    }
}
