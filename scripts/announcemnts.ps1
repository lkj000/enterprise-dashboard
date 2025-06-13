$uriBase = "https://github.albertsons.com/api/v3"
$baseHeader =  @{"Authorization" = "token  $token" ; "Content-Type" = "application/json" ; "Time-Zone" = "CST"} 
$Opening = "export const announcement = ["
$Closing = "]"
$Comma = ","
$i = 1
$repoName = "esgh-platform-dashboard"
$AnnouncmentsContent += $Opening
$AnnouncmentsContent += ' { workflow: [' 

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
    $AnnouncmentsContent += "{"
    $scanningForIssues = ( '{0}/repos/albertsons/{1}/issues?per_page=100&labels=portal' -f $uriBase,$repo)
    $IssuesScanComp = callGithubAPI -urlForGithubAPI $scanningForIssues
    
    foreach($issue in $issuesScanComp){
        if($issue.labels.name -like "Updates"){
            $title = $issue.title 
            $AnnouncmentsContent += ('"issue" : "{0}"' -f $title)
        }        
    }
    
    
    $whichBranch = $whichBranch.split(" ") | Sort-Object -Descending
    
    
    foreach($branch in $whichBranch){
        $repo
        $branch
        $IssueBasedONLabels = ( '{0}/repos/albertsons/{1}/issues?per_page=100&state=closed&labels=portal,{2}' -f $uriBase,$repo,$branch)
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
$ReleaseNotesJson > ./client-app/src/data/announcements.js

