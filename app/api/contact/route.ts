import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, project, service, description } = body

  const subject = encodeURIComponent(`New Project Request — ${project}`)
  const mailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nProject: ${project}\nService: ${service}\nDescription: ${description}`
  )
  const mailtoUrl = `mailto:morvaweb@gmail.com?subject=${subject}&body=${mailBody}`

  return NextResponse.json({ mailtoUrl })
}
