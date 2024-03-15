import { NextRequest, NextResponse } from 'next/server';
import { Db } from '@/src/common';
import { ICreatePost } from '@/src/entities';

const post = Db.post();

export async function GET() {
  const posts = await post.findMany();

  return NextResponse.json({
    data: posts,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const { title, description, content, }: ICreatePost = await req.json();

  const newPost = await post.create({
    data: {
      title,
      description,
      content,
    },
  });

  return NextResponse.json({
    data: newPost,
    message: 'ok',
  }, {
    status: 200,
  });
}
