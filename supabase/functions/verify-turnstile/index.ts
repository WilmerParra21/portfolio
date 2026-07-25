import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { name, email, subject, message, service_type, turnstile_token } = body

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!turnstile_token) {
      return new Response(
        JSON.stringify({ error: 'Token de Turnstile faltante' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const turnstileSecret = Deno.env.get('TURNSTILE_SECRET_KEY')
    if (!turnstileSecret) {
      console.error('TURNSTILE_SECRET_KEY no configurada')
      return new Response(
        JSON.stringify({ error: 'Error de configuración del servidor' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: turnstile_token,
      }),
    })

    const verifyData = await verifyResponse.json()

    if (!verifyData.success) {
      console.warn('Turnstile validation failed:', verifyData)
      return new Response(
        JSON.stringify({ error: 'Validación de seguridad fallida' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseKey) {
      console.error('SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configuradas')
      return new Response(
        JSON.stringify({ error: 'Error de configuración del servidor' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('contact_form')
      .insert({
        name,
        email,
        subject: subject || null,
        message,
        service_type: service_type || null,
      })

    if (error) {
      console.error('Error inserting contact form:', error)
      return new Response(
        JSON.stringify({ error: 'Error al guardar el mensaje' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Mensaje enviado correctamente' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error en verify-turnstile:', error)
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
