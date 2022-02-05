export const FIELD_MANAGER = {
    ADDRESS: '0x68B1D87F95878fE05B998F19b66F4baba5De1aed',
    ABI: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tokenProxy",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "fieldName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "fieldSymbol",
                    "type": "string"
                }
            ],
            "name": "createField",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "fields",
            "outputs": [
                {
                    "internalType": "contract Field",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nrOfFields",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}