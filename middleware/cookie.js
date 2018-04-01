import { parse } from 'cookie'

export default (context) => {
  const { cookie } = process.server ? context.req.headers: document

  context.cookie = parse(cookie || '')
}
