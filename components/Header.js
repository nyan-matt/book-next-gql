import React from 'react'
import { useColorMode, Flex, Box } from 'theme-ui'
import Link from 'next/link'

const ColorButton = ({ mode, ...props }) => (
  <Box
    as="button"
    {...props}
    title="Invert colors"
    sx={{
      display: 'inline-block',
      appearance: 'none',
      bg: 'transparent',
      color: 'inherit',
      p: 1,
      m: 0,
      border: 0,
      borderRadius: 9999,
      lineHeight: 0,
      ':hover, :focus': {
        color: 'primary',
        boxShadow: '0',
        outline: 'none'
      }
    }}
  >
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentcolor">
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke="currentcolor"
        strokeWidth="4"
      />
      <path d="M 16 0 A 16 16 0 0 0 16 32 z" />
    </svg>
  </Box> 
)



export default (props) => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <header>
      <Flex>
        <Box p={2} sx={{ flex: '1 1 auto' }}>
          <Link href="/"><a>Books</a></Link>
        </Box>
        <Box p={2}>
          <ColorButton
            onClick={(e) => {
              setColorMode(colorMode === "default" ? "dark" : "default");
            }}/>
        </Box>
      </Flex>
    </header>
  )
}