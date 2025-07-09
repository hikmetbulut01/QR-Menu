export default function Card({ children, className = "" }) {
  return <div className={`bg-[#312a52] rounded-lg p-4 md:p-6 ${className}`}>{children}</div>
}
