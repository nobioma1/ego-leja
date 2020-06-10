import React, { useEffect, useState, useContext } from 'react';
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
} from '@chakra-ui/core';
import { useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';

import { HomeContentLayout } from 'components/Layout';
import { useRequest } from 'hooks/useRequest';
import { Modal } from 'components/Modal';
import { UpdateNote } from 'components/Notes';
import { TransactionTable, OffsetForm } from 'components/Transactions';
import { numberFormat } from 'utils';
import { AppContext } from 'context/AppContext';

export const Note = () => {
  const { params } = useRouteMatch();
  const history = useHistory();
  const { toaster } = useContext(AppContext);
  const [record, setRecord] = useState(null);
  const updateDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const offsetDisclosure = useDisclosure();

  const { doRequest } = useRequest({
    method: 'get',
    url: `/api/transactions/${params.recId}`,
  });

  const { doRequest: doDeleteRequest, isLoading: deleteLoading } = useRequest({
    method: 'delete',
    url: `/api/records/${params.recId}`,
  });

  const getNote = () => {
    doRequest({
      onSuccess: (rec) => {
        setRecord(rec);
      },
    });
  };

  useEffect(() => {
    getNote();
  }, []);

  const onDeleteHandler = async () => {
    await doDeleteRequest({
      onSuccess: () => {
        toaster({
          title: 'Note Deleted',
          status: 'success',
        });
        deleteDisclosure.onClose();
        setTimeout(() => history.push('/home/notes'), 1500);
      },
    });
  };

  return (
    <HomeContentLayout title="Note">
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
                {moment(record.createdAt).format('DD-MMM-YYYY')} |{' '}
                {record.recordType}
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
              <TransactionTable transactions={record.transactions} />
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
              <Flex
                justifyContent={['space-between', 'space-between', 'flex-end']}
              >
                <Box mr={5}>
                  <Box h="35px" verticalAlign="middle">
                    <Text>Amount:</Text>
                  </Box>
                  <Box h="35px" verticalAlign="middle">
                    <Text>Deductions:</Text>
                  </Box>
                  <Box h="35px" mt={1}>
                    <Text verticalAlign="middle" fontWeight="bold">
                      Amount to Offset(NGN):
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box h="35px" verticalAlign="middle">
                    <Text fontSize="xl" textAlign="right">
                      {numberFormat({ amount: record.amount })}
                    </Text>
                  </Box>
                  <Box h="35px" verticalAlign="middle">
                    <Text fontSize="xl" textAlign="right">
                      {numberFormat({ amount: record.amount - record.payable })}
                    </Text>
                  </Box>
                  <Box h="35px" margin="auto auto" mt={1}>
                    <Text fontSize="xl" textAlign="right">
                      {numberFormat({ amount: record.payable })}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
            <Divider orientation={['horizontal', 'horizontal', 'vertical']} />
            <Stack mx={3} w={['full', 'full', '25%']}>
              <Box textAlign={['center', 'center', 'right']}>
                <Text opacity="0.7">Amount</Text>
                <Text fontSize="xl">
                  {numberFormat({ amount: record.amount, currency: 'NGN' })}
                </Text>
              </Box>
              <Box textAlign={['center', 'center', 'right']}>
                <Text opacity="0.7">Amount to Offset</Text>
                <Text fontSize="xl">
                  {numberFormat({ amount: record.payable, currency: 'NGN' })}
                </Text>
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
            <OffsetForm
              payable={record.payable}
              recordId={record.id}
              onClose={offsetDisclosure.onClose}
              onSuccess={getNote}
              currency="NGN"
            />
          </Modal>
          <Modal title="Delete Note" {...deleteDisclosure}>
            <Box fontSize="md" textAlign="center" mb={3}>
              <Text>Are you sure you want to delete note?</Text>
              <Text as="small">
                This actions will remove note and all transactions made.
              </Text>
            </Box>

            <Stack isInline>
              <Button size="lg" width="full" onClick={deleteDisclosure.onClose}>
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
          <UpdateNote
            record={record}
            onEditSuccess={setRecord}
            disclosure={updateDisclosure}
          />
        </>
      )}
    </HomeContentLayout>
  );
};
