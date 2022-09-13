# FSI - Getting Starter Kit for Intelligent Appointments

The Getting Started kit for Intelligent Appointments uses the [Intelligent Appointment APIs](https://docs.microsoft.com/en-us/dynamics365/industry/financial-services/intelligent-appointments-api-reference) to provide architectural guidance and a powerful appointment booking mechanism for the web applications. Intelligent Appointment APIs Offering helps to schedule, organize, and manage the scheduled appointments.

Getting started kit for Intelligent Appointments (Starter Kit) provides architectural guidance, services, patterns, and a collection of React components to enable front-end experience, and services which encapsulate our intelligent appointment APIs. It also provides a Demo React web app with built-in wizard experience and a sample serverless function, ready to connect to your intelligent appointment solution environment with the minimal configuration needed.

Its aim is to simplify the development process and allow Microsoft customers to extend their own intelligent appointment scheduling solution.

## Prerequisites

1. Node.js version from 14.x or 16.x (recommended).
2. Yarn for workspace package management.

### If you want to experiment our stater kit in a web app demo using Azure Web Services

1. Active Azure Web Services subscriptions
2. VS Studio Code and [Azure Function Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
3. [Azure Functions Core Tools 4.x](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools)

## File structures

The package divides into two main directories:

1. `/appointment-starter-kit` - contains the code of the Intelligent Appointments Starter Kit, which will give you the wizard component for the UI experience, the services to communicate with your environment.
2. `/demo-web-app` - contains examples of demo web app with the starter kit embedded, and a sample Azure function to demonstrate as the web app gateway.
   * `/src` - this directory contains the demo web app code with the starter kit embedded.
   * `/api` - contains the sample code for Azure Serverless Function, acting as the app gateway to establish the secured connection to your Intelligent Appointment Environment.

## Getting started

1. In the root directory, run the following command:

```bash
yarn
```

2. Once finished, navigate to `/appointment-starter-kit`, run the command below:

```bash
yarn build
```

**Note** that every time you change the code within `/appointment-starter-kit`, you need to run the above command again to make sure the project is built and updated.

3. Now you can navigate to `demo-web-app/api` to build/debug the serverless function, or to `demo-web-app` to configure and start the local dev environment for the demo app, or build and deploy it per need.

## Resources

//TODO

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.opensource.microsoft.com>.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
