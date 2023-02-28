import { Container, Flex, Title, Button, Group } from '@mantine/core';
import {
  TbPlayerPlay,
  TbPlayerPause,
  TbPlayerStop,
  TbPlayerSkipForward,
} from 'react-icons/tb';
import { useEffect, useRef } from 'react';
import { DisplayTime } from '../components/pages/home/DisplayTime';
import { AlarmForm } from '../components/pages/home';
import { watcherStore } from '../store';
import '../styles/border-rainbow.css';

const HomePage = () => {
  const {
    time,
    alarmTime,
    alarmInterval,
    isActive,
    setAlarmInterval,
    setTime,
    setInitialTime,
    setIsActive,
  } = watcherStore((state) => state);
  const watcherRef = useRef(0);
  const alarmRef = useRef(0);

  const onStart = () => {
    setIsActive(true);
  };
  const onStop = () => {
    setIsActive(false);
  };
  const onReset = () => {
    setIsActive(false);
    setInitialTime(0);
  };

  useEffect(() => {
    let { current } = watcherRef;
    if (isActive) {
      current = setInterval(() => {
        setTime(10);
      }, 10);
    } else {
      clearInterval(current);
    }
    return () => clearInterval(current);
  }, [isActive]);

  useEffect(() => {
    let { current } = alarmRef;
    current = setInterval(() => {
      setAlarmInterval(10);
    }, 10);
    if (alarmTime === alarmInterval) {
      console.log('they match', alarmInterval, alarmTime);
    }
    return () => clearInterval(current);
  }, [alarmTime]);

  return (
    <Container
      fluid
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex
        direction='column'
        justify='center'
        align='center'
        className='gradient-border'
        p={{ xs: 30, sm: 100 }}
      >
        <Title mb={10}>React Stopwatch</Title>
        <DisplayTime value={time} />
        <Group mt={30} mb={30}>
          {!isActive && time === 0 && (
            <Button rightIcon={<TbPlayerPlay />} onClick={onStart}>
              Start
            </Button>
          )}
          {!isActive && time !== 0 && (
            <Button rightIcon={<TbPlayerPause />} onClick={onStart}>
              Resume
            </Button>
          )}
          {isActive && (
            <Button rightIcon={<TbPlayerStop />} onClick={onStop}>
              Stop
            </Button>
          )}
          {time !== 0 && (
            <Button rightIcon={<TbPlayerSkipForward />} onClick={onReset}>
              Reset
            </Button>
          )}
        </Group>
        <AlarmForm />
      </Flex>
    </Container>
  );
};
export default HomePage;
