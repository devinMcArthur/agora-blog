import { Express } from "express";
import request from "supertest";

const jestLogin = (
  app: Express,
  email: string,
  password: string = "password"
) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const loginMutation = `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password)
        }
      `;

      const res = await request(app).post("/graphql").send({
        query: loginMutation,
        variables: {
          email,
          password,
        },
      });

      if (!res.body.data || !res.body.data.login)
        throw new Error(`Unable to login: ${JSON.stringify(res.body)}`);

      resolve(res.body.data.login);
    } catch (e) {
      reject(e);
    }
  });
};

export default jestLogin;
