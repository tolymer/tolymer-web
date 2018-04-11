import { parse } from "cookie";

export default context => {
  const isServer = process.server;
  const { cookie } = isServer ? context.req.headers : document;

  context.cookie = parse(cookie || "");
};
