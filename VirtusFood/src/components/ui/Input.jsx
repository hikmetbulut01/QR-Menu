export default function Input({ label, ...props }) {
  return (
    <div className="mb-3 md:mb-4 w-full overflow-hidden">
      {label && <label className="block text-white mb-1 md:mb-2 text-sm md:text-base break-words">{label}</label>}
      <input className="w-full p-2 md:p-3 rounded bg-[#3a3359] text-white text-sm md:text-base break-words overflow-hidden" {...props} />
    </div>
  )
}
