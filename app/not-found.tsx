export default function NotFound() {
  return (
    <div className="mx-auto flex h-full flex-1 w-full max-w-7xl flex-col items-center overflow-hidden border-x border-zinc-200 bg-zinc-100">
      <div className="relative flex h-full min-h-[calc(100vh-73px)] w-full flex-1 items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 m-auto flex h-fit w-fit select-none flex-col text-center text-[min(38vw,520px)] font-semibold text-zinc-200/60">
          <p className="leading-[0.8]">404</p>
        </div>
        <p className="absolute inset-0 z-20 m-auto h-fit w-fit text-xl font-medium tracking-wide text-zinc-800 whitespace-pre-wrap leading-[1.75]">
          {`
        "I look for it in the deepest ocean
         I looked for it in the core of the earth
         I looked for it ends of the world
         But I never seem to find it"

         Mereia Namatua`}
        </p>
      </div>
    </div>
  );
}
