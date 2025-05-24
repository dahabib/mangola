// src/app.d.ts
import type { Session, User } from "@auth/core/types";

declare global {
  namespace App {
    interface Locals {
      getSession(): Promise<Session | null>;
      // Or if using newer version:
      auth: {
        user: User | null;
        session: Session | null;
      };
    }
    interface PageData {
      session: Session | null;
    }
  }
}

export {};
