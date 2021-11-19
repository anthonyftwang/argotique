# argotique
Share and discuss useful French expressions and slang.
### Current Approach
CRUD operations on Posts and Comments will be done via the Amplify API which handles the interaction with GraphQL (queries/mutations). Users are added upon sign-up via a Lambda function interfacing directly with DynamoDB.

Votes use GraphQL mutations to update the target Post's voteCount as well as a PostVote table which is always queried with a filter for the current user.

The logic to sort posts based on votes, date, etc. can be handled on the client side for now. Once pagination becomes needed, this will need to change.
