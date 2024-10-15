import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from '@chakra-ui/react'

const CreatePage = () => {
  // Using useState to manage form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  const toast = useToast()
  const {createProduct} = useProductStore();

  const handleAddProduct = async () => {
    const {success,message} = await createProduct(newProduct)
    if(success){
      toast({
        title: 'Product created.',
          description: message,
          status: 'success',
          duration: 5000,
          isClosable: true,
      })
    }
    else{
      toast({
        title: 'Failed to create Product.',
          description:message,
          status: 'error',
          duration: 5000,
          isClosable: true,
      })
    }
    setNewProduct({name:'',price:'',image:''});
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={4}>
        <Heading as={"h1"} fontSize={"25px"} textAlign={"center"} mt={'15px'}>
          Add New Product👜
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Enter Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Enter Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Enter Image Link"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme={"blue"} onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
