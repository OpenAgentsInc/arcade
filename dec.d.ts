declare module "*.svg" {
  export const content: string
  const Component: React.FC<{
    style?: any
    height?: number
    width?: number
  }>
  export default Component
}
