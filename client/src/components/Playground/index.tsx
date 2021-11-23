import React from "react";

import { Box, Heading } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button } from "@chakra-ui/button";

const Playground = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Box w="100%">
      <Heading>Playground</Heading>
      <Box display="flex" flexDir="row" justifyContent="space-around" w="100%">
        <Checkbox
          isChecked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          Checkbox
        </Checkbox>
        <Button onClick={() => setChecked(!checked)}>Toggle</Button>
      </Box>
    </Box>
  );
};

export default Playground;
