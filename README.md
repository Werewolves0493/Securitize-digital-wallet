# Digital Wallet Dashboard

## Objective

Build a generic platform that returns analytics on Ethereum wallets.

## Tools

To retrieve information on Ethereum wallets, please use the [Etherscan API](https://etherscan.io/apis).

**API Key:** NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY

## Requirements

The application has the following requirements:

1. **Add Wallet Addresses:** Users should be able to add wallet addresses, and the application should display them.

2. **Favorites and Sorting:**
   - Users can mark wallets as favorites.
   - The user should be able to order wallets based on their favorites.

3. **Wallet Age:**
   - Determine if a wallet is old. A wallet is considered old if the first transaction was performed at least one year ago.

4. **User Actions:**
   a. Get exchange rates from Euro and US Dollar to ETH (Ethereum). Store these rates in-memory or in a preferred database.
   b. Edit the exchange rate of Euro or US Dollar to ETH.

5. **Currency Balance:**
   - Given a currency (Euro or US Dollar), display the balance of ETH in the wallet in the selected currency using the exchange rates from step 4.

## API

- Use NestJS for the API.
- Data storage: Use in-memory storage, but a database is a requirement.

## UI

Implement a dashboard interface (React / VueJs) based on the provided designs. Use Redux/Vuex if necessary.

**Note:** You can make additional design enhancements if required.

---

# To start the dashboard, follow the below steps:

1. **Install Dependencies:**
   ```bash
   yarn install
2. **Build the Project:**
   ```bash
   yarn build
3. **Run the Development Server**
   ```bash
   yarn dev
# API Endpoints