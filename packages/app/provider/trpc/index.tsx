/* provider for expo, tRPC */
// import { TRPCProvider as Provider } from '../../utils/trpc'

// export function TRPCProvider({ children }: { children: React.ReactNode }) {
//   return <Provider>{children}</Provider>
// }

// not using this for now
export const TRPCProvider = ({
  children,
}: {
  children: React.ReactElement
}) => <>{children}</>
