// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

enum GameTypes {
    idle,
    pacman,
    cars
}

struct Game {
    GameTypes gameName;
    uint256 startTime;
}

struct User {
    address userAddress;
    uint256 xp;
    bool isOwner;
}

contract GameEngine {
    address owner;
    mapping(address => Game) public userToGame;
    mapping(address => uint256) public userToXP;
    mapping(address => uint256) private addressToIndex;
    User[] public usersArr;

    address topUser;

    constructor() {
        owner = msg.sender;
        User memory currentUser = User(msg.sender, userToXP[msg.sender], true);
        usersArr.push(currentUser);
    }

    function startGame(GameTypes gameName) public {
        // Check owner is not playing game
        require(owner != msg.sender, "Owner can't play the game");

        // Check if gameName is not idle
        require(gameName != GameTypes.idle, "Game cannot be idle");

        Game storage currentUserGame = userToGame[msg.sender];

        // Check if a game is already active
        require(
            currentUserGame.gameName == GameTypes.idle,
            "Game is already active!"
        );

        // Starting Game
        currentUserGame.gameName = gameName;
        currentUserGame.startTime = block.timestamp;
    }

    function endGame() public {
        Game storage currentUserGame = userToGame[msg.sender];

        // Check if game is active for current user
        require(currentUserGame.startTime > 0, "No game has been started yet!");

        // Transfer XP to the user
        uint256 xp = block.timestamp - currentUserGame.startTime;
        userToXP[msg.sender] += xp;
        if (userToXP[msg.sender] > userToXP[topUser]) topUser = msg.sender;

        // Reset Game States
        delete currentUserGame.gameName;
        delete currentUserGame.startTime;

        // Push user to array
        delete usersArr[addressToIndex[msg.sender]];
        User memory currentUser = User(msg.sender, userToXP[msg.sender], false);
        usersArr.push(currentUser);
        addressToIndex[msg.sender] = usersArr.length - 1;
    }

    function getUsers() public view returns (User[] memory) {
        return usersArr;
    }
}
