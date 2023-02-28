import { Container, Flex, Title, Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  TbPlayerPlay,
  TbPlayerPause,
  TbPlayerStop,
  TbPlayerSkipForward,
  TbShieldCheck,
} from 'react-icons/tb';
import { useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { DisplayTime } from '../components/pages/home/DisplayTime';
import { AlarmForm } from '../components/pages/home';
import { watcherStore } from '../store';
import '../styles/border-rainbow.css';

const HomePage = () => {
  const {
    time,
    isActive,
    isAlarmActive,
    willAlarmMatch,
    setWillAlarmMatch,
    setTime,
    setInitialTime,
    setIsActive,
  } = watcherStore((state) => state);

  const { width, height } = useWindowSize();

  const ref = useRef(0);

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
    let { current } = ref;
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
    let { current } = ref;
    if (willAlarmMatch) {
      showNotification({
        disallowClose: true,
        autoClose: 5000,
        title: `The alarm is throwing confetti?`,
        message: 'How Hilarious',
        icon: <TbShieldCheck />,
        color: 'teal',
        loading: false,
      });
      current = setInterval(() => {
        setWillAlarmMatch(false);
      }, 4000);
    } else {
      clearInterval(current);
    }
    return () => clearInterval(current);
  }, [willAlarmMatch]);

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
      {willAlarmMatch && <Confetti width={width} height={height} />}

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
