/**
 * Wrapper kept for the call-to-action buttons. It used to pull its button towards the cursor; that
 * movement was dropped (2026-10-03) for a calmer hover: the buttons themselves change colour and turn
 * their arrow. `strength` is accepted and ignored so existing call sites keep working.
 */
export function Magnetic({
  children,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  return <div className={`inline-block ${className}`}>{children}</div>;
}
