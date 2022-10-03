import { Link } from 'react-router-dom'
import { Title, Group, Anchor } from '@mantine/core'

const PageNotFound = () => {
  return (
    <>
      <Title order={1} align="center">
        Page Not Found
      </Title>
      <Group position="center" mt="md">
        <Anchor component={Link} to="/" weight={700} underline={false}>
          Back to My List
        </Anchor>
      </Group>
    </>
  )
}

export default PageNotFound
