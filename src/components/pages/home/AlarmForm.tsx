import { Button } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { TbClock, TbCalendar } from 'react-icons/tb';
import * as yup from 'yup';
import { watcherStore } from '../../../store';
import { useEffect, useRef } from 'react';

export const AlarmForm = () => {
  const {
    alarmTime,
    alarmInterval,
    isActive,
    isAlarmActive,
    setAlarmTime,
    setAlarmInterval,
    setIsAlarmActive,
  } = watcherStore((state) => state);
  const schema = yup.object().shape({
    time: yup.date().required(),
  });
  const form = useForm({
    initialValues: {
      time: new Date(),
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });
  const ref = useRef({
    interval: 0,
    currentTime: 0,
  });

  useEffect(() => {
    let { interval } = ref.current;
    if (isAlarmActive) {
      interval = setInterval(() => {
        setAlarmInterval(new Date().getMilliseconds());
        if (alarmTime % alarmInterval <= 50000) {
          console.log('match');
        }
      }, 500);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isAlarmActive]);

  return (
    <form
      autoComplete='off'
      onSubmit={form.onSubmit(({ time }) => {
        setIsAlarmActive(true);
        setAlarmTime(time.getTime());
        showNotification({
          disallowClose: true,
          autoClose: 5000,
          title: `The alarm was setup`,
          message: 'Wait and see what happens',
          icon: <TbCalendar />,
          color: 'teal',
          loading: false,
        });
      })}
    >
      <TimeInput
        label='Set your own alarm'
        withAsterisk
        withSeconds
        format='12'
        amLabel='am'
        pmLabel='pm'
        hoursLabel='Hours'
        minutesLabel='Minutes'
        secondsLabel='Seconds'
        clearable
        icon={<TbClock size={16} />}
        sx={{
          width: '300px',
        }}
        {...form.getInputProps('time')}
      />
      <Button mt={20} type='submit' disabled={isAlarmActive || isActive}>
        Set Alarm
      </Button>
    </form>
  );
};
