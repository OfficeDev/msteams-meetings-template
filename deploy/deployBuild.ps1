$subscriptionId = "fc7ebf7d-b3ae-45c2-9c08-67d0ae8ce012"
$resourceGroupName = "nibeauli-teams-lms-test-1"
$storageAccountName = "nibeaulilmsstorage01"

# Connect-AzAccount

$context = Get-AzSubscription -SubscriptionId $subscriptionId
Set-AzContext $context

$storageAccount =  Get-AzStorageAccount -ResourceGroupName $resourceGroupName -AccountName $storageAccountName
$ctx = $storageAccount.Context

Enable-AzStorageStaticWebsite -Context $ctx -IndexDocument "index.html"

# Setting properties of all the files to text/html is a bad hack... need to do that right
Get-ChildItem -Path ../build -File -Recurse  | Set-AzStorageBlobContent `
-Properties @{ ContentType = "text/html; charset=utf-8" } ` 
-Container "`$web" `
-Context $ctx `
-Force
