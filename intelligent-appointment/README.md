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

**Note**: Every time you change the code within `/appointment-starter-kit`, you must run the `yarn build` command to make sure the project is built and updated..

3. Navigate to `demo-web-app` to configure and start the local dev environment for the demo app, or build and deploy it based on your requirement.

   Run either of the following commands:

   ```bash
   yarn dev

   #OR, to start the local dev environment with an Azure web function
   yarn swa start

   ```

## Resources

[Overview of Intelligent appointments](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/intelligent-appointments)  
[Getting started kit for Intelligent appointments](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/intelligent-appointments-gs-kit)     
[Configure and install the Getting Started kit for Intelligent appointments](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/configure-install-intelligent-appointments-gs-kit)      
[Server gateway customization](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/server-gateway-customization)     
[Using the Getting Started kit for Intelligent appointments](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/using-getting-started-kit-ia)
