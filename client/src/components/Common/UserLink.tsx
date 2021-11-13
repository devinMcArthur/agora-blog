import { Link } from "@chakra-ui/layout";
import React from "react";

interface IUserLink {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
  };
}

const UserLink = ({ user }: IUserLink) => {
  return (
    <Link fontWeight="bold" href={`/u/${user._id}`}>
      {user.firstName}
    </Link>
  );
};

export default UserLink;
