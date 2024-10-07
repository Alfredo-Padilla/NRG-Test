import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (credentials) {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password
            })
          });

          const user = await res.json();

          if (res.ok && user) {
            return user;
          }
        }
        return null;
      }
    })
  ],
});