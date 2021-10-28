import { IContext } from "@typescript/graphql";
import { AuthChecker } from "type-graphql";

const authChecker: AuthChecker<IContext> = ({ context }, roles) => {
  return new Promise(async (resolve) => {
    if (roles.length === 0) resolve(context.user !== null);

    if (!context.user) resolve(false);

    if (roles.includes("VERIFIED") && !context.user?.verified) resolve(false);

    resolve(true);
  });
};

export default authChecker;
