import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (password === user?.password) {
    return user
  } else {
    return null
  }
})
