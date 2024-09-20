# drops.

![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![AWS DynamoDB](https://img.shields.io/badge/AWS%20DynamoDB-4053D6.svg?style=for-the-badge&logo=amazon-dynamodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-0A66C2.svg?style=for-the-badge&logo=nodemailer&logoColor=white)

## Overview

This project is an AWS Lambda function that fetches sneaker prices, send email notifications to users when the price drops below a target value, and store the data in AWS DynamoDB for future reference.

### https://drops-site.vercel.app/

### Features:
- **Sneaker Price Lookup**: Fetch real-time sneaker prices and metadata.
- **Email Notifications**: Sends an email notification to users when the sneaker price meets or drops below their specified price target.
- **AWS DynamoDB Storage**: Stores user email, sneaker details, price target, and notification preferences in DynamoDB.

## How It Works

1. A user submits their email, desired sneaker style ID, and a price target.
2. The Lambda function fetches real-time sneaker pricing using the Sneaks API.
3. If the current sneaker price is below or equal to the user's price target, the function sends an email to the user.
4. The user's information (email, price target, notification preferences, sneaker data) is stored in AWS DynamoDB for future reference.
