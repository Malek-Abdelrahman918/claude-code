// Next.js remounts a template on every navigation, including browser back and forward. The
// class below replays the entrance animation each time. Only opacity and transform are animated,
// so nothing in the layout moves.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
