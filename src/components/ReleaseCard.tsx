import Release from '@/types/release'
import { Card, Avatar, Text, Badge, Group, Anchor, Stack, Title, Code } from '@mantine/core'

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

        <Title order={1}>{release.name}</Title>

        <Anchor href={release.html_url}>
          <Code>ID: {release.id}</Code>
        </Anchor>
      </Stack>
    </Card>
  )
}
export default ReleaseCard
