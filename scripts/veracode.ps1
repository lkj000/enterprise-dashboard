$content = get-content "./general.json" | ConvertFrom-Json
$ErrorActionPreference = "SilentlyContinue"
$Opening = "export const VeracodeData = ["
$Closing = "]"
$Comma = ","
$i = 0
$uriBase = "https://github.albertsons.com/api/v3"
$baseHeader =  @{"Authorization" = "token $token" ; "Content-Type" = "application/json" ; "Time-Zone" = "CST"} 
$VeracodeJson += $Opening
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
Foreach($ObjectGroup in $content){ 
    $repoName = $ObjectGroup.RepositoryName
    $GetDeploymentStrategy = $ObjectGroup.DeploymentStrategy
    $GetStatus = $ObjectGroup.PathToProductionStatus
    $VeracodeHashTablContents = @{}
    if($repoName -ne "" -and (($GetDeploymentStrategy -eq "AKS") -or ($GetDeploymentStrategy -eq "Azure Function") -or $GetDeploymentStrategy -eq "Artifactory" -or $GetDeploymentStrategy -eq "Azure" -or $GetDeploymentStrategy -eq "Ansible Tower" -or $GetDeploymentStrategy -eq "GKE" -or $GetDeploymentStrategy -eq "GKE" -or $GetDeploymentStrategy -eq "IIB" -or $GetDeploymentStrategy -eq "PCF" -or $GetDeploymentStrategy -eq "VM" -or $GetDeploymentStrategy -eq "Azure Web App Service")){ 
        $AllWorkflows = ( "{0}/repos/{1}/actions/workflows" -f $uriBase,$repoName )
        $AllWorkflows = $AllWorkflows -replace "`n","" -replace "`r","" -replace " ", ""
        $ContentsAllWorkflows = callGithubAPI -urlForGithubAPI $AllWorkflows
        $scanningForVeracode = ( "{0}/search/code?q=nigthly_veracode_scan.yml+repo:{1}" -f $uriBase,$repoName)
        $scanningForVeracode = $scanningForVeracode -replace "`n","" -replace "`r","" -replace " ", ""
        $VeracodeScanComp = callGithubAPI -urlForGithubAPI $scanningForVeracode
        $veracodeScanComp
        $veracodeWorkflowName = $veracodeScanComp.items.name[0]
        $veracodeWorkflowNameString = $veracodeWorkflowName | Out-String
        $veracodeWorkflowNameString = $veracodeWorkflowNameString -replace "`n","" -replace "`r","" -replace " ", ""
        $GetStatus = $GetStatus -replace "\n", ""
        $GetDeploymentStrategy = $GetDeploymentStrategy -replace "\n", "" -replace "\n4", ""
        $VeracodeHashTablContents['RepositoryName'] = $repoName
        $VeracodeHashTablContents['id'] = $i
        $VeracodeHashTablContents['PathToProductionStatus'] = $GetStatus
        $VeracodeHashTablContents['DeploymentStrategy'] = $GetDeploymentStrategy
        if ($VeracodeScanComp.total_count -gt 0) {
            write-host TRUE
            
            
            $VeracodeHashTablContents['VeracodePresent'] = "True"
            $veracodeWorkflowLastRun = ( "{0}/repos/{1}/actions/workflows/{2}/runs?per_page=1" -f $uriBase,$repoName,$veracodeWorkflowName )
            $veracodeLastRun = callGithubAPI -urlForGithubAPI $veracodeWorkflowLastRun
            $veracodeRunDate = $veracodeLastRun.workflow_runs.run_started_at.GetDateTimeFormats()[12]
            $veracodeConclusion = $veracodelastRun.workflow_runs.conclusion
            $veracodeRunDate
            $veracodeConclusion
            $VeracodeHashTablContents['VeracodeLastRunDate'] = $veracodeRunDate
            $VeracodeHashTablContents['VeracodeConclusion'] = $veracodeConclusion
           
    
        }
        $VeracodeScanComp = $veracodeWorkflowName = $veracodeWorkflowLastRun = $veracodeLastRun = $veracodeRunDate = $veracodeConclusion = $EmptyStringValue

        :VeracodeAppName foreach ($WorkflowsPath in $ContentsAllWorkflows.workflows.path){
            $uriWorkflowFile = ( "{0}/repos/{1}/contents/{2}" -f $uriBase, $repoName,$workflowsPath)
            $uriWorkflowFile = $uriWorkflowFile -replace "`n","" -replace "`r","" -replace " ", ""
            $workflowFileContent = callGithubAPI -urlForGithubAPI $uriWorkflowFile
            $workflowResults = Invoke-WebRequest $workflowFileContent.download_url
            $workflowResults.Content > workflow.yaml 
            $CheckWorkflowVeracodePresent = Get-Content .\workflow.yaml | Out-String -Stream | Select-String -Pattern "uses:"
            if($CheckWorkflowVeracodePresent -like "*nigthly_veracode_scan.yml*"){
                $WorkflowVeracodeAppNameExcept = Get-Content .\workflow.yaml | Out-String -Stream | Select-String -Pattern "VERACODE_APPNAME:"
                $WorkflowVeracodeAppNameExcept = $WorkflowVeracodeAppNameExcept -replace "VERACODE_APPNAME:", "" -replace " ", ""
                $VeracodeHashTablContents['VeracodeAppName'] = $WorkflowVeracodeAppNameExcept
                $CheckWorkflowVeracodePresent = $NullResponse
                $workflowFileContent = $workflowResults = $EmptyStringValue
                Break VeracodeAppName
            }
            
        }
        if($i -ne "0"){
            $VeracodeJson += $Comma 
        }

        $VeracodeJson += $VeracodeHashTablContents | ConvertTo-Json 
        $i++
        write-host $i
    }
    $VeracodeJson > veracode.js
}
$VeracodeJson += $Closing 

