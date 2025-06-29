$uriBase = "https://github.albertsons.com/api/v3"
$baseHeader =  @{"Authorization" = "token $token" ; "Content-Type" = "application/json" ; "Time-Zone" = "CST"} 
$Opening = "export const roadmap = ["
$Closing = "]"
$Comma = ","
$i = 1
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
    $ReleaseNotesJson += "{"
    $ReleaseNotesJson += ( '"value": "{0}",' -f $i )
    
    $scanningForIssues = ( '{0}/repos/albertsons/{1}/issues?per_page=100&state=open&labels=portal' -f $uriBase,$repo)
    $IssuesScanComp = callGithubAPI -urlForGithubAPI $scanningForIssues
    if( $IssuesScanComp.labels.name -like "portal" ){
        if($issuesScanComp.labels.name -like "v*"){
            foreach ($IssuesLabels in $IssuesScanComp.labels.name){
                if( $IssuesLabels -like "v*"){
                    if(-not ($checkBranchDuplicate -like "*$IssuesLabels*")){
                        $count += 1 
                        if($count -gt 1){
                            $whichBranch += " "
                        }
                        $whichBranch += $IssuesLabels 
                    }
                
                    $checkBranchDuplicate += " " + $IssuesLabels
                }
            }
        }
    }
    
    $whichBranch = $whichBranch.split(" ") | Sort-Object -Descending
    
    $repo
    foreach($branch in $whichBranch){

        $branch
        $IssueBasedONLabels = ( '{0}/repos/albertsons/{1}/issues?per_page=100&state=open&labels=portal,{2}' -f $uriBase,$repo,$branch)
        $IssueLabelComp = callGithubAPI -urlForGithubAPI $IssueBasedONLabels
        $IssueLabelComp.title.count
        $IssueLabelComp.title
        $BranchContent += "{" 
        $BranchContent += ('"title": "{0}",' -f $branch)
        $BranchContent += '"content": ['
        foreach ($title in $IssueLabelComp.title){
            $BranchContent += "{"
            $BranchContent += ('"issue" : "{0}"' -f $title)
            $BranchContent += "},"
        }
        $BranchContent += $Closing
        $BranchContent += "}," 
        
    }
    $ReleaseNotesJson += ( '"count": {0},' -f $count )
    $ReleaseNotesJson += '"repo": ['
    $ReleaseNotesJson += $BranchContent
    $ReleaseNotesJson += $Closing
    $ReleaseNotesJson += "}"
    if($i -lt 10){
        $ReleaseNotesJson += $Comma
    }
    $BranchContent = ""
    $count = 0 
    $checkBranchDuplicate = ""
    $whichBranch = ""
    $i = $i + 1
}
$ReleaseNotesJson += "]}];"
$ReleaseNotesJson > ./client-app/src/data/roadmap.js

