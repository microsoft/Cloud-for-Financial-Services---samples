# How to deploy Intelligent Appointments on Microsoft Azure Static Web Apps

## Table of Content

1. [Introduction](#introduction)
2. [Deployment](#deployment)
3. [Create App Registration](#create-app-registration)
4. [Create Service to Service Authentication with Dataverse environment](#create-service-to-service-authentication-with-dataverse-environment)
5. [Create Azure Resource Group](#create-azure-resource-group)
6. [Install Deployment pre-requisites](#install-deployment-pre-requisites)
7. [Deploy Getting Started kit for Intelligent appointments](#deploy-getting-started-kit-for-intelligent-appointments)

## Introduction

This document will guide you to deploy the Getting Started kit to an Azure Static Web App. The Getting started kit for Intelligent appointments (Starter kit) provides architectural guidance, services, patterns, and a collection of React components to enable the front-end experience. In addition, the kit provides services that encapsulate the Intelligent Appointments APIs. It also provides a demo react web app with built-in wizard experience and a sample serverless function that is ready to connect to your Intelligent appointments environment with minimal configuration. The kit helps to simplify the development process and allows Microsoft customers to extend their own Intelligent Appointments solution.

**Getting Started kit Architecture Diagram:** <br><br>
![](./media/swa-deploymentdiagram-IntelligentAppointment-whitebg.png) <br><br>

Please visit the [Intelligent appointments API reference](https://learn.microsoft.com/en-us/dynamics365/industry/financial-services/intelligent-appointments-api-reference) documentation to learn more about the API set. <br><br>

## Deployment
### Create App Registration

To enable the Starter kit to authenticate to the Intelligent Appointment back-end service, you have to create an app registration first.
1. Go to [Azure Portal](https://portal.azure.com/).

2. Search for and select **App registrations** <br><br>
![](./media/image1.png)

3. Select **+ New registration** <br> <br>
![](./media/image2.png)

4. Enter a name for the app registration (for example: Getting started kit for Intelligent appointments) and then select **Register.** <br><br>
![](./media/image3.png)

5. Copy the **Application (client) ID** from the app registration Overview. Please note it as you will use it in a later step. <br><br>
![](./media/image4.png)

6. Select **Certificates & secrets** on the left hand side <br><br>
![](./media/image5.png)

7. Select **+New client secret** under **Client secrets**. <br><br>
![](./media/image6.png)

8. Enter a description (for example: intelligentAppointmentClientSec) and then select **Add** <br><br>
![](./media/image7.png)

9. You will see the generated Client secret value. Copy the value and note it as you will use it in a later step. 
> **Note** 
> You will not be able to view the client secret value later. If you missed to copy it and make a note you have to delete it and generate a new client secret.

![](./media/image8.png)

---

### Create Service to Service Authentication with Dataverse environment

In this section, you will add the recently created application user to our Microsoft Cloud for Financial Services environment and set up the necessary security role to ensure the Starter kit will be able to authenticate to it.

1. Open [Power Platform admin center](https://admin.powerplatform.com/) using In-private or Incognito mode.

2. Select **Environments** on the left side and then select your Microsoft Cloud for Financial Services environment.<br><br>
![](./media/image9.png)

3. You will land on your environments detail page. Select **Settings** on top command bar.<br><br>
![](./media/image10.png)

4. Expand **Users + Permissions** and then select **Application users** <br><br>
![](./media/image11.png)

5. Select **+New app user.** <br><br>
![](./media/image12.png)

6. Select **+Add an app** <br><br>
![](./media/image13.png)

7. Select the app user you created in the previous task and then select **Add**.<br><br>
![](./media/image14.png)

8. Select your **Business Unit** and then select the pencil icon near the **Security Roles** <br><br>
![](./media/image15.png) <br><br>

Scroll down to **Scheduling API user**, select it and then select **Save**

![](./media/image16.png)

---

### Create Azure Resource Group

After we have created the S2S Auth we can move on creating the needed Resource group to house your other Azure components. To learn more about Azure Resource groups, please reference this article on Microsoft Docs: [Manage Azure Resource Manager resource groups by using the Azure portal](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal).

1. Using an In-private or Incognito window, go to [Azure Portal](https://portal.azure.com/)

2. In the search box, **search** for and select **Resource groups** <br><br>
![](./media/image17.png)

3. Select **+ Create** to create a new Resource group <br><br>
![](./media/image18.png)

4. Name the new Resource group **fsiIntelligentAppointments**, choose the appropriate Region (same region as your Dataverse), select **Review + Create**, and then click **Create**. Copy the Resource Group name and note it as you will use in a later step.<br><br>
![](./media/image19.png)

![](./media/image20.png)

---

### Install deployment pre-requisites

Before we move on to the deployment we will have to check the prerequisites on your computer and install them if needed.

1. Open a Windows PowerShell in Administrator mode <br><br>
![](./media/image21.png)

2. Run `node --version` to check your Node.js version. It should be 16.x or higher. If you receive and error message or your version is lower than 16.x, please [download Node.js](https://nodejs.org/en/download/) and install it. <br><br>
![](./media/image22.png) 

3. Run `az --version` to check your Azure Command-Line Interface (CLI) version. It should be 2.40.0 or higher. If your version is lower or you get an error message please download [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) based on your Operating System and install it.<br><br>
![](./media/image23.png)
![](./media/image24.png)

5. Run `yarn --version` to check if yarn is installed for you.<br><br>
![](./media/image25.png)

If you get an error message or your version is lower than 1.22.x then run `npm install -g yarn` this will install yarn globally on your Operating System. <br><br>
![](./media/image26.png)

6. Run `npm install -g @azure/static-web-apps-cli` <br><br>
![](./media/image27.png)

7. Go to [Azure Portal](https://portal.azure.com/), search for and then select **Azure Active Directory** <br><br>
![](./media/image28.png) <br>

Copy and note the Tenant ID as we will use it in a later step.<br><br>
![](./media/image29.png)

8. Search for and select **Subscriptions** <br><br>
![](./media/image30.png)

Copy and note the **Subscription ID** as you will use it in a later step. <br><br>
![](./media/image31.png)

9. Using an In-private or Incognito window, navigate to [Power Platform Admin](https://aka.ms/ppac) portal, and select the **Environments** and select the one where Microsoft Cloud for Financial Services is deployed. Copy and note the **Environment URL** and your **Database version** (only the first 2, e.g.: 9.2) <br>

![](./media/image32.png)

### Deploy Getting Started kit for Intelligent appointments

Lastly, what remains is to build the Getting Started kit for Intelligent Appointments (Starter kit) on your computer first, and then you will create an Azure Static Web App and deploy the Starter kit. You will use Windows PowerShell to perform the build and deployment, but if you want to make any changes in the code you can do that by using an editor (e.g Visual Studio Code). For more information about the Getting Started kit for Intelligent appointment please visit the [documentation](https://learn.microsoft.com/en-us/dynamics365/industry/financial-services/intelligent-appointments-gs-kit?toc=%2Findustry%2Ffinancial-services%2Ftoc.json&bc=%2Findustry%2Fbreadcrumb%2Ftoc.json).

1. To download the Starter kit that you will build and deploy, go to [Cloud-for-Financial-Services\-\--samples](https://github.com/microsoft/Cloud-for-Financial-Services---samples), select **Code** and then select **Download ZIP.** Extract the ZIP file to a local folder.

> **Note** 
> Make sure to **not** use a synced OneDrive folder or other cloud storage service for the extracted files.

![](./media/image33.png)

2. Open a PowerShell and select the folder where you extracted the Sample kit (Cloud-for-Financial-Services\-\--samples).<br><br>
![](./media/image34.png)

3. Run `npm install react`, this will install all the needed packages for the build. <br><br>
![](./media/image36.png)

4. Navigate to the `appointment-started-kit` folder to build, and then run `yarn build` <br><br>
![](./media/image37.png)

5. Navigate to the `demo-web-app folder` and then build the SWA project using the following command:
`swa build --app-location . --output-location dist --api-location api --app-build-command "yarn build\" --api-build-command "npm run build --if-present"` <br><br>
![](./media/image38.png)

6. Now you will set up the variables for later steps. You will use the previously noted values. You can use a Notepad or any other text editor to prepare the variables, and then you can copy them all to your PowerShell. <br>

```powershell
$tenantId = '9ed59fd7-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
$subscriptionId = 'f986929c-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
$resourceGroup = 'fsiIntelligentAppointments'
$clientId = '989e78c0- xxxx-xxxx-xxxx-xxxxxxxxxxxx'
$clientSecret = 'kHe\~xxxxxxxxxxxxxxxxxxxxxxxxxx'
$env_url = 'https://orgxxxxxxxx.crm.dynamics.com/'
$region = 'westus2\' (Use your environment's region)
$appName = 'IntelligentAppointments-Starter-kit'
$env_version = 'v9.2' (Use your version you noted earlier)
```

Copy and paste your variables <br><br>
![](./media/image39.png)

7. Login to azure by using `az login` and select the right subscription by running the `az account set --subscription $subscriptionId`. A web browser will be opened for authentication. <br><br>
![](./media/image40.png)
![](./media/image41.png)

8. Create the Azure Static Web App `az staticwebapp create --name $appName --resource-group $resourceGroup --api-location api --output-location dist --location $region` <br><br>
![](./media/image42.png)

9. Login to the Azure Static Web App. A web browser will be opened for authentication. <br>
`swa login --subscription-id $subscriptionId --resource-group $resourceGroup --tenant-id $tenantId --clear-credentials` <br>
then get the Azure Static Web App deployment key: `$deploymentKey = az staticwebapp secrets list --name \$appName --query "properties.apiKey"` <br><br>
![](./media/image43.png)

10. Deploy the Azure Static Web App `swa deploy --deployment-token=$deploymentKey ./dist --api-location ./api --env production --app-name $appName --resource-group $resourceGroup` <br><br>
![](./media/image44.png)

After the deployment have been finished you should see a project deployed to **https://...azurestaticapps.net**.

11. Set the environment variables for the Azure Static Web Apps configuration, using the ones you already added to the script `az staticwebapp appsettings set --name $appName --setting-names CLIENT_ID=$clientId CLIENT_SECRET=$clientSecret ENVIRONMENT_URL=$env_url TENANT=$tenantId ENVIRONMENT_VERSION=$env_version` <br><br>
![](./media/image45.png)

12. Open [Azure Portal](https://portal.azure.com/) using an In-private or Incognito window. Select the Resource Group you created and you will see the newly created Static Web App you've just deployed. Select it to see the details. <br><br>
![](./media/image46.png)

13. Select **Configuration** to check if all variables are set correctly <br><br>
![](./media/image47.png)

14. Go back to the **Overview** and open you Azure Static Web App by selecting the **URL**. <br><br>
![](./media/image48.png)

15. Your Intelligent Appointment Self-Service experience should now be launched, and you should see all **Topics**. <br><br>
![](./media/image49.png)

**Congratulations!** You've created an Azure Static Web App and deployed
the Getting Started kit for Intelligent Appointments successfully!
