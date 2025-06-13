export const commands = [
  { command: '@comment', action: 'comment', description: 'Comment on Jira ticket. Format: [ticket-id][space][comment-text].' },
  { command: '@jira-help', action: 'jira-help', description: 'Get information about a Jira ticket. Please mention jira ticket number in your query.' },
  // Add more commands as needed
];

export const promptPresets = [
  { preset: '/summarize', action: 'summarize', isFileRequired: true, description: 'Summarize the content of the attached document.' },
  { preset: '/extract-features', action: 'extract_feature_epic', isFileRequired: true, description: 'Extract features from the attached document.' }
]