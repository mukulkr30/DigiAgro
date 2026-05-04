import DigiAgroLogo from "../../assets/DigiAgro.png";
export function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">

        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-r bg-white flex items-center justify-center text-white text-2xl mb-3">
            <img className="w-16 h-16" src={DigiAgroLogo} alt="" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        {children}

        <div className="text-center mt-4 text-sm text-gray-600">
          {footer}
        </div>
      </div>
    </div>
  );
}