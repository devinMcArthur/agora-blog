import { Types } from "mongoose";
import User from "../../../models/User";

const user = async ({
  id,
  username,
}: {
  id?: Types.ObjectId | string;
  username?: string;
}) => {
  if (id) {
    return User.getByID(id, { fromCache: true });
  } else if (username) {
    return User.getByUsername(username);
  } else {
    return null;
  }
};

export default {
  user,
};
