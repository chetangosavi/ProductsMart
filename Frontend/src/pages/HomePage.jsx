import { Container, VStack, Text, Button, SimpleGrid,useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { ProductCard } from "../components/ProductCard";


const homepage = () => {
  const { fetchProducts , products } = useProductStore();
  const textColor = useColorModeValue("gray.600", "gray.200");
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          bgClip="text"
          fontSize={{ base: "18", sm: "24" }}
          fontWeight="extrabold"
          textTransform={"uppercase"}
          textAlign={"center"}
          color={""}
        >
          <Link>Current Products</Link>
        </Text>

        {products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text bgClip="text" fontSize={"xl"} textAlign={"center"} color={textColor}>
            No Products Found 😪
            <Button mt={4}>
              <Link to="/create">Create Product</Link>
            </Button>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default homepage;
