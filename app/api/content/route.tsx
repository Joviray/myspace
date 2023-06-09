import { NextResponse } from 'next/server';

// Dummy data
const posts = [
  {
    title: 'Lorem Ipsum',
    slug: 'lorem-ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
  {
    title: 'My Amazing Trip',
    slug: 'my-amazing-trip',
    content: 
    'I just returned from the most amazing trip. Let me share my experience with you!',
  },
  {
    title: 'Thoughts on Technology',
    slug: 'thoughts-on-technology',
    content: 
    "In this post, I'll be sharing my thoughts and opinions on the latest technological advancements.",
  },
  {
    title: 'Recipe of the Day',
    slug: 'recipe-of-the-day',
    content: 
    "Today, I'm going to share a delicious recipe that you can try at home. Bon appétit!"
  },
  {
    title: 'Fitness Tips',
    slug: 'fitness-tips',
    content: 
    "Are you looking to stay fit and healthy? Check out these useful fitness tips!"
  },
];

import { NextRequest } from 'next/server';  

export async function GET() {
  return NextResponse.json(posts);
}