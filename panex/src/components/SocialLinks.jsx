import { buildSimpleWhatsappLink } from '../lib/whatsapp'

const TIKTOK_URL = import.meta.env.VITE_TIKTOK_URL || 'https://www.tiktok.com/@panex.bo'
const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/panex.bo'

export default function SocialLinks({ variant = 'default' }) {
  const isFooter = variant === 'footer'
  const linkClass = isFooter
    ? 'text-masa/70 hover:text-trigo transition-colors'
    : 'text-horno2 hover:text-amaranto transition-colors'

  return (
    <div className="flex items-center gap-4">
      <a
        href={TIKTOK_URL}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
        aria-label="Ir a TikTok de PANEX"
      >
        TikTok
      </a>
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
        aria-label="Ir a Facebook de PANEX"
      >
        Facebook
      </a>
      <a
        href={buildSimpleWhatsappLink('¡Hola PANEX! Tengo una consulta.')}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
        aria-label="Escribir por WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  )
}
