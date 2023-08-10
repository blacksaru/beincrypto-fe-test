import { Box, Container, Flex, Grid, Header, Paper, Text } from '@mantine/core';
import CountdownTimer from '../components/Countdown/CountDownTimer';

export default function HomePage() {
  return (
    <>
      <Container pt={100}>
        <Flex align={'center'} justify={'center'}>
          <Flex align={'center'} gap={10} sx={{ flexDirection: 'column' }}>
            <Text sx={{ fontWeight: 'semibold', fontFamily: 'Inter', color: '#fff' }} size="md">
              TO NEXT SALES
            </Text>
            <CountdownTimer targetTime={new Date('2023-9-10').getTime()} />
          </Flex>
        </Flex>
        <Paper sx={{ maxWidth: 600 }} mx="auto" mt={40}>
          <Flex mb={10}>
            <Text
              w={300}
              sx={{
                fontSize: 24,
                textTransform: 'uppercase',
                fontWeight: 700,
                fontFamily: 'Inter',
              }}
            >
              Token Price:
            </Text>
            <Text
              w={300}
              sx={{
                fontSize: 24,
                textAlign: 'right',
                textTransform: 'uppercase',
                fontWeight: 700,
                fontFamily: 'Inter',
              }}
            >
              0.04 MATIC
            </Text>
          </Flex>
          <Flex mb={10}>
            <Text
              w={300}
              sx={{
                fontSize: 24,
                textTransform: 'uppercase',
                fontWeight: 700,
                fontFamily: 'Inter',
              }}
            >
              Purchased amount:
            </Text>
            <Text
              w={300}
              sx={{
                fontSize: 24,
                textAlign: 'right',
                textTransform: 'uppercase',
                fontWeight: 700,
                fontFamily: 'Inter',
              }}
            >
              0.04 MATIC
            </Text>
          </Flex>
          <Flex mb={10}>
            <Text
              w={300}
              sx={{
                fontSize: 24,
                textTransform: 'uppercase',
                fontWeight: 700,
                fontFamily: 'Inter',
              }}
            >
              Token Price:
            </Text>
            <Text
              w={300}
              sx={{
                fontSize: 24,
                textAlign: 'right',
                textTransform: 'uppercase',
                fontWeight: 700,
                fontFamily: 'Inter',
              }}
            >
              0.04 MATIC
            </Text>
          </Flex>
        </Paper>
      </Container>
    </>
  );
}
