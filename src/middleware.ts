import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { type NextRequest, NextResponse } from "next/server"

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10s"),
})

export default async function middleware(request: NextRequest): Promise<Response | undefined> {
    const ip = request.ip ?? "127.0.0.1"

    try {
        const { success } = await ratelimit.limit(ip)
    
        if (!success) return NextResponse.json({ error: 'Too Many Requests' }, { status: 200 })
    
        return NextResponse.next()
    } catch (error) {
        console.log('rate-limit', error)
        return NextResponse.json({ message: 'Failed'}, { status: 403 })
    }
    
}

export const config = {
    matcher: '/api/:path*',
}
