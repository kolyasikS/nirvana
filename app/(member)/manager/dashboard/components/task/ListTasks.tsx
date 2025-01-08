'use client'

import React, {useState} from 'react'
import {ChevronDownIcon} from "@radix-ui/react-icons"
import {useToast} from "@/hooks/use-toast";
import {cn} from "@lib/utils-client";
import Task from "@/app/(member)/manager/dashboard/components/task/components/Task";

const hours = Array.from({ length: 15 }, (_, i) => String(i + 8).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

type Props = {
  onClose: () => void;
  userRole: string;
  tasks: ITask[];
};
export function ListTasks ({
  onClose,
  userRole,
  // tasks
}: Props) {
  const { toast } = useToast();

  const tasks = [{
    "id": "174d0393-80f6-42fb-84a0-e917d6bf620e",
    "assignment": {
      "name": "Clear room",
      "role": {
        "name": "Housemaid"
      }
    },
    "user": null,
    "details": "Hello details",
    "startTime": "2025-01-10T10:00:00Z",
    "endTime": "2025-01-10T11:30:00Z",
    "isCompleted": false
  }, {
    "id": "174d0393-80f6-42fsb-84a0-e917d6bf620e",
    "assignment": {
      "name": "Clear room",
      "role": {
        "name": "Housemaid"
      }
    },
    "user": null,
    "details": "Hello details",
    "startTime": "2025-01-10T10:00:00Z",
    "endTime": "2025-01-10T11:30:00Z",
    "isCompleted": true
  }]


  return (
    <div
      className="flex flex-col w-full bg-zinc-950 rounded-xl border border-zinc-800 p-5 relative dark:text-gray-50"
    >
      <h2 className="text-2xl font-bold mb-5">Assigned Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task, ind) =>
          <Task task={task} number={ind} key={task.id}/>
        )}
      </div>
    </div>
  )
}
