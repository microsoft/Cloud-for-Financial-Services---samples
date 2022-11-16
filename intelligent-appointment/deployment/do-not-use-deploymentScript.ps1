# Install Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli
#az --version >= 2.36+

# If you run it for first time make sure Static Web Apps CLI is installed (https://azure.github.io/static-web-apps-cli/)
npm install -g @azure/static-web-apps-cli

# Install app dependencies. Make sure to run the following commands based on your extracted files directory structure.
cd ~\Cloud-for-Financial-Services---samples\
npm install react

# Run the below commands based on your extracted files directory structure. 
cd ~\Cloud-for-Financial-Services---samples\intelligent-appointment\
cd appointment-starter-kit
yarn build

# Build SWA Project within the ~\Cloud-for-Financial-Services---samples\intelligent-appointment\demo-web-app\
cd..
cd demo-web-app
swa build --app-location . --output-location dist --api-location api --app-build-command "yarn build" --api-build-command "npm run build --if-present"

# Prompting user for the configuration parameters
$tenantId = Read-Host -Prompt 'Enter your Azure Active Directory tenant ID'
$subscriptionId = Read-Host -Prompt 'Enter your Azure subscription ID'
$resourceGroup = Read-Host -Prompt 'Enter your resource group name'
$clientId = Read-Host -Prompt 'Enter your App client id' # This is the application client id from the app registration
$clientSecret = Read-Host -Prompt 'Enter your client secret value' # This is the application client secret from the app registration 
$env_url = Read-Host -Prompt 'Enter your environment URL'
$region = Read-Host -Prompt 'Enter your prefered region location (e.g centralus, eastus2, eastasia, westeurope. westus2)'
$appName = Read-Host -Prompt 'Enter your Static WebApp application name'
$env_version = Read-Host -Prompt 'Enter your environment version'

# Azure Login
az login

# Change the active subscription using the subscription ID
az account set --subscription $subscriptionId

# Create Azure Static Web App (SWA)
# May need to set new app --name and --resource-group
az staticwebapp create --name $appName --resource-group $resourceGroup --api-location api --output-location dist --location $region

# Azure SWA Login
# May need to set new --subscription-id and --resource-group and --tenant-id
swa login --subscription-id $subscriptionId --resource-group $resourceGroup --tenant-id $tenantId --clear-credentials

# Get Deployment Token
# May need to set new app --name
$deploymentKey = az staticwebapp secrets list --name $appName --query "properties.apiKey"

# Deploy Azure Static Web App
# May need to set new app --name and --resource-group
swa deploy --deployment-token=$deploymentKey ./dist --api-location ./api --env production --app-name $appName --resource-group $resourceGroup

# Set Environment Variables
# May need to set new app --name and ENVIRONMENT_URL
# Set CLIENT_ID, CLIENT_SECRET, TENANT with the values from the previoulsly created Azure AD App Registration and the Environment Version
az staticwebapp appsettings set --name $appName --setting-names CLIENT_ID=$clientId CLIENT_SECRET=$clientSecret ENVIRONMENT_URL=$env_url TENANT=$tenantId ENVIRONMENT_VERSION=$env_version
