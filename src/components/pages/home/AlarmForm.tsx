import { Button, Loader } from '@mantine/core';
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
    setWillAlarmMatch,
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
  const ref = useRef(0);

  useEffect(() => {
    let { current } = ref;
    if (isAlarmActive) {
      current = setInterval(() => {
        setAlarmInterval(new Date().getMilliseconds());
        if (alarmTime % alarmInterval <= 10000) {
          clearInterval(current);
          setAlarmInterval(new Date().getMilliseconds());
          form.setFieldValue('time', new Date());
          setWillAlarmMatch(true);
          setIsAlarmActive(false);
        }
      }, 500);
    }
    return () => {
      clearInterval(current);
    };
  }, [isAlarmActive, alarmTime, alarmInterval]);

  return (
    <>
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
        <Button
          rightIcon={<TbClock />}
          mt={20}
          type='submit'
          disabled={isAlarmActive || isActive}
        >
          Set Alarm
        </Button>
      </form>
      {isAlarmActive && <Loader />}
    </>
  );
};
