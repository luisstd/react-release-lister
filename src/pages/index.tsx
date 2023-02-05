import Head from 'next/head'
import useSWRInfinite from 'swr/infinite'

import { useRef, useState } from 'react'

import {
  Button,
  Center,
  Code,
  Container,
  Group,
  Input,
  Kbd,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useDebouncedValue, useHotkeys } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'

import Release from '@/types/release'
import ReleaseCard from '@/components/ReleaseCard'
import HeaderBar from '@/components/HeaderBar'

import DotLoader from 'react-spinners/DotLoader'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Main() {
  const theme = useMantineTheme()

  const [parent] = useAutoAnimate()

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const PAGE_SIZE = 15

  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebouncedValue(search, 300)

  const searchBarRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useHotkeys([['mod+K', () => searchBarRef.current?.focus()]])

  // fetches paginated results from github API & allows filtering for author name, release name/date and exact release id
  const { data, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite(
    (index) => `/api/releases?per_page=${PAGE_SIZE}&page=${index + 1}&search=${debouncedSearch}`,
    fetcher,
    { initialSize: 1, persistSize: true }
  )

  const releases = data ? [].concat(...data) : []
  const isEmpty = data?.[0]?.length === 0
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  return (
    <>
      <Head>
        <title>React Release Lister</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container p='md' size='sm' style={{ width: '85%' }}>
        <HeaderBar />
        <Stack align='stretch' justify='center' ref={parent}>
          <Input
            ref={searchBarRef}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            icon={<IconSearch size='16' />}
            placeholder='Search'
            size='md'
            radius='md'
            rightSectionWidth={90}
            rightSection={<Kbd>⌘ + K</Kbd>}
            onChange={handleChange}
          />

          {isLoading ? (
            <Center style={{ width: '100%', height: '80vh' }}>
              <DotLoader color={theme.colors.blue[6]} />
              <Code mx='xl'>
                <Text px={'sm'} size='xl'>
                  Loading...
                </Text>
              </Code>
            </Center>
          ) : (
            releases.map((release: Release) => (
              <div key={release.id}>
                <ReleaseCard release={release} />
              </div>
            ))
          )}

          {error ? (
            <Center style={{ width: '100%', height: '80vh' }}>
              <Code>
                <Text px='sm' size='xl'>
                  Failed to load users
                </Text>
              </Code>
            </Center>
          ) : !data ? (
            <Center style={{ width: '100%', height: '80vh' }}>
              <Code px='sm'>
                <Text size='xl'>No data</Text>
              </Code>
            </Center>
          ) : null}

          <Group position='center' align='center'>
            <Text>
              showing {size} page(s) of {isLoadingMore ? '...' : releases.length} releases
            </Text>
            <Group>
              <Button disabled={isLoadingMore || isReachingEnd} onClick={() => setSize(size + 1)}>
                {isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more issues' : 'Load more'}
              </Button>
              <Button disabled={isRefreshing} onClick={() => mutate()}>
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button disabled={!size} onClick={() => setSize(0)} variant='light'>
                Clear
              </Button>
            </Group>

            {isEmpty ? <Text>No releases found</Text> : null}
          </Group>
        </Stack>
      </Container>
    </>
  )
}
