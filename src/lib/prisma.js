// Re-export the Prisma client from the root-level lib directory.
// This allows `@/lib/prisma` imports (which resolve to `src/lib/prisma` via jsconfig/tsconfig)
// to find the client that actually lives at `lib/prisma`.
import prisma from "../../lib/prisma";
export default prisma;
export { prisma };
