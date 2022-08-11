const _ = require('lodash')
const Jira = require('./common/net/Jira')

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const { argv } = this
    const type = {};
    const issueId = argv.issue
    const issueTypeName = argv.issueTypeName
    const issueTypeId = argv.issueTypeId
    
    if (issueTypeName) {
      type['name'] = issueTypeName
    } else if (issueTypeId) {
      type['id'] = issueTypeId
    } 
    
    await this.Jira.updateIssueType(issueId, type)

    console.log(`Changed ${issueId} issue type to : ${JSON.stringify(type)} .`)
    console.log(`Link to issue: ${this.config.baseUrl}/browse/${issueId}`)

    return {}
  }
}
