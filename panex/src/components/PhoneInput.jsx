import { countries } from '../data/countries'

export default function PhoneInput({ country, onCountryChange, phone, onPhoneChange }) {
  return (
    <div className="flex gap-2">
      <select
        value={country.code}
        onChange={(e) => onCountryChange(countries.find((c) => c.code === e.target.value))}
        className="rounded-lg border border-horno/15 px-2 py-2 font-body text-sm bg-crema max-w-[128px]"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name} ({c.dial})
          </option>
        ))}
      </select>
      <input
        type="tel"
        inputMode="numeric"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value.replace(/[^\d]/g, ''))}
        placeholder="Número sin el código de país"
        className="flex-1 rounded-lg border border-horno/15 px-3 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-amaranto/40"
      />
    </div>
  )
}
