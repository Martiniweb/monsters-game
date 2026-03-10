import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'home-monsters-latest-20260310-170236.tar.gz')
  
  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 })
  }
  
  const fileBuffer = fs.readFileSync(filePath)
  
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/gzip',
      'Content-Disposition': 'attachment; filename="home-monsters-latest-20260310-170236.tar.gz"',
      'Content-Length': fileBuffer.length.toString(),
    },
  })
}
