export const FIELD_MANAGER = {
    ADDRESS: '0x8C41791B286215136B598Be81487D260ABb34C26',
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