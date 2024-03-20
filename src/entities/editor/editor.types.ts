export interface BlockItem {
  id: string;
  postId: string;
  name: ('TEXT' | 'HEADING' | 'LIST' | 'IMAGE' | 'CODE' | 'YOUTUBE' | 'QUOTE' | 'MESSAGE');
}

export interface TextBlockItem extends BlockItem {
  text: string;
}

export interface HeadingBlockItem extends BlockItem {
  level: ('h2' | 'h3' | 'h4' | 'h5' | 'h6');
  text: string;
}

export interface ImageBlockItem extends BlockItem {
  link: string;
  alt: string;
}

export interface MessageBlockItem extends BlockItem {
  color: ('BLUE' | 'RED' | 'GREEN' | 'YELLOW');
  text: string;
}

export interface ListBlockItem extends BlockItem {
  type: ('ORDERED' | 'UNORDERED');
  items: string[];
}

export interface QuoteBlockItem extends BlockItem {
  text: string;
  who: string;
  link: string;
}

export interface CodeBlockItem extends BlockItem {
  lang: string;
  code: string;
}

export interface YoutubeBlockItem extends BlockItem {
  videoId: string;
  text: string;
}
