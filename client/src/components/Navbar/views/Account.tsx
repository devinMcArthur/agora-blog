import React from "react";

import { Button } from "@chakra-ui/button";
import { FiUser } from "react-icons/fi";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useAuth } from "../../../contexts/Auth";
import { useHistory } from "react-router";
import Loading from "../../Common/Loading";

const NavbarAccount = () => {
  const {
    logout,
    openSignInModal,
    state: { user },
  } = useAuth();

  const history = useHistory();

  const content = React.useMemo(() => {
    if (user) {
      return (
        <Menu>
          <MenuButton
            backgroundColor="gray.700"
            fontWeight="bold"
            borderRadius="50%"
            width="40px"
            height="40px"
            color="white"
            _hover={{ backgroundColor: "gray.800" }}
          >
            {user.firstName.charAt(0)}
          </MenuButton>
          <MenuList>
            <MenuGroup>
              <MenuItem onClick={() => history.push(`/u/${user._id}`)}>
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      );
    } else if (user === null) {
      return (
        <Button
          fontWeight="bold"
          backgroundColor="transparent"
          border="1px solid black"
          size="sm"
          borderRadius={0}
          _hover={{ backgroundColor: "gray.400" }}
          leftIcon={<FiUser />}
          onClick={openSignInModal}
        >
          Sign In
        </Button>
      );
    } else {
      return <Loading />;
    }
  }, [history, logout, openSignInModal, user]);

  return content;
};

export default NavbarAccount;
