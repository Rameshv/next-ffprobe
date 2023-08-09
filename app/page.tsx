/** Add your relevant code here for the issue to reproduce */
'use client'
import React, { useEffect, useState } from 'react'

export default function Home() {
  const handleFileSelect = (e: React.FormEvent<HTMLInputElement>) => {
        const target = (e.target as HTMLInputElement)
        uploadFile(target.files[0])
    }

    const uploadFile= async (file: File) => {
        const form = new FormData()
        form.append(file.name, file)
        console.log(file.name)
        const response = await fetch('/api/upload', {
            method: 'POST',
            body:form
        })
        if (response.status === 200) {
            const media = await response.json()
            alert(media)
        }


    }

  return <div>
            <input id="fileSelect" type="file"  onChange={handleFileSelect} accept=".mp3,.m4a" />
  </div>
}
