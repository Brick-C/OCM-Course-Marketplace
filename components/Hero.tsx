import "./styles/hero.css";

export default function Hero() {
  return (
    <div
      className="hero-container"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_vector-1733670882384-dfc169f9fc0d?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="hero-overlay-top" />
      <div className="hero-overlay-bottom" />

      <div className="hero-content-wrapper">
        <div className="hero-text-container">
          <h1 className="hero-title">Expand Your Knowledge with Our Courses</h1>

          <p className="hero-description">
            Discover a world of learning with our expertly crafted courses.
            Learn from industry professionals and take your skills to the next
            level.
          </p>
        </div>
      </div>
    </div>
  );
}
