import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Heading,
  Box,
  Divider,
  Button,
  useDisclosure,
  Stack,
  ButtonGroup,
  useToast,
} from '@chakra-ui/core';
import { useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';

import symbols from 'utils/symbols';
import { HomeContentLayout } from 'components/Layout';
import { useRequest } from 'hooks/useRequest';
import { TRANSACTION_TYPE } from 'components/Transactions/transaction.types';
import { OffsetForm } from 'components/Transactions/OffsetForm';
import { Modal } from 'components/Modal';
import { TransactionTable } from 'components/Transactions/TransactionTable';
import { UpdateTransaction } from 'components/Transactions/UpdateTransaction';

export const Transaction = () => {
  const { params } = useRouteMatch();
  const history = useHistory();
  const toast = useToast();
  const [record, setRecord] = useState(null);
  const updateDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const offsetDisclosure = useDisclosure();

  const { doRequest } = useRequest({
    method: 'get',
    url: `/api/records/${params.recId}`,
  });

  const { doRequest: doDeleteRequest, isLoading: deleteLoading } = useRequest({
    method: 'delete',
    url: `/api/records/${params.recId}`,
  });

  useEffect(() => {
    doRequest({
      onSuccess: (rec) => {
        setRecord(rec);
      },
    });
  }, []);

  const onDeleteHandler = async () => {
    await doDeleteRequest({
      onSuccess: () => {
        toast({
          title: 'Transaction Deleted',
          status: 'success',
          duration: 1500,
          position: 'top-right',
        });
        deleteDisclosure.onClose();
        setTimeout(() => history.push('/home/transactions'), 1500);
      },
    });
  };

  return (
    <HomeContentLayout title="Transaction">
      {record && (
        <>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={['column', 'column', 'row']}
          >
            <Box mb={2}>
              <Heading w="full">{record.name}</Heading>
              <Text textAlign={['center', 'center', 'initial']}>
                {moment(record.createdAt).format('DD-MMM-YYYY')}
              </Text>
            </Box>
            <ButtonGroup>
              <Button
                size="sm"
                variant="outline"
                leftIcon="edit"
                variantColor="green"
                onClick={updateDisclosure.onOpen}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="solid"
                leftIcon="delete"
                variantColor="red"
                onClick={deleteDisclosure.onOpen}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Flex>
          <Flex
            flexDirection={['column', 'column', 'row']}
            py={3}
            justifyContent="space-between"
          >
            <Box w={['full', 'full', '70%']}>
              <TransactionTable />
              {record.recordType === TRANSACTION_TYPE.BORROW && (
                <Flex w="full" justifyContent="center" py={3}>
                  <Button
                    size="lg"
                    w="70%"
                    variant="outline"
                    leftIcon="add"
                    variantColor="green"
                    onClick={offsetDisclosure.onOpen}
                  >
                    Offset Amount
                  </Button>
                </Flex>
              )}
              <Flex
                justifyContent={['space-between', 'space-between', 'flex-end']}
              >
                <Box mr={5}>
                  <Box h="35px" verticalAlign="middle">
                    <Text>Transaction Amount:</Text>
                  </Box>
                  <Box h="35px" verticalAlign="middle">
                    <Text>Deductions:</Text>
                  </Box>
                  <Box h="35px" mt={1}>
                    <Text verticalAlign="middle" fontWeight="bold">
                      Amount Due(NGN):
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box h="35px" verticalAlign="middle">
                    <Text fontSize="xl">{record.amount}</Text>
                  </Box>
                  <Box h="35px" verticalAlign="middle">
                    <Text fontSize="xl">122,434</Text>
                  </Box>
                  <Box h="35px" margin="auto auto" mt={1}>
                    <Text fontSize="xl">123,354</Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
            <Divider orientation={['horizontal', 'horizontal', 'vertical']} />
            <Stack mx={3} w={['full', 'full', '25%']}>
              <Box textAlign={['center', 'center', 'right']}>
                <Text opacity="0.7">Transaction Amount</Text>
                <Text fontSize="xl">
                  {symbols['NGN']} {record.amount}
                </Text>
              </Box>
              <Box textAlign={['center', 'center', 'right']}>
                <Text opacity="0.7">Amount Due</Text>
                <Text fontSize="xl">{symbols['NGN']} 20,000</Text>
                <Text>{moment(record.dueDate).format('DD MMM, YYYY')}</Text>
              </Box>
              <Divider />
              <Box textAlign={['center', 'center', 'right']}>
                <Text opacity="0.7">Description</Text>
                <Text wordBreak="break-word">
                  {record.description
                    ? record.description
                    : 'No description added...'}
                </Text>
              </Box>
            </Stack>
          </Flex>
          <Modal title={record.name} {...offsetDisclosure}>
            {record.recordType === TRANSACTION_TYPE.BORROW && (
              <OffsetForm amount={record.amount} currency="NGN" />
            )}
          </Modal>
          <Modal title="Delete Transaction" {...deleteDisclosure}>
            <Box fontSize="md" textAlign="center" mb={3}>
              Are you sure you want to delete transaction?
            </Box>
            <Stack isInline>
              <Button size="lg" width="full">
                Cancel
              </Button>
              <Button
                variantColor="red"
                variant="outline"
                size="lg"
                width="full"
                loadingText="Deleting..."
                isLoading={deleteLoading}
                onClick={onDeleteHandler}
              >
                Delete
              </Button>
            </Stack>
          </Modal>
          <UpdateTransaction
            record={record}
            onEditSuccess={setRecord}
            disclosure={updateDisclosure}
          />
        </>
      )}
    </HomeContentLayout>
  );
};
