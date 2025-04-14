import { ThemeProvider } from "./ui/theme-provider";



export default function Layout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
}