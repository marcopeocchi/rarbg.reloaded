export default function Logo() {
  const Title = ({ className }: { className?: string }) => (
    <div className={
      `${className} p-1 
      text-8xl font-extrabold text-transparent 
      bg-clip-text 
      bg-gradient-to-r 
      from-blue-600 to-sky-500
      select-none`
    }>
      RarBG.reloaded
    </div>
  )

  return (
    <div className="stack">
      <Title />
      <Title className="blur-xl" />
    </div >
  )
}