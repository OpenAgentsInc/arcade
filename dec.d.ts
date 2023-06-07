declare module "*.svg" {
  export const content: string
  const Component: React.FC<{
    activeColor?: string
    className?: string
    height?: number
    width?: number
  }>
  export default Component
}
