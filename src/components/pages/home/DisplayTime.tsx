import { Group, Text, Stack, Title } from '@mantine/core';
import { convertions } from '../../../data';

interface Props {
  value: number;
}

export const DisplayTime = ({ value }: Props) => {
  return (
    <>
      <Group>
        {convertions.map(({ id, unit, convert }) => (
          <Stack align='center' key={id}>
            <Title>
              {convert(value)} {id === 4 ? '' : ':'}
            </Title>
            <Text>{unit}</Text>
          </Stack>
        ))}
      </Group>
    </>
  );
};
