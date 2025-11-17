// src/components/Button.tsx
export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="btn btn-primary">
      {children}
    </button>
  );
}
