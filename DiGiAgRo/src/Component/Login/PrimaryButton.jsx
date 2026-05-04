export function PrimaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90"
    >
      {text}
    </button>
  );
}