import Header from '@/components/Header';
import Placeholder from '@/components/Placeholder';

function App() {
  return (
    <main className="h-screen flex flex-col font-[roboto] font-bold bg-light-bg dark:bg-main-obsidian text-white">
      <Header />
      <section className="flex flex-row flex-1 w-full overflow-hidden justify-center items-center">
        <Placeholder />
      </section>
    </main>
  )
}

export default App
