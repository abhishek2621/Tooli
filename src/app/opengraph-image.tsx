import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Tooli - Free Online Tools & Calculators'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)', // Indigo to Purple gradient
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexDirection: 'column',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                        style={{
                            padding: '20px 40px',
                            border: '8px solid rgba(255,255,255,0.3)',
                            borderRadius: '24px',
                            display: 'flex',
                            background: 'rgba(255,255,255,0.1)',
                        }}
                    >
                        Tooli
                    </div>
                </div>
                <div
                    style={{
                        fontSize: 48,
                        marginTop: 40,
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 'normal',
                        display: 'flex',
                    }}
                >
                    Convert • Compress • Calculate
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
