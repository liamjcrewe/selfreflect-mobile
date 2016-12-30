//Simply: *@*.*
const simpleEmailRegex = /^(.+)@(.+)\.(.+)$/

export default email => {
  return simpleEmailRegex.test(email)
}
