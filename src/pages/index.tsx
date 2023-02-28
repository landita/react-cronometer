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
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const HomePage = () => {
  const {
    time,
    alarmTime,
    alarmInterval,
    isActive,
    isAlarmActive,
    setTime,
    setInitialTime,
    setIsActive,
    setAlarmTime,
    setAlarmInterval,
    setIsAlarmActive,
  } = watcherStore((state) => state);

  const { width, height } = useWindowSize();

  const ref = useRef({
    timer1: 0,
    timer2: 0,
    willAlarmMatch: false,
  });

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
    let { timer1 } = ref.current;
    if (isActive) {
      timer1 = setInterval(() => {
        setTime(10);
      }, 10);
    } else {
      clearInterval(timer1);
    }
    return () => clearInterval(timer1);
  }, [isActive]);

  useEffect(() => {
    let { timer2 } = ref.current;
    if (isAlarmActive) {
      timer2 = setInterval(() => {
        setAlarmInterval(10);
      }, 5);
      if (alarmTime - alarmInterval <= 10000) {
        clearInterval(timer2);
        ref.current.willAlarmMatch = true;
        setAlarmTime(0);
        setAlarmInterval(Date.now());
        timer2 = setInterval(() => {
          setIsAlarmActive(false);
        }, 2000);
        ref.current.willAlarmMatch = false;

        clearInterval(timer2);
      }
    } else {
      clearInterval(timer2);
    }
    return () => clearInterval(timer2);
  }, [isAlarmActive, alarmInterval, alarmTime]);

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
      {ref.current.willAlarmMatch && (
        <Confetti width={width} height={height} tweenDuration={2000} />
      )}
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
            <Button
              rightIcon={<TbPlayerPlay />}
              onClick={onStart}
              disabled={isAlarmActive}
            >
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
