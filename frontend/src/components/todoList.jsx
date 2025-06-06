import React from 'react'
import { Trash2 } from 'lucide-react'

export default function todoList() {
  return (
    <div>
        <div>
            <span>task 1</span>
            <div>
                <span>date</span>
                <Trash2/>
            </div>
        </div>
    </div>
  )
}
