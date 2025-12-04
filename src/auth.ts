import { betterAuth, Auth } from "better-auth"

export const auth: Auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      strategy: 'jwe',
      refreshCache: true
    }
  },
  account: {
    storeStateStrategy: 'cookie',
    storeAccountCookie: true
  },
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
