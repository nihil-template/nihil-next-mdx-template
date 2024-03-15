-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PUBLIC', 'LOCKED', 'HIDDEN');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'PUBLIC';
