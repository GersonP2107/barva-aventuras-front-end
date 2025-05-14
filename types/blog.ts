export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}