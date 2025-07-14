import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_REST_API_URL || 'http://69.62.89.201:8181/api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Obtener el FormData del request
    const formData = await request.formData();
    
    console.log(`🖼️ Proxy subida de imagen para bot ID: ${id}`);
    
    // Reenviar la petición al backend
    const backendUrl = `${BACKEND_URL}/bots/${id}/imagen`;
    console.log(`📡 Reenviando a: ${backendUrl}`);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
      // No establecer Content-Type, se maneja automáticamente con FormData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error del backend: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { 
          error: 'Error al subir imagen al backend',
          details: errorText,
          status: response.status 
        },
        { status: response.status }
      );
    }

    const result = await response.text();
    console.log(`✅ Imagen subida exitosamente para bot ${id}`);
    
    return new NextResponse(result, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });

  } catch (error) {
    console.error('❌ Error en proxy de subida de imagen:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del proxy',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
