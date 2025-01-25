import { NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function POST(request: Request) {
  if (!process.env.HUGGINGFACE_API_KEY) {
    return NextResponse.json(
      { message: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    const { text } = await request.json()
    
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: `Remix this text creatively: ${text}`,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.9
      }
    })
    
    const remixedText = response.generated_text
    
    return NextResponse.json({ remixedText })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error processing request' },
      { status: 500 }
    )
  }
}