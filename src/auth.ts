import Facebook from "@auth/sveltekit/providers/facebook";
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";

export const { handle, signIn } = SvelteKitAuth({
  providers: [Google, Facebook],
});
