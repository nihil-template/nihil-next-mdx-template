/*
  Warnings:

  - You are about to drop the `blocks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_postId_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "blocks";

-- DropEnum
DROP TYPE "BlockName";

-- DropEnum
DROP TYPE "ListType";

-- DropEnum
DROP TYPE "MessageColor";
