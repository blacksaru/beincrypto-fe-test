import { Grid, Container, Flex, Input, Paper, Text, Button } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import CountdownTimer from '../components/Countdown/CountdownTimer';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { showNotification } from '@mantine/notifications';
import { useContract } from '../contexts/ContracContext';
import { useState, useEffect } from 'react';
import { getAccount } from '@wagmi/core';
import { InfoItem } from '../components/TokenInfo/InfoItem';

export default function HomePage() {
  const { symbol, currentStageMaxAmount } = useContract();
  const [purchased, setPurchased] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { address } = getAccount();

  const getPrice = async () => {
    setLoading(true);

    setLoading(false);
  };
  useEffect(() => {
    getPrice();
  }, [address]);

  const [amount, setAmount] = useState(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value as unknown as number);
  };

  const [inProgress, setInProgress] = useState(false);

  const handlePurchase = async () => {
    setInProgress(true);
    try {
      if (typeof amount === 'number' && amount > 0) {
        console.log(amount * 10 ** 18);

        showNotification({
          title: 'Success',
          message: `Submitted amount: ${amount}`,
          color: 'teal',
        });
      } else {
        showNotification({
          title: 'Error',
          message: 'Please enter a valid amount',
          color: 'red',
        });
      }
    } catch (error) {
      console.log(error);
      setInProgress(false);
    }

    setInProgress(false);
  };

  return (
    <>
      <ColorSchemeToggle />
      <Flex align="center" justify="center" my={20}>
        <ConnectButton />
      </Flex>
      <Container pt={40}>
        <Flex align="center" justify="center">
          <Flex align="center" gap={10} sx={{ flexDirection: 'column' }}>
            <Text size="md" weight={700}>
              TO NEXT SALES
            </Text>

            <CountdownTimer targetTime={new Date('2023-8-15').getTime()} />
          </Flex>
        </Flex>
        <Paper sx={{ maxWidth: 500 }} mx="auto" mt={40}>
          <InfoItem title="token price" value={price} loading={loading} token="MATIC" />
          <InfoItem title="purchased amount" value={purchased} loading={loading} token={symbol} />
          <InfoItem
            title="remaining amount"
            value={currentStageMaxAmount - purchased}
            loading={loading}
            token={symbol}
          />
          <Flex sx={{ width: '100%' }} gap={10}>
            <Input
              id="amount"
              placeholder="Enter amount"
              size="md"
              h={42}
              value={amount}
              max={currentStageMaxAmount - purchased}
              onChange={handleAmountChange}
              styles={(theme: any) => ({
                input: {
                  textAlign: 'right',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  fontWeight: 700,
                },
              })}
              sx={{
                textAlign: 'right',
                width: 'calc(100% - 200px)',
              }}
              type="number"
            />
            <Flex gap="sm" w={200}>
              <Button w="50%" onClick={() => setAmount((prev) => prev / 2)} h={42}>
                1/2
              </Button>
              <Button w="50%" onClick={() => setAmount((prev) => prev * 2)} h={42}>
                2x
              </Button>
            </Flex>
          </Flex>
          <Flex my={10} gap="sm">
            <Button w="20%" onClick={() => setAmount(1000)}>
              1000
            </Button>
            <Button w="20%" onClick={() => setAmount(2000)}>
              2000
            </Button>
            <Button w="20%" onClick={() => setAmount(5000)}>
              5000
            </Button>
            <Button w="20%" onClick={() => setAmount(10000)}>
              10K
            </Button>
            <Button w="20%" onClick={() => setAmount(50000)}>
              50K
            </Button>
            <Button w="20%" onClick={() => setAmount(currentStageMaxAmount - purchased)}>
              MAX
            </Button>
          </Flex>
          <Flex align="center" justify="center" direction="column">
            {amount > 0 && (
              <Text my="sm" weight={700} size="sm">
                You will pay {price * amount} MATIC
              </Text>
            )}
            <Button
              uppercase
              gradient={{ from: '#8d1de2', to: '#2f819e' }}
              variant="gradient"
              size="md"
              loading={inProgress}
              mt={20}
              sx={{
                width: 200,
              }}
              onClick={handlePurchase}
            >
              purchase
            </Button>
          </Flex>
        </Paper>
      </Container>
    </>
  );
}
