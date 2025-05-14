"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DataTable from "@/components/admin/data-table"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/types/blog"

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/blog")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleEdit = (post: BlogPost) => {
    router.push(`/admin/blog/edit/${post.id}`)
  }

  const handleDelete = async (post: BlogPost) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      try {
        await fetch(`http://localhost:3001/blog/${post.id}`, {
          method: "DELETE",
        })
        setPosts(posts.filter((p) => p.id !== post.id))
      } catch (error) {
        console.error("Error deleting blog post:", error)
      }
    }
  }

  const handleAdd = () => {
    router.push("/admin/blog/new")
  }

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "author",
      label: "Author",
    },
    {
      key: "category",
      label: "Category",
      render: (value: string) => (
        <Badge className="bg-zinc-700">{value}</Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <DataTable
      title="Blog Posts"
      columns={columns}
      data={posts}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  )
}