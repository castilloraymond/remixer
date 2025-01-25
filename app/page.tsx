'use client'

import { useState } from 'react'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [remixedText, setRemixedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRemix = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/remix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })
      const data = await response.json()
      setRemixedText(data.remixedText)
    } catch (error) {
      console.error('Error:', error)
    }
    setIsLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content Remixer</h1>
      
      <textarea
        className="w-full p-2 border rounded mb-4 bg-background text-foreground"
        rows={6}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your text here..."
      />
      
      <button
        className="bg-foreground text-background px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
        onClick={handleRemix}
        disabled={isLoading}
      >
        {isLoading ? 'Remixing...' : 'Remix Content'}
      </button>
      
      {remixedText && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Remixed Output:</h2>
          <div className="p-4 border rounded">
            {remixedText}
          </div>
        </div>
      )}
    </main>
  )
}
