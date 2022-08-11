# Jira Issue Type Updater
Update Jira issue type

> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

![Issue Transition](../assets/example.gif?raw=true)

Example transition action:

```yaml
- name: Update issue type
  id: update
  uses: shamrat17/jira-issue-type-updater@master
  with:
    issue: GA-181
    issueTypeName: "Bug"
}
```

The `issue` parameter can be an issue id created or retrieved by an upstream action – for example, [`Create`](https://github.com/marketplace/actions/jira-create) or [`Find Issue Key`](https://github.com/marketplace/actions/jira-find). Here is full example workflow:

```yaml
on:
  push

name: Test Update Issue Type

jobs:
  test-update-issue-type:
    name: Update Issue Type
    runs-on: ubuntu-latest
    steps:
    - name: Login
      uses: atlassian/gajira-login@master
      env:
        JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
        JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
        JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}
        
    - name: Create new issue
      id: create
      uses: atlassian/gajira-create@master

    - name: Update issue type
      id: update
      uses: shamrat17/jira-issue-type-updater@master
      with:
        issue: GA-181
        issueTypeName: "Bug"
```
----
## Action Spec:

### Environment variables
- None

### Inputs
- `issue` (required) - issue key to perform a transition on
- `issueTypeName` - Case insensetive name of issue type to apply. Example: `Story` or `Bug`
- `issueTypeId` - issue type id to update issue type. (only required if no issueTypeName provided)

### Outputs
- None

### Reads fields from config file at $HOME/jira/config.yml
- `issue`
- `issueTypeName`
- `issueTypeId`

### Writes fields to config file at $HOME/jira/config.yml
- None