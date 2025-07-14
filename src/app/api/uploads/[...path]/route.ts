import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = params.path.join('/');
    // Usar la variable de entorno interna para Docker
    const backendUrl = process.env.REST_API_URL || process.env.NEXT_PUBLIC_REST_API_URL?.replace('/api', '') || 'http://skinslabs-backend:8080';
    const imageUrl = `${backendUrl}/uploads/${imagePath}`;

    console.log('🖼️ Proxy de imagen solicitada:', imageUrl);

    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'SkinsLabs-ImageProxy/1.0',
      },
    });

    if (!response.ok) {
      console.error(`❌ Error al obtener imagen: ${response.status} ${response.statusText}`);
      
      // Devolver imagen de placeholder si no se encuentra la original
      return new NextResponse(null, {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // Obtener el contenido de la imagen
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/webp';

    console.log(`✅ Imagen servida exitosamente: ${imageUrl} (${contentType})`);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('❌ Error en proxy de imagen:', error);
    
    return new NextResponse('Error al cargar imagen', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
