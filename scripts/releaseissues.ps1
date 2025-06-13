$uriBase = "https://github.albertsons.com/api/v3"
$baseHeader =  @{"Authorization" = "token  $token" ; "Content-Type" = "application/json" ; "Time-Zone" = "CST"} 
$Opening = "export const release = ["
$repoName = "esgh-central-workflow-aks","esgh-central-workflow-aut","esgh-central-workflow-pcf", "esgh-central-workflow-art", "esgh-central-workflow-vm", "esgh-central-workflow-azf", "esgh-central-workflow-gke", "esgh-central-workflow-power", "esgh-central-workflow-mq", "esgh-central-workflow-databricks", "esgh-central-workflow-aem", "esgh-central-workflow-gcp", "esgh-central-workflow-mobile", "esgh-central-workflow-GenAI", "esgh-central-workflow-infrastructure", "esgh-central-workflow-salesforce", "esgh-central-workflow-dbs"
$ReleaseNotesJson += $Opening
$ReleaseNotesJson += ' { workflow: [' 

function callGithubAPI {
    param (
        [Parameter(
            Position = 0,
            Mandatory = $true
        )]
        [string]
        $urlForGithubAPI
    )
    $runGetRepository = @{
        Uri     = $urlForGithubAPI
        Headers = $baseHeader        
    }
    Invoke-RestMethod @runGetRepository
}
foreach ($repo in $reponame){
    
    $scanningForIssues = ( '{0}/repos/albertsons/{1}/issues?per_page=100&state=closed&labels=portal,enhancement' -f $uriBase,$repo)
    $IssuesScanComp = callGithubAPI -urlForGithubAPI $scanningForIssues
    $totalIssCount = $IssuesScanComp.title.count
    if ($totalIssCount -gt 0){
        $nameValuePre = $repo -replace "esgh-central-workflow-", ""
        $nameValue = $nameValuePre
        $BranchContent += "{" 
        $BranchContent += ('"name": "{0}",' -f $nameValue)
        $BranchContent += '"content": ['
        foreach ($title in $IssuesScanComp.title){
            $BranchContent += "{"
            $BranchContent += ('"issue" : "{0}"' -f $title)
            $BranchContent += "},"
        }
        $BranchContent += "},"
    }
    

}
$BranchContent += "]}];"
$BranchContent > ./client-app/src/data/releaseupdate.js

