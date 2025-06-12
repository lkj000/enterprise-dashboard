export const ArtifactPolicy = [
    {
        "define": [
            { "title" : "To keep the operational efficiency, hygiene and performance efficiency of our Developer community, we follow enterprise standards so that every development team gets the best experience of the platform. The Enterprise Artifactory has the following life cycle policy implemented for your kind awareness."},
            { "title" : "The current Enterprise Artifactory Lifecycle Policy is set to run every weekend. This automated policy deletes all old and unused Artifacts that either exceed a 60 days time period without being used or fail any other operational checks that we have in place. This best practice allows better operational efficiency and performance efficiency which is highly recommended as a best practice."},
            { "title" : "The current active policy is as follows:" }
        ],
        "policy": [
            {
                "name" : "The two latest Artifacts in any given folder will not be deleted",
                "content" : [
                    { "title" : "The latest Artifact is determined by the time it was uploaded to the Artifactory."}
                ]
            },
            {
                "name" : "Any Artifact that has not been used for the past 60 days will be deleted",
                "content" : [
                    { "title" : "If you are using a very old Artifact that is older than 60 days but was recently downloaded for a build, automated policy will not be deleting that Artifact."},
                    { "title" : "If you have a new Artifact that was uploaded 61 days ago but has never been downloaded, the automated policy will be deleting this Artifact." }
                ]
            }
        ]
    }
]