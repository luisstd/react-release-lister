import {
  ActionIcon,
  Anchor,
  Group,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

function HeaderBar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  return (
    <Group position='apart'>
      <Anchor href='/' variant='text'>
        <Title
          order={1}
          p='xs'
          sx={{
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              cursor: 'pointer',
              borderRadius: '6px',
            },
          }}
        >
          React Releases
        </Title>
      </Anchor>

      <Group position='center' my='xl' p='xs'>
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size='lg'
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
          })}
        >
          {colorScheme === 'dark' ? <IconSun size={24} /> : <IconMoonStars size={24} />}
        </ActionIcon>
      </Group>
    </Group>
  )
}

export default HeaderBar
