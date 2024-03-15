-- CreateEnum
CREATE TYPE "ListType" AS ENUM ('ORDERED', 'UNORDERED');

-- CreateEnum
CREATE TYPE "BlockName" AS ENUM ('PARAGRAPH', 'HEADING', 'IMAGE', 'LIST', 'MESSAGE', 'QUOTE', 'CODE', 'YOUTUBE');

-- CreateEnum
CREATE TYPE "MessageColor" AS ENUM ('RED', 'BLUE', 'GREEN', 'YELLOW');

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "name" "BlockName" NOT NULL DEFAULT 'PARAGRAPH',
    "text" TEXT,
    "level" INTEGER,
    "link" TEXT,
    "alt" TEXT,
    "color" "MessageColor",
    "type" "ListType",
    "items" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "who" TEXT,
    "lang" TEXT,
    "code" TEXT,
    "videoId" TEXT,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
