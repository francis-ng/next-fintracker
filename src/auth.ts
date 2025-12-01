import { betterAuth, Auth } from "better-auth"

export const auth: Auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }
  },
  pages: {
    signIn: '/user/login'
  }
})
