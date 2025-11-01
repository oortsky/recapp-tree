import { Account, Models, OAuthProvider } from "appwrite";
import { client } from "@/lib/appwrite/client";

export const account = new Account(client);

interface SessionProps {
  sessionId?: string;
}

export const getUser =
  async (): Promise<Models.User<Models.Preferences> | null> => {
    try {
      const user = await account.get<Models.Preferences>();
      return user;
    } catch (error) {
      console.error("[AppwriteAuth] Failed to fetch user:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      return null;
    }
  };

export const getSession = async (): Promise<Models.Session | null> => {
  try {
    const session = await account.getSession("current");
    return session;
  } catch (error) {
    console.error("[AppwriteAuth] Failed to fetch session:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};

export const refreshSession = async ({
  sessionId = "current"
}: SessionProps = {}): Promise<Models.Session> => {
  try {
    const session = await account.getSession(sessionId);
    return session;
  } catch (error) {
    console.error("[AppwriteAuth] Failed to refresh session:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};

export const signIn = async (): Promise<void> => {
  try {
    await account.createOAuth2Session({
      provider: OAuthProvider.Google,
      success: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failed`
    });
  } catch (error) {
    console.error("[AppwriteAuth] Sign-in failed:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};

export const signOut = async ({
  sessionId = "current"
}: SessionProps = {}): Promise<void> => {
  try {
    await account.deleteSession(sessionId);
  } catch (error) {
    console.error("[AppwriteAuth] Sign-out failed:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};
