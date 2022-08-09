import { API_BACKEND } from "../../environments/values";

interface IRegisterUser {
  email: string;
}

export const registerUser = async ({ email }: IRegisterUser) => {
  const user = await fetch(`${API_BACKEND}/register`, { 
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      "email": email
    })
  }).then(async response => {
    const data = await response.json();
    return data.user;
  }).catch(err => console.log(err));

  if (!user) {
    return null;
  }

  return user;
}