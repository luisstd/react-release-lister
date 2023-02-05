import Release from '@/types/release'
import {
  Card,
  Avatar,
  Text,
  Badge,
  Group,
  Anchor,
  Stack,
  Title,
  Code,
  ActionIcon,
  Button,
} from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'

type ReleaseCardProps = {
  release: Release
}

function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <Card withBorder radius='md' shadow='xs'>
      <Stack spacing='lg'>
        <Group position='apart' align='center'>
          <Badge size='lg'>{release.tag_name}</Badge>

          <Group position='center'>
            <Avatar src={release.author.avatar_url} radius='xl' />
            <Anchor href={release.author.html_url}>
              <Text weight='bold'>{release.author.login}</Text>
            </Anchor>
          </Group>
        </Group>

        <Title mb='md' order={1}>
          {release.name}
        </Title>
      </Stack>

      <Stack mt='md'>
        <Anchor href={release.html_url}>
          <Code mt='xl'>ID: {release.id}</Code>
        </Anchor>
      </Stack>

      <Button
        mt='md'
        component='a'
        href={release.zipball_url}
        variant='subtle'
        leftIcon={<IconDownload size={14} />}
      >
        <Code>ZIP</Code>
      </Button>
    </Card>
  )
}
export default ReleaseCard
