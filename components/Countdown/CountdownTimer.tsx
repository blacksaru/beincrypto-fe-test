import { useEffect, useState } from 'react';
import { Paper, Text } from '@mantine/core';
import { useContract } from '../../contexts/ContracContext';
import { ethers } from 'ethers';
import { RPC_URL } from '../../config';

interface CountdownTimerProps {
  targetTime: number;
}

const formatTimeSegment = (segment: number): string => {
  return segment < 10 ? `0${segment}` : `${segment}`;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const { currentStageStartTimeStamp, stageBlocksDuration } = useContract();
  const stageBlocksDurationDouble = stageBlocksDuration * 2;
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const getBlockInfo = async () => {
    // get remaining time
    const blockNum = await provider.getBlockNumber();
    const blockInfo = await provider.getBlock(blockNum);
    if (blockInfo) {
      const remain = currentStageStartTimeStamp + stageBlocksDurationDouble - blockInfo.timestamp;
      setRemainingTime(remain * 1000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getBlockInfo();
    }, 2000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const hours = Math.floor(remainingTime / 3600000);
  const minutes = Math.floor((remainingTime % 3600000) / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  return (
    <Paper>
      <Text
        align="center"
        sx={{
          fontSize: 60,
          fontWeight: 700,
          fontFamily: 'Inter',
          lineHeight: 1,
        }}
      >
        {hours >= 0 ? formatTimeSegment(hours) : '--'}
        <Text component="span" size="md">
          H
        </Text>
        {minutes >= 0 ? formatTimeSegment(minutes) : '--'}
        <Text component="span" size="md">
          M
        </Text>
        {seconds >= 0 ? formatTimeSegment(seconds) : '--'}
        <Text component="span" size="md">
          S
        </Text>
      </Text>
    </Paper>
  );
};

export default CountdownTimer;
