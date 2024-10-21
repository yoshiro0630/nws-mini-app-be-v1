const basedb = {
    rewards: {
        dayCounts: [
            { value: 0 },
            { value: 10000 },
            { value: 20000 },
            { value: 60000 },
            { value: 40000 },
            { value: 50000 },
            { value: 120000 },
            { value: 70000 },
            { value: 80000 },
            { value: 200000 },
        ],
        friends: [
            { count: 0, value: 0 },
            { count: 1, value: 5000 },
            { count: 3, value: 20000 },
            { count: 10, value: 40000 },
            { count: 30, value: 80000 },
            { count: 100, value: 160000 },
            { count: 300, value: 320000 },
            { count: 1000, value: 640000 },
            { count: 3000, value: 1280000 },
            { count: 10000, value: 25600000 },
            { count: 30000, value: 51200000 },
            { count: 100000, value: 102400000 },
        ]
    },
    energy: {
        max: [
            { value: 600, cost: 1000 },   // level 0
            { value: 700, cost: 1500 },
            { value: 900, cost: 2100 },
            { value: 1200, cost: 2800 },
            { value: 1600, cost: 3600 },
            { value: 2100, cost: 4500 },
            { value: 2700, cost: 5500 },
            { value: 3400, cost: 6600 },
            { value: 4200, cost: 7800 },
            { value: 5100, cost: 9100 },
            { value: 6100, cost: 10500 },
            { value: 7200, cost: 12000 },   // level 11
        ],
        regen: [
            { value: 1, cost: 1000 },   // level 0
            { value: 2, cost: 1500 },
            { value: 3, cost: 2100 },
            { value: 5, cost: 2800 },
            { value: 8, cost: 3600 },
            { value: 13, cost: 4500 },
            { value: 21, cost: 5500 },
            { value: 34, cost: 6600 },
            { value: 55, cost: 7800 },
            { value: 89, cost: 9100 },
            { value: 144, cost: 10500 },
            { value: 233, cost: 12000 },   // level 11
        ],
        tap: [
            { value: 1, cost: 1000 },   // level 0
            { value: 2, cost: 1500 },
            { value: 3, cost: 2100 },
            { value: 4, cost: 2800 },
            { value: 5, cost: 3600 },
            { value: 9, cost: 4500 },
            { value: 14, cost: 5500 },
            { value: 23, cost: 6600 },
            { value: 37, cost: 7800 },
            { value: 60, cost: 9100 },
            { value: 97, cost: 10500 },
            { value: 157, cost: 12000 },   // level 11
        ],
    },
    cards: [
        {
            id: 1,
            title: "NWS Games",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 2,
            title: "NWS Token",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 3,
            title: "NWSChain",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 4,
            title: "Node Ecosystem",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 5,
            title: "Strategic Partnerships",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 6,
            title: "NWS Music",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 7,
            title: "Vision",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 8,
            title: "NWS Games",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 9,
            title: "Expanding",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 10,
            title: "Milestones",
            category: "NWSEcosystem",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 11,
            title: "Town Star",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 12,
            title: "Mirandus",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 13,
            title: "Spider Tanks",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 14,
            title: "NFTs In Gaming",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 15,
            title: "NFT Rental System",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 16,
            title: "Play-to-Earn",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 17,
            title: "Game Nodes",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 18,
            title: "Treasure Chest",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 19,
            title: "In-Game Economy",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
        {
            id: 20,
            title: "Gaming Community",
            category: "Gameplay/NFT",
            info: [
                { lvl: 0, hourlyIncome: 100, nextLvlCost: 1000 },
                { lvl: 1, hourlyIncome: 200, nextLvlCost: 1200 },
                { lvl: 2, hourlyIncome: 300, nextLvlCost: 1300 },
                { lvl: 3, hourlyIncome: 400, nextLvlCost: 1400 },
                { lvl: 4, hourlyIncome: 500, nextLvlCost: 1500 },
                { lvl: 5, hourlyIncome: 600, nextLvlCost: 1600 },
                { lvl: 6, hourlyIncome: 700, nextLvlCost: 1700 },
            ],
        },
    ],
    tasks: [
        {
            id: 1,
            title: "Follow NodeWaves on YouTube",
            image: "/image/nws.png",
            link: "https://youtube.com/@nodewaves-official?si=ryYMj3UcWuTaNwUq",
            points: 5000
        },
        {
            id: 2,
            title: "Follow us on Facebok",
            image: "/image/nws.png",
            link: "https://www.facebook.com/nodewaves",
            points: 5000
        },
        {
            id: 3,
            title: "Join NodeWaves Telegram community",
            image: "/image/nws.png",
            link: "https://t.me/+vAemyjZHg3k4MzVl",
            points: 5000
        },
        {
            id: 4,
            title: "Join Nodewaves on Reddit",
            image: "/image/nws.png",
            link: "https://www.reddit.com/r/Nodewaves/?rdt=43231",
            points: 5000
        },
    ]
}

const POLYGON_RPC_URL = 'https://polygon-mainnet.infura.io/v3/cf0626e4926542d1bcab4a5f9f31ac7a';
const NWS_CONTRACT_ADDRESS = '0x13646e0e2d768d31b75d1a1e375e3e17f18567f2';
const NWS_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

module.exports = { basedb, POLYGON_RPC_URL, NWS_CONTRACT_ADDRESS, NWS_ABI }