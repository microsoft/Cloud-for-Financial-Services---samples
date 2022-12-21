# Getting Started kit for Intelligent appointments

The Getting Started kit for Intelligent appointments uses the [Intelligent appointments APIs](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/intelligent-appointments-api-reference) to provide architectural guidance and a powerful appointment booking mechanism for the web applications. The Intelligent Appointments APIs help to schedule, organize, and manage the appointments.

The Getting started kit for Intelligent appointments (Starter kit) provides architectural guidance, services, patterns, and a collection of React components to enable front-end experience, and services which encapsulate the intelligent appointments APIs. The kit also provides a demo React web app with built-in wizard experience and a sample serverless function, ready to connect to your Intelligent appointments solution environment with the minimal required configuration.

The Starter kit aims is to simplify the development process and allow Microsoft customers to extend their own intelligent appointment scheduling solution.

## Installation Prerequisites

1. [Node.js](https://nodejs.dev) version from 14.x or 16.x (recommended).
2. [Yarn](https://yarnpkg.com) for workspace package management.

### If you want to experiment with our Starter kit in a demo web app using Azure Web Apps

1. Active Azure subscription
2. VS Studio Code and [Azure Function Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
3. [Azure Functions Core Tools 4.x](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools)
4. [Experimenting with Azure Static Web Apps](https://azure.github.io/static-web-apps-cli/)

## File structures

The Starter kit package includes two main directories:

1. `/appointment-starter-kit` - Contains the code of the Starter kit, which provides you with the wizard component for the user experience, and the services to communicate with your environment.
2. `/demo-web-app` - Contains examples of the demo web app with the Starter kit embedded, and a sample Azure function to demonstrate as the web app gateway.
   * `/src` - Contains the demo web app code with the Starter kit embedded.
   * `/api` - Contains the sample code for an Azure Serverless function, which acts as the app gateway to establish a secured connection to your Intelligent appointments environment.

## Getting started

1. In the root directory, run the following command:

```bash
yarn
```

2. After the previous command completes running, navigate to `/appointment-starter-kit` and run the following command:

```bash
yarn build
```

**Note**: Every time you change the code within `/appointment-starter-kit`, you must run the `yarn build` command to make sure the project is built and updated.

3. If you want to have full experience with an Azure web function in the demo app, [configure your application environment variables first](#configure-environment-variables-for-azure-function).

4. Navigate to `demo-web-app` to configure and start the local dev environment for the demo app, or build and deploy it based on your requirement.

   Run either of the following commands:

   ```bash
   yarn dev

   #OR, to start the local dev environment with an Azure web function
   yarn swa start

   ```

## Configure environment variables for Azure function

In order to use Azure function as your app gateway to establish connection with your Intelligent Appointment environment and exchange data, you need to configure the following environment variables:

| Variable             | Description                                  |
|----------------------|----------------------------------------------|
| CLIENT_ID            |                                              |
| CLIENT_SECRET        |                                              |
| ENVIRONMENT_URL      | Your Intelligent Appointment environment URL |
| TENANT               | Your environment tenant id                   |
| ENVIRONMENT_VERSION  | Version of your IA environment               |

## Local

If you run the Azure web app (including Azure function) locally, you need to configure your `api\local.settings.json` file to include these variables, as seen in the below sample code:

```json
"Values": {
   "CLIENT_ID": "your-client-id",
   "CLIENT_SECRET": "your-secret-id",
   "ENVIRONMENT_URL": "your-ia-environment-url",
   "TENANT": "your-tenant-id",
   "ENVIRONMENT_VERSION": "your-ia-environment-version"
}
```

## Production

In your web application instance on Azure Portal, do the following:

1. Select **Configurations** on the left panel
2. Select **Application settings** tab
3. Hit on **Add** to add new pair of environment value.
4. Provide the name according to the table above, and its value accordingly.
5. Save

Now your application is ready!

See [Azure ADB2C Authentication Overview](https://learn.microsoft.com/en-us/azure/active-directory-b2c/technical-overview)

The sample Azure function comes with a naive implementation of token generation for enabling the connection between Azure web app and Intelligent Appointment APIs in PowerApps environment, according to the [the official guidelines and library](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/request.md#client-credentials-flow).

## Deploy the Getting started kit for Intelligent appointments to Azure Static Web Apps

For detailed instructions on how to configure your Intelligent appointments environment and deploy the Starter kit to Azure Static Web Apps, see the [full tutorial.](https://learn.microsoft.com/en-us/dynamics365/industry/financial-services/deploy-ia-gs-kit-azure)


## Resources

[Overview of Intelligent appointments](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/intelligent-appointments)  
[Getting started kit for Intelligent appointments](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/intelligent-appointments-gs-kit)     
[Configure and install the Getting Started kit for Intelligent appointments](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/configure-install-intelligent-appointments-gs-kit)      
[Server gateway customization](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/server-gateway-customization)     
[Using the Getting Started kit for Intelligent appointments](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/using-getting-started-kit-ia)
****
