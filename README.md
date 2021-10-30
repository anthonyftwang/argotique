# argotique
Share and discuss useful French expressions and slang.
### Current Approach
CRUD operations on Posts and Comments will be handled by DataStore which handles the interaction with GraphQL (queries/mutations). Users are added upon sign-up via a Lambda function interfacing directly with DynamoDB.

The logic to sort posts based on votes, date, etc. can be handled on the client side. Votes call DataStore to update the target Post. It should also be considered how the m:n vote relationships between Users and Posts should be updated to reflect each vote (so that a user's past votes are tracked).