#!/usr/bin/env node

import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider";
import { config } from "dotenv";
import * as readline from "readline";

// Load environment variables from .env file
config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

async function createAdminUser() {
    try {
        // Prompt for required parameters
        const environment = await promptQuestion("Environment (beta/prod): ");
        const userPoolId = await promptQuestion("User Pool ID: ");
        const email = await promptQuestion("Admin Email: ");
        const fullName = await promptQuestion("Full Name: ");
        const temporaryPassword = await promptQuestion("Temporary Password (min 12 chars with uppercase, lowercase, numbers, and symbols): ");

        // Initialize AWS SDK client
        const client = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION || "us-east-1"
        });

        console.log(`Creating admin user ${email} in environment ${environment}...`);

        // Create the user
        const createUserCommand = new AdminCreateUserCommand({
            UserPoolId: userPoolId,
            Username: email,
            TemporaryPassword: temporaryPassword,
            MessageAction: "SUPPRESS", // Do not send email, we'll provide credentials manually
            UserAttributes: [
                {
                    Name: "email",
                    Value: email
                },
                {
                    Name: "email_verified",
                    Value: "true"
                },
                {
                    Name: "name",
                    Value: fullName
                }
            ]
        });

        const createUserResponse = await client.send(createUserCommand);
        console.log("User created successfully:", createUserResponse.User?.Username);

        // Add user to Administrators group
        const addToGroupCommand = new AdminAddUserToGroupCommand({
            UserPoolId: userPoolId,
            Username: email,
            GroupName: "Administrators"
        });

        await client.send(addToGroupCommand);
        console.log(`User added to Administrators group`);

        console.log("\n========== ADMIN USER CREATED SUCCESSFULLY ==========");
        console.log(`Email: ${email}`);
        console.log(`Temporary Password: ${temporaryPassword}`);
        console.log("Please provide these credentials to the admin user.");
        console.log("They will be prompted to change password on first login.");
        console.log("======================================================\n");

    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        rl.close();
    }
}

createAdminUser();