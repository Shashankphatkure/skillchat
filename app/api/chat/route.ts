import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  // List of blocked words
  const blockedWords = [
    'comedy movie', 
    'romantic movie', 
    'action movie', 
    'horror movie', 
    'sci-fi movie', 
    'politics', 
    'election', 
    'government', 
    'democracy', 
    'republican', 
    'democrat', 
    'congress', 
    'senate', 
    'president', 
    'minister', 
    'parliament', 
    'policy', 
    'vote', 
    'campaign', 
    'debate', 
    'legislation',
  ];

  // Check if the user's message contains any blocked words
  const userMessage = messages[messages.length - 1].content.toLowerCase();
  const containsBlockedWord = blockedWords.some(word => userMessage.includes(word));

  if (containsBlockedWord) {
    // If the message contains a blocked word, return a custom response
    return new Response('Sorry, I can only provide information related to jobs, courses, and internships.', {
      status: 200
    })
  }




  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    openai.apiKey = previewToken
  }

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
