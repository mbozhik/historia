'use server'

import {getServerSession} from 'next-auth/next'
import {options} from '@/app/api/auth/[...nextauth]/options'

export const getSession = async () => await getServerSession(options)
