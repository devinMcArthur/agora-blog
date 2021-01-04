import * as React from "react";
import styled from "styled-components";
import {Container} from "@chakra-ui/react";

import { withProvider } from "../Providers";
import {Flex} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.hippo};
  font-family: "Source Serif Pro";
  color: ${(props) => props.theme.colors.fontDark};
  font-weight: bold;
  cursor: pointer;

  > .header-icon {
    margin-right: 10px;
  }

  > .region-badge {
    margin-left: 10px;

    &.ca {
      background-color: #d3200d;
    }

    &.us {
      background-color: #3c3b6e;
    }
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

interface NavItemProps {
  active: boolean;
}

const NavItem = styled.div<NavItemProps>`
  font-size: 14px;
  color: ${(props) => props.theme.colors.fontLight};
  font-weight: bold;
  cursor: pointer;
  margin-left: 30px;

  ${(props) =>
    props.active &&
    `
        color: ${props.theme.colors.fontDark};
        border-bottom: 2px solid ${props.theme.colors.fontDark};
    `}
`;

interface Props extends RouteComponentProps {}

class WebadminNavbar extends React.Component<Props> {
  render() {
    const { pathname } = this.props.history.location;

    return (
      <Container
        py="5"
        height="3em"
        shadow="bottomShadow"
        marginLeft="0"
        marginRight="0"
        marginBottom="1rem"
        maxWidth="none"
      >
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          width={1}
          alignItems="center"
        >
          <Flex flexDir="row" alignItems="center" fontSize="xl" color="fontDark" fontWeight="bold" cursor="pointer" onClick={() => this.props.history.push("/")}>agora</Flex>
          <Flex flexDir="row" justifyContent="flex-end">
            <Flex fontSize="l" color="fontLight" cursor="pointer" marginLeft="30px"
              onClick={() => this.props.history.push("/questions")}
              active={pathname === "/questions"}
            >
              Questions
            </Flex>
            {/* <NavItem
              data-testid="templates-button-nav"
              onClick={() =>
                this.props.history.push("/tiamat/template-careplans")
              }
              active={pathname === "/tiamat/template-careplans"}
            >
              Templates
            </NavItem> */}
          </Flex>
        </Flex>
      </Container>
    );
  }
}

export default withProvider(WebadminNavbar);
