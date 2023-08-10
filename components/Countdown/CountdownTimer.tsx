import React, { useState, useEffect } from 'react';
import { Paper, Text } from '@mantine/core';

interface CountdownTimerProps {
  targetTime: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  // const [remainingTime, setRemainingTime] = useState<number>(targetTime - Date.now());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemainingTime(targetTime - Date.now());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [targetTime]);

  // const hours = Math.floor(remainingTime / 3600000);
  // const minutes = Math.floor((remainingTime % 3600000) / 60000);
  // const seconds = Math.floor((remainingTime % 60000) / 1000);

  // const formatTimeSegment = (segment: number): string => {
  //   return segment < 10 ? `0${segment}` : `${segment}`;
  // };

  return (
    <Paper padding="xl" shadow="xs">
      <Text
        align="center"
        sx={{
          color: '#fff',
          fontSize: 80,
          fontWeight: 700,
          fontFamily: 'Inter',
          lineHeight: 1,
        }}
      >
        {/* {formatTimeSegment(hours)} */}
        776
        <Text component="span" size="md">
          H
        </Text>
        {/* {formatTimeSegment(minutes)} */}
        15
        <Text component="span" size="md">
          M
        </Text>
        {/* {formatTimeSegment(seconds)} */}
        15
        <Text component="span" size="md">
          S
        </Text>
      </Text>
    </Paper>
  );
};

export default CountdownTimer;
