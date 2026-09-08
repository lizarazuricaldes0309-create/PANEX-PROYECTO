import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session?.user) {
      setProfile(null)
      return
    }
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => setProfile(data))
  }, [session])

  // --- Registro con correo ---
  async function signUpWithEmail({ email, password, fullName, phone }) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    })
  }

  // --- Ingreso con correo ---
  async function signInWithEmail({ email, password }) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  // --- Ingreso / registro con Google ---
  async function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  // --- Ingreso con número de teléfono (envía código SMS) ---
  async function signInWithPhone({ phone }) {
    return supabase.auth.signInWithOtp({ phone })
  }

  async function verifyPhoneOtp({ phone, token }) {
    return supabase.auth.verifyOtp({ phone, token, type: 'sms' })
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  const value = {
    session,
    profile,
    loading,
    isLoggedIn: !!session,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signInWithPhone,
    verifyPhoneOtp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
