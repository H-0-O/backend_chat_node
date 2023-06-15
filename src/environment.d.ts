declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      SOCKET_PORT: string;
      HTTP_PORT: string;
      APP_DEBUG: boolean;
      APP_BASE_URL: string;
      PASSWORD_HASH_SALT_ROUNDS: number;
      REMEMBER_TOKEN_HASH_SALT_ROUNDS_MAX: string;
      REMEMBER_TOKEN_HASH_SALT_ROUNDS_MIN: string;
      BASE_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
