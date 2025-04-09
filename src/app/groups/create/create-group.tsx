'use client'

import { GroupForm } from '@/components/group-form'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'

export const CreateGroup = () => {
  const { mutateAsync } = trpc.groups.create.useMutation()
  const utils = trpc.useUtils()
  const router = useRouter()

  return (
    <GroupForm
  onSubmit={async (groupFormValues) => {
    const { groupId } = await mutateAsync({ groupFormValues })

    // Guarda en localStorage
    const current = JSON.parse(localStorage.getItem('spliit_groups') ?? '[]') as string[]
    const updated = Array.from(new Set([...current, groupId]))
    localStorage.setItem('spliit_groups', JSON.stringify(updated))

    await utils.groups.invalidate()
    router.push(`/groups/${groupId}`)
  }}
/>
  )
}
