$ErrorActionPreference = "SilentlyContinue"
          $uriBase = "https://github.albertsons.com/api/v3"
          $baseHeader =  @{"Authorization" = "token $token" ; "Content-Type" = "application/json" ; "Time-Zone" = "CST" ; "Accept" =  "application/vnd.github+json"} 
          $Opening = "export const ComplianceRepo = ["
          $ComplianceJson += ' {' 
          $overall += $Opening

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
          $ComplianceJson += 'runson: ['
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
          # $count = 1
          $totalCount = $ContentsAllSearch.total_count
          $numIntiative = [math]::ceiling($totalCount/100)
          $l = "desc"
          for ($i = 0; $i -le 2; $i++){
              for ($m = 0; $m -le $numIntiative; $m++){
                  $m
                  $AllSearch = ( "{0}/search/code?q=runs-on&per_page=100&page={1}&sort=indexed&order={2}" -f $uriBase, $m, $l)
                  $ContentsAllSearch = callGithubAPI -urlForGithubAPI $AllSearch
                  
                  foreach($item in $ContentsAllSearch.items){
                    if($item.repository.full_name -like "*albertsons*"){
                      $RepositoryName = $item.repository.name
                    
                      if(-not ($RunsOnCheck -like "*$RepositoryName*")){
                          $RepositoryName
                          $AllWorkflows = ( "{0}/repos/albertsons/{1}/actions/workflows?per_page=100" -f $uriBase,$RepositoryName )
                          $AllWorkflows = $AllWorkflows -replace "`n","" -replace "`r","" -replace " ", ""
                          $ContentsAllWorkflows = callGithubAPI -urlForGithubAPI $AllWorkflows
                          # $totalWKCount = $ContentsAllWorkflows.total_count
                          # $numWKIntiative = [math]::ceiling($totalWKCount/100)
                          
                          :RunnerLabels foreach ($Workflows in $ContentsAllWorkflows.workflows){
                              $workflowsPath = $Workflows.path
                              $uriWorkflowFile = ( "{0}/repos/albertsons/{1}/contents/{2}" -f $uriBase, $RepositoryName,$workflowsPath)
                              $uriWorkflowFile = $uriWorkflowFile -replace "`n","" -replace "`r","" -replace " ", ""
                              $workflowFileContent = callGithubAPI -urlForGithubAPI $uriWorkflowFile
                              
                              $workflowResults = Invoke-WebRequest $workflowFileContent.download_url
                              $workflowResults.Content > workflow.yaml
                              $workflowpath = $workflows.path 
                              $workflowpath = $workflowpath -replace ".github/workflows/", ""
                              $checkRunsON = Get-Content .\workflow.yaml | Out-String -Stream | Select-String -Pattern "runs-on:"
                              $runnerlabelexcerpt = $checkRunsON -replace "runs-on:", "" -replace "- runs-on:", "" -replace " ", "" -replace "$", ""  -replace "`n","" -replace "`r",""
                            #   $runnerlabelexcerpt
                              
                              if ($runnerlabelexcerpt -eq '"${{github.event.inputs.Runner}}"'){
                                $runnerlabelexcerpt = "[{{github.event.inputs.Runner}}]"
                              }
                              if($runnerlabelexcerpt -ne ""){
                                  $finallabel += $runnerlabelexcerpt + " - "  
                                  $finalpaths += $workflowpath + " - "
                              }
                              rm workflow.yaml
                              $checkRunsON = ""
                          }
                          $finallabel = $finallabel | Out-String
                          $string1find = '$checkRunsON=Get-Content.\workflow.yaml|Out-String-Stream|Select-String-Pattern"" if(-not($checkRunsON-like"**")){ '
                          $string2find = '$checkRunsON=Get-Content.\workflow.yaml|Out-String-Stream|Select-String-Pattern""$runnerlabelexcerpt=$checkRunsON-replace"",""-replace"-",""-replace"",""-replace"$",""-replace"`n",""-replace"`r","" - [AKS] - [DB] - '
                         
                          $finallabel = $finallabel -replace "`n","" -replace "`r","" -replace [regex]::escape($string2find), '' -replace [regex]::escape($string1find), ''
                          
                        #   -replace "`"","" -replace "\$","" -replace "``","" -replace "checkRunsON`=Get-Content", "" -replace "", ""
                          $finalpaths
                          $finallabel
                          $RunsOnContent += "{"
                          $RunsOnContent += ('name: "{0}",' -f $RepositoryName)
                          $RunsOnContent += ('fileName: "{0}",' -f $finalpaths)
                          $RunsOnContent += ('label: "{0}",' -f $finallabel)
                          $RunsOnContent += ('url: "https://github.albertsons.com/albertsons/{0}"' -f $RepositoryName)
                          $RunsOnContent += "},"

                      }
                      $RunsOnCheck += $RepositoryName
                      $finallabel = ""
                      $finalpaths = ""
                  }
               }   
              }
              $l = "asc"
          }
          $ComplianceJson += $RunsOnContent

          $ComplianceJson += "],"

          $scanningForDockerApt = ( "{0}/search/code?q=apt-get+language:Dockerfile" -f $uriBase)
          $scanningForDockerApt = $scanningForDockerApt -replace "`n","" -replace "`r","" -replace " ", ""
          $dockerScanComp = callGithubAPI -urlForGithubAPI $scanningForDockerApt
          $ComplianceJson += 'docker: ['
          $DockerTotalCount = $dockerScanComp.total_count
          $DockerNumIntiative = [math]::ceiling($DockerTotalCount/100)
          $t = "desc"
          for ($r = 0; $r -le 2; $r++){
              for ($e= 0; $e -le $DockerNumIntiative; $e++){
                  $DockerAllSearch = ( "{0}/search/code?q=apt-get+language:Dockerfile&per_page=100&page={1}&sort=indexed&order={2}" -f $uriBase, $e, $t)
                  $DockerContentsSearch = callGithubAPI -urlForGithubAPI $DockerAllSearch
                  foreach($item in $DockerContentsSearch.items){
                      $DockerRepositoryName = $item.repository.name
                      $DockerFileName = $item.name
                    if(-not ($DockerOnCheck -like "*$DockerRepositoryName*")){
                      $DockerContent += "{"
                      $DockerContent += ('name: "{0}",' -f $DockerRepositoryName)
                      $DockerContent += ('fileName: "{0}",' -f $DockerFileName)
                      $DockerContent += ('url: "https://github.albertsons.com/albertsons/{0}"' -f $DockerRepositoryName)
                      $DockerContent += "},"
                    }
                      $DockerOnCheck += $DockerRepositoryName
                  }
              }
          }
          $ComplianceJson += $DockerContent

          $ComplianceJson += "]}];"

          $overall += $ComplianceJson

          $overall > ./client-app/src/data/complianceRepo.js