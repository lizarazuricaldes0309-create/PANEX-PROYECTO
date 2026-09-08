import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Esto solo avisa en la consola del navegador durante el desarrollo.
  // Copia .env.example a .env y pon tus datos reales de Supabase.
  console.warn(
    '[PANEX] Faltan las variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
      'Revisa el archivo .env (mira .env.example como guía).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
