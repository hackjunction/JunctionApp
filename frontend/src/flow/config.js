import { config } from '@onflow/fcl'

config({
    'app.detail.title': 'Junction Referral 2022',
    'app.detail.icon':
        'https://uploads-ssl.webflow.com/62a062bf99397d0fefb0c3ee/62bee49bdf4e9398b37e8bef_Favicon-Junction.png',
    'accessNode.api': process.env.REACT_APP_ACCESS_NODE_API,
    'discovery.wallet': process.env.REACT_APP_DISCOVERY_WALLET,
    'discovery.wallet.method': 'TAB/RPC',
    'flow.network': process.env.REACT_APP_FLOW_NETWORK,

    // Testnet contracts
    '0xJunctionTestnet': process.env.REACT_APP_TESTNET_JUNCTION_CONTRACT,
    '0xMetadataViewsTestnet': process.env.REACT_APP_TESTNET_METADATA_VIEWS,
    '0xNonFungibleTokenTestnet':
        process.env.REACT_APP_TESTNET_NON_FUNGIBLE_TOKEN,

    // Mainnet contracts
    '0xJunction': process.env.REACT_APP_JUNCTION_CONTRACT,
    '0xMetadataViews': process.env.REACT_APP_METADATA_VIEWS,
    '0xNonFungibleToken': process.env.REACT_APP_NON_FUNGIBLE_TOKEN,
})
