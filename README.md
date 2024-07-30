# DelegateKit

DelegateKit is a powerful tool designed to enhance Optimism governance participation by leveraging the Farcaster Social Graph. Our mission is to position Farcaster as the hub of DAO participation, offering a seamless and accessible governance experience across the Superchain ecosystem.

DelegateKit is funded by a grant from the [Optimism Governance](https://gov.optimism.io/)

Track our progress on [Charmverse](https://app.charmverse.io/op-grants/delegatekit-a-complete-farcaster-dao-toolkit-5127535289761294)

### Features

- **Delegate Frames**: Campaign for delegations by sharing interactive frames with dynamic information based on your participation history in the DAO.
- **Proposal Frames**: Bring the homepage of the DAO to the social layer of Farcaster by posting interactive proposal frames and vote directly without leaving Farcaster or spending gas.
- **Delegate Messaging Frame**: Poll your constituents for feedback and receive kudos for your contributions.

### Getting Started

To get started with DelegateKit, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/withtally/delegatekit.git
   ```

2. Install the necessary dependencies:

   ```
   cd DelegateKit/apps/next
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env` file with `cp .env.example .env`
   - Add the required environment variables (e.g., API keys, contract addresses).

4. Start ngrok proxy

`ngrok http 3000`

5. Copy ngrok url to `.env` value "`NEXT_PUBLIC_HOST`"

6. Start the NextJS app:

   ```
   npm run dev
   ```

7. Access the DelegateKit frontend by opening `http://localhost:3000` in your web browser.

### Builder Support

TBD: DelegateKit is built with builder support in mind. We provide an open API that allows third parties to generate and integrate Farcaster Frames directly into their own applications. This enables a greater number of builders to start working with Farcaster and the OP Governance ecosystem.

### Contributing

We welcome contributions from the community! If you'd like to contribute to DelegateKit, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

Please ensure that your code follows our coding standards and includes appropriate tests.

### Contact

If you have any questions, suggestions, or feedback, please reach out to us at:

- Twitter: [@tallyxyz](https://twitter.com/tallyxyz)
- Farcaster: [Dawson](https://warpcast.com/daws)

We appreciate your interest in DelegateKit and look forward to building a more accessible and transparent governance experience together!
