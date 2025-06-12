export const ACRPolicyData = [
    {
        "policy": [
            {
                "name" : "Scope",
                "content" : [
                    { "title" : "Retain the images which are running in the application pod in the AKS non-prod clusters."},
                    { "title" : "Retain the images which are running in the application pod in the AKS prod clusters."},
                    { "title" : "Retain last 10 images in appcode/service for non-prod env."},
                    { "title" : "Retain last 15 images in appcode/service prod env."},
                    { "title" : "Exclude 2 Images upon request from App teams, which is required for their AKS deployment approved by the leader."},
                    { "title" : "All platform images will be excluded from this purge policy, ex: ubuntu, python etc."},
                ]
            },
            {
                "name" : "Schedule",
                "content" : [
                    { "title" : "Purge maintenance job runs twice a week on non-prod env."},
                    { "title" : "Create a CR for running the Production Maintenance Purge job." },
                    { "title" : "Purge maintenance job runs on prod env for every month once." },
                    { "title" : "Purge maintenance Job will be run per cluster." },
                ]
            },
            {
                "name" : "How to communicate on Purge Policy",
                "content" : [
                    { "title" : "For non-prod, initial communication will be sent to Apps teams before 2 weeks on the regular schedule."},
                    { "title" : "For prod, CR communication will be sent to Application teams and Teams channel for the prod clusters will be available during the purge." },
                ]
            }
        ]
    }
]