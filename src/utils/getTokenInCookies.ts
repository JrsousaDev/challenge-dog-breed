import { parseCookies } from "nookies";

export function getTokenInCookies () {
  const { "challengeDogBreed.token": token } = parseCookies();
  return token;
}