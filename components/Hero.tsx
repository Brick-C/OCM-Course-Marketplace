export default function Hero() {
  return (
    <div className="relative h-[49vh] w-full bg-[url('https://plus.unsplash.com/premium_vector-1733670882384-dfc169f9fc0d?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/55 dark:from-white/15 dark:to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />

      {/* Content container */}
      <div className="relative container my-6 mx-auto px-5 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Responsive heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Expand Your Knowledge with Our Courses
          </h1>
          {/* Responsive paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Discover a world of learning with our expertly crafted courses.
            Learn from industry professionals and take your skills to the next
            level.
          </p>
        </div>
      </div>
    </div>
  );
}
