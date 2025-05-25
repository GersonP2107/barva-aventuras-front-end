"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

interface ContactInfo {
  address: string
  phone: string
  email: string
  businessHours: string
  googleMapsUrl: string
  facebookUrl: string
  instagramUrl: string
  twitterUrl: string
}

export default function ContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:3001/settings/contact')
        
        if (response.ok) {
          const data = await response.json()
          setContactInfo(data)
        }
      } catch (error) {
        console.error("Error fetching contact info:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  if (isLoading || !contactInfo) {
    return <div className="animate-pulse bg-zinc-800 h-20 rounded-lg"></div>
  }

  return (
    <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
      
      {contactInfo.address && (
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
          <p>{contactInfo.address}</p>
        </div>
      )}
      
      {contactInfo.phone && (
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <Link href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="hover:text-amber-500 transition-colors">
            {contactInfo.phone}
          </Link>
        </div>
      )}
      
      {contactInfo.email && (
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <Link href={`mailto:${contactInfo.email}`} className="hover:text-amber-500 transition-colors">
            {contactInfo.email}
          </Link>
        </div>
      )}
      
      {contactInfo.businessHours && (
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
          <p>{contactInfo.businessHours}</p>
        </div>
      )}
      
      <div className="flex items-center gap-4 pt-2">
        {contactInfo.facebookUrl && (
          <Link 
            href={contactInfo.facebookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-zinc-700 p-2 rounded-full hover:bg-amber-500 transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </Link>
        )}
        
        {contactInfo.instagramUrl && (
          <Link 
            href={contactInfo.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-zinc-700 p-2 rounded-full hover:bg-amber-500 transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        )}
        
        {contactInfo.twitterUrl && (
          <Link 
            href={contactInfo.twitterUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-zinc-700 p-2 rounded-full hover:bg-amber-500 transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  )
}