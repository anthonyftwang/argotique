# argotique

**The dictionary of everyday French: Share and discuss useful expressions and slang.**

🌐 Live at [argotique.net](https://www.argotique.net)

📖 Interactive docs [here](https://anthonyftwang.github.io/argotqiue)

🛠 Built with React, GraphQL, & AWS Amplify (ft. Lambda, S3, DynamoDB, AppSync, & Cognito)

### Features

- 🗣️ Submit, edit and delete argots
- 🔍 Sort argots and find them by author
- ❤️ Like argots and access them later
- 💬 Submit comments to discuss argots
- 👮‍ Authenticated + sign up confirmation
- 📱 Responsive design for web + mobile
- 🚀 Serverless back end + GraphQL

## Quick Start

### Deploy the back end with AWS

1. Clone the repo & install the dependencies

```sh
~ git clone https://github.com/anthonyftwang/argotique.git
~ cd argotique
~ npm install
```

2. Initialize and deploy the Amplify project

```sh
~ amplify init
? Enter a name for the environment: dev (or whatever you would like to call this env)
? Choose your default editor: <YOUR_EDITOR_OF_CHOICE>
? Do you want to use an AWS profile? Y

~ amplify push
? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API? N
> We already have the GraphQL code generated for this project, so generating it here is not necessary.
```

3. Start the app and register a new user

```sh
~ yarn start
```

### Build the front end

1. Clone the repository and run `npm install`
2. Run `npm start` to host the site locally
3. Run `npx styleguidist server` to host the docs locally

### Deploy the front end

1. Create a new repository with your git service of choice

2. Push the project to your new repository

```sh
~ git remote add origin <your_new_repository>
~ git push --set-upstream master
```

3. Connect to [AWS Amplify Console](https://console.aws.amazon.com/amplify/home) to set up continuous deployments. C'est parti!
