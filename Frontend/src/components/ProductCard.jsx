import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  Input,
  Button
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useProductStore } from "../store/product";

export const ProductCard = ({ product }) => {
  const { name, image, price, _id } = product;
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { DeleteProduct, UpdateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Manage the updateProduct state
  const [updateProduct, setUpdateProduct] = useState({
    name: name,
    price: price,
    image: image
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await DeleteProduct(pid);
    if (success) {
      toast({
        title: 'Product deleted.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Failed to delete product.',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await UpdateProduct(_id, updateProduct);
    if (success) {
      toast({
        title: 'Product updated.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();  // Close modal after updating
    } else {
      toast({
        title: 'Failed to update product.',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image  src={image} alt={name} h={48} w={'full'} objectFit="cover"/>
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} mb={4} color={textColor}>
          Rs.{price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<FaRegEdit />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<RiDeleteBinLine />}
            onClick={() => handleDeleteProduct(_id)}
          />
        </HStack>
      </Box>

      {/* Modal for updating product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Enter Product Name"
                name="name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Enter Product Price"
                name="price"
                type="number"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Enter Image Link"
                name="image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, image: e.target.value })
                }
              />
              <Button colorScheme={"blue"} onClick={handleUpdateProduct} w="full">
                Update
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
