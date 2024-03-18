import { NextRequest, NextResponse } from 'next/server';
import { IPatchPost } from '@/src/entities';
import { Db } from '@/src/common';

const post = Db.post();

interface Params {
  params: {
    id: string;
  }
}

export async function GET(req: NextRequest, { params: { id, }, }: Params) {
  const post = await Db.post().findFirst({
    where: {
      id,
    },
  });

  return NextResponse.json({
    data: post,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params: { id, }, }: Params) {
  const postData: IPatchPost = await req.json();

  const patchPost = await post.update({
    where: {
      id,
    },
    data: postData,
  });

  return NextResponse.json({
    data: patchPost,
    message: 'ok',
  }, {
    status: 200,
  });
}

export async function DELETE(req: NextRequest, { params: { id, }, }: Params) {
  const deletePost = await post.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    data: deletePost,
    message: 'ok',
  }, {
    status: 200,
  });
}
