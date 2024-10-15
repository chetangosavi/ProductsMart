import { Container, Flex, Text, HStack, Button,useColorMode,useColorModeValue } from "@chakra-ui/react";
import { LuPackagePlus } from "react-icons/lu";
import { GoMoon } from "react-icons/go";
import { MdOutlineWbSunny } from "react-icons/md";
import { Link } from "react-router-dom";

import React from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('white', 'gray.800')
  return (
    <Container maxW={"1440px"} px={"4"}>
      <Flex
        h={"16"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="extrabold"
          textTransform={"uppercase"}
          textAlign={"center"}
          color={""}
        >
          <Link to={"/"}>Products Mart💼</Link>
        </Text>

        <HStack spacing={"2"} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <LuPackagePlus fontSize={22} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <GoMoon />: <MdOutlineWbSunny />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
