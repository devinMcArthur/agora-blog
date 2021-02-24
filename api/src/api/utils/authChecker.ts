import { AuthChecker } from "type-graphql";
import AuthContext from "../../typescript/interface/authContext";

const authChecker: AuthChecker<AuthContext> = (
  { context: { user } },
  roles
) => {
  if (roles.length === 0) {
    // if '@Authorized()', check only if user exists
    return user !== undefined;
  }

  if (!user) {
    // if no user, restrict access
    return false;
  }

  if (roles.includes("USER_VERIFIED") && user.verified) {
    return true;
  }

  return false;
};

export default authChecker;
