import { Button } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { TbClock, TbCalendar } from 'react-icons/tb';
import * as yup from 'yup';
import { watcherStore } from '../../../store';

export const AlarmForm = () => {
  const {
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
  const onReset = () => {
    setAlarmTime(0);
    setAlarmInterval(Date.now());
    setIsAlarmActive(false);
  };

  return (
    <form
      autoComplete='off'
      onSubmit={form.onSubmit(({ time }) => {
        setAlarmTime(time.getTime());
        setIsAlarmActive(true);
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
      <Button
        mt={20}
        ml={10}
        type='button'
        disabled={!isAlarmActive}
        onClick={onReset}
      >
        Stop waiting
      </Button>
    </form>
  );
};
