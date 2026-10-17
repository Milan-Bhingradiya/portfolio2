/**
 * Aceternity-style animated line background.
 * Thin horizontal SVG waves that slowly drift via stroke-dashoffset.
 * Monochrome and subtle — zinc-200 on light, zinc-800 on dark.
 */
export default function BackgroundLines() {
  const lines = Array.from({ length: 10 }, (_, i) => i);

  const pathFor = (i: number) => {
    const y = 40 + i * 92;
    const wobble = (i % 3) * 14;
    return (
      `M -40 ${y} ` +
      `C 300 ${y - 34 + wobble}, 620 ${y + 30 - wobble}, 940 ${y - 12} ` +
      `S 1300 ${y + 22 - wobble}, 1480 ${y - 8}`
    );
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 920"
        preserveAspectRatio="none"
      >
        {lines.map((i) => (
          <path
            key={i}
            d={pathFor(i)}
            fill="none"
            strokeWidth="1"
            className="bg-line"
            style={{
              animationDuration: `${14 + i * 2.5}s`,
              animationDelay: `${-i * 2}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
