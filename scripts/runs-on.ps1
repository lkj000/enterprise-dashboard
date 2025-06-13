$uriBase = "https://github.albertsons.com/api/v3"
$baseHeader =  @{"Authorization" = "token  $token" ; "Content-Type" = "application/json" ; "Time-Zone" = "CST" ; "Accept" =  "application/vnd.github+json"} 
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

$AllSearch = ( "{0}/search/code?q=runs-on" -f $uriBase )
$ContentsAllSearch = callGithubAPI -urlForGithubAPI $AllSearch
function appendExcelByCoord {
    param (
        [Parameter(
            Position = 0,
            Mandatory = $true
        )]
        [string]
        $verticalCoordinates,

        [Parameter(
            Position = 1,
            Mandatory = $true
        )]
        $horizontalCoordinates,

        [Parameter(
            Position = 2,
            Mandatory = $true
        )]
        $outputAtCoordinates
    )
    $Coord = "$verticalCoordinates$horizontalCoordinates : $verticalCoordinates$horizontalCoordinates"
    $Coord = $Coord -replace " ", ""
    $Excel | Set-CellValue -Coordinates $Coord -Value $OutputAtCoordinates
}
$count = 1
$totalCount = $ContentsAllSearch.total_count
$numIntiative = [math]::ceiling($totalCount/100)
$l = "desc"
# $centralexception = "esgh-central-workflow-aks esgh-central-workflow-pcf esgh-central-workflow-art esgh-central-workflow-vm esgh-central-workflow-azf esgh-central-workflow-gke esgh-central-workflow-power esgh-central-workflow-mq esgh-central-workflow-databricks esgh-central-workflow-aem"
for ($i = 0; $i -le 2; i++){
    for ($m = 0; $m -le $numIntiative; $m++){
        $m
        $AllSearch = ( "{0}/search/code?q=runs-on&per_page=100&page={1}&sort=indexed&order={2}" -f $uriBase, $m, $l)
        $ContentsAllSearch = callGithubAPI -urlForGithubAPI $AllSearch
        
        foreach($item in $ContentsAllSearch.items){
            $RepositoryName = $item.repository.name
            
            if((-not ($RepositoryName -like "esgh-*")) -and (-not ($RepositoryName -like "platform-*"))  -and (-not ($RepositoryName -like "esia*"))){
                if(-not ($Result -like "*$RepositoryName*")){
                    $RepositoryName
                    $FinalResult += $RepositoryName + " | "
                    $RepositoryName
                    $AllWorkflows = ( "{0}/repos/albertsons/{1}/actions/workflows?per_page=100" -f $uriBase,$RepositoryName )
                    $AllWorkflows = $AllWorkflows -replace "`n","" -replace "`r","" -replace " ", ""
                    $ContentsAllWorkflows = callGithubAPI -urlForGithubAPI $AllWorkflows
                    :RunnerLabels foreach ($WorkflowsPath in $ContentsAllWorkflows.workflows.path){
                        $uriWorkflowFile = ( "{0}/repos/albertsons/{1}/contents/{2}" -f $uriBase, $RepositoryName,$workflowsPath)
                        $uriWorkflowFile = $uriWorkflowFile -replace "`n","" -replace "`r","" -replace " ", ""
                        $workflowFileContent = callGithubAPI -urlForGithubAPI $uriWorkflowFile
                        $workflowResults = Invoke-WebRequest $workflowFileContent.download_url
                        $workflowResults.Content > workflow.yaml
                        $checkRunsON = Get-Content .\workflow.yaml | Out-String -Stream | Select-String -Pattern "runs-on:"
                        
                        if ($checkRunsON -like "*runs-on:*"){
                            $runnerlabelexcerpt = $checkRunsON -replace "runs-on:", "" -replace "- runs-on:", "" -replace " ", ""
                            if ($runnerlabelexcerpt -ne ""){
                                $finallabelformat += $runnerlabelexcerpt + " in "+ $WorkflowsPath + " | "
                                $finallabelformat
                            } else {
                                if (-not ($finallabelformat -like "*list*")){
                                    $finallabelformat += "list"  + " | "
                                } 
                                $finallabelformat
                            }
                            
                        }
                    }
                    $finallabelformat = $EmptyStringValue
                    $count += 1 
                }
                $Result += $RepositoryName + " | "
            }
        }
    }
    $l = "asc"
}
$Excel | Save-Excel

$FinalResult